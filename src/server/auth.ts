import { type GetServerSidePropsContext } from "next";

import { db } from "@/server/db";

import { google } from "googleapis";

import { env } from "@/env.mjs";

export const oauth2Client = new google.auth.OAuth2({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: env.GOOGLE_REDIRECT_URL,
});

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // console.log(getCookie("lmat", { req: ctx.req, res: ctx.res }));
  const access_token = ctx.req.cookies["lmat"];
  if (!access_token) {
    return null;
  }
  let google_id;
  let email;
  try {
    const { data } = await google.oauth2("v2").tokeninfo({ access_token });
    email = data.email!;
    google_id = data.user_id!;
  } catch (e) {
    //@ts-ignore
    console.error(e.response.data);
    try {
      const google = await db.google.findFirst({
        where: { accessToken: access_token },
      });
      if (!google) {
        console.error("can not find google token");
        return;
      }
      oauth2Client.setCredentials({
        access_token: google.accessToken,
        refresh_token: google.refreshToken,
      });
      const res = await oauth2Client.refreshAccessToken();
      console.log({ res });
      await db.google.update({
        where: { id: google.id! },
        data: {
          accessToken: res.credentials.access_token!,
          refreshToken: res.credentials.refresh_token,
        },
      });
    } catch (e) {
      //@ts-ignore
      console.error(e.response.data);
    }
    return null;
  }

  try {
    const user = await db.user.findUnique({ where: { email, id: google_id } });
    if (!user || !user.email || !user.id || !user.name) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      image: user.image,
      name: user.name,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
