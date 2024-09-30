import React, { useEffect, useState } from "react";
import Item from "./Item";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]); // for filtered and sorted products
  const [sortOption, setSortOption] = useState("priceAsc"); // default sort option
  const [searchQuery, setSearchQuery] = useState(""); // state for search input

  useEffect(() => {
    fetch("http://localhost:3001/allproducts")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = sortProducts(data, sortOption);
        setAllProducts(sortedData);
        setDisplayedProducts(sortedData);
      });
  }, [sortOption]);

  const sortProducts = (products, option) => {
    if (option === "priceAsc") {
      return products.sort((a, b) => a.price - b.price);
    } else if (option === "priceDesc") {
      return products.sort((a, b) => b.price - a.price);
    } else if (option === "nameAsc") {
      return products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "nameDesc") {
      return products.sort((a, b) => b.title.localeCompare(a.title));
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedProducts(filteredProducts);
  };

  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-center">ALL PRODUCTS</h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {/* Search by Name */}
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full md:w-auto"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* Sort Options */}
          <select
            className="border border-gray-300 p-2 rounded w-full md:w-auto"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="priceAsc">Sort by Price: Low to High</option>
            <option value="priceDesc">Sort by Price: High to Low</option>
            <option value="nameAsc">Sort by Name: A-Z</option>
            <option value="nameDesc">Sort by Name: Z-A</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {displayedProducts.map((product) => (
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
    </div>
  );
};

export default AllProducts;