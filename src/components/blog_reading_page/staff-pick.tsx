import Image from "next/image";

import Portrait2 from "public/picture/portrait2.jpg";

const Staff = () => {
  return (
    <div className="mx-auto max-w-screen-sm">
      <div className="pb-2">
        <div className="flex max-w-screen-sm flex-row items-center justify-start space-x-2 pb-2">
          {/* picture */}
          <div className="flex h-7 w-7 items-center overflow-hidden">
            <Image
              src={Portrait2}
              alt="protrait2"
              height={20}
              width={20}
              className="h-full w-full rounded-full object-cover"
            ></Image>
          </div>
          {/* name */}
          <div className="text-sm font-bold">Polly Mackintosh</div>
        </div>

        {/* title */}
        <div className="text-sm font-bold">
          ‘Medicine’: Is sober dancing the new ecstasy?
        </div>
      </div>
    </div>
  );
};

const StaffPick = () => {
  return (
    <div>
      <div>
        <div className="ml-10 mt-10 flex flex-col ">
          <div className="pb-5 font-semibold">Staff Picks</div>

          <div className="pb-5">
            <Staff></Staff>
            <Staff></Staff>
            <Staff></Staff>
          </div>
          <div className="text-sm text-green-500">See the full list</div>
        </div>
      </div>
    </div>
  );
};
export default StaffPick;
