import { io, Socket } from "socket.io-client";
import print from "consola";

import { BoardConfig, BoardStatus, Player, RoomConfig } from "types";
import { request, response, system } from "~/constants/socketActions";

let socket: Socket;

export const onInit = async (roomId: string) => {
  if (!roomId) return;
  await fetch("/api/socket");
  socket = io();
  console.log(`Connecting to socket from here...`);
};

export const onDisconnect = () => {
  console.log("disconnecting socket...");
  if (socket) socket.disconnect();
};

export const onJoinRoom = (roomId: string, player: Player, cb?: () => void) => {
  console.log("HACEMOS JOIN DE AQUI");
  if (!roomId || !player.playerId || !socket) return;
  console.log(`[${player.name}] joining room...`);
  socket.emit(request.joinRoom, roomId, player, cb);
};

export const onLeaveRoom = (player: Player) => {
  if (!player.playerId || !socket) return;
  console.log(`[${player.name}] leaving room...`);
  socket.emit(request.leaveRoom, player);
};

export const onUpdateRoomConfig = (roomConfig: RoomConfig, player: Player) => {
  if (!roomConfig || !player.playerId || !socket) return;
  console.log(`[${player.name}] is updating room configuration...`);
  socket.emit(request.updateRoomConfig, roomConfig, player);
};

export const onUpdateBoardStatus = (
  boardStatus: BoardStatus,
  player: Player
) => {
  if (!boardStatus || !player.playerId || !socket) return;
  console.log(`[${player.name}] is updating board status...`);
  socket.emit(request.updateBoardStatus, boardStatus, player);
};

export const onUpdateBoardConfig = (
  boardConfig: BoardConfig,
  player: Player
) => {
  if (!boardConfig || !player.playerId || !socket) return;
  console.log(`[${player.name}] is updating board config...`);
  socket.emit(request.updateBoardConfig, boardConfig, player);
};

export const onUpdatePlayer = (player: Player) => {
  if (!player.playerId || !socket) return;
  console.log(`[${player.name}] is updating...`);
  socket.emit(request.updatePlayer, player);
};

// SUBSCRIPTIONS
export const subscribeUpdateRoomConfig = (cb: (data: RoomConfig) => void) => {
  if (!socket) return;
  socket.on(response.updateRoomConfig, cb);
};

export const subscribeUpdateBoardConfig = (cb: (data: BoardConfig) => void) => {
  if (!socket) return;
  socket.on(response.updateBoardConfig, cb);
};

export const subscribeUpdateBoardStatus = (cb: (data: BoardStatus) => void) => {
  if (!socket) return;
  socket.on(response.updateBoardStatus, cb);
};

export const subscribeUpdatePlayers = (cb: (data: Player[]) => void) => {
  if (!socket) return;
  socket.on(response.updatePlayers, cb);
};

export const subscribePlayerJoined = (cb: (data: Player) => void) => {
  if (!socket) return;
  socket.on(response.playerJoined, cb);
};

export const subscribePlayerLeft = (cb: (data: Player) => void) => {
  if (!socket) return;
  socket.on(response.playerLeft, cb);
};

export const subscribePlayerDisconnected = (
  cb: (data: Player, reason: string) => void
) => {
  if (!socket) return;
  socket.on(response.playerDisconnect, cb);
};

// export const subscribeLocalPlayerUpdate = (cb: (data: Player) => void) => {
//   if (!socket) return;
//   socket.on(response.localPlayerUpdated, cb);
// };

// system subscriptions

export const subscribeSuccesses = (cb?: (res: unknown) => void) => {
  if (!socket) return;

  socket.on(system.success, (res: unknown) => {
    console.log("[SUCCESS] => ", { res });
  });
};

export const subscribeErrors = (cb?: (res: unknown) => void) => {
  if (!socket) return;
  socket.on(system.error, (res: unknown) => {
    console.log("[ERROR] => ", { res });
  });
};

export const subscribeInfos = (cb?: (res: unknown) => void) => {
  if (!socket) return;
  socket.on(system.info, (res: unknown) => {
    console.log("[INFO] => ", { res });
  });
};

export const subscribeLocalDisconnection = (cb?: (res: unknown) => void) => {
  if (!socket) return;
  socket.on(system.localDisconnection, (res: unknown) => {
    console.log("[LOCAL DISCONNECTION] => ", { res });
    cb?.(res);
  });
};

export const subscribeSuccessConnection = (cb?: (res: unknown) => void) => {
  if (!socket) return;
  socket.on(system.successConnection, (res: unknown) => {
    cb?.(res);
  });
};
