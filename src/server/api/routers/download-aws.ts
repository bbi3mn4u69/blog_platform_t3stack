import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {z} from "zod"
// set AWS credential to stream the content

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


//   download object
async function createPresignedUrl(
    bucketName: string,
    key: string,
) {
    const expiryMinutes = 15;
    const input = {
        Bucket: bucketName,
        Key: key,
    }
    const command = new GetObjectCommand(input)
    return await getSignedUrl (s3Client, command, {
        expiresIn: 60 * expiryMinutes,
    })
}
export const getDownloadLink = createTRPCRouter({
    downloadFile: protectedProcedure
        .input(
            z.object({
                key: z.string()
            })
        )
        .mutation(async({input}) => {
            if (input.key !== null) {
                const url = await createPresignedUrl(
                    bucketName!,
                    input.key
                )
                return {
                    link: url
                }
            }
        })
})