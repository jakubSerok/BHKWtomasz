import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/Admin/Addproduct";
import Sidebar from "../../components/Admin/Sidebar";
import ListProduct from "../../components/Admin/ListProduct";
import AddBlog from "../../components/Admin/AddBlog";
import ListBlog from "../../components/Admin/ListBlog";
import AdminPanel from "../../components/Admin/AdminPanel";
import ListOrder from "../../components/Admin/ListOrder";

const Admin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="listblog" element={<ListBlog />} />
          <Route path="dashboard" element={<AdminPanel />} />
          <Route path="listorder" element={<ListOrder />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
