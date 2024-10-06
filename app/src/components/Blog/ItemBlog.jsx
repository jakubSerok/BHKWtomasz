import React from "react";
import { Link } from "react-router-dom";

const ItemBlog = (props) => {
  return (
    <div className="w-[350px] md:w-[300px] transform hover:scale-105 transition-transform duration-600 px-4">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
        <Link to={`/blog/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={props.images[0]} // Assuming it's an array like in the product model
            alt={props.title}
            className="h-[200px] object-cover w-full rounded-md"
          />
        </Link>
        <p className="my-4 text-xl font-semibold text-gray-800">
          {props.title}
        </p>

        <div className="text-[#374151] text-[16px] font-light">
          {props.description.substring(0, 100)}...
        </div>

        <div className="flex justify-between mt-4">
          <Link
            to={`/blog/${props.id}`}
            className="text-blue-600 text-[16px] font-medium hover:underline"
          >
            Mehr lesen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemBlog;
