import React from "react";

const BlogDisplay = (props) => {
  const { blog } = props;

  if (!blog) {
    return <p>Keine Blog-Daten verfügbar.</p>;
  } else {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-10">
          {/* Blog Image */}
          <div className="w-full">
            {blog.images.length > 0 && (
              <img
                src={blog.images[0]}
                alt={blog.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>

          {/* Blog Content */}
          <div className="w-full flex flex-col">
            <h1 className="text-[#3d3d3d] text-2xl font-bold">{blog.title}</h1>

            {/* Blog Date */}
            <div className="flex items-center mt-4 gap-4 font-semibold">
              <h1>Date:</h1>
              <div>{new Date(blog.date).toLocaleDateString()}</div>
            </div>

            {/* Blog Description */}
            <div className="mt-6 text-gray-700">{blog.description}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default BlogDisplay;
