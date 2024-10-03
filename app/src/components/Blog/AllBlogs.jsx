import React, { useEffect, useState } from "react";
import ItemBlog from "./ItemBlog"; // You would need to create this component similar to `Item`
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;
const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/allblogs`)
      .then((res) => res.json())
      .then((data) => setAllBlogs(data));
  }, []);

  return (
    <div className="p-10">
      {/* Title and Description Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Blogas</h1>
        <p className="mt-4 text-lg text-gray-600">
          Read interesting articles, insights, and stories curated just for you.
        </p>
      </div>

      {/* Blogs Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {allBlogs.map((blog) => (
          <ItemBlog
            key={blog.id}
            id={blog.id}
            title={blog.title}
            images={blog.images}
            description={blog.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
