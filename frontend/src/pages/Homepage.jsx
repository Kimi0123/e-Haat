import React, { useState } from "react";
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
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Homepage_after() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleClick = (label) => {
    const path = `/category/${label.toLowerCase().replace(/[\s&]+/g, "-")}`;
    navigate(path);
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`Added "${product.title}" to cart. Total items: ${cart.length + 1}`);
  };

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

  const flashItems = [
    {
      img: "/iphone.png",
      title: "Apple iPhone 15 | A16 Bionic | 48MP Main Camera",
      discount: "24%",
      price: "Rs. 104,100",
      original: "Rs. 124,100",
    },
    {
      img: "/dress.png",
      title: "Women's Floral Print Backless Long Dress",
      discount: "15%",
      price: "Rs. 2,125",
      original: "Rs. 2500",
    },
    {
      img: "/menshirt.png",
      title: "Men's Linen Button-Down Casual Shirt",
      discount: "20%",
      price: "Rs. 1,600",
      original: "Rs. 2000",
    },
    {
      img: "/eyeshadow.png",
      title: "Highly Pigmented Natural Eyeshadow Palette",
      discount: "10%",
      price: "Rs. 1,080",
      original: "Rs. 1200",
    },
  ];

  const justForYouItems = [
    {
      title: "Black TWS Wireless Earbuds Pro Bluetooth Connectivity",
      price: "Rs. 2,200",
      img: "/earbuds.png",
    },
    {
      title: "New Thick Soled Slide Sandals, Slip-On Casual Loafers",
      price: "Rs. 2,900",
      img: "/sandals.png",
    },
    {
      title: "Fashionable Husky Pattern Anti-Fall Matte Sand Case",
      price: "Rs. 450",
      img: "/huskycase.png",
    },
    {
      title: "SUMWON Premium Linen Look Skater Fit Pants",
      price: "Rs. 2,450",
      img: "/pants1.png",
    },
    {
      title: "Cowgirl Boots, Thick Sole Mid-Calf High Heel Zipper",
      price: "Rs. 5,600",
      img: "/boots.png",
    },
    {
      title: "iPhone 16 Pro Max 256GB",
      price: "Rs. 207,000",
      img: "/iphone16.png",
    },
    {
      title: "Plastic Geometric Classic Never Outdated Glasses",
      price: "Rs. 1,800",
      img: "/glasses.png",
    },
    {
      title: "Bohemian Style Beaded Bracelets With Shell, Beads",
      price: "Rs. 650",
      img: "/bracelets.png",
    },
    {
      title: "Anua – Heartleaf Silky Moisture Sun Cream 50ml",
      price: "Rs. 2,300",
      img: "/cream.png",
    },
    {
      title: "Classic Luxury Men Watch Business Leather Strap Quartz",
      price: "Rs. 6,450",
      img: "/watch.png",
    },
    {
      title: "PETITE Autumn Casual Long Sleeve Slim Fit Shirt",
      price: "Rs. 1,350",
      img: "/stripedshirt.png",
    },
    {
      title: "L.A. Colors Mineral Pressed Powder",
      price: "Rs. 600",
      img: "/lapowder.png",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Sidebar + Banner */}
      <div className="flex px-10 py-6 gap-6 bg-gray-50">
        {/* Sidebar */}
        <aside className="w-1/5">
          <div className="bg-white border rounded-xl shadow-sm">
            <h2 className="bg-red-600 text-white px-4 py-2 font-semibold text-sm rounded-t-xl">
              Shop by Categories
            </h2>
            <ul className="divide-y">
              {categories.slice(0, 5).map(({ icon, label }, i) => (
                <li
                  key={i}
                  onClick={() => handleClick(label)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium cursor-pointer hover:text-red-600 hover:bg-gray-100 transition-colors text-gray-800"
                >
                  <span className="text-lg text-gray-800">{icon}</span>
                  <span className="text-gray-800">{label}</span>
                </li>
              ))}
              <li
                className="flex items-center justify-center px-4 py-3 text-sm font-medium cursor-pointer text-blue-600 hover:underline"
                onClick={() => alert("Expand to show all categories")}
              >
                View All Categories
              </li>
            </ul>
          </div>
        </aside>

        {/* Banner */}
        <section className="w-4/5">
          <div className="rounded overflow-hidden relative h-80 shadow">
            <img
              src="/images/myphoto.jpg"
              alt="Promotional banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center px-10 text-white leading-tight">
              <p className="text-4xl font-black">Best Place</p>
              <p className="text-2xl italic">To Find</p>
              <p className="text-5xl font-extrabold mt-1">What You Are</p>
              <p className="text-2xl italic">Looking For</p>
              <button className="btn bg-black mt-4 px-6 py-2 text-sm rounded hover:bg-gray-800 w-fit text-white border-none">
                SHOP NOW
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Flash Sale */}
      <section className="px-10 pb-10 bg-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black">
          FLASH SALE <span className="text-blue-500 text-xl">⚡</span>
        </h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
          {flashItems.map((item, i) => (
            <div
              key={i}
              className="min-w-[220px] bg-white border shadow-sm rounded p-4 text-black flex-shrink-0"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <p className="text-sm font-medium text-black">{item.title}</p>
              <div className="mt-2">
                <span className="badge badge-error text-white">
                  -{item.discount} off
                </span>
              </div>
              <p className="text-lg font-bold text-black mt-1">{item.price}</p>
              <p className="text-sm line-through text-gray-500">{item.original}</p>
              <button
                onClick={() => addToCart(item)}
                className="btn mt-4 bg-red-600 hover:bg-red-700 text-white btn-sm w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Just For You */}
      <section className="px-10 py-8 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-black">JUST FOR YOU</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {justForYouItems.map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded shadow-sm p-4 text-black hover:shadow-md transition duration-200 flex flex-col"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-44 object-cover rounded mb-2"
              />
              <p className="text-sm font-medium flex-grow">{item.title}</p>
              <p className="text-red-600 font-bold text-base mt-2">{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="btn mt-4 bg-red-600 hover:bg-red-700 text-white btn-sm w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
