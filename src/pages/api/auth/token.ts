// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerAuthSession } from "@/server/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const d = await getServerAuthSession({ req, res });
  if (!d) {
    res.status(401).json(null);
    return;
  }
  res.status(200).json(d);
}
