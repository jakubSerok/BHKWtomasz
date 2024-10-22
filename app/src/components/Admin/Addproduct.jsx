import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const AddProduct = () => {
  const [image, setImage] = useState(false);
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
      const imageUrl = uploadData.image_url; // Store the image URL temporarily

      // Now submit the product details, including the image URL
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
          images: [imageUrl], // Use the image URL here
        }),
      });

      const addProductData = await addProductResponse.json();

      if (addProductData.success) {
        alert("Product Added");
      } else {
        alert("Failed to add product");
      }
    } else {
      alert("Image upload failed");
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
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Price</p>
        <input
          value={productDetails.price}
          onChange={changeHandler}
          type="text"
          name="price"
          placeholder="Type here"
          className="box-border w-full h-[50px] rounded pl-[15px] border-[#c3c3c3] border-[1px] text-[#7b7b7b7b] text-[14px]"
        />
      </div>
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Stock</p>
        <input
          value={productDetails.stock}
          onChange={changeHandler}
          type="text"
          name="stock"
          placeholder="Type here"
          className="box-border w-full h-[50px] rounded pl-[15px] border-[#c3c3c3] border-[1px] text-[#7b7b7b7b] text-[14px]"
        />
      </div>
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Description</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Type here"
          className="box-border w-full h-[100px] rounded pl-[15px] border-[#c3c3c3] border-[1px] text-[#7b7b7b7b] text-[14px]"
        />
      </div>
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Product Code</p>
        <input
          value={productDetails.productCode}
          onChange={changeHandler}
          type="text"
          name="productCode"
          placeholder="Type here"
          className="box-border w-full h-[50px] rounded pl-[15px] border-[#c3c3c3] border-[1px] text-[#7b7b7b7b] text-[14px]"
        />
      </div>
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
          className="box-border w-full h-[50px] rounded pl-[15px] border-[#c3c3c3] border-[1px] text-[#7b7b7b7b] text-[14px]"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

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
        onClick={() => {
          Add_Product();
        }}
        className="mt-[20px] w-[160px] h-[50px] rounded-md bg-[#6079ff] cursor-pointer text-white text-[16px] font-medium"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
