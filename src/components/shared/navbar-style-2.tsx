
import MediumLogo from "public/picture/Medium.png";
import Image from "next/image";
import DefaultUserImage from "public/picture/Default.webp";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const BlogNav = () => {
  const { data: session } = useSession();
  const userImage = session?.user.image
  // drop down menu to sign out
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className=" mx-auto flex max-w-screen-2xl flex-row justify-between">
        <div className="order-last my-2 flex flex-row items-center justify-between">
          {/* right component */}

          <div className="order-last flex h-10 w-10 items-center overflow-hidden">
            <button onClick={handleToggleDropdown}>
              <Image
                src={userImage || DefaultUserImage}
                height={30}
                width={30}
                alt="medium logo"
                className="h-full w-full rounded-full object-cover"
              ></Image>
            </button>
          </div>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 rounded-md bg-white p-2 shadow-lg">
              <a
                href="#"
                className="block px-2 py-1 text-gray-700 hover:bg-gray-100"
                onClick={() => signOut()}
              >
                Sign Out
              </a>
              {/* Add more options if needed */}
            </div>
          )}
          {/* write section */}
          <Link href="/(protected)/writting_page">
            <button className="flex flex-row items-center justify-between px-4">
              <div className="font-arial order-last px-1 font-light text-gray-400">
                Write
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="h-7 w-7 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </Link>

          {/* notification section */}
          <div className="flex items-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-7 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </div>
        </div>
        {/* left componen */}
        <div className="flex flex-row items-center justify-between ">
          {/* input */}
          <div className="order-last px-4">
            <form action="">
              <label htmlFor="blog-search"></label>
              <div className="relative">
                <div className="pointer-events-auto absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg
                    className="h-4 w-4 text-black "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  type="search"
                  id="search"
                  className="my-2 block w-full rounded-full bg-slate-100 px-4 py-2 ps-10 text-sm"
                />
              </div>
            </form>
          </div>
          {/* picture */}
          <Image
            src={MediumLogo}
            height={50}
            width={50}
            alt="medium logo"
          ></Image>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default BlogNav;
