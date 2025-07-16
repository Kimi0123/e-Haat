import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Top Padding adjusted for navbar */}
      <div className="pt-[140px] px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-10 text-center">📞 Contact e-Haat</h1>

        {/* Contact Info + Form */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">📍 Address</h2>
              <p>e-Haat HQ, Kathmandu, Nepal</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-700">📞 Phone</h2>
              <p>+977 9800000000</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-700">✉️ Email</h2>
              <p>support@ehaat.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-red-50 p-8 rounded-xl shadow space-y-6">
            <h2 className="text-2xl font-bold text-red-700">Send Us a Message</h2>
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
