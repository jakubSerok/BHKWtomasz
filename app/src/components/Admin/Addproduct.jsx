import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const AddProduct = () => {
  const [image, setImage] = useState(null); // Change initial state to null
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    stock: "",
    available: true,
    description: "",
    productCode: "",
    category: "", // Added category field
    images: [],
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);

    let imageUrl = null; // Initialize imageUrl

    // Check if an image is provided
    if (image) {
      // Create form data for image upload
      let formData = new FormData();
      formData.append("productImage", image);

      // Upload the image and get the URL
      const uploadResponse = await fetch(`${apiUrl}/upload/product`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        imageUrl = uploadData.image_url; // Store the image URL temporarily
      } else {
        alert("Image upload failed");
        return; // Exit if image upload fails
      }
    }

    // Now submit the product details, including the image URL if available
    const addProductResponse = await fetch(`${apiUrl}/addproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: productDetails.title,
        price: productDetails.price,
        stock: productDetails.stock,
        available: productDetails.available,
        description: productDetails.description,
        productCode: productDetails.productCode,
        category: productDetails.category, // Include category in the request
        images: imageUrl ? [imageUrl] : [], // Use the image URL if available
      }),
    });

    const addProductData = await addProductResponse.json();

    if (addProductData.success) {
      alert("Product Added");
    } else {
      alert("Failed to add product");
    }
  };

  const categories = [
    { value: "man", label: "MAN" },
    { value: "scania12", label: "Scania 12" },
    { value: "scania13", label: "Scania 13" },
    // Add more categories as needed
  ];

  return (
    <div className="box-border w-full max-w-[800px] px-[50px] py-[30px] my-[20px] mx-[30px] rounded-md bg-white">
      {/* Other input fields remain unchanged */}
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Product Title</p>
        <input
          value={productDetails.title}
          onChange={changeHandler}
          type="text"
          name="title"
          placeholder="Type here"
          className="box-border w-full h-[50px] rounded pl-[15px] border-[#c3c3c3] border-[1px] text-[#7b7b7b7b] text-[14px]"
        />
      </div>
      {/* Other input fields for price, stock, description, product code, and category remain unchanged */}

      {/* Image upload and Add button */}
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
        onClick={Add_Product}
        className="mt-[20px] w-[160px] h-[50px] rounded-md bg-[#6079ff] cursor-pointer text -white text-[16px] font-medium"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
