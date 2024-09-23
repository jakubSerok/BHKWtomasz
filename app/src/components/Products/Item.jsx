import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="w-[350px] md:w-[300px] transform hover:scale-105 transition-transform duration-600 px-4">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={props.images}
          alt={props.name}
          className="h-[200px] object-cover"
        />
      </Link>
      <p className="my-[6px] mx-0">{props.title}</p>

      <div className="flex gap-[20px]">
        <div className="text-[#374151] text-[18px] font-bold">
          ${props.price}
        </div>
      </div>

      <div className="flex justify-between">
        <p
          className={`my-[6px] ${
            props.available ? "text-green-500" : "text-red-500"
          }`}
        >
          {props.available ? "In Stock" : "Out of Stock"}
        </p>
        <Link to="/cart" className="text-[#374151] text-[18px] font-bold">
          <i className="fas fa-shopping-cart"></i>
        </Link>
        <button
          className="bg-[#ff4141] text-white py-[10px] px-[20px] rounded-sm cursor-pointer"
          onClick={() => addToCart(props.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Item;
