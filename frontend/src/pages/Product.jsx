import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    // Simple localStorage cart for demo
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      exists.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    navigate("/cart");
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x400"}
          alt={product.name}
          className="w-full max-w-xs rounded shadow-lg"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold text-primary">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="line-through text-gray-400 text-lg">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
        <div className="mb-4 text-yellow-500">
          ★ {product.rating || 0} ({product.reviewCount} reviews)
        </div>
        <p className="mb-4 text-gray-700">{product.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Category:</span> {product.category}
        </div>
        <button
          className="btn btn-primary w-full md:w-auto"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
