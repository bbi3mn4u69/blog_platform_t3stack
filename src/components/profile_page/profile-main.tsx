"use client";
import { useSession } from "next-auth/react";
import { MoreButton } from "../icon";
import { useState } from "react";
import { useProfilePageContext } from "./profile-page-context";
import IntroForm from "./intro-form";
import {Blog} from "./blog-list";
const ProfileMain = () => {
  const { data: session } = useSession();
  const { intro, setIntro } = useProfilePageContext();

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
        {/* intro  */}
        {change ? (
          <div className="mx-24">
           <Blog></Blog>
          </div>
        ) : (
          <div>
            {!intro ? (
              <div className="mx-24 flex flex-col items-center justify-center bg-gray-100">
                <div className="mb-5 mt-10 font-semibold">
                  tell the world about yourself
                </div>
                <div className="px-auto my-5 max-w-96 text-center text-sm text-slate-700">
                  Here’s where you can share more about yourself: your history,
                  work experience, accomplishments, interests, dreams, and more.
                  You can even add images and use rich text to personalize your
                  bio.
                </div>
                <button
                  onClick={onIntro}
                  className="my-5 mb-10 rounded-full border border-black px-5 py-2"
                >
                  get started
                </button>
              </div>
            ) : (
              <IntroForm />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileMain;
