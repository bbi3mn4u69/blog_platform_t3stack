"use client";

import { useRouter } from "next/navigation";

// interface

interface LoginButtonProps {
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const AuthButtonEmail = ({
    mode = "redirect",
    asChild,

  }: LoginButtonProps) => {
    // use router
    const router = useRouter();
    // redirect when login
    const onClick = () => {
      router.push("/auth/login");
    };
    if (mode === "modal") {
      return <span> TODO: implement modal</span>;
    }

  return (
    <button
      onClick={onClick}
      className="itmes-center relative m-2 flex w-full  justify-center rounded-full
      border border-black bg-white px-20 py-2 text-xl font-semibold text-black"
    >
      <span className=" items-center text-center text-lg font-light ">
        Sign in with Gmail
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute left-0 h-8 w-8 translate-x-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    </button>
  );
};

export default AuthButtonEmail;
