import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/admin/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  // Fetch product data
  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:3001/allproducts");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove a product
  const removeProduct = async (id) => {
    try {
      await fetch("http://localhost:3001/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchInfo(); // Refresh product list after removal
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] py-[10px] px-[50px] m-[30px] rounded-md bg-white">
      <h1>All Products List</h1>
      <div className="grid grid-cols-5 gap-[10px] w-full py-[20px] text-[#454545] text-[15px] font-bold">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      <div className="w-full overflow-y-auto">
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product.id}>
            <div className="grid grid-cols-5 gap-[10px] w-full items-center">
              <img
                src={product.image}
                alt={`${product.name} image`}
                className="h-[80px]"
              />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <img
                src={cross_icon}
                onClick={() => removeProduct(product.id)}
                alt="Remove product"
                className="m-auto cursor-pointer"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
