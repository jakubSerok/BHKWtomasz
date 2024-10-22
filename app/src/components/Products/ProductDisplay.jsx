import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  if (!product) {
    return <p>Keine Produktdaten verfügbar.</p>;
  } else {
    return (
      <div className="flex flex-col lg:flex-row lg:mx-[170px] p-10 gap-10 lg:gap-[70px]">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={product.images}
            alt={product.title}
            className="w-full h-auto sm:h-[500px] lg:w-[586px] lg:h-[700px] object-cover"
          />
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-6">
          {/* Title and Price Box */}
          <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
            <h1 className="text-[#3d3d3d] text-[24px] sm:text-[32px] lg:text-[40px] font-bold mb-3">
              {product.title}
            </h1>
            <div className="flex gap-3 sm:gap-6 font-bold text-[18px] sm:text-[20px]">
              <h2 className="text-red-500">Preis für ein Stück :</h2>
              <p className="text-gray-800">€ {product.price}</p>
            </div>
          </div>

          {/* Availability Box */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <h2 className="text-[#656565] text-[16px] sm:text-[18px] lg:text-[20px] font-semibold">
              Aktie : {product.stock} Stück verfügbar
            </h2>
          </div>

          {/* Description Box */}
          <div className="bg-white p-5 rounded-lg shadow-md border">
            <h2 className="text-[18px] font-bold mb-2">Beschreibung</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-4 px-[20px] sm:px-[30px] lg:px-[40px] py-[15px] sm:py-[20px] w-[150px] sm:w-[180px] lg:w-[200px] text-[14px] sm:text-[16px] lg:text-[16px] font-semibold text-white bg-[#ff4141] mb-[40px] cursor-pointer rounded-md"
            onClick={() => {
              addToCart(product.id);
            }}
          >
            IN DEN WARENKORB LEGEN
          </button>
        </div>
      </div>
    );
  }
};

export default ProductDisplay;
