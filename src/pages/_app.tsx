import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import OverlayProvider from "@/providers/OverlayProvider";
import "@/styles/global.css";
import { api } from "@/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <OverlayProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </OverlayProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
