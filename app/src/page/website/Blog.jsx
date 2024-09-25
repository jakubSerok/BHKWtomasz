import React, { useContext } from "react";
import { ShopContext } from "../../components/Context/ShopContext";
import { useParams } from "react-router-dom";
import BlogDisplay from "../../components/Blog/BlogDisplay";
const Blog = () => {
  const { all_blogs } = useContext(ShopContext); // Fix the variable name here
  const { blogId } = useParams();
  const blog = all_blogs.find((e) => e.id === Number(blogId));

  return (
    <div>
      <BlogDisplay blog={blog} />
    </div>
  );
};

export default Blog;
