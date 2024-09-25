import React from "react";

const BlogDisplay = (props) => {
  const { blog } = props;

  if (!blog) {
    return <p>No blog data available.</p>;
  } else {
    return (
      <div className="flex mx-[170px] py-10">
        <div className="flex gap-[17px]">
          <div>
            {blog.images.length > 0 && (
              <img
                src={blog.images[0]}
                alt=""
                className="w-[586px] h-[700px]"
              />
            )}
          </div>
        </div>
        <div className="mx-[70px] flex flex-col ">
          <h1 className="text-[#3d3d3d] text-[40px] font-bold">{blog.title}</h1>
          <div className="flex my-[40px] gap-[30px] font-bold">
            <h1>Date:</h1>
            <div>{new Date(blog.date).toLocaleDateString()}</div>
          </div>
          <div>{blog.description}</div>
        </div>
      </div>
    );
  }
};

export default BlogDisplay;
