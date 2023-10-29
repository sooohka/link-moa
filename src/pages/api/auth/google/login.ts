// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { oauth2Client } from "@/server/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes.join(' '),
  });
  res.status(301).redirect(url);
}
