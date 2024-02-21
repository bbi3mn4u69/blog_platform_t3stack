import Image from "next/image";
import portrait3 from "public/picture/portrait3.jpg";

const People = () => {
  return (
    <div className="py-2">
      <div className="flex flex-row justify-between">
        {/* image */}
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image src={portrait3} alt="portrait picture"></Image>
        </div>

        <div className="flex flex-col">
          {/* name */}
          <div className="px-3 font-semibold">Anthony Alcaraz</div>
          {/* bio */}
          <div className=" max-w-64 px-3 text-sm font-light text-gray-500">
            Chief AI Officer & Architect : Builder of Neuro-Symbolic AI
          </div>
          {/* follow button */}
        </div>
        <div className="-translate-x-9 translate-y-5">
          <button className="rounded-full border border-black px-3 py-2 text-sm font-light">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

const WhoToFollow = () => {
  return (
    <div className="ml-10 mt-10">
      <div className="flex flex-col items-start justify-center">
        <div className="pb-5 font-semibold">Who To follow</div>
        <div>
          <People></People>
          <People></People>
          <People></People>
        </div>
        <button className="text-sm text-green-500 py-5">See more suggesstion</button>
      </div>
    </div>
  );
};
export default WhoToFollow;
