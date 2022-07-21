import type { Player, Room } from "~/types";

export const isAuthorizedToManage = (room: Room, playerId: string) => {
  if (room.roomConfig.whoCanManage === "OWNER") {
    return playerId === room.roomConfig?.owner?.providerId;
  }
  if (room.roomConfig.whoCanManage === "ANYONE") {
    return Boolean(room.players.find((p) => p.playerId === playerId));
  }
  return false;
};

export const includesParticipant = (room: Room, player: Player) => {
  if (!room.players || !room.players.length || !player) return false;
  return !!room.players.find((p) => p.playerId === player.playerId);
};
