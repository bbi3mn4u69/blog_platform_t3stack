import { signIn } from "next-auth/react";
import Image from "next/image";
import FacebookPic from "public/picture/facebook.png";


const AuthButtonGoogle = () => {
    const handleClick = async () => {
        try {
            await signIn("google");
            console.log("sign in success")
        } catch (error) {
            console.error("Sign-in failed", error);
        }
       
      };

  return (
    <button
      onClick={handleClick}
      className="itmes-center flex w-full justify-center rounded-full  relative m-2
      border border-black bg-white px-20 py-2 text-xl font-semibold text-black"
    >
      <span className=" items-center text-center text-lg font-light ">
        Sign in with Facebook
      </span>
      <Image
        src={FacebookPic}
        alt="google logo"
        width={30}
        height={30}
        className="absolute left-0 translate-x-3"
      ></Image>
    </button>
  );
};

export default AuthButtonGoogle;
