import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { AUTH_PROVIDERS, AVATAR_PROVIDER } from "~/constants";
import { UserSchema } from "~/types";
import type { User } from "~/types";

const fpPromise = typeof window === "undefined" ? null : FingerprintJS.load();

const getBrowserId = async (): Promise<string> => {
  if (!fpPromise) return "";
  const fp = await fpPromise;
  const result = await fp.get();
  const providerId = result.visitorId;
  return providerId;
};

export const generateLocalUser = async (name: string): Promise<User> => {
  const visitorId = await getBrowserId();
  const avatar = `${AVATAR_PROVIDER}${visitorId}.svg`; // `${AVATAR_PROVIDER}${providerId}.svg?background=%23000000`
  const localUser: User = {
    displayName: name,
    userId: visitorId,
    avatar: avatar,
    provider: AUTH_PROVIDERS.browser,
  };

  const parsedUser = UserSchema.parse(localUser);
  localStorage.setItem("local_user", JSON.stringify(parsedUser));
  return parsedUser;
};

export const getLocalUser = (): User | null => {
  const user = localStorage.getItem("local_user");
  console.log("aqui", user);
  if (user) {
    return UserSchema.parse(JSON.parse(user));
  }
  return null;
};

export const removeLocalUser = () => {
  localStorage.removeItem("local_user");
};
