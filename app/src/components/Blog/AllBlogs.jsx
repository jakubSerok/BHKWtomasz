import React, { useEffect, useState } from "react";
import ItemBlog from "./ItemBlog";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]); // for paginated blogs
  const [currentPage, setCurrentPage] = useState(1); // state for current page
  const [blogsPerPage, setBlogsPerPage] = useState(10); // state for blogs per page

  useEffect(() => {
    fetch(`${apiUrl}/allblogs`)
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(data);
        setDisplayedBlogs(getPaginatedBlogs(data, currentPage, blogsPerPage));
      });
  }, [currentPage]);

  const getPaginatedBlogs = (blogs, currentPage, blogsPerPage) => {
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    return blogs.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-10">
      {/* Title and Description Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Blogs</h1>
        <p className="mt-4 text-lg text-gray-600">
          Lesen Sie interessante Artikel, Einblicke und Geschichten, die
          speziell für Sie zusammengestellt wurden.
        </p>
      </div>

      {/* Blogs Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {displayedBlogs.map((blog) => (
          <ItemBlog
            key={blog.id}
            id={blog.id}
            title={blog.title}
            images={blog.images}
            description={blog.description}
          />
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-10">
        {[...Array(Math.ceil(allBlogs.length / blogsPerPage))].map(
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
