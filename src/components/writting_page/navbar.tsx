"use client";
import MediumLogo from "public/picture/Medium.png";
import Image from "next/image";
import DefaultUserImage from "public/picture/Default.webp";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { usePublishButtonContext } from "./publish-button-context";

const NavBar = () => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const { setSubmit, submit } = usePublishButtonContext();
  const userName = session?.user?.name;

  const handleSubmit = () => {
      startTransition(() => {
        setSubmit(true)
      })
  };

  return (
    <div className="mx-auto my-3 max-w-screen-lg">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-row items-center justify-center space-x-3">
          <Image
            src={MediumLogo}
            alt="Medium Logo"
            width={45}
            height={45}
          ></Image>
          <div className="text-sm font-light"> Draft in {userName}</div>
        </div>
        <div className="flex flex-row items-center space-x-3">
          {/* button */}
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded-full bg-green-500 px-3 py-1 text-sm font-light text-white"
          >
            Publish
          </button>

          {/* more */}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
          {/* notification */}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>
          {/* user image */}
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={session?.user?.image || DefaultUserImage}
              alt="user image"
              width={50}
              height={50}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
