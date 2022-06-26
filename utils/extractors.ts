import type { Room } from "~/types";

export const extractParticipant = (room: Room, playerId: string) => {
  return room.players.find((p) => p.playerId === playerId);
};
