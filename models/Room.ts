import DBRoom from "./Room.Schema";
import type {
  BoardConfig,
  BoardStatus,
  Player,
  Room,
  RoomConfig,
} from "~/types";
import { isAuthorizedToManage } from "~/utils";

export const createRoom = (room: Room) => {
  const nRoom = new DBRoom(room);
  return nRoom.save();
};

export const getRoom = (roomId: string) => {
  return DBRoom.findById(roomId);
};

export const updatePlayer = (roomId: string, player: Player) => {
  return DBRoom.findOneAndUpdate(
    {
      _id: roomId,
      "players.playerId": player.playerId,
    },
    {
      $set: {
        "players.$.reaction": player.reaction,
        "players.$.avatar": player.avatar,
        "players.$.cardBackground": player.cardBackground,
        "players.$.name": player.name,
        "players.$.status": player.status,
        "players.$.type": player.type,
        "players.$.voteValue": player.voteValue,
      },
    },
    { new: true }
  );
};

export const updatePlayerStatus = (
  roomId: string,
  playerId: string,
  status: Room["players"][number]["status"]
) => {
  return DBRoom.findOneAndUpdate(
    {
      _id: roomId,
      "players.playerId": playerId,
    },
    {
      $set: {
        "players.$.status": status,
      },
    },
    { new: true }
  );
};

export const pushPlayer = (roomId: string, player: Player) => {
  return DBRoom.findByIdAndUpdate(
    roomId,
    {
      $push: { players: player },
    },
    { new: true }
  );
};

export const removePlayer = (roomId: string, player: Player) => {
  return DBRoom.findByIdAndUpdate(
    roomId,
    {
      $pullAll: { playerID: player.playerId }, // or $pop
    },
    { new: true }
  );
};

export const resetPlayers = (roomId: string) => {
  return DBRoom.findByIdAndUpdate(
    {
      _id: roomId,
    },
    {
      $set: {
        [`players.$[outer].voteValue`]: "",
        [`players.$[outer].reaction`]: "",
      },
    },
    { arrayFilters: [{ "outer.type": "PLAYER" }] }
  );
};

export const updateBoardStatus = async (
  roomId: string,
  status: BoardStatus,
  playerId: string
) => {
  const room = await DBRoom.findById(roomId);
  if (!room) return;

  const isPlayerAuthorized = await isAuthorizedToManage(room, playerId);
  if (!isPlayerAuthorized) return;
  room.boardStatus = status;
  return room.save();
};

export const updateRoomConfig = async (
  roomId: string,
  config: Partial<RoomConfig>,
  playerId: string
) => {
  const configToUpdate = {
    ...(config.authentication && {
      "roomConfig.authentication": config.authentication,
    }),
    ...(config.issues && {
      "roomConfig.issues": config.issues,
    }),
    ...(config.owner && {
      "roomConfig.owner": config.owner,
    }),
    ...(config.title && {
      "roomConfig.title": config.title,
    }),
    ...(config.whoCanManage && {
      "roomConfig.whoCanManage": config.whoCanManage,
    }),
    ...(config.withTimer && {
      "roomConfig.withTimer": config.withTimer,
    }),
  };

  return DBRoom.findOneAndUpdate(
    { _id: roomId },
    { $set: configToUpdate },
    { new: true }
  );
};

export const updateBoardConfig = async (
  roomId: string,
  config: Partial<BoardConfig>,
  playerId: string
) => {
  const room = await DBRoom.findById(roomId);
  if (!room) return;
  const updatedConfig = { ...room.boardConfig, ...config };
  room.boardConfig = updatedConfig;
  return room.save();
};
