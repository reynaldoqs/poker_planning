import { User, UserSchema } from "~/types";

export const googleAccToUser = (gObj: any) => {
  const oneTapUser: User = {
    avatar: gObj?.picture,
    userId: gObj?.sub,
    displayName: gObj?.name,
    provider: "googleOneTap",
  };
  return UserSchema.parse(oneTapUser);
};
