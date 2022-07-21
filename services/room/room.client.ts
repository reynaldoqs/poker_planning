import { useState } from "react";

import { DocumentRoom, RecursivePartial, Room, RoomSchema } from "~/types";
import { recursiveUpdateObject } from "~/utils";

import { cruder } from "../services.helper";

const rooms = cruder("/api")("room");

export const createRoom = (room: Room): Promise<DocumentRoom> =>
  rooms.create<Room, DocumentRoom>(room);

export const readRoom = (roomId: string) => rooms.read<Room>(roomId);

export const useCreateRoom = (initial: Room) => {
  const [room, setRoom] = useState<Room>(initial);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const mutate = async () => {
    try {
      setLoading(true);
      const parsedRoom = RoomSchema.parse(room);
      const response = await createRoom(parsedRoom);
      console.log("EL ROOM RESPONSE ES", response);
      return { roomId: response._id.toString(), room: response };
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRoom = (inputRoom: RecursivePartial<Room>) => {
    const updatedRoom = recursiveUpdateObject<Room>(room, inputRoom);
    setError(null);
    setRoom(updatedRoom);
  };

  return { mutate, updateRoom, isLoading, room, error };
};
