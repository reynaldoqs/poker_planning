import { Server, ServerOptions } from "Socket.IO";
import type { NextApiRequest, NextApiResponse } from "next";
import print from "consola";

import { RoomSocket } from "~/types";
import { request, system } from "~/constants";
import {
  onCreateRoom,
  onDisconnect,
  onJoinRoom,
  onLeaveRoom,
  onUpdateBoardConfig,
  onUpdateBoardStatus,
  onUpdatePlayer,
  onUpdateRoomConfig,
} from "~/listeners";
import dbConnect from "~/utils/dbConnect";

const SocketHandler = async (
  _: NextApiRequest,
  res: NextApiResponse & {
    socket: {
      server: ServerOptions & { io: Server };
    };
  }
) => {
  await dbConnect();
  if (res.socket.server.io) {
    print.info("Socket is already running");
  } else {
    print.info("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const onConnection = (socket: RoomSocket) => {
      const connectionMsg = `${socket.id} connected...`;
      print.info(connectionMsg);
      socket.emit(system.successConnection, connectionMsg);

      socket.on(request.createRoom, onCreateRoom(socket));
      socket.on(request.joinRoom, onJoinRoom(io, socket));
      socket.on(request.leaveRoom, onLeaveRoom(io, socket));

      socket.on(request.updateRoomConfig, onUpdateRoomConfig(io, socket));
      socket.on(request.updateBoardConfig, onUpdateBoardConfig(io, socket));
      socket.on(request.updateBoardStatus, onUpdateBoardStatus(io, socket));
      socket.on(request.updatePlayer, onUpdatePlayer(io, socket));

      socket.on("disconnect", onDisconnect(io, socket));
    };

    io.on("connection", onConnection);
  }
  res.end();
};

export default SocketHandler;
