import type { NextApiRequest, NextApiResponse } from "next";
import { register } from "@/app/auth";
import { DBError } from "@/app/db/UserDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = JSON.parse(req.body);
    const result = await register(email, password);
    if (result === DBError.DUPLICATE_KEY)
      res.status(422).json({ success: false, message: "DUPLICATE_KEY" });
  } catch (_) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
