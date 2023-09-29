import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ogRouter } from "./og";

export const linksRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;

    const findAll = ctx.db.link.findMany({
      where: {
        userId: user.id,
      },
    });
    return findAll;
  }),
  create: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      let res;
      try {
        const s = ogRouter.createCaller(ctx);
        res = await s.get(input);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid url",
        });
      }

      if (!res) {
        return;
      }
      await ctx.db.link.create({
        data: {
          imagePath: res?.images?.[0]?.url,
          title: res.title,
          description: res.description,
          url: input.url,
          userId: user.id,
        },
      });
    }),
});
