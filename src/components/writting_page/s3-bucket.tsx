

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { useSession } from "next-auth/react";
import crypto from "crypto";
// generate random file name
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
//  generate S3 client
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
// file validation
const acceptedTypes = [".jpeg", ".png", ".webp", ".gif"];
const maxFileType = 1024 * 1024 * 10; // 10mb
// getsigned url function
export async function getSignedURL(type: string, size: number) {
  const {data: session} = useSession()

  // error handling
  if (!session) {
    return { error: "not authenticated" };
  }
  if (acceptedTypes.includes(type)) {
    return { error: "Invalid file type" };
  }
  if (size > maxFileType) {
    return { error: "file too big" };
  }

  //get user ID
  const userID = session.user.id;
  // create new object to store in S3
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    Metadata: {
      UserId: userID!,
    },
  });
  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedURL } };
}
