// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { oauth2Client } from "@/server/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await oauth2Client.revokeToken(req.cookies["lmat"] ?? "");
  res.setHeader("Set-Cookie", [
    `lmat=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  ]);

  res.status(301).redirect("/");
}
