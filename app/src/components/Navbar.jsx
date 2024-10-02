import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdAccountBox } from "react-icons/md";
import { ShopContext } from "./Context/ShopContext";

const Navbar = () => {
  let [open, setOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  // Check if the user is logged in by verifying the token in local storage
  const isLoggedIn = localStorage.getItem("auth-token") !== null;

  return (
    <nav className="sm:h-[140px] h-[80px] bg-white">
      {/* Desktop Menu */}
      <div className="hidden sm:flex flex-col h-full bg-white">
        <div className="h-[70%] border-b-2 border-black flex justify-between px-6 items-center">
          <img src={logo} alt="" className="h-[90%]" />
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
            <a href={isLoggedIn ? "/user" : "/login"}>
              <MdAccountBox size={30} />
            </a>
          </div>
        </div>

        <ul className="flex items-center justify-between px-4 h-[70%] border-b-2 border-black">
          <li className="md:text-[20px] sm:text-[15px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out">
            <a href="/shop">sklep</a>
          </li>
          <li className="md:text-[20px] sm:text-[15px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out">
            <a href="/">home</a>
          </li>
          <li className="md:text-[20px] sm:text-[15px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out">
            <a href="/blogs">blogi</a>
          </li>
          <li className="md:text-[20px] sm:text-[15px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out">
            <a href="/about">o nas</a>
          </li>
          <li className="md:text-[20px] sm:text-[15px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out">
            <a href="/kontakt">kontakt</a>
          </li>
          <li className="md:text-[20px] sm:text-[15px] text-black font-extrabold uppercase hover:scale-105 transition-transform duration-200 ease-in-out">
            <a href="/oferta">oferta</a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden h-full">
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
            <li className="text-[20px] text-black bold uppercase border-b-2 w-full hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/shop" className="w-full block py-2">
                sklep
              </a>
            </li>
            <li className="text-[20px] text-black bold uppercase border-b-2 w-full hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/" className="w-full block py-2">
                home
              </a>
            </li>
            <li className="text-[20px] text-black bold uppercase border-b-2 w-full hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/blogs" className="w-full block py-2">
                blogi
              </a>
            </li>
            <li className="text-[20px] text-black bold uppercase border-b-2 w-full hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/about" className="w-full block py-2">
                o nas
              </a>
            </li>
            <li className="text-[20px] text-black bold uppercase border-b-2 w-full hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/kontakt" className="w-full block py-2">
                kontakt
              </a>
            </li>
            <li className="text-[20px] text-black bold uppercase border-b-2 w-full hover:scale-105 transition-transform duration-200 ease-in-out">
              <a href="/oferta" className="w-full block py-2">
                oferta
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
            <a href={isLoggedIn ? "/user" : "/login"}>
              <MdAccountBox size={30} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
