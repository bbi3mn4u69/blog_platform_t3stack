"use client";

// TODO: Make this have input image and richtext

import { useState } from "react";
import { useFloatingActionContext } from "./floating-action-context";

const FloatingAction = () => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState<boolean>(false);
  const onClick = () => {
    setIsActionMenuOpen((prev) => !prev);
  };

  const { createImage, 
    setCreateImage,  
    createContent, 
    setCreateContent 
  } = useFloatingActionContext();
  // create new paragraph
  const onCreateContent = () => {
    setCreateContent(true)
  }
  // create new iamge
  const onCreateImage = () => {
    setCreateImage(true)
  }
  return (
    <div>
      <div className="relative">
        <button onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="h-10 w-10 stroke-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        {isActionMenuOpen && (
          <div className="absolute right-0 top-full flex flex-col rounded-md border bg-white p-4 shadow-md">
            <button onClick={onCreateContent}>New paragraph</button>
            <button onClick={onCreateImage}>New Image</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingAction;
