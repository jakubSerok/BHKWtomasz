import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    price: "",
    available: true,
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch(`http://localhost:${3001}/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.succes) {
      product.image = responseData.image_url;
      console.log(responseData);
      await fetch(`http://localhost:${3001}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.succes ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="box-border w-full max-w-[800px] px-[50px] py-[30px] my-[20px] mx-[30px] rounded-md bg-white">
      <div className="w-full text-[16px] text-[#7b7b7b]">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
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
