import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Help() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submission logic here
    alert("Your message has been submitted!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      <main className="flex-1 px-8 py-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Help & Support</h1>

        <div className="bg-white p-6 rounded-md shadow-md max-w-2xl space-y-6">
          <p className="text-gray-700">
            We're here to help! Please fill out the form below or contact us
            directly at{" "}
            <a
              href="mailto:support@example.com"
              className="text-red-600 hover:underline"
            >
              support@example.com
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
