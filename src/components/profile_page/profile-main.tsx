"use client";
import { useSession } from "next-auth/react";
import { MoreButton } from "../icon";
import { useState } from "react";
import { useProfilePageContext } from "./profile-page-context";
import IntroForm from "./intro-form";
import { Blog } from "./blog-list";
import Banner from "./banner";
import { api } from "~/utils/api";
const ProfileMain = () => {
  const { data: session } = useSession();
  const { intro, setIntro } = useProfilePageContext();

  const { isAbout, setIsAbout } = useProfilePageContext();
  const userIntro  = api.profile.isUserIntro
  const [change, setChange] = useState<boolean>(true);

  // username
  const username = session?.user?.name;

  const onIntro = () => {
    setIntro(true);
  };

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
                setChange(true);
              }}
              className=" focus:text-black "
            >
              <div>Home</div>
            </button>
            <button
              onClick={() => {
                setChange(false);
              }}
              className=" focus:text-black"
            >
              <div>About</div>
            </button>
          </div>
        </div>

        {/* home and about section */}
        {/* {isabout ? () : (<Blog></Blog>) } */}
      </div>
    </>
  );
};

export default ProfileMain;
