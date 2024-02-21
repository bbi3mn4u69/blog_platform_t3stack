
import { Prisma } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";



export const getPost = createTRPCRouter({
    getPost: protectedProcedure.query(
        async({ctx}) => {
            const post = await ctx.db.post.findMany(
            )
            return post
        }
    )
})
