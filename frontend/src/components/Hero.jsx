import React from "react";

const Hero = () => {
  return (
    <section className="py-15 bg-gradient-to-br from-red-100 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:flex items-center gap-16">
        {/* Text content */}
        <div className="flex-1 space-y-8">
          <h1 className="text-6xl md:text-7xl font-extrabold text-red-800 leading-tight">
            Discover Everything <br />
            You Need in One Place
          </h1>
          <p className="text-xl md:text-2xl text-red-700 max-w-xl">
            From daily essentials to festive gifts — shop quality products from local sellers across Nepal.
          </p>
          <div className="flex gap-6">
            <a
              href="/signup"
              className="btn bg-red-600 text-white hover:bg-red-700 px-8 py-4 text-lg"
            >
              Start Shopping
            </a>
            <a
              href="#category-section"
              className="btn btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white px-8 py-4 text-lg"
            >
              Browse Categories
            </a>
          </div>
        </div>

        {/* Image with angled clipped shape */}
        <div className="flex-1 mt-12 md:mt-0">
          <div
            className="relative w-full max-w-lg mx-auto md:mx-0 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0% 100%)'
            }}
          >
            <img
              src="/src/pages/banner.jpg"
              alt="Banner"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
