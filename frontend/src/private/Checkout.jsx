import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    paymentMethod: "COD",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const order = {
        userId: 1, // Demo user
        items: cart.map(({ id, name, price, qty }) => ({
          id,
          name,
          price,
          qty,
        })),
        totalAmount: total,
        shippingAddress: {
          name: form.name,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          phone: form.phone,
        },
        billingAddress: {
          name: form.name,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          phone: form.phone,
        },
        paymentMethod: form.paymentMethod,
      };
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error("Order failed");
      setSuccess(true);
      localStorage.removeItem("cart");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {success ? (
        <div className="text-center text-green-600 text-xl py-20">
          Order placed successfully! Redirecting...
        </div>
      ) : (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="input input-bordered w-full"
              value={form.address}
              onChange={handleChange}
              required
            />
            <div className="flex gap-2">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="input input-bordered w-full"
                value={form.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="input input-bordered w-full"
                value={form.state}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP"
                className="input input-bordered w-full"
                value={form.zip}
                onChange={handleChange}
                required
              />
            </div>
            <select
              name="paymentMethod"
              className="select select-bordered w-full"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
            {error && <div className="text-red-500">{error}</div>}
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
          <div className="bg-base-200 rounded p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {cart.length === 0 ? (
              <div>Your cart is empty.</div>
            ) : (
              <ul className="space-y-2 mb-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span>₹{(item.price * item.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="font-bold text-lg">Total: ₹{total.toFixed(2)}</div>
          </div>
        </form>
      )}
    </main>
  );
}
