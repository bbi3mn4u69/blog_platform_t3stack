import { useRouter } from "next/navigation";
import { useProfilePageContext } from "./profile-page-context";
import IntroForm from "./intro-form";

const Banner = () => {
  const { userIntroContent, setUserIntroContent } = useProfilePageContext();
  const onClick = () => {
    setUserIntroContent(true);
  };
  return (
    <>
      {userIntroContent ? (
        <IntroForm></IntroForm>
      ) : (
        <div className="mx-24 flex flex-col items-center justify-center bg-gray-100">
          <div className="mb-5 mt-10 font-semibold">
            tell the world about yourself
          </div>
          <div className="px-auto my-5 max-w-96 text-center text-sm text-slate-700">
            Here’s where you can share more about yourself: your history, work
            experience, accomplishments, interests, dreams, and more. You can
            even add images and use rich text to personalize your bio.
          </div>
          <button
            onClick={onClick}
            className="my-5 mb-10 rounded-full border border-black px-5 py-2"
          >
            get started
          </button>
        </div>
      )}
    </>
  );
};

export default Banner;
