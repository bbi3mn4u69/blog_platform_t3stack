import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";

export default function Display() {
  const [imageArray, setImageArray] = useState<string[]>([]);
  const getPost = api.getPost.getPost.useQuery();

  const getSignedURL = api.getDownloadLink.downloadFile.useMutation({
    onSuccess: (data) => {
      if (data) {
        setImageArray((prevArray) => [...prevArray, data.link]);
      }
    },
  });

  useEffect(() => {
    const mapImage = async () => {
      if (getPost.data) {
        const promises = getPost.data.map((post) =>
          getSignedURL.mutateAsync({ key: post.key! })
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
    <div>
      {getPost.isSuccess &&
        getPost.data.map((post) => (
          <div key={post.id}>
            {imageArray.length > 0 ? (
              <Image
                src={imageArray[getPost.data.indexOf(post)] as string}
                width={100}
                height={100}
                alt="blog_image"
              />
            ) : (
              <p>No images available</p>
            )}
          </div>
        ))}
    </div>
  );
}
