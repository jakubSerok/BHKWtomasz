import React, { useEffect, useState } from "react";
import Item from "./Item";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const AllProducts = ({ category }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]); // for filtered and sorted products
  const [sortOption, setSortOption] = useState("priceAsc"); // default sort option
  const [searchQuery, setSearchQuery] = useState(""); // state for search input
  const [currentPage, setCurrentPage] = useState(1); // state for current page
  const [productsPerPage, setProductsPerPage] = useState(10); // state for products per page

  useEffect(() => {
    fetch(`${apiUrl}/allproducts`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = sortProducts(data, sortOption);

        // Filter by category if provided
        const filteredData = category
          ? sortedData.filter((product) => product.category === category)
          : sortedData;

        setAllProducts(filteredData);
        setDisplayedProducts(
          getPaginatedProducts(filteredData, currentPage, productsPerPage)
        );
      })
      .catch((error) => console.error("Error:", error));
  }, [sortOption, currentPage, category]);

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

  const getPaginatedProducts = (products, currentPage, productsPerPage) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDisplayedProducts(
      getPaginatedProducts(filteredProducts, currentPage, productsPerPage)
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setDisplayedProducts(
      getPaginatedProducts(allProducts, pageNumber, productsPerPage)
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">ALL PRODUCTS</h1>
      <div className="flex justify-between mb-4">
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
      <div className="flex justify-center mt-10">
        {[...Array(Math.ceil(allProducts.length / productsPerPage))].map(
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllProducts;
