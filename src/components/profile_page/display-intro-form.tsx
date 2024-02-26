import Image from "next/image";
import { useProfilePageContext } from "./profile-page-context";

import { useEffect } from "react";
import { api } from "~/utils/api";

const DisplayIntroResult = () => {
  const introPicture = api.profile.downloadIntroImage.useQuery();
  const introContent = api.profile.downloadIntroContent.useQuery();
  console.log(introContent.data && introContent.data[0]?.userIntro);
  return (
    <>
      <div>
        <div className="flex flex-col">
          {introContent.data ? introContent.data[0]?.userIntro : null}
        </div>
        {introPicture.data?.link ? (
          <div>
            <Image
              src={introPicture.data?.link as string}
              alt="user intro picture"
              width={100}
              height={100}
            ></Image>
          </div>
        ) : null}
        <div>
          <button>
            edit
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayIntroResult;
