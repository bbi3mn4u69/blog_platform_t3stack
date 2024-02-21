import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import { FormError } from "./form-error";

import { FormSuccess } from "./form-success";
import Link from "next/link";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // handle submit

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      // Login(values).then((data) => {
      //   setError(data.error);
      //   setSuccess(data.success);
      // });
      
    });
  };

  return (
    <div className="">
      <div className="mx-auto max-w-screen-sm ">
        <div className="my-auto flex h-full min-h-screen flex-col justify-center">
          <div className="flex justify-center py-10 text-center text-3xl">
            Welcome back
          </div>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-5">
                  {/* user enter email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter your email address"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* user enter password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter your password"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error}></FormError>
                <FormSuccess message={success}></FormSuccess>
                <div className="flex w-full justify-center">
                  <Button
                    disabled={isPending}
                    type="submit"
                    size="lg"
                    color="default"
                  >
                    Login
                  </Button>
                </div>
                <Link href={"/auth/register"}>
                  <button
                    className="my-9 flex w-full justify-center text-gray-500 underline"
                  >
                    Don't have an account yet?
                  </button>
                </Link>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
