import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaStar } from "react-icons/fa";

export default function CategoryProducts() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ category });
        const response = await fetch(
          `http://localhost:5000/api/products/search?${params}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError("Could not load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 pt-[140px] pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {category
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </h1>
          <p className="text-gray-600">
            {isLoading
              ? "Loading products..."
              : error
              ? error
              : `${products.length} products found`}
          </p>
        </motion.div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mr-4"></div>
            <span className="text-gray-500 text-lg">Loading products...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found in this category
            </h3>
            <button
              onClick={() => navigate("/categories")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Browse Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={
                    product.images?.[0]
                      ? `http://localhost:5000${product.images[0]}`
                      : "/placeholder-product.png"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-product.png";
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-sm text-gray-600">
                      {product.rating || 4.5}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({product.reviewCount || 120})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-red-600">
                      Rs. {product.price}
                    </span>
                    {product.originalPrice &&
                      parseFloat(product.originalPrice) >
                        parseFloat(product.price) && (
                        <span className="text-sm text-gray-500 line-through">
                          Rs. {product.originalPrice}
                        </span>
                      )}
                  </div>
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic here
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
