import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const EhaatLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const categories = [
    "Electronics", "Clothing", "Beauty", "Home", "Furniture", "Toys",
    "Groceries", "Accessories", "Footwear", "Kitchen", "Stationery", "Handicrafts"
  ];

  const flashSale = [
    {
      title: "iPhone 15 - 128GB | A16 Chip",
      price: "Rs. 104,100",
      original: "Rs. 124,100",
      discount: "16%",
      image: "/iphone.png"
    },
    {
      title: "Men's Casual Shirt - Linen",
      price: "Rs. 1,600",
      original: "Rs. 2,000",
      discount: "20%",
      image: "/menshirt.png"
    },
    {
      title: "Floral Long Dress - Backless",
      price: "Rs. 2,125",
      original: "Rs. 2,500",
      discount: "15%",
      image: "/dress.png"
    },
    {
      title: "Cordless Beard Trimmer - USB",
      price: "Rs. 1,800",
      original: "Rs. 2,200",
      discount: "18%",
      image: "/trimmer.png"
    },
  ];

  const justForYou = [
    {
      title: "Black TWS Wireless Earbuds Pro Bluetooth Connectivity",
      price: "Rs. 2,200",
      image: "/earbuds.png",
    },
    {
      title: "New Thick Soled Slide Sandals, Slip-On Casual Loafers",
      price: "Rs. 2,900",
      image: "/sandals.png",
    },
    {
      title: "Fashionable Husky Pattern Anti-Fall Matte Sand Case",
      price: "Rs. 450",
      image: "/huskycase.png",
    },
    {
      title: "SUMWON Premium Linen Look Skater Fit Pants",
      price: "Rs. 2,450",
      image: "/pants1.png",
    },
    {
      title: "Cowgirl Boots, Thick Sole Mid-Calf High Heel Zipper",
      price: "Rs. 5,600",
      image: "/boots.png",
    },
    {
      title: "iPhone 16 Pro Max 256GB",
      price: "Rs. 207,000",
      image: "/iphone16.png",
    },
    {
      title: "Plastic Geometric Classic Never Outdated Glasses",
      price: "Rs. 1,800",
      image: "/glasses.png",
    },
    {
      title: "Bohemian Style Beaded Bracelets With Shell, Beads",
      price: "Rs. 650",
      image: "/bracelets.png",
    },
    {
      title: "Anua – Heartleaf Silky Moisture Sun Cream 50ml",
      price: "Rs. 2,300",
      image: "/cream.png",
    },
    {
      title: "Classic Luxury Men Watch Business Leather Strap Quartz",
      price: "Rs. 6,450",
      image: "/watch.png",
    },
    {
      title: "PETITE Autumn Casual Long Sleeve Slim Fit Shirt",
      price: "Rs. 1,350",
      image: "/stripedshirt.png",
    },
    {
      title: "L.A. Colors Mineral Pressed Powder",
      price: "Rs. 600",
      image: "/lapowder.png",
    },
  ];

  const features = [
    { icon: "🚚", title: "Fast Delivery", description: "Delivery across Nepal in 2–4 days." },
    { icon: "💳", title: "Secure Payments", description: "Pay with Khalti, eSewa, COD." },
    { icon: "📦", title: "Wide Range", description: "From groceries to gadgets in one place." },
    { icon: "🛠️", title: "Local Support", description: "Support local Nepali sellers." }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Scroll Indicator */}
      <div
        className="scroll-indicator bg-red-600 h-1 fixed top-0 left-0 z-40"
        style={{
          width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
        }}
      ></div>

      {/* Main Content With Padding */}
      <div className="pt-[132px]">
        <Hero />

        {/* Flash Sale */}
        <section className="py-16 bg-white" data-animate>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-red-800 mb-6">⚡ Flash Sale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSale.map((item, i) => (
                <div key={i} className="border rounded-xl shadow hover:shadow-lg p-4 transition-transform hover:-translate-y-1">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
                  <p className="mt-3 font-semibold text-black">{item.title}</p>
                  <span className="badge badge-error mt-2">-{item.discount}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="font-bold text-red-600">{item.price}</p>
                    <p className="line-through text-sm text-gray-500">{item.original}</p>
                  </div>
                  <button className="btn bg-red-600 hover:bg-red-700 text-white btn-sm w-full mt-3">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Just For You */}
        <section className="py-16 bg-red-50" data-animate>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-red-800 mb-6">🎯 Just For You</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {justForYou.map((item, i) => (
                <div key={i} className="border rounded-xl shadow p-4 hover:shadow-md transition-transform hover:-translate-y-1 bg-white">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded mb-2" />
                  <p className="text-sm font-medium text-black">{item.title}</p>
                  <p className="text-red-600 font-bold mt-1">{item.price}</p>
                  <button className="btn bg-red-600 hover:bg-red-700 text-white btn-sm w-full mt-3">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white" data-animate>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-red-800 mb-12">Why Shop With e-Haat?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-red-50 p-6 rounded-xl shadow hover:shadow-md transition-transform hover:-translate-y-1">
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-red-700">{f.title}</h3>
                  <p className="text-gray-700 text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories-section" className="py-20 bg-white" data-animate>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-red-800 text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <div key={i} className="border rounded-lg p-4 text-center hover:shadow transition-transform hover:scale-105 cursor-pointer text-black">
                  <span className="text-lg font-medium">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-red-600 text-white" data-animate>
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><h3 className="text-4xl font-bold">25,000+</h3><p>Orders Delivered</p></div>
            <div><h3 className="text-4xl font-bold">15,000+</h3><p>Happy Customers</p></div>
            <div><h3 className="text-4xl font-bold">500+</h3><p>Sellers Onboard</p></div>
            <div><h3 className="text-4xl font-bold">24/7</h3><p>Support Available</p></div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white text-center">
          <h2 className="text-4xl font-bold text-red-800 mb-4">Join the e-Haat Family</h2>
          <p className="text-lg mb-6 text-gray-700">Start your seamless online shopping journey now.</p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="btn bg-red-600 text-white hover:bg-red-700">Create Account</Link>
            <Link to="/login" className="btn btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:text-white">Login</Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default EhaatLanding;
