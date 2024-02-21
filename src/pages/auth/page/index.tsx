import React from "react";
import AuthGoogleButton from "~/components/auth/auth-button-google";
import AuthFacebookButton from "~/components/auth/auth-button-facebook";
import AuthGmailButton from "~/components/auth/auth-button-email";
import Link from "next/link";

const AuthPop = () => {
  return (
    <div>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white">
        <div className="m-auto max-w-screen-lg bg-white px-20 drop-shadow-xl duration-1000 ease-in">
          <div className="relative flex flex-col items-center justify-center px-16 py-16">
            <p className="font-herofont my-20 text-4xl text-black">
              Join Huy's Medium.
            </p>
            <div>
              <AuthGoogleButton></AuthGoogleButton>
              <AuthFacebookButton></AuthFacebookButton>
              {/* <AuthGmailButton></AuthGmailButton> */}
            </div>

            <div className="my-10 flex flex-row justify-between">
              <div className="items-center p-1">No acoount?</div>
              <Link href="/auth/register">
                <button
                  className="items-center p-1 text-green-600"
                >
                  Create one
                </button>
              </Link>
            </div>
            <div className="my-24 max-w-lg text-center font-light text-gray-400">
              Click “Sign up” to agree to Medium’s Terms of Service and
              acknowledge that Medium’s Privacy Policy applies to you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPop;
