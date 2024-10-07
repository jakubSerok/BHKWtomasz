import React, { useEffect, useState } from "react";
import Item from "./Item";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const AllProducts = () => {
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
        setAllProducts(sortedData);
        setDisplayedProducts(
          getPaginatedProducts(sortedData, currentPage, productsPerPage)
        );
      })
      .catch((error) => console.error("Error:", error));
  }, [sortOption, currentPage]);

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
  };

  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-4xl font-bold text-center">ALLE PRODUKTE</h1>
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
            <option value="priceAsc">
              Sortieren nach Preis: Niedrig bis Hoch
            </option>
            <option value="priceDesc">
              Sortieren nach Preis: Hoch nach Niedrig
            </option>
            <option value="nameAsc">Sortieren nach Name: A-Z</option>
            <option value="nameDesc">Sortieren nach Name: Z-A</option>
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
