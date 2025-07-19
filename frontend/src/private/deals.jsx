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

      <main className="px-6 sm:px-10 pt-[140px] pb-16 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-10 text-red-600 text-center">
          🔥 Today's Best Deals
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {deals.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow border hover:shadow-lg transition duration-300 p-4 flex flex-col"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <p className="font-semibold text-base text-black mb-2">
                {item.title}
              </p>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm bg-red-600 text-white px-2 py-0.5 rounded-full">
                  -{item.discount}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-red-600">{item.price}</p>
                <p className="line-through text-sm text-gray-500">
                  {item.original}
                </p>
              </div>

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
