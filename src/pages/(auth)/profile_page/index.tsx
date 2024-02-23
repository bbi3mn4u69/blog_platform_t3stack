

import NavBar from "~/components/shared/navbar-style-2";
import ProfileMain from "~/components/profile_page/profile-main";
import ProfileLeft from "~/components/profile_page/profile-left";
import ProfilePageContextProvider from "~/components/profile_page/profile-page-context";
const ProfilePage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="">
        <div className="mx-auto flex max-w-screen-xl flex-row justify-between">
          <ProfilePageContextProvider>
            <ProfileMain></ProfileMain>
            <ProfileLeft></ProfileLeft>
          </ProfilePageContextProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
