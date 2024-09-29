import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="w-[90%] md:w-[300px] transform hover:scale-105 transition-transform duration-600 p-4">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
        {/* Product Image */}
        <Link to={`/product/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={props.images}
            alt={props.name}
            className="h-[200px] object-cover w-full rounded-md"
          />
        </Link>

        {/* Product Title */}
        <p className="my-4 text-lg font-semibold text-gray-800">
          {props.title}
        </p>

        {/* Stock Availability */}
        <div className="flex gap-[20px]">
          <p
            className={`${
              props.available ? "text-green-500" : "text-red-500"
            } text-md`}
          >
            {props.available ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Price, Cart Icon, and Add to Cart Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-[#374151] text-[26px] font-bold">
            ${props.price}
          </div>

          <Link to="/cart" className="text-[#374151] text-[18px] font-bold">
            <i className="fas fa-shopping-cart"></i>
          </Link>

          <button
            className="bg-[#ff4141] text-white py-[5px] px-[10px] rounded-lg cursor-pointer hover:bg-red-600"
            onClick={() => addToCart(props.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
