import React from "react";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/admin/Product_Cart.svg";
import list_product_icon from "../../assets/admin/Product_list_icon.svg";

const Sidebar = () => {
  return (
    <div className="flex flex-col pt-[30px] gap-[20px] w-full max-w-[250px] h-screen bg-slate-500 border-r-2 border-black">
      <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <img src={add_product_icon} alt="Add Product" />
          <p>Dashboard</p>
        </div>
      </Link>
      <Link to="/admin/addproduct" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <img src={add_product_icon} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to="/admin/listproduct" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <img src={list_product_icon} alt="Product List" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to="/admin/addblog" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <img src={add_product_icon} alt="Product List" />
          <p>Add Blog</p>
        </div>
      </Link>
      <Link to="/admin/listblog" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-center mx-[20px] px-[10px] py-[5px] rounded-md bg-[#f6f6f6] gap-[20px] cursor-pointer">
          <img src={list_product_icon} alt="Product List" />
          <p>Blog List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
