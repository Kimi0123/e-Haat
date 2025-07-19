// Categories.jsx
import React from "react";
import {
  FaMobileAlt,
  FaShoppingBag,
  FaTshirt,
  FaGlasses,
  FaCoffee,
  FaLaptop,
  FaBlender,
  FaCartPlus,
  FaChild,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const categories = [
  { icon: <FaMobileAlt />, label: "Smartphones" },
  { icon: <FaShoppingBag />, label: "Women's Fashion" },
  { icon: <FaTshirt />, label: "Men's Fashion" },
  { icon: <FaGlasses />, label: "Accessories" },
  { icon: <FaCoffee />, label: "Cosmetics" },
  { icon: <FaLaptop />, label: "Laptops" },
  { icon: <FaBlender />, label: "Home Appliances" },
  { icon: <FaCartPlus />, label: "Groceries" },
  { icon: <FaCartPlus />, label: "Footwear" },
  { icon: <FaChild />, label: "Kids & Toys" },
];

export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (label) => {
    const path = `/category/${label.toLowerCase().replace(/[\s&]+/g, "-")}`;
    navigate(path);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 text-gray-900">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-red-600">
        Shop by Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.map(({ icon, label }) => (
          <div
            key={label}
            onClick={() => handleCategoryClick(label)}
            className="cursor-pointer bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCategoryClick(label)}
          >
            <div className="text-black text-5xl mb-4">{icon}</div>
            <p className="text-lg font-semibold text-center text-gray-800">
              {label}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
