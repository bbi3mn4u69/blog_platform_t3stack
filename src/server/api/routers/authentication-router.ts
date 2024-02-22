import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { LoginSchema, RegisterSchema } from "schema";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";


export const authenticationRouter = createTRPCRouter({

  registerAuth: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // check for user if exist ?
        const user = await ctx.db.user.findUnique({
          where: {
            email: input.email,
          },
        });
        if (user) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "user exits already",
          });
        }

        // hash password
        const hashPassword = await bcrypt.hash(input.password, 10)
        // create new user
        await ctx.db.user.create({
          data: {
            email: input.email,
            password: hashPassword,
          },
        });

      } catch (e) {
        console.log(e);
      }
    }),




    loginAuth: publicProcedure
    .input(LoginSchema)
    .mutation(async({ctx, input}) => {
        
    })
});
