import { api } from "~/utils/api";
import Banner from "./banner";
import DisplayIntroResult from "./display-intro-form";
import IntroForm from "./intro-form";

const AboutTag = () => {
  const userIntro = api.profile.isUserIntro.useQuery();
  return (
    <>
      {userIntro.isSuccess ? (
        <DisplayIntroResult></DisplayIntroResult>
      ) : (
        <Banner></Banner>
      )}
    </>
  );
};

export default AboutTag;
