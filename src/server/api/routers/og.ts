import ogs from "open-graph-scraper";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const getOg = async (url: string) => {
  const { result } = await ogs({ url });
  return {
    title: result.ogTitle!,
    images: result.ogImage,
    url: result.ogUrl!,
    description: result.ogDescription,
  };
};

export const ogRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      try {
        return getOg(input.url);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid url",
        });
      }
    }),
});
