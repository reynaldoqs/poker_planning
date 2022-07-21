import type { NextApiRequest, NextApiResponse } from "next";

import { getRoom } from "~/models";

export default async function handler(
  { query: { id }, method }: NextApiRequest,
  res: NextApiResponse
) {
  console.log("EL ID DEL QUERY REQUEST DEL ROOM ES =>", id);
  if (method === "GET" && typeof id === "string") {
    const room = await getRoom(id);
    if (!room)
      return res
        .status(404)
        .json({ message: `room with id: ${id} not found.` });
    return res.status(200).json(room);
  }
  return res.status(400).json({ message: "method not implemented" });
}
