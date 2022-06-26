import type { Document } from "mongoose";
import type { Socket } from "socket.io";

import type {
  ISSUE_STATUS,
  AUTH_PROVIDERS,
  MANAGE_OPTIONS,
  VOTE_TYPES,
  BOARD_STATUS,
  PLAYER_STATUS,
  AVAILABLE_REACTIONS,
  PLAYER_TYPES,
} from "~/constants";

export type Room = {
  roomConfig: {
    title: string;
    issues: Array<{
      name: string;
      result: string;
      status: typeof ISSUE_STATUS[number];
    }>;
    owner: {
      provider: keyof typeof AUTH_PROVIDERS;
      providerId: string;
    };
    whoCanManage: typeof MANAGE_OPTIONS[number];
    authentication: {
      required: boolean;
    };
    withTimer: boolean;
  };
  boardConfig: {
    voteValues: Array<string>;
    voteType: typeof VOTE_TYPES[number];
  };
  boardStatus: typeof BOARD_STATUS[number];
  players: Array<{
    name: string;
    avatar: string;
    cardBackground: string;
    provider: keyof typeof AUTH_PROVIDERS;
    playerId: string;
    voteValue: string;
    status: typeof PLAYER_STATUS[number];
    reaction: typeof AVAILABLE_REACTIONS[number];
    type: typeof PLAYER_TYPES[number];
  }>;
};

export type DocumentRoom = Document & Room;

export type RoomConfig = Room["roomConfig"];

export type BoardConfig = Room["boardConfig"];

export type BoardStatus = Room["boardStatus"];

export type Player = Room["players"][number];

export type RoomSocket = Socket & { activeRoom?: string; player?: Player };
