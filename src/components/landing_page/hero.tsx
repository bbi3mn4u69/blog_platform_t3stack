

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Grid from "./m-grid";
import { signOut, useSession } from "next-auth/react";

const Hero: React.FC = () => {
  const route = useRouter();
  const { data: session } = useSession();
  const onClick = () => {
    if (!session?.user) {
      route.push("/");
    } else {
      route.push("/(protected)/blog_reading_page");
    }

  };
  const [isPop, setIsPop] = useState(false);

  return (
    <div className="bg-amber-400  ">
      <div className="mx-auto flex max-w-screen-xl flex-row flex-wrap justify-between">
        {/* left component */}
        <div className="relative place-self-center py-24">
          <div className="font-herofont mb-4 max-w-2xl text-8xl leading-none tracking-tight text-black">
            Stay Curious.
          </div>
          <div className="mb-6 max-w-sm font-light text-black md:text-lg lg:mb-8 lg:text-xl ">
            Discover stories, thinking, and expertise from writers on any topic.
          </div>

          <button
            className=" items-center justify-center rounded-full bg-black px-10 py-1 text-center 
            text-base font-light text-white "
            onClick={onClick}
          >
            Start reading
          </button>
        </div>

        {/* right component */}
        <div className="absolute right-0 translate-y-5 ">
          <Grid></Grid>{" "}
        </div>
      </div>
      <hr className="w-full border-black"></hr>
    </div>
  );
};

export default Hero;
