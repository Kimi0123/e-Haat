import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const deals = [
  {
    title: "Combo: Wireless Earbuds + Charging Case",
    price: "Rs. 3,200",
    original: "Rs. 4,000",
    discount: "20%",
    img: "earbud_combo.png",
  },
  {
    title: "Deal of the Week: Foldable Laptop Stand",
    price: "Rs. 950",
    original: "Rs. 1,500",
    discount: "37%",
    img: "laptop_stand.png",
  },
  {
    title: "Bundle: Skincare 3-Step Kit (Cleanser + Serum + Cream)",
    price: "Rs. 2,999",
    original: "Rs. 4,500",
    discount: "33%",
    img: "skincare_bundle.png",
  },
  {
    title: "Summer Sale: Men's Casual Shirt + Shorts Combo",
    price: "Rs. 2,300",
    original: "Rs. 3,000",
    discount: "23%",
    img: "shirt_short_combo.png",
  },
  {
    title: "Limited Time Offer: Bluetooth Smartwatch",
    price: "Rs. 1,850",
    original: "Rs. 2,650",
    discount: "30%",
    img: "smartwatch.png",
  },
];

export default function Deals() {
  return (
    <>
      <Navbar />

      <main className="px-6 sm:px-10 py-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">
          Today's Best Deals 🔥
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {deals.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition duration-200 flex flex-col p-4"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <p className="font-semibold text-sm text-gray-800 flex-grow">
                {item.title}
              </p>
              <div className="mt-2">
                <span className="badge badge-error text-white">
                  -{item.discount}
                </span>
              </div>
              <p className="text-lg font-bold text-black mt-1">{item.price}</p>
              <p className="line-through text-sm text-gray-500">
                {item.original}
              </p>
              <button className="btn mt-4 bg-red-600 text-white hover:bg-red-700 btn-sm">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
