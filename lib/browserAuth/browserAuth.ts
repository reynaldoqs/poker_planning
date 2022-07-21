import FingerprintJS from "@fingerprintjs/fingerprintjs";

import { AUTH_PROVIDERS, AVATAR_PROVIDER } from "~/constants";
import { UserSchema } from "~/types";
import {
  getItem,
  removeItem,
  setItem,
} from "~/services/storage/storage.client";
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
  const avatar = `${AVATAR_PROVIDER}${visitorId}.svg?background=%23ff535f`; // `${AVATAR_PROVIDER}${providerId}.svg?background=%23000000`
  const localUser: User = {
    displayName: name,
    userId: visitorId,
    avatar: avatar,
    provider: AUTH_PROVIDERS.browser,
  };

  const parsedUser = UserSchema.parse(localUser);
  // setItem(JSON.stringify(parsedUser), "local_user");
  return parsedUser;
};

// export const getLocalUser = (): User | null => {
//   const user = getItem<User>("local_user");
//   if (user) {
//     return UserSchema.parse(user);
//   }
//   return null;
// };

// export const removeLocalUser = () => {
//   removeItem("local_user");
// };

// @TODO: function to update local user
