import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      alert("Login successful");
      console.log(data);
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full mb-3"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <div className="mb-3 text-right">
            <a href="/forgot-password" className="text-primary font-semibold text-sm">
              Forgot Password?
            </a>
          </div>

          <button className="btn btn-primary w-full mb-2">Login</button>
        </form>

        <div className="divider">OR</div>

        <button className="btn btn-outline w-full flex items-center gap-2">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
