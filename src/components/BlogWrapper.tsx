import React from "react";

const BlogWrapper = ({ children }: { children: React.ReactNode }) => {
  return <main className="m-auto -mt-36 mb-24  max-w-[900px]">{children}</main>;
};

export default BlogWrapper;
