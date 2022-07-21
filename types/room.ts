import { z } from "zod";
import type { Document } from "mongoose";
import type { Socket } from "socket.io";

import {
  ISSUE_STATUS,
  AUTH_PROVIDERS,
  MANAGE_OPTIONS,
  VOTE_TYPES,
  BOARD_STATUS,
  PLAYER_STATUS,
  AVAILABLE_REACTIONS,
  PLAYER_TYPES,
} from "~/constants";

export const RoomSchema = z.object({
  roomConfig: z.object({
    title: z.string().min(3).max(40),
    issues: z
      .array(
        z.object({
          name: z.string(),
          result: z.string(),
          status: z.enum(ISSUE_STATUS),
        })
      )
      .optional(),
    owner: z
      .object({
        provider: z.nativeEnum(AUTH_PROVIDERS),
        providerId: z.string(),
      })
      .optional(),
    whoCanManage: z.enum(MANAGE_OPTIONS),
    authentication: z.object({
      required: z.boolean(),
      allowedProviders: z.array(z.nativeEnum(AUTH_PROVIDERS)).optional(),
      extensions: z.array(z.string()).optional(),
    }),
    withTimer: z.boolean().optional(),
  }),
  boardConfig: z.object({
    voteValues: z.array(z.string()),
    voteType: z.enum(VOTE_TYPES),
  }),
  boardStatus: z.enum(BOARD_STATUS),
  players: z.array(
    z.object({
      name: z.string(),
      avatar: z.string().optional(),
      cardBackground: z.string().optional(),
      provider: z.nativeEnum(AUTH_PROVIDERS),
      playerId: z.string(),
      voteValue: z.string().nullable().optional(),
      status: z.enum(PLAYER_STATUS),
      reaction: z.enum(AVAILABLE_REACTIONS).nullable().optional(),
      type: z.enum(PLAYER_TYPES),
    })
  ),
});
export type Room = z.infer<typeof RoomSchema>;

export type DocumentRoom = Document & Room;

export type RoomConfig = Room["roomConfig"];

export type BoardConfig = Room["boardConfig"];

export type BoardStatus = Room["boardStatus"];

export type Player = Room["players"][number];

export type RoomSocket = Socket & { activeRoom?: string; player?: Player };

// export type Room = {
//   roomConfig: {
//     title: string;
//     issues: Array<{
//       name: string;
//       result: string;
//       status: typeof ISSUE_STATUS[number];
//     }>;
//     owner: {
//       provider: keyof typeof AUTH_PROVIDERS;
//       providerId: string;
//     };
//     whoCanManage: typeof MANAGE_OPTIONS[number];
//     authentication: {
//       required: boolean;
//     };
//     withTimer: boolean;
//   };
//   boardConfig: {
//     voteValues: Array<string>;
//     voteType: typeof VOTE_TYPES[number];
//   };
//   boardStatus: typeof BOARD_STATUS[number];
//   players: Array<{
//     name: string;
//     avatar: string;
//     cardBackground: string;
//     provider: keyof typeof AUTH_PROVIDERS;
//     playerId: string;
//     voteValue: string;
//     status: typeof PLAYER_STATUS[number];
//     reaction: typeof AVAILABLE_REACTIONS[number];
//     type: typeof PLAYER_TYPES[number];
//   }>;
// };
