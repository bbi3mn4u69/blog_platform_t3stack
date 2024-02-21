"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Medium from "public/picture/Medium.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const onClick = () => {
    if (!session?.user) {
      router.push("/");
    } else {
      router.push("/(protected)/blog_reading_page");
    }
  };

  return (
    <div className="sticky top-0 z-40">
      <nav className="border-gray-200 bg-amber-400 ">
        <div className=" mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-5">
          <a href="#" className="flex items-center space-x-3 ">
            <Image
              src={Medium}
              alt="medium logo"
              width={40}
              height={40}
            ></Image>
            <span className="font-herofont self-center whitespace-nowrap text-3xl font-semibold text-black">
              Medium
            </span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col bg-amber-400 p-4 font-medium md:mt-0 md:flex-row md:space-x-8  md:border-0 md:p-0">
              <li>
                <a
                  href="#"
                  className="block bg-amber-400 px-3 py-2 font-light text-black md:p-0  "
                  aria-current="page"
                >
                  Our story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 font-light text-gray-900 md:border-0 md:p-0"
                >
                  Membership
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 font-light text-gray-900 md:border-0 md:p-0"
                >
                  Write
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 font-light text-gray-900 md:border-0 md:p-0"
                >
                  Sign in
                </a>
              </li>
              <li>
                <div className="block px-3 py-2 font-light text-gray-900 md:border-0 md:p-0">
                  <button
                    className="items-center justify-center rounded-full bg-black px-5 py-1 text-center 
                       text-base font-light text-white"
                    onClick={onClick}
                  >
                    Getting started
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr className="w-full border-black" />
    </div>
  );
};
export default NavBar;
