import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ogRouter } from "./og";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
          message: "올바른 url을 입력해주세요.",
        });
      }

      if (!res) {
        return;
      }
      try {
        await ctx.db.link.create({
          data: {
            imagePath: res?.images?.[0]?.url,
            title: res.title,
            description: res.description,
            url: input.url,
            userId: user.id,
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "이미 등록된 링크입니다.",
            });
          }
        }
        throw e;
      }
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.link.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
