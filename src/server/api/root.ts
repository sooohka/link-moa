import { createTRPCRouter } from "@/server/api/trpc";
import { ogRouter } from "./routers/og";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  og: ogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
