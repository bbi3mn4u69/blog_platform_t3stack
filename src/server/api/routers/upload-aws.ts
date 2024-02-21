import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createTRPCRouter, protectedProcedure } from "../trpc";
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
  await s3Client
    .send(uploadCommand)
    .then((data) => {
      console.log("File uploaded successfully");
      console.log(data);
    })
    .catch((err) => {
      console.error("Error uploading file:", err);
    });
}

export const uploadRouter = createTRPCRouter({
  uploadFile: protectedProcedure
    .input(
      z.object({
        file: z.string(),
        metadata: z.object({
          name: z.string(),
          size: z.number(),
          type: z.string(),
        }),
      }),
    )
    .input(WrittingSchema)
    .input(z.object({
      author: z.string(),
      authorImage: z.string()
    }))
    .mutation(async ({ ctx, input }) => {

      const data = Buffer.from(input.file, "base64");
      const key = ctx.session.user.id + "/" + input.metadata.name;
      await uploadObject(
        bucketName!, 
        key, 
        data, 
        input.metadata.type
        );
        if (input.file ) {
          await ctx.db.post.create({
            data: {
              authorImage: input.authorImage,
              author: input.author,
              title: input.title,
              postContent: input.paragraph,
              key: key,
              createdById: ctx.session.user.id,
            }
          })
        }else {
          await ctx.db.post.create({
            data: {
              authorImage: input.authorImage,
              author: input.author,
              title:  input.title,
              postContent: input.paragraph,
              createdById: ctx.session.user.id,
            },
          });
        }
    }),
});
