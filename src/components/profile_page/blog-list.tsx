import Image from "next/image";

import Portrait4 from "public/picture/portrait4.jpg";
import BlogImage from "public/picture/blogimage.jpg";
import React from "react";

export const Blog = () => {
  const CurrentDate = new Date().toDateString();
  return (
    <div className="my-7">
      <div className=" flex flex-row items-center justify-start space-x-3">
        {/* profile image */}
        <div className="h-7 w-7 overflow-hidden rounded-full">
          <Image src={Portrait4} alt="portrait4"></Image>
        </div>
        {/* name */}
        <div className="text-sm font-semibold text-gray-600">
          Quang Huy Pham
        </div>
        {/* date publish */}
        <div className="text-sm font-light text-gray-500">{CurrentDate}</div>
      </div>

      {/* title */}
      <div className="flex flex-row justify-between ">
        <div className="max-w-lg ">
          <div className="py-1 text-lg font-semibold">
            10 Best Practices in Front-end Development (React)
          </div>
          {/* abstract */}
          <div className="font-herofont text-warp mr-auto h-20 w-full text-ellipsis pr-10 text-sm font-light text-gray-800">
            Certainly, we’ve all experienced this situation: you land a new job
            and are excited to start. The interviewers paint a bright and
            charming picture of the company, leading you to make the decision to
            leave your previous position. After a week of what can only be
            described as ‘vacation’
          </div>
        </div>
        {/* blog image */}
        <div className="h-32 w-32 translate-y-1 overflow-hidden ">
          <Image src={BlogImage} alt="blog_image"></Image>
        </div>
      </div>

      {/* tag */}
      <div className="flex flex-row items-center space-x-3 py-10">
        <div>
          <button className="rounded-full border border-gray-100 bg-gray-100 px-3 py-1 text-sm font-light">
            Best Practices
          </button>
        </div>
        <div className=" text-sm font-light text-gray-500">12 min read</div>
      </div>
      {/* icon */}

      <hr />
    </div>
  );
};

const BlogList = () => {
  return (
    <div className="my-5 -translate-x-9">
      <Blog></Blog>
      <Blog></Blog>
      <Blog></Blog>
      <Blog></Blog>
      <Blog></Blog>
      <Blog></Blog>
      <Blog></Blog>
      <Blog></Blog>
      <Blog></Blog>
    </div>
  );
};
export default BlogList;
