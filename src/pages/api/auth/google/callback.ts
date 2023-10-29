// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { oauth2Client } from "@/server/auth";
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { db } from "@/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const code = req.query.code;
  if (typeof code !== "string") {
    res.status(400).json({ error: "Missing code" });
    return;
  }
  const { tokens } = await oauth2Client.getToken(code);

  //TODO:store refresh token
  oauth2Client.setCredentials(tokens);

  const { data } = await google
    .oauth2("v2")
    .userinfo.get({ auth: oauth2Client });

  try {
    const user = await db.user.findUnique({
      where: { email: data.email!, google: { id: data.id! } },
    });
    //유저 정보 있음
    if (user) {
      await db.user.update({
        where: { email: data.email!, google: { id: data.id! } },
        data: {
          google: {
            update: {
              accessToken: tokens.access_token!,
              refreshToken: tokens.refresh_token,
            },
          },
        },
      });
    } else {
      await db.user.create({
        data: {
          email: data.email,
          google: {
            create: {
              id: data.id!,
              accessToken: tokens.access_token!,
              refreshToken: tokens.refresh_token,
            },
          },
          image: data.picture,
          name: data.name,
          id: data.id!,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
  setCookie("lmat", tokens.access_token, {
    req,
    res,
    maxAge: tokens.expiry_date ?? undefined,
  });
  res.status(301).redirect("/");
}
