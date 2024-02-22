import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { WrittingSchema } from "schema";

// set AWS credential blog bucket

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

// create s3 client

const s3Client = new S3Client({
  region: region!,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});

// upload object function

async function uploadObject(
  bucketName: string,
  key: string,
  fileStream: Buffer,
  type: string,
) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ContentType: type,
  };
  // upload to s3
  const uploadCommand = new PutObjectCommand(params);
  try {
    await s3Client.send(uploadCommand);
  } catch (e) {
    console.error(e);
  }
}

//   download object
async function createPresignedUrl(bucketName: string, key: string) {
  const expiryMinutes = 15;
  const input = {
    Bucket: bucketName,
    Key: key,
  };
  const command = new GetObjectCommand(input);
  return await getSignedUrl(s3Client, command, {
    expiresIn: 60 * expiryMinutes,
  });
}

export const postRouter = createTRPCRouter({
// upload file to s3 bucket 
  uploadFile: protectedProcedure
    .input(
      z.object({
        author: z.string(),
        authorImage: z.string(),
        file: z.string(),
        metadata: z.object({
          name: z.string(),
          size: z.number(),
          type: z.string(),
        }),
      }),
    )
    .input(WrittingSchema)
    .mutation(async ({ ctx, input }) => {
      const data = Buffer.from(input.file, "base64");
      const key = ctx.session.user.id + "/" + input.metadata.name;
      await uploadObject(bucketName!, key, data, input.metadata.type);
      if (input.file) {
        await ctx.db.post.create({
          data: {
            authorImage: input.authorImage,
            author: input.author,
            title: input.title,
            postContent: input.paragraph,
            key: key,
            createdById: ctx.session.user.id,
          },
        });
      }
    }),

    // get signed url
  downloadFile: protectedProcedure
    .input(
      z.object({
        key: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      if (input.key !== null) {
        const url = await createPresignedUrl(bucketName!, input.key);
        return {
          link: url,
        };
      }
    }),

    // get post
    getPost: protectedProcedure.query(
      async({ctx}) => {
          const post = await ctx.db.post.findMany(
          )
          return post
      }
  ),
});
