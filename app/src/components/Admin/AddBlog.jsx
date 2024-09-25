import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";

const AddBlog = () => {
  const [image, setImage] = useState(false);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    description: "",
    images: [],
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });
  };

  const Add_Blog = async () => {
    console.log(blogDetails);

    // Create form data for image upload
    let formData = new FormData();
    formData.append("blogImage", image);

    // Upload the image and get the URL
    const uploadResponse = await fetch(`http://localhost:3001/upload/blog`, {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    if (uploadData.success) {
      const imageUrl = uploadData.image_url; // Store the image URL temporarily

      // Now submit the blog details, including the image URL
      const addBlogResponse = await fetch(`http://localhost:3001/addblog`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blogDetails.title,
          description: blogDetails.description,
          images: [imageUrl], // Use the image URL here
        }),
      });

      const addBlogData = await addBlogResponse.json();

      if (addBlogData.success) {
        alert("Blog Added");
      } else {
        alert("Failed to add blog");
      }
    } else {
      alert("Failed to upload image");
    }
  };

  return (
    <div className="box-border w-full max-w-[800px] px-[50px] py-[30px] my-[20px] mx-[30px] rounded-md bg-white">
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Blog Title</p>
        <input
          value={blogDetails.title}
          onChange={changeHandler}
          type="text"
          name="title"
          placeholder="Type here"
          className="box-border w-full h-[50px] rounded pl-[15px] border-[#c3c3c3] border-[1px] text-[#7b7b7b7b] text-[14px]"
        />
      </div>
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Blog Description</p>
        <textarea
          value={blogDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Type here"
          className="box-border w-full h-[100px] rounded pl-[15px] border-[#c3c3c3] border-[1px] text-[#7b7b7b7b] text-[14px]"
        />
      </div>
      <div className="h-[120px] w-[120px] rounded-xl object-contain my-[10px]">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="" />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Blog();
        }}
        className="mt-[20px] w-[160px] h-[50px] rounded-md bg-[#6079ff] cursor-pointer text-white text-[16px] font-medium"
      >
        ADD
      </button>
    </div>
  );
};

export default AddBlog;
