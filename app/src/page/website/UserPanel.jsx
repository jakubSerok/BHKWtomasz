import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../../components/UserPanel/Profile";
import Orders from "../../components/UserPanel/Orders";
import SideBarUser from "../../components/UserPanel/SideBarUser";

const UserPanel = () => {
  return (
    <div className="flex">
      {/* Sidebar should always be visible */}
      <SideBarUser />

      <Routes>
        {/* Define routes here like the Admin panel */}
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default UserPanel;
