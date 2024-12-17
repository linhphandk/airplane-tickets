import type { NextApiRequest, NextApiResponse } from "next";
import { register } from "@/app/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;
    await register(email, password);

    res.status(200).json({ success: true });
  } catch (_) {
      res.status(500).json({ error: "Something went wrong." });
  }
}
