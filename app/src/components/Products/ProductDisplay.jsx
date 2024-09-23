import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  if (!product) {
    return <p>No product data available.</p>;
  } else {
    return (
      <div className="flex mx-[170px] py-10">
        <div className="flex gap-[17px]">
          <div>
            <img src={product.images} alt="" className="w-[586px] h-[700px]" />
          </div>
        </div>
        <div className="mx-[70px] flex flex-col ">
          <h1 className="text-[#3d3d3d] text-[40px] font-bold">
            {product.title}
          </h1>
          <div className="flex my-[40px] gap-[30px] font-bold">
            <h1>Price:</h1>
            <div className="">$ {product.price}</div>
          </div>
          <div>{product.description}</div>

          <div>
            <h1 className="mt-[20px] text-[#656565] text-[20px] font-semibold">
              Stock: {product.stock} pieces available
            </h1>
          </div>
          <button
            className="px-[40px] py-[20px] w-[200px] text-[16px] font-semibold text-white bg-[#ff4141] mb-[40px] cursor-pointer"
            onClick={() => {
              addToCart(product.id);
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    );
  }
};

export default ProductDisplay;
