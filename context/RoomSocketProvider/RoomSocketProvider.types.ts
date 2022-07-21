import React from "react";

import {
  BoardConfig,
  BoardStatus,
  DocumentRoom,
  Player,
  RoomConfig,
} from "~/types";

export type RoomSocketProviderState = {
  roomConfig: RoomConfig;
  boardConfig: BoardConfig;
  boardStatus: BoardStatus;
  players: Player[];
  currentPlayer: Player | null;
  connected: boolean;
  joined: boolean;
  joinCurrentRoom: () => void;
  updatePlayerVote: (value: string | null) => void;
  updatePlayerReaction: (reaction: any | null) => void;
  updateBoardStatus: (boardStatus: BoardStatus) => void;
  updateCurrentPlayer: (player: Partial<Player> | null) => void;
};

export type RoomSocketProviderProps = {
  room: DocumentRoom;
  children: React.ReactNode;
};
