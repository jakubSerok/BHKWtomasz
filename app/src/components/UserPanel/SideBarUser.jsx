import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineHistory,
  AiOutlineLogout,
} from "react-icons/ai";

const SideBarUser = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear local storage (authentication token)
    localStorage.removeItem("auth-token");

    // Reset any user-related state (like activeSection)
    setActiveSection("profile");

    // Optionally, clear any other user-specific data if necessary

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-3/4 bg-gray-200 h-[300px] sm:h-screen">
        <h2 className="text-lg font-bold mb-4">User Panel</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to={"/user/profile"}
              className={`flex items-center p-2 rounded hover:bg-gray-300 ${
                activeSection === "profile" ? "bg-gray-300" : ""
              } w-full text-left`}
              onClick={() => setActiveSection("profile")}
            >
              <AiOutlineUser className="mr-2" /> Profile
            </Link>
          </li>
          <li>
            <Link
              to={"/user/orders"}
              className={`flex items-center p-2 rounded hover:bg-gray-300 ${
                activeSection === "orders" ? "bg-gray-300" : ""
              } w-full text-left`}
              onClick={() => setActiveSection("orders")}
            >
              <AiOutlineHistory className="mr-2" /> Your Orders
            </Link>
          </li>
          <li>
            <button
              className="flex items-center p-2 rounded hover:bg-gray-300 w-full text-left"
              onClick={handleLogout}
            >
              <AiOutlineLogout className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="w-full sm:w-3/4 p-4">{/* Add content here */}</div>
    </div>
  );
};

export default SideBarUser;
