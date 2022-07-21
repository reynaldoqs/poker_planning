import { PLAYER_TYPES } from "~/constants";
import { Player, RecursivePartial, User } from "~/types";

export const recursiveUpdateObject = <T extends object>(
  target: RecursivePartial<T>,
  source: RecursivePartial<T>
) => {
  let result = { ...source };
  for (const prop in target) {
    if ({}.hasOwnProperty.call(target, prop)) {
      result[prop] = target[prop];
      if ({}.hasOwnProperty.call(source, prop)) {
        if (
          typeof target[prop] === "object" &&
          typeof source[prop] === "object" &&
          !Array.isArray(source[prop])
        ) {
          result[prop] = recursiveUpdateObject(
            target[prop] as any,
            source[prop] as any
          );
        } else {
          result[prop] = source[prop];
        }
      }
    }
  }
  return result as T;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const userToPlayer = (user: User, role: typeof PLAYER_TYPES[number]) => {
  const player: Player = {
    status: "CONNECTED",
    type: role,
    name: user.displayName,
    provider: user.provider,
    playerId: user.userId,
    avatar: user.avatar,
  };

  return player;
};
