"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
// TODO: TRPC for pofile Intro result 
import { useProfilePageContext } from "./profile-page-context";

import { useEffect } from "react";

const DisplayIntroResult = () => {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const userIntroContent = true;
  let USER_INTRO_RESULT: string | null | undefined;
  let USER_INTRO_PIC_RESULT: string | null | undefined;

  return (
    <>
      <div>
        <div className="flex flex-col">{USER_INTRO_RESULT}</div>
        {USER_INTRO_PIC_RESULT ? (
          <div>
            <Image
              src={USER_INTRO_PIC_RESULT}
              alt="user intro picture"
              width={40}
              height={40}
            ></Image>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DisplayIntroResult;
