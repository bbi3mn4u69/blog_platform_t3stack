import { useEffect, useState, useRef } from "react";
import { usePublishButtonContext } from "./publish-button-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFloatingActionContext } from "./floating-action-context";
import { api } from "~/utils/api";

const Body = () => {
  // content of the blog
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([""]);
  const [fileUrls, setFileUrls] = useState([""]);
  const [files, setFiles] = useState<File[]>([]);

  // create post router
  const createPost = api.test.createPost.useMutation({
    
  });
  // app router
  const router = useRouter();
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ Title: title }, contents, files);
  };
  // submit the form
  const { submit, setSubmit } = usePublishButtonContext();
  useEffect(() => {
    const fetchData = async () => {
      if (submit === true) {
        submitForm({
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>);
        setSubmit(false);
        // router.push("/reading");
      }
    };
    fetchData();
  }, [submit]);
  // add one content when press a button
  const { createImage, setCreateImage, createContent, setCreateContent } =
    useFloatingActionContext();
  // new content when press a floating button
  useEffect(() => {
    if (createContent === true) {
      setContents((prevContents) => [...prevContents, ""]);
      setCreateContent(false);
    }
  }, [createContent]);
  const handleContentChange = (value: string, index: number) => {
    const newContents = [...contents];
    newContents[index] = value;
    setContents(newContents);
  };

  // new image when press a floating action
  useEffect(() => {
    if (createImage === true) {
      setFiles((prevFiles) => [...(prevFiles ?? []), new File([], "")]);
      setFileUrls((prevUrls) => [...prevUrls, ""]);
      setCreateImage(false);
    }
  }, [createImage]);
  // file handling, create a url so the user can see
  const handleFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const newFiles = [...(files ?? [])];
      newFiles[index] = selectedFile;
      setFiles(newFiles);
    }
    const url = URL.createObjectURL(selectedFile as Blob);
    const newUrls = [...fileUrls];
    newUrls[index] = url;
    setFileUrls(newUrls);
  };

  return (
    <>
      <div>
        <div className="mx-auto max-w-sm space-y-10">
          <form action="" onSubmit={submitForm}>
            {/* TODO: status message */}
            <div className="flex flex-col">
              {/* title input */}
              <input
                type="text"
                placeholder="Title"
                className="mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {contents.map((value, index) => (
                <div key={index} className="mb-4">
                  <input
                    value={value}
                    type="text"
                    placeholder="Paragraph"
                    onChange={(e) => handleContentChange(e.target.value, index)}
                  />
                </div>
              ))}
              {/* picture attach */}
              {files.map((file, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="file"
                    name={`picture-${index}`}
                    accept=".jpeg, .png, .webp, .gif"
                    onChange={(e) => handleFilesChange(e, index)}
                  />
                  {fileUrls[index] && (
                    <div className="flex items-center gap-4">
                      <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                        <Image
                          className="object-cover"
                          src={fileUrls[index] as string}
                          alt={file.name}
                          width={128}
                          height={128}
                        ></Image>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Body;
