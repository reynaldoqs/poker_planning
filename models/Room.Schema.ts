import mongoose, { Schema } from "mongoose";

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
import type { DocumentRoom } from "~/types";

// WARNING: This schema needs to by sync with Room type in ./types/room.ts

const roomSchema: Schema = new Schema({
  roomConfig: {
    title: { type: String, required: true },
    issues: [
      {
        _id: false,
        name: String,
        status: {
          type: String,
          enum: ISSUE_STATUS,
          default: ISSUE_STATUS[0],
        },
        result: String,
      },
    ],
    owner: {
      provider: {
        type: String,
        enum: Object.values(AUTH_PROVIDERS),
        required: false,
      },
      providerId: { type: String, required: false },
    },
    whoCanManage: {
      type: String,
      enum: MANAGE_OPTIONS,
      default: MANAGE_OPTIONS[0],
    },
    authentication: {
      required: { type: Boolean, default: false },
    },
    withTimer: { type: Boolean, default: false },
  },
  boardConfig: {
    voteValues: [String],
    voteType: { type: String, enum: VOTE_TYPES, default: VOTE_TYPES[0] },
  },
  boardStatus: {
    type: String,
    enum: BOARD_STATUS,
    default: BOARD_STATUS[1],
  },
  players: [
    {
      _id: false,
      name: String,
      avatar: String,
      cardBackground: String,
      provider: {
        type: String,
        enum: Object.values(AUTH_PROVIDERS),
      },
      playerId: {
        type: String,
        required: true,
      },
      voteValue: String,
      status: {
        type: String,
        enum: PLAYER_STATUS,
        default: PLAYER_STATUS[0],
      },
      reaction: {
        type: String,
        enum: AVAILABLE_REACTIONS,
        default: "",
      },
      type: {
        type: String,
        enum: PLAYER_TYPES,
        default: PLAYER_TYPES[0],
      },
    },
  ],
});

export default mongoose.model<DocumentRoom>("Room", roomSchema);
