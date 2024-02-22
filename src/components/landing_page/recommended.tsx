import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

const BlogComponent: React.FC<{
  number: string;
  name: string;
  title: string;
  date: string;
  image: string
}> = ({ number, name, title, date, image }) => {
  return (
    <>
      <button>
        <div className="my-2 flex flex-row py-2">
          {/* number */}
          <div className="font-blognumbern pr-5 text-3xl font-bold text-gray-200">
            {number}
          </div>
          {/* blog hero */}
          <div>
            <div className=" flex flex-row space-x-3">
              <Image
                className="aspect-auto w-10 rounded-full"
                width={100}
                height={100}
                src={image}
                alt="portrait1"
              />
              <span className="flex items-center justify-center font-semibold">
                {name}
              </span>
            </div>
            {/* title */}
            <div className="flex flex-col items-start">
              <button>
                <div className="text-left text-xl font-bold text-black">
                  {title}
                </div>
              </button>

              {/* date */}
              <div className=" text-left text-sm font-light text-gray-400">
                {date}
              </div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default function Recommended() {
  const getPost = api.post.getPost.useQuery();

  return (
    <div>
      <div className="mx-auto my-11 max-w-screen-xl">
        {/* title */}
        <div className="flex flex-row space-x-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className=" h-6 w-6 rounded-full border border-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
          </svg>
          <div> Trending on Medium </div>
        </div>
        {/* trending */}
        <div className="grid w-full grid-flow-row grid-cols-3 grid-rows-2 gap-3">
          {getPost.isSuccess &&
            getPost.data.slice(0, 6).map((post, index) => (
              <React.Fragment key={`post-${post.id}`}>
                <div
                  className={`col-span-1 col-start-${(index % 3) + 1} row-span-1 row-start-${Math.floor(index / 3) + 1}`}
                >
                  {post.author && post.title && post.createdAt ? (
                    <BlogComponent
                      image={post.authorImage}
                      number={`0${index + 1}`}
                      name={post.author}
                      title={post.title}
                      date={post.createdAt.toLocaleDateString()}
                    />
                  ) : null}
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
      <hr />
    </div>
  );
}
