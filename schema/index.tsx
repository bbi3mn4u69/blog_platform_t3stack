import * as z from "zod";

// login schema
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

// register schema

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 ",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

// writting schema


export const WrittingSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
  paragraph: z.string().min(1, {
    message: "a paragraph is required",
  })
});


// intro schema
export const IntroSchema = z.object({
    content: z.string().min(1, {
      message: "Intro abit more about yourself"
    })
})