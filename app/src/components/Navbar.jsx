import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdAccountBox } from "react-icons/md";
import { ShopContext } from "./Context/ShopContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let [open, setOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();

  // Check if the user is logged in by verifying the token in local storage
  const isLoggedIn = localStorage.getItem("auth-token") !== null;

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sm:h-[100px] h-[80px] bg-white">
      {/* Desktop Menu */}
      <div className="hidden md:flex  h-full justify-between bg-white border-b-2 border-black p-4">
        <img src={logo} alt="" className="" />

        <ul className="flex items-center justify-between px-4 md:gap-6 lg:gap-10 ">
          <li
            className={`lg:text-[20px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out ${
              isActive("/shop") ? "text-orange-500" : "hover:text-orange-500"
            }`}
          >
            <a href="/shop">Speichren</a>
          </li>
          <li
            className={`lg:text-[20px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out ${
              isActive("/") ? "text-orange-500" : "hover:text-orange-500"
            }`}
          >
            <a href="/">home</a>
          </li>
          <li
            className={`lg:text-[20px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out ${
              isActive("/blogs") ? "text-orange-500" : "hover:text-orange-500"
            }`}
          >
            <a href="/blogs">blogs</a>
          </li>
          <li
            className={`lg:text-[20px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out ${
              isActive("/about") ? "text-orange-500" : "hover:text-orange-500"
            }`}
          >
            <a href="/about">Über uns</a>
          </li>
          <li
            className={`lg:text-[20px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out ${
              isActive("/kontakt") ? "text-orange-500" : "hover:text-orange-500"
            }`}
          >
            <a href="/kontakt">kontakt</a>
          </li>
          <li
            className={`lg:text-[20px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out ${
              isActive("/oferta") ? "text-orange-500" : "hover:text-orange-500"
            }`}
          >
            <a href="/oferta">Angebot</a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <a href="/cart" className="relative">
            <AiOutlineShoppingCart size={30} />
            {/* Optional: Add a cart item count badge */}
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {getTotalCartItems()}
            </span>
          </a>
          {/* Account Icon */}
          <a href={isLoggedIn ? "/user/profile" : "/login"}>
            <MdAccountBox size={30} />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden h-full">
        {/* Menu button */}
        <div className="flex justify-between items-center h-full px-5 border-b-2 border-black">
          <img src={logo} alt="Logo" className="h-[90%]" />
          <div onClick={() => setOpen(!open)}>
            {open ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>
        </div>

        {/* Sliding Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-[75%] bg-white z-50 p-5 transition-transform duration-500 rounded-br-2xl ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo at the top of the mobile menu */}
          <img src={logo} alt="Logo" className="w-[100px] h-auto mb-6" />

          {/* Menu items */}
          <ul className="flex flex-col items-start justify-center h-full space-y-4">
            <li
              className={`text-[20px] text-black bold uppercase border-b-2 w-full ${
                isActive("/shop") ? "text-orange-500" : "hover:text-orange-500"
              } hover:scale-105 transition-transform duration-200 ease-in-out`}
            >
              <a href="/shop" className="w-full block py-2">
                SPEICHERN
              </a>
            </li>
            <li
              className={`text-[20px] text-black bold uppercase border-b-2 w-full ${
                isActive("/") ? "text-orange-500" : "hover:text-orange-500"
              } hover:scale-105 transition-transform duration-200 ease-in-out`}
            >
              <a href="/" className="w-full block py-2">
                home
              </a>
            </li>
            <li
              className={`text-[20px] text-black bold uppercase border-b-2 w-full ${
                isActive("/blogs") ? "text-orange-500" : "hover:text-orange-500"
              } hover:scale-105 transition-transform duration-200 ease-in-out`}
            >
              <a href="/blogs" className="w-full block py-2">
                blogs
              </a>
            </li>
            <li
              className={`text-[20px] text-black bold uppercase border-b-2 w-full ${
                isActive("/about") ? "text-orange-500" : "hover:text-orange-500"
              } hover:scale-105 transition-transform duration-200 ease-in-out`}
            >
              <a href="/about" className="w-full block py-2">
                über uns
              </a>
            </li>
            <li
              className={`text-[20px] text-black bold uppercase border-b-2 w-full ${
                isActive("/kontakt")
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              } hover:scale-105 transition-transform duration-200 ease-in-out`}
            >
              <a href="/kontakt" className="w-full block py-2">
                kontakt
              </a>
            </li>
            <li
              className={`text-[20px] text-black bold uppercase border-b-2 w-full ${
                isActive("/oferta")
                  ? "text-orange-500"
                  : "hover:text-orange-500"
              } hover:scale-105 transition-transform duration-200 ease-in-out`}
            >
              <a href="/oferta" className="w-full block py-2">
                Angebot
              </a>
            </li>
          </ul>

          {/* Cart Icon for Mobile */}
          <div className="mt-4 flex items-center space-x-4">
            {/* Cart Icon */}
            <a href="/cart" className="relative">
              <AiOutlineShoppingCart size={30} />
              {/* Cart item count badge */}
              <div className="absolute top-[-10px] right-[-10px] w-[23px] h-[23px] lg:w-[22px] lg:h-[22px] flex justify-center items-center rounded-full text-[15px] lg:text-[14px] bg-red-700 text-white">
                {getTotalCartItems()}
              </div>
            </a>

            {/* Account Icon */}
            <a href={isLoggedIn ? "/user/profile" : "/login"}>
              <MdAccountBox size={30} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
