import React from "react";
import { Link } from "react-router-dom";

const ItemBlog = (props) => {
  return (
    <div className="w-[350px] md:w-[300px] transform hover:scale-105 transition-transform duration-600 px-4">
      <Link to={`/blog/${props.id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={props.images[0]} // Assuming it's an array like in the product model
          alt={props.title}
          className="h-[200px] object-cover"
        />
      </Link>
      <p className="my-[6px] mx-0">{props.title}</p>

      <div className="flex gap-[20px]">
        <div className="text-[#374151] text-[18px] font-bold">
          {props.description.substring(0, 100)}...
        </div>
      </div>

      <div className="flex justify-between">
        <Link
          to={`/blog/${props.id}`}
          className="text-[#374151] text-[18px] font-bold"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ItemBlog;
