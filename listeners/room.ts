import type { Server, Socket } from "socket.io";
import print from "consola";

import type {
  BoardConfig,
  BoardStatus,
  Player,
  Room,
  RoomConfig,
  RoomSocket,
} from "~/types";
import {
  createRoom,
  getRoom,
  updatePlayerStatus,
  updateRoomConfig,
  pushPlayer,
  resetPlayers,
  removePlayer,
  updateBoardStatus,
  updateBoardConfig,
  updatePlayer,
} from "~/models";
import { response, system } from "~/constants";
import { includesParticipant, extractParticipant } from "~/utils";

export const onDisconnect =
  (io: Server, socket: RoomSocket) => async (reason: string) => {
    try {
      const activeRoomId = socket.activeRoom;
      const socketPlayer = socket.player;
      if (!activeRoomId || !socketPlayer) throw "playerId or roomId not found";

      const updatedRoom = await updatePlayerStatus(
        activeRoomId,
        socketPlayer.playerId,
        "DISCONNECTED"
      );

      if (!updatedRoom) throw "error updating player status";

      socket.broadcast
        .to(activeRoomId)
        .emit(response.playerDisconnect, socketPlayer, reason);

      return io
        .to(activeRoomId)
        .emit(response.updatePlayers, updatedRoom.players);
    } catch (error) {
      print.error(error);
      return socket.emit(system.error, error);
    }
  };

export const onCreateRoom =
  (socket: Socket) => async (room: Room, cb?: (room: Room) => void) => {
    try {
      const createdRoom = await createRoom(room);
      if (!createdRoom) throw "error in room creation";
      return cb?.(createdRoom);
    } catch (error) {
      print.error(error);
      return socket.emit(system.error, error);
    }
  };

export const onJoinRoom =
  (io: Server, socket: RoomSocket) =>
  async (roomId: string, player: Player, cb?: () => void) => {
    try {
      if (!player.playerId) throw "player id not found";

      let isReconnection = false;
      let room = await getRoom(roomId);
      if (!room) throw "room not found.";

      const hasOwner = room.roomConfig.owner?.providerId;
      if (!hasOwner) {
        await updateRoomConfig(
          roomId,
          {
            owner: {
              provider: player.provider,
              providerId: player.playerId,
            },
          },
          player.playerId
        );
      }
      // if there is a participant with id, its a rejoin
      if (!includesParticipant(room, player)) {
        room = await pushPlayer(roomId, player);
        if (!room) throw "insert participant failed.";
      } else {
        // reconnection
        room = await updatePlayerStatus(roomId, player.playerId, "CONNECTED");
        isReconnection = true;
        if (!room) throw "update participant status failed.";
      }

      const dbPlayer = extractParticipant(room, player.playerId);

      socket.join(roomId);
      socket.activeRoom = roomId;
      socket.player = player;

      if (isReconnection) {
        socket.broadcast
          .to(socket.activeRoom)
          .emit(response.playerReconnect, dbPlayer);
      } else {
        socket.broadcast
          .to(socket.activeRoom)
          .emit(response.playerJoined, dbPlayer);
      }

      cb?.();
      return io
        .to(socket.activeRoom)
        .emit(response.updatePlayers, room.players);
    } catch (error) {
      print.error(error);
      return socket.emit(system.error, error);
    }
  };

export const onLeaveRoom =
  (io: Server, socket: RoomSocket) => async (player: Player) => {
    try {
      if (!socket.activeRoom) throw "room not found";

      const updatedRoom = await removePlayer(socket.activeRoom, player);
      if (!updatedRoom) throw "error removing player.";

      socket.broadcast.to(socket.activeRoom).emit(response.playerLeft, player);

      io.to(socket.activeRoom).emit(
        response.updatePlayers,
        updatedRoom.players
      );
      socket.activeRoom = undefined;
      socket.player = undefined;
      return;
    } catch (error) {
      print.error(error);
      return socket.emit(system.error, error);
    }
  };

export const onUpdateRoomConfig =
  (io: Server, socket: RoomSocket) =>
  async (roomConfig: RoomConfig, player: Player) => {
    try {
      if (!socket.activeRoom) throw "room not found";

      const updatedRoom = await updateRoomConfig(
        socket.activeRoom,
        roomConfig,
        player.playerId
      );
      if (!updatedRoom) throw "error updating room configuration";

      return io
        .to(socket.activeRoom)
        .emit(response.updateRoomConfig, updatedRoom.roomConfig);
    } catch (error) {
      print.error(error);
      return socket.emit(system.error, error);
    }
  };

export const onUpdateBoardStatus =
  (io: Server, socket: RoomSocket) =>
  async (boardStatus: BoardStatus, player: Player) => {
    try {
      if (!socket.activeRoom) throw "activeRoom not found";
      // @TODO: find a way to skip getRoom func when board status is not PROGRESS
      let room = await getRoom(socket.activeRoom);
      if (!room) throw "room not found real room.";

      const isReset =
        room.boardStatus === "SHOW_RESULTS" && boardStatus === "VOTING";

      if (isReset) {
        room = await resetPlayers(socket.activeRoom);
      }

      const updatedRoom = await updateBoardStatus(
        socket.activeRoom,
        boardStatus,
        player.playerId
      );

      if (!updatedRoom) throw "error updating board status.";

      if (isReset) {
        io.to(socket.activeRoom).emit(
          response.updatePlayers,
          updatedRoom.players
        );
      }

      return io
        .to(socket.activeRoom)
        .emit(response.updateBoardStatus, updatedRoom.boardStatus);
    } catch (error) {
      print.error(error);
      return socket.emit(system.error, error);
    }
  };

export const onUpdateBoardConfig =
  (io: Server, socket: RoomSocket) =>
  async (boardConfig: BoardConfig, player: Player) => {
    try {
      if (!socket.activeRoom) throw "room not found";

      const updatedRoom = await updateBoardConfig(
        socket.activeRoom,
        boardConfig,
        player.playerId
      );
      if (!updatedRoom) throw "error updating board configuration";

      return io
        .to(socket.activeRoom)
        .emit(response.updateBoardConfig, updatedRoom.boardConfig);
    } catch (error) {
      print.error(error);
      return socket.emit(system.error, error);
    }
  };

export const onUpdatePlayer =
  (io: Server, socket: RoomSocket) => async (player: Player) => {
    try {
      if (!socket.activeRoom) throw "room not found";

      const updatedRoom = await updatePlayer(socket.activeRoom, player);
      if (!updatedRoom) throw "error updating player";

      return io
        .to(socket.activeRoom)
        .emit(response.updatePlayers, updatedRoom.players);
    } catch (error) {
      print.error(error);
      return socket.emit(system.error, error);
    }
  };
