import React, { useContext } from "react";
import { ShopContext } from "../../components/Context/ShopContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../../components/Products/ProductDisplay";
const Product = () => {
  const { all_product } = useContext(ShopContext); // Fix the variable name here
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div>
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
