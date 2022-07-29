import { createContext, useContext, useEffect, useState } from "react";
import print from "consola";

import {
  onInit,
  subscribeUpdateBoardConfig,
  subscribeUpdateBoardStatus,
  subscribeUpdateRoomConfig,
  subscribeUpdatePlayers,
  subscribePlayerJoined,
  subscribePlayerLeft,
  subscribePlayerDisconnected,
  subscribeSuccesses,
  subscribeInfos,
  subscribeErrors,
  subscribeLocalDisconnection,
  subscribeSuccessConnection,
  onDisconnect,
  onJoinRoom,
  onUpdatePlayer,
  onUpdateBoardStatus,
  onLeaveRoom,
} from "~/listeners/room.client";
import type { BoardStatus, Player } from "~/types";

import {
  RoomSocketProviderProps,
  RoomSocketProviderState,
} from "./RoomSocketProvider.types";
import { getItem, removeItem, setItem } from "~/services/storage";

const RoomSocketInitialState: any = {
  roomConfig: null,
  boardConfig: null,
  boardStatus: null,
  players: [],
  localPlayer: null,
  connected: false,
  joined: false,
  joinCurrentRoom: () => {},
  leaveCurrentRoom: () => {},
  updatePlayerVote: () => {},
  updatePlayerReaction: () => {},
  updateBoardStatus: () => {},
  updateLocalPlayer: () => {},
};

const RoomSocketContext = createContext<RoomSocketProviderState>(
  RoomSocketInitialState
);

export const useRoomSocket = () => useContext(RoomSocketContext);

export const RoomSocketProvider: React.FC<RoomSocketProviderProps> = ({
  room,
  children,
}) => {
  const [roomConfig, setRoomConfig] = useState(room.roomConfig);
  const [boardConfig, setBoardConfig] = useState(room.boardConfig);
  const [boardStatus, setBoardStatus] = useState(room.boardStatus);
  const [players, setPlayers] = useState(room.players);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [connected, setConnected] = useState(false);
  const [joined, setJoined] = useState(false);

  const CURRENT_PLAYER_KEY = `[AUDI::${room._id}]:current_player`;

  const joinCurrentRoomHandler = () => {
    if (!currentPlayer) {
      print.error("there is not currentPlayer");
      return;
    }
    onJoinRoom(room._id, currentPlayer, () => {
      setJoined(true);
    });
  };

  const leaveCurrentRoomHandler = () => {
    if (!currentPlayer) {
      print.error("there is not currentPlayer");
      return;
    }
    setJoined(false);
    onLeaveRoom(currentPlayer);
  };

  const updatePlayerVoteHandler = (value: string | null) => {
    if (!currentPlayer || !joined) {
      print.error("there is not currentPlayer or is not joined");
      return;
    }
    const updatedPlayer = { ...currentPlayer, voteValue: value };
    setCurrentPlayer(updatedPlayer);
    onUpdatePlayer(updatedPlayer);
  };

  const updatePlayerReactionHandler = (reaction: any | null) => {
    if (!currentPlayer || !joined) {
      print.error("there is not currentPlayer or is not joined");
      return;
    }
    const updatedPlayer = { ...currentPlayer, reaction };
    setCurrentPlayer(updatedPlayer);
    onUpdatePlayer(updatedPlayer);
  };

  const updateBoardStatusHandler = (boardStatus: BoardStatus) => {
    if (!currentPlayer || !joined) {
      print.error("there is not localPlayer or is not joined");
      return;
    }
    onUpdateBoardStatus(boardStatus, currentPlayer);
  };

  const updateCurrentPlayerHandler = (playerInput: Partial<Player> | null) => {
    if (!playerInput) {
      setCurrentPlayer(null);
      removeItem(CURRENT_PLAYER_KEY);
      return;
    }
    const updatedPlayer = {
      ...currentPlayer,
      ...playerInput,
    } as Player;

    setItem(updatedPlayer, CURRENT_PLAYER_KEY);

    if (joined) {
      onUpdatePlayer(updatedPlayer);
    }
    setCurrentPlayer(updatedPlayer);
  };

  useEffect(() => {
    const storedCurrentPlayer = getItem<Player>(CURRENT_PLAYER_KEY);
    if (storedCurrentPlayer) {
      setCurrentPlayer(storedCurrentPlayer);
    }
  }, [CURRENT_PLAYER_KEY]);

  useEffect(() => {
    onInit(room._id).then(() => {
      subscribeUpdateRoomConfig(setRoomConfig);
      subscribeUpdateBoardConfig(setBoardConfig);
      subscribeUpdateBoardStatus(setBoardStatus);
      subscribeUpdatePlayers(setPlayers);

      subscribePlayerJoined((data) => {
        //ToastMessage.joined(data);
        print.info("PLAYER JOINED", data);
      });

      subscribePlayerLeft((data) => {
        console.log("Player left from this room", data.name);
      });

      subscribePlayerDisconnected((player, reason) => {
        console.log("DISCONNECT", player, ":", reason);
      });

      subscribeSuccesses((data) => {
        console.log("SUCCESS", data);
      });

      subscribeInfos((data) => {
        console.log("INFO", data);
      });

      subscribeErrors((data) => {
        console.log("ERROR", data);
      });

      subscribeLocalDisconnection(() => {
        setConnected(false);
      });

      subscribeSuccessConnection(() => {
        setConnected(true);
      });
    });

    return () => {
      onDisconnect();
    };
  }, [room._id]);
  return (
    <RoomSocketContext.Provider
      value={{
        roomConfig,
        boardConfig,
        boardStatus,
        players,
        currentPlayer,
        connected,
        joined,
        joinCurrentRoom: joinCurrentRoomHandler,
        leaveCurrentRoom: leaveCurrentRoomHandler,
        updatePlayerVote: updatePlayerVoteHandler,
        updatePlayerReaction: updatePlayerReactionHandler,
        updateBoardStatus: updateBoardStatusHandler,
        updateCurrentPlayer: updateCurrentPlayerHandler,
      }}
    >
      {children}
    </RoomSocketContext.Provider>
  );
};
