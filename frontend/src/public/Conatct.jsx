import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNotification } from "../NotificationContext";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      showNotification(
        "success",
        "Message Sent",
        "Thank you for contacting us! We'll get back to you soon."
      );
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      content: "e-Haat HQ, Kathmandu, Nepal",
      description: "Visit our headquarters",
    },
    {
      icon: "📞",
      title: "Phone",
      content: "+977 9800000000",
      description: "Call us anytime",
    },
    {
      icon: "✉️",
      title: "Email",
      content: "support@ehaat.com",
      description: "Send us an email",
    },
    {
      icon: "🕒",
      title: "Business Hours",
      content: "Mon - Fri: 9AM - 6PM",
      description: "We're here to help",
    },
  ];

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 pt-[140px] pb-20 text-gray-900">
        {/* Hero Section */}
        <motion.section
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            Get in <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Have questions or need support? We're here to help you with anything
            you need.
          </p>
        </motion.section>

        {/* Contact Info Grid */}
        <motion.section
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{info.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-red-600">
                {info.title}
              </h3>
              <p className="text-gray-800 font-medium mb-1">{info.content}</p>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Contact Form Section */}
        <motion.section
          className="grid lg:grid-cols-2 gap-16 items-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-red-600">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="space-y-8"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-red-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-red-600">
                Why Contact Us?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✓</span>
                  Product inquiries and support
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✓</span>
                  Order tracking assistance
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✓</span>
                  Partnership opportunities
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✓</span>
                  Feedback and suggestions
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Response Time
              </h3>
              <p className="text-gray-700 mb-4">
                We typically respond within 24 hours during business days.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Online now
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
