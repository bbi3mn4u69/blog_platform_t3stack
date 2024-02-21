"use client";
import { useState } from "react";

const LabelHandling = () => {
  const Labels = [
    "Programming",
    "Data Science",
    "Technology",
    "Self Improvement",
    "Writing",
    "Relationship",
    "Machine Learning",
    "Productivity",
    "Politics",
  ];

  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 5;
  const showButton = Labels.length > itemsToShow;
  const labelsToShow = Labels.slice(startIndex, startIndex + itemsToShow);
  const handleMoreButton = (direction: string) => {
    const increment = direction === "forward" ? itemsToShow : -itemsToShow;
    setStartIndex((prevIndex) => prevIndex + increment);
  };

  const showBackwardButton = startIndex > 0;

  return (
    <div className=" flex flex-row relative items-center justify-between max-w-screen-sm">
      <div className="flex max-w-screen-sm flex-row items-center justify-between  overflow-hidden text-clip">
        <div className="flex w-screen flex-row space-x-6 items-center">
          {labelsToShow.map((label, index) => (
            <button
              key={startIndex + index}
              className="whitespace-nowrap text-gray-500 text-sm font-light "
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-full bg-white bg-opacity-90">
        {/* forward  button */}
        {showButton && (
          <button
            className="absolute right-10 top-1 ml-5 bg-white bg-opacity-90"
            onClick={() => handleMoreButton("forward")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
        {/* backward button */}
        {showBackwardButton && (
          <button
            className="absolute -left-11 top-1 mr-5  bg-white "
            onClick={() => handleMoreButton("backward")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const Filter = () => {
  return (
    <div className="pr-10 -translate-x-9">
      <div className=" mx-auto max-w-screen-lg ">
        <div className="mt-10 flex flex-row space-x-6 max-w-screen-sm">
          <div>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          {/* filter list */}
          <LabelHandling />
        </div>
      <hr className="max-w-screen-lg my-3"/>
      </div>
    </div>
  );
};

export default Filter;
