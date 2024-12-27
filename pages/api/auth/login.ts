import type { NextApiRequest, NextApiResponse } from "next";
import { login } from "@/app/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = JSON.parse(req.body);
    const userId = await login(email, password);
    if (userId !== null) {
      res
        .status(200)
        .json({ success: true, payload: { id: userId, email: email } });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (_) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
