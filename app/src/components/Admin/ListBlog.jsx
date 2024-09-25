import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/admin/cross_icon.png";

const ListBlog = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null); // To track the blog being edited
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    images: [],
  });

  // Fetch blog data
  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:3001/allblogs");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAllBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove a blog
  const removeBlog = async (id) => {
    try {
      await fetch("http://localhost:3001/removeblog", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchInfo(); // Refresh blog list after removal
    } catch (error) {
      console.error("Failed to remove blog:", error);
    }
  };

  // Open the edit form and set the current blog's details
  const openEditForm = (blog) => {
    setEditingBlog(blog.id);
    setEditForm({
      title: blog.title,
      description: blog.description,
      images: blog.images,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the edited blog details
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/editblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editingBlog, ...editForm }),
      });
      const result = await response.json();
      if (result.success) {
        fetchInfo(); // Refresh blogs after edit
        setEditingBlog(null); // Close the edit form
      }
    } catch (error) {
      console.error("Failed to edit blog:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] py-[10px] px-[50px] m-[30px] rounded-md bg-white">
      <h1>All Blog List</h1>
      <div className="grid grid-cols-5 gap-[10px] w-full py-[20px] text-[#454545] text-[15px] font-bold">
        <p>Blog</p>
        <p>Title</p>
        <p>Description</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="w-full overflow-y-auto">
        <hr />
        {allBlogs.map((blog) => (
          <React.Fragment key={blog.id}>
            <div className="grid grid-cols-5 gap-[10px] w-full items-center">
              <img
                src={blog.images[0]}
                alt={`${blog.title} image`}
                className="h-[80px]"
              />
              <p>{blog.title}</p>
              <p>{blog.description}</p>
              <img
                src={cross_icon}
                onClick={() => openEditForm(blog)}
                alt="Edit blog"
                className="m-auto cursor-pointer"
              />
              <img
                src={cross_icon}
                onClick={() => removeBlog(blog.id)}
                alt="Remove blog"
                className="m-auto cursor-pointer"
              />
            </div>
            <hr />

            {/* Conditional rendering of the edit form */}
            {editingBlog === blog.id && (
              <form
                onSubmit={handleSubmitEdit}
                className="w-full bg-gray-100 p-4 rounded-md mt-2"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <label>Blog Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save Changes
                </button>
              </form>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListBlog;
