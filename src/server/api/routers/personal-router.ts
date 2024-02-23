import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { IntroSchema } from "schema";

// set AWS credential for user intro

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_INTRO_KEY;
const secretAccessKey = process.env.AWS_SECRET_INTRO_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_INTRO_NAME;

//create s3 client

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
  
  export const profileRouter = createTRPCRouter({

        uploadIntroImage: protectedProcedure
            .input(
              z.object({
                content: z.string(),
                file: z.string(),
                metadata: z.object({
                    name: z.string(),
                    size: z.number(),
                    type: z.string()
                })
            }))
            .mutation(async ({ ctx, input}) => {
                const data = Buffer.from(input.file, "base64")
                const key = ctx.session.user.id + "/" + input.metadata.name
                await uploadObject(bucketName!, key, data, input.metadata.type);
                await ctx.db.intro.create({
                    data: {
                        userId: ctx.session.user.id,
                        userIntro: input.content,
                        introPicture: key
                    }
                })
            }),
        downloadIntroImage: protectedProcedure
            .query(async({ctx}) => {
                const key  = await ctx.db.intro.findMany({
                    select: {
                        introPicture: true
                    }
                })
                if (key.length > 0) {
                    const url = await createPresignedUrl(bucketName!, key[0]?.introPicture!)
                    return {
                        link: url
                    }
                }
                
                
            })
  })
