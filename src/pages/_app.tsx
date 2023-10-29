import { type AppType } from "next/app";

import { AuthContextProvider } from "@/context/auth";
import OverlayProvider from "@/providers/OverlayProvider";
import "@/styles/global.css";
import { api } from "@/utils/api";
import { UserSession } from "@/types/auth";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const user = pageProps.user as UserSession;
  return (
    <AuthContextProvider user={user}>
      <OverlayProvider>
        <Component {...pageProps} />
      </OverlayProvider>
    </AuthContextProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  if (typeof window !== "undefined") {
    return ctx;
  }
  const res = await fetch("http://localhost:3000/api/auth/token", {
    method: "GET",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    headers: { "Content-Type": "application/json",cookie:ctx.req.headers.cookie },
  });
  const data = await res.json();
  return { ...ctx, pageProps: { user: data } };
};

export default api.withTRPC(MyApp);
