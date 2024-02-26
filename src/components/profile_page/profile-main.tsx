import { useSession } from "next-auth/react";
import { MoreButton } from "../icon";
import { useState } from "react";
import { useProfilePageContext } from "./profile-page-context";
import { Blog } from "./blog-list";
import AboutTag from "./about-tag";
const ProfileMain = () => {
  const { data: session } = useSession();

  const { isAbout, setIsAbout } = useProfilePageContext();

  // username
  const username = session?.user?.name;

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="mx-24 mb-20 mt-20 flex max-w-screen-sm flex-row items-center justify-between">
          {/* Name */}
          <div className="text-4xl font-semibold">{username}</div>
          {/* more button */}
          <button>
            <MoreButton></MoreButton>
          </button>
        </div>

        <div className="mx-24 mb-10 flex flex-col">
          <div className="flex flex-row space-x-12 border-b pb-5 text-slate-500">
            <button
              onClick={() => {
                setIsAbout(false);
              }}
              className=" focus:text-black "
            >
              <div>Home</div>
            </button>
            <button
              onClick={() => {
                setIsAbout(true);
              }}
              className=" focus:text-black"
            >
              <div>About</div>
            </button>
          </div>
        </div>

        {/* home and about section */}
        {isAbout ? <AboutTag></AboutTag> : <Blog></Blog>}
      </div>
    </>
  );
};

export default ProfileMain;
