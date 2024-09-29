import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineHistory,
  AiOutlineLogout,
} from "react-icons/ai";

const UserPanel = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication data here, e.g., localStorage.clear() or a logout function
    localStorage.removeItem("auth-token"); // Adjust based on your authentication method
    navigate("/login"); // Change this to your login route
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    navigate(section); // Navigate to the appropriate section
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">User Panel</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`flex items-center p-2 rounded hover:bg-gray-300 ${
                activeSection === "profile" ? "bg-gray-300" : ""
              } w-full text-left`}
              onClick={() => handleSectionChange("profile")}
            >
              <AiOutlineUser className="mr-2" /> Profile
            </button>
          </li>
          <li>
            <button
              className={`flex items-center p-2 rounded hover:bg-gray-300 ${
                activeSection === "orders" ? "bg-gray-300" : ""
              } w-full text-left`}
              onClick={() => handleSectionChange("orders")}
            >
              <AiOutlineHistory className="mr-2" /> Your Orders
            </button>
          </li>
          <li>
            <button
              className="flex items-center p-2 rounded hover:bg-gray-300 w-full text-left"
              onClick={handleLogout}
            >
              <AiOutlineLogout className="mr-2" /> Logout
            </button>
          </li>
          {/* Add more sections as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <Outlet /> {/* Render the selected section here */}
      </div>
    </div>
  );
};

export default UserPanel;
