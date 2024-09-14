import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/Admin/Addproduct";
import Sidebar from "../../components/Admin/Sidebar";
import ListProduct from "../../components/Admin/ListProduct";
const Admin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
