"use client";

import { useFieldArray, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { WrittingSchema } from "schema";
import { Input } from "./input";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import React, { useEffect, useState } from "react";
import { usePublishButtonContext } from "./publish-button-context";
// TODO: getsignedURL trpc
import { useRouter } from "next/navigation";
// TODO: blog content handling
import { useSession } from "next-auth/react";
import { useFloatingActionContext } from "./floating-action-context";
// import { CiImageOn } from "react-icons/ci";
import { api } from "~/utils/api";


let titlePostResult: string
let contentPostResult: string

function readFile(file: File) {
  return new Promise((reslove, rejects) => {
    const fr = new FileReader()
    fr.onload = () => {
      reslove(fr.result)
    }
    fr.onerror = rejects
    fr.readAsBinaryString(file)
  })
}

export const Body = () => {
  const {data: session} = useSession()

  // create upload api
  const uploadFile = api.uploadFile.uploadFile.useMutation({
    onSuccess: () => {
      console.log("success")
      router.push("/(protected)/blog_reading_page")
      
    },
    onError: (e) => {
      console.error(e)
    }
  })
  // app router
  const router = useRouter();
  // submit the form
  const { submit, setSubmit } = usePublishButtonContext();
 
  //form control

  const writtingForm = useForm<z.infer<typeof WrittingSchema>>({
    resolver: zodResolver(WrittingSchema),
    defaultValues: {
      title: "",
      paragraph: "",
    },
  });

  // file handling
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };

   // submit values
   const onSubmit = async (values: z.infer<typeof WrittingSchema>) => {
    try { 
      if (file && session) {
        const author = session.user.name
        const authorImage = session.user.image
       const blob = await readFile(file) as Blob
       const base64data = btoa(String(blob))
       const fileData = { name: file.name, size: file.size, type: file.type }
        uploadFile.mutate( {file: base64data, metadata: fileData, title: values.title, paragraph: values.paragraph, author: author!, authorImage: authorImage!})
      }
    } catch (e) {
      console.error(e);
    }
  };

  // submit handleing and signedURL handling
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    writtingForm.handleSubmit(onSubmit)();
    e.preventDefault();
  };
  console.log(submit)
  //handle publish from different component
  useEffect(() => {
    const fetchData = async () => {
      if (submit === true) {
        console.log(submit)
        await submitForm({
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>);
        setSubmit(false);
  
      }
    };
    fetchData();
  }, [submit]);

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="rounded-lg border px-12">
        <Form {...writtingForm}>
          <form onSubmit={submitForm} className="space-y-6">
            <FormField
              control={writtingForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Title"
                      className="py-10 text-5xl"
                      type="text"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* paragraph */}
            <FormField
              control={writtingForm.control}
              name="paragraph"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Post a thing..."
                      type="text"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!fileUrl && (
              <FormField
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex cursor-pointer ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6 text-slate-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                        <title> attach media </title>
                        <Input
                          {...field}
                          placeholder="file"
                          type="file"
                          onChange={handleChange}
                          className="hidden"
                          accept=".jpeg, .png, .webp, .gif"
                          autoComplete="off"
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* image */}

            {fileUrl && file && (
              <div className="flex items-center justify-center ">
                <div className="relative h-auto w-auto overflow-hidden rounded-lg">
                  <Image
                    className="object-cover"
                    src={fileUrl}
                    alt={file.name}
                    width={500}
                    height={500}
                  ></Image>
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Body;
