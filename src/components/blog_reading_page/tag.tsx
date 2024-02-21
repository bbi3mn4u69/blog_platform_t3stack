import React from "react";


const Tagbutton: React.FC<{ children: string,  text: string }> = ( { text } ) => {
  return (
    <button className="mt-1 mb-1 mr-1 rounded-full hover:border-yellow-500 hover:bg-yellow-500 border border-gray-100 bg-gray-100 px-4 py-1 text-sm font-light">
      {text}
    </button>
  );
};

const Labels = [
  "Programming",
  "Data Science",
  "Self Improvement",
  "Writing",
  "Machine Learning",
  "Productivity",
  "Politics",
];

export default function Tag() {
  return (
    <div className="max-w-lg">
      {Labels.map((lable, index) => (
        <Tagbutton key={index} text={lable}> </Tagbutton>
      ))}
      <div>
        <button className="my-5 text-green-500 text-sm">See more topic</button>
      </div>
    </div>
  );
}
