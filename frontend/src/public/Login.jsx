import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const { showNotification } = useNotification();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          "error",
          "Login Failed",
          data.message || "Invalid credentials. Please try again."
        );
        return;
      }

      // Store token in localStorage for future authenticated requests
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);

      showNotification(
        "success",
        "Login Successful",
        "Welcome back! Redirecting to homepage..."
      );

      // Navigate to homepage with all features
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Login Error:", error);
      showNotification(
        "error",
        "Connection Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="large" text="Signing you in..." />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full mb-3"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLoading}
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
                disabled={isLoading}
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="mb-3 text-right">
              <a
                href="/forgot-password"
                className="text-primary font-semibold text-sm"
              >
                Forgot Password?
              </a>
            </div>

            <button
              className="btn btn-primary w-full mb-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="small" text="" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        )}

        <div className="divider">OR</div>

        <button
          className="btn btn-outline w-full flex items-center gap-2"
          disabled={isLoading}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
