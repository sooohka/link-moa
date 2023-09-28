import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";
import "@/styles/global.css";
import OverlayProvider from "@/providers/OverlayProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <OverlayProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </OverlayProvider>
  );
};

export default api.withTRPC(MyApp);
