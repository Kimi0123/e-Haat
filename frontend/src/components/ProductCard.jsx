import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-xl transition-shadow">
      <a href={`/products/${product.id}`}>
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300x200"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t"
        />
      </a>
      <div className="p-4">
        <a
          href={`/products/${product.id}`}
          className="block font-bold text-lg mb-1 hover:text-primary"
        >
          {product.name}
        </a>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold text-primary">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="line-through text-gray-400 text-sm">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{product.category}</span>
          <span className="text-xs text-yellow-500">
            ★ {product.rating || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
