

import { PictureButton } from "../icon/index";
import { useEffect, useState } from "react";
// 
import { useProfilePageContext } from "./profile-page-context";
import Image from "next/image";
import { useSession } from "next-auth/react";
import DisplayIntroResult from "./display-intro-form";
import { api } from "~/utils/api";


// read file function

function readFile(file: File) {
  return new Promise((reslove, rejects) => {
    const fr = new FileReader()
    fr.onload = () => {
      reslove(fr.result)
    }
    fr.onerror = rejects
    fr.readAsBinaryString(file)
  })
}


const IntroForm = () => {
  const { data: session } = useSession();
  const resultUserId = session?.user.id;

  const [introContent, setIntroContent] = useState<string>("");
  const { userIntroContent, setUserIntroContent, setIsAbout } =
    useProfilePageContext();

  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);

  // create upload api
  const uploadIntro = api.profile.uploadIntroImage.useMutation({
    onSuccess: () => {
      console.log("success")
    },
    onError: (e) => {
      console.error(e)
    }
  })
  // file handling
  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };
  //   submit intro form
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(file && session) {
        const blob = await readFile(file) as Blob
        const base64data = btoa(String(blob))
        const fileData = { name: file.name, size: file.size, type: file.type }
        uploadIntro.mutate({file: base64data, metadata: fileData, content: introContent})
      }
    } catch(e) {
      console.log(e)
    }
  };

  // handle on cancle
  const onCancle = () => {
    setIsAbout(false);
  };
  return (
    <div className="mx-24">
      <div className="mb-8">
        {/* insert photo button */}
        <form action="" onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                className="mb-10 w-full font-news text-xl focus:outline-none"
                placeholder="Intro something about yourself"
                onChange={(e) => {
                  setIntroContent(e.target.value);
                }}
              />
            </div>
            {fileUrl && file && (
              <div className="mb-10">
                <div className="flex items-center justify-center ">
                  <div className="relative h-auto w-auto overflow-hidden rounded-lg">
                    <Image
                      className="object-cover"
                      src={fileUrl}
                      alt={file.name}
                      width={500}
                      height={500}
                    ></Image>
                  </div>
                </div>
              </div>
            )}
            {!userIntroContent ? (
              // input, insert photo, cancle and save button when no user intro content
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-2">
                  <label className="cursor-pointer rounded-full border border-green-700 p-2">
                    <PictureButton></PictureButton>
                    <input
                      onChange={fileChange}
                      type="file"
                      className="hidden"
                      accept=".jpeg, .png, .webp, .gif"
                    />
                  </label>
                  <div className="text-sm text-green-700">Insert photo</div>
                </div>
                <div className=" flex flex-row items-center space-x-3">
                  <button
                    onClick={onCancle}
                    className="rounded-full border border-black px-5 py-2 text-sm"
                  >
                    Cancle
                  </button>
                  <button
                    type="submit"
                    className="rounded-full border border-black bg-black px-5 py-2 text-sm text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <DisplayIntroResult></DisplayIntroResult>
            )}
          </div>
        </form>
      </div>
      <hr />
    </div>
  );
};

export default IntroForm;
