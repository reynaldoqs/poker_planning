import { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import print from "consola";
import type { FC, ReactNode } from "react";

import { generateLocalUser } from "~/lib/browserAuth/browserAuth";
import {
  getItem,
  removeItem,
  setItem,
} from "~/services/storage/storage.client";
import { User, UserSchema } from "~/types";
import { AUTH_PROVIDERS } from "~/constants";

import type {
  AuthProviderState,
  AuthProviderWrapperProps,
} from "./AuthProvider.types";

const LOCAL_USER_KEY = "[AUDI::014]:local_user";

const authInitialStates: AuthProviderState = {
  user: null,
  isLoading: false,
  signIn: () => {},
  signOut: () => {},
  oneTapSignIn: () => {},
};

const AuthContext = createContext<AuthProviderState>(authInitialStates);

export const useUserAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const onBrowserAuth = async (name: string) => {
    setLoading(true);
    const localUser = await generateLocalUser(name);
    setItem(localUser, LOCAL_USER_KEY);
    setUser(localUser);
    setLoading(false);
  };

  const onOneTapSignInHandler = (inputUser: User) => {
    if (user) {
      print.info("already logged in");
      return;
    }
    setItem(inputUser, LOCAL_USER_KEY);
    setUser(inputUser);
  };

  const signInHandler = (
    provider: keyof typeof AUTH_PROVIDERS,
    name?: string
  ) => {
    if (user) {
      print.info("already logged in");
      return;
    }
    if (provider === AUTH_PROVIDERS.browser && name) {
      onBrowserAuth(name);
    } else if (provider !== AUTH_PROVIDERS.browser) {
      signIn(provider);
    }
  };

  const signOutHandler = async () => {
    console.log("pasa por signout");
    if (!user) {
      print.info("There is no user logged in");
      return;
    }
    if (
      user.provider === AUTH_PROVIDERS.browser ||
      user.provider === AUTH_PROVIDERS.googleOneTap
    ) {
      removeItem(LOCAL_USER_KEY);
      setUser(null);
      setLoading(false);
    } else {
      signOut();
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    }
    if (status === "unauthenticated") {
      const localUser = getItem<User>(LOCAL_USER_KEY);
      if (localUser) {
        setUser(localUser);
      }
      setLoading(false);
    }
    if (status === "loading") {
      setLoading(true);
    }
  }, [status]);

  useEffect(() => {
    if (session && session.user && session.user.name && session.user.image) {
      const localUser: User = {
        displayName: session.user.name,
        avatar: session.user.image,
        userId: String(session.sub),
        provider: String(session.provider) as any,
      };
      const parsedUser = UserSchema.parse(localUser);
      setUser(parsedUser);
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn: signInHandler,
        signOut: signOutHandler,
        oneTapSignIn: onOneTapSignInHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
/*
   value={useMemo(
          () => ({
             player,
          isAuthenticated,
          isAuthLoading,
          authWithBrowser: onBrowserAuth,
          }),
          []
        )}
      >*/
export const AuthProviderWrapper: React.FC<AuthProviderWrapperProps> = ({
  session,
  children,
}) => (
  <SessionProvider session={session}>
    <AuthProvider>{children}</AuthProvider>
  </SessionProvider>
);
