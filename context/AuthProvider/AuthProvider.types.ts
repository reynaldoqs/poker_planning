import type { Session } from "next-auth/core/types";

import { AUTH_PROVIDERS } from "~/constants";
import type { User } from "~/types";

export type AuthProviderState = {
  user: User | null;
  isLoading: boolean;
  signIn: (provider: keyof typeof AUTH_PROVIDERS, name?: string) => void;
  signOut: () => void;
  // onUserUpdate: (user: Partial<User>) => void; solo tener update del current player
};

export type AuthProviderWrapperProps = {
  session: Session;
  children: React.ReactNode;
};
