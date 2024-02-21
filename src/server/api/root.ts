import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { uploadRouter } from "./routers/upload-aws";
import { getPost } from "./routers/get-post";
import { getDownloadLink } from "./routers/download-aws";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  uploadFile: uploadRouter,
  getPost: getPost,
  getDownloadLink: getDownloadLink
});

// export type definition of API
export type AppRouter = typeof appRouter;
