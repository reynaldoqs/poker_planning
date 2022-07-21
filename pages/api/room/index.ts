import type { NextApiRequest, NextApiResponse } from "next";

import { createRoom } from "~/models";
import dbConnect from "~/utils/dbConnect";

export default async function handler(
  { method, body }: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    if (method === "POST" && body) {
      const createdRoom = await createRoom(body);
      if (!createdRoom)
        return res
          .status(404)
          .json({ message: "something happened creating your room." });
      return res.status(201).json(createdRoom);
    }
  } catch (error) {
    if (typeof error === "string")
      return res.status(500).json({ message: error });

    return res.status(500).json(error);
  }
}
