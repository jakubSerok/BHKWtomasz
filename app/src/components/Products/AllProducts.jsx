import React, { useEffect, useState } from "react";
import Item from "./Item";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center py-10">
      {allProducts.map((product) => (
        <Item
          key={product.id}
          id={product.id}
          title={product.title}
          images={product.images}
          price={product.price}
          stock={product.stock}
          available={product.available}
          productCode={product.productCode}
        />
      ))}
    </div>
  );
};

export default AllProducts;
