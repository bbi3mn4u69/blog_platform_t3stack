import portrait1 from "public/picture/portrait1.jpg";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Blog() {
  const [imageArray, setImageArray] = useState<string[]>([]);
  const getPost = api.getPost.getPost.useQuery();
  const downloadRoute = api.useContext()
  const getSignedURL = api.getDownloadLink.downloadFile.useMutation({
    onSuccess: (data) => {
      downloadRoute.getDownloadLink.invalidate()
      if (data) {
        setImageArray((prevArray) => [...prevArray, data.link]);
      }
    },
  });

  useEffect(() => {
    const mapImage = async () => {
      if (getPost.data) {
        const promises = getPost.data.map((post) =>
          getSignedURL.mutateAsync({ key: post.key! }),
        );

        try {
          const results = await Promise.all(promises);
          console.log(results); // Results of all mutations
        } catch (error) {
          console.error("Error fetching image URLs:", error);
        }
      }
    };

    mapImage();
  }, [getPost.isSuccess]);

  return (
    <div>
      <div className=" my-11 flex flex-col justify-center">
        <>
        {getPost.isSuccess &&
            getPost.data.map((post) => (
          <button className="my-5">
            <div className="flex flex-row items-center justify-center space-x-3">
              <div>
                <div className=" flex flex-row space-x-3 text-left">
                  <img
                    className="aspect-auto w-10 rounded-lg"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHx8"
                    alt="portrait1"
                  />
                  <span className="flex items-center justify-center">
                    {post.author}
                  </span>
                </div>
                {/* title */}
                <div className="text-left text-xl font-bold text-black">
                  {post.title}
                </div>
                {/* subtitle */}
                <div className="font-ligh w-screen text-left text-gray-400 max-w-screen-sm">
                 {post.postContent}
                </div>
                {/* date */}
                <div className="flex flex-row flex-wrap items-center justify-between py-2">
                  <div className="flex flex-row items-center justify-evenly">
                    <div className="pr-2 text-left text-sm font-light text-gray-400">
                      {post.createdAt.toLocaleDateString()}
                    </div>
                    <button className=" rounded-full border border-gray-100 bg-gray-100 px-4 py-1 text-sm font-light hover:border-yellow-500 hover:bg-yellow-500">
                      Tag
                    </button>
                  </div>

                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* picture */}
              <div key={post.id}>
                      {imageArray.length > 0 ? (
                        <Image
                          src={imageArray[getPost.data.indexOf(post)] as string}
                          width={10000}
                          height={10000}
                          alt="blog_image"
                          className="aspect-auto w-48 h-48 rounded-lg"
                        />
                      ) : (
                        <p>Loading....</p>
                      )}
                    </div>
            </div>
          </button>
          ))}
        </>
      </div>
    </div>
  );
}
