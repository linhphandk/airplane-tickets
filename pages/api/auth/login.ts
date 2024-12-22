import type { NextApiRequest, NextApiResponse } from "next";
import { login } from "@/app/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = JSON.parse(req.body);
    const exits = (await login(email, password)) ?? false;
    if (exits) {
      res.status(200).json({ success: true });
    } else {
      res.status(422).json({ success: false });
    }
  } catch (_) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
