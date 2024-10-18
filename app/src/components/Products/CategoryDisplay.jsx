import React from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../../assets/1.png";
import bg2 from "../../assets/3.png";
import bg3 from "../../assets/2.png";
const categories = [
  {
    name: "SCANIA 12",
    image: bg1, // Replace with the actual image path
    link: "/products/scania12", // Update with the correct route for MAN category
  },
  {
    name: "MAN",
    image: bg2, // Replace with the actual image path
    link: "/products/man", // Update with the correct route for SCANIA 12 category
  },
  {
    name: "SCANIA 13",
    image: bg3, // Replace with the actual image path
    link: "/products/scania13", // Update with the correct route for SCANIA 13 category
  },
];

const CategoryDisplay = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (link) => {
    navigate(link);
  };

  return (
    <div className="flex flex-col pt-[100px] px-5">
      <h1 className="text-2xl font-bold mb-4">Kategorie</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-10">
        {categories.map((category, index) => (
          <div
            key={index}
            className="text-center cursor-pointer"
            onClick={() => handleCategoryClick(category.link)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48  rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <h2 className="mt-4 text-lg font-bold text-gray-800">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;
