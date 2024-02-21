import Image from "next/image";
import Portrait4 from "public/picture/portrait4.jpg";
import BlogImage from "public/picture/blogimage.jpg";
import React from "react";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";


const BlogList = () => {
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
           await Promise.all(promises);
        } catch (error) {
          console.error("Error fetching image URLs:", error);
        }
      }
    };

    mapImage();
  }, [getPost.isSuccess]);

  return (
    <>
      <button>
        <div className="my-5 -translate-x-9">
          {getPost.isSuccess &&
            getPost.data.map((post) => (
              <div key={post.id} className="my-7">
                <div className=" flex flex-row items-center justify-start space-x-3">
                  {/* profile image */}
                  <div className="h-7 w-7 overflow-hidden rounded-full">
                    <Image
                      src={post.authorImage}
                      width={100}
                      height={100}
                      alt="portrait4"
                    ></Image>
                  </div>
                  {/* name */}
                  <div className="text-sm font-semibold text-gray-600">
                    {post.author}
                  </div>
                  {/* date publish */}
                  <div className="text-sm font-light text-gray-500">
                    {post.createdAt.toLocaleDateString("en-US")}
                  </div>
                </div>

                {/* title */}
                <div className="flex flex-row justify-between ">
                  <div className="max-w-lg flex flex-col justify-center items-start">
                    <div className="py-1 text-lg font-semibold">
                      {post.title}
                    </div>
                    {/* abstract */}
                    <div className="font-herofont text-warp h-20 w-full flex items-start text-ellipsis text-sm font-light text-gray-800">
                      {post.postContent}
                    </div>
                  </div>
                  {/* blog image */}
                  <div className="h-32 w-32 translate-y-1 overflow-hidden ">
                    <div key={post.id}>
                      {imageArray.length > 0 ? (
                        <Image
                          src={imageArray[getPost.data.indexOf(post)] as string}
                          width={10000}
                          height={10000}
                          alt="blog_image"
                        />
                      ) : (
                        <p>Loading....</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* tag */}
                <div className="flex flex-row items-center space-x-3 py-10">
                  <div>
                    <button className="rounded-full border border-gray-100 bg-gray-100 px-3 py-1 text-sm font-light">
                      Best Practices
                    </button>
                  </div>
                  <div className=" text-sm font-light text-gray-500">
                    12 min read
                  </div>
                </div>
                {/* icon */}

                <hr />
              </div>
            ))}
        </div>
      </button>
    </>
  );
};
export default BlogList;
