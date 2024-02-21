import React from "react";


const Tagbutton: React.FC<{ children: string,  text: string }> = ( { text } ) => {
  return (
    <button className="m-2 rounded-full hover:border-yellow-500 hover:bg-yellow-500 border border-gray-100 bg-gray-100 px-4 py-1 font-light">
      {text}
    </button>
  );
};

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

export default function Tag() {
  return (
    <div className="max-w-lg">
      {Labels.map((lable, index) => (
        <Tagbutton key={index} text={lable}> </Tagbutton>
      ))}
      <div>
        <button className="m-3 text-green-700">See more topic</button>
      </div>
      <hr />
    </div>
  );
}
