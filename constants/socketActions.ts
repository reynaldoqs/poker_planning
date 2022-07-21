export const request = {
  createRoom: "create_room",
  joinRoom: "join_room",
  leaveRoom: "leave_room",
  updateRoomConfig: "update_room_config",
  updateBoardConfig: "update_board_config",
  updateBoardStatus: "update_board_status",
  updatePlayer: "update_player",
};

export const response = {
  updateRoomConfig: "update_room_config",
  updateBoardConfig: "update_board_config",
  updateBoardStatus: "update_board_status",
  updatePlayers: "update_players",
  playerJoined: "player_join",
  playerLeft: "player_leave",
  playerDisconnect: "player_disconnect",
  playerReconnect: "player_reconnect",
  //localPlayerUpdated: "local_player_updated",
};

export const system = {
  successConnection: "success_connection",
  success: "success",
  error: "error",
  info: "info",
  localDisconnection: "disconnect",
};
