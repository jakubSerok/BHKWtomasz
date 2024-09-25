import React, { useEffect, useState } from "react";
import ItemBlog from "./ItemBlog"; // You would need to create this component similar to `Item`

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/allblogs")
      .then((res) => res.json())
      .then((data) => setAllBlogs(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center py-10">
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
  );
};

export default AllBlogs;
