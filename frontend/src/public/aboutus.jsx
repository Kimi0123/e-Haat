import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <>
      {/* Navbar removed, now global */}
      <main className="max-w-7xl mx-auto px-6 pt-[140px] pb-20 text-gray-900">
        {/* Hero Section */}
        <motion.section
          className="text-center max-w-3xl mx-auto mb-24"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            About <span className="text-red-600">E-Haat</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Connecting you with the best products from trusted sellers, with
            effortless shopping and reliable delivery.
          </p>
        </motion.section>

        {/* Our Story */}
        <motion.section
          className="grid md:grid-cols-2 gap-16 items-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-semibold mb-6 text-red-600">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Founded in 2024, E-Haat started with a simple mission: to empower
              local businesses and bring quality products right to your
              doorstep. We believe shopping should be seamless, enjoyable, and
              supportive of communities. Our curated marketplace ensures every
              item meets strict quality standards and offers great value.
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="story.webp"
              alt="Our story"
              className="rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </motion.section>

        {/* Our Values */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-semibold mb-12 text-center text-red-600">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: "Reliability",
                desc: "Timely delivery and trustworthy sellers to ensure your peace of mind.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h11M9 21V3M20 14h-5l-2 3"
                  />
                ),
                title: "Community",
                desc: "Supporting local businesses and creating a vibrant marketplace.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h6M7 16h10M4 6h16M4 18h16"
                  />
                ),
                title: "Quality",
                desc: "Carefully selected products that meet our high standards.",
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                className="p-8 border rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <svg
                  className="mx-auto mb-6 h-14 w-14 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  {val.icon}
                </svg>
                <h3 className="text-2xl font-semibold mb-4">{val.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center py-16 bg-red-50 rounded-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to explore our collection?
          </h2>
          <p className="mb-8 text-gray-700 text-lg leading-relaxed max-w-xl mx-auto">
            Browse our products and experience the best of E-Haat today!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => (window.location.href = "/")}
            className="btn bg-red-600 text-white px-10 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Shop Now
          </motion.button>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
