// Signup.jsx
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import BASE_URL from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNotification } from "../NotificationContext";
import LoadingSpinner from "../components/LoadingSpinner";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showNotification(
        "error",
        "Password Mismatch",
        "Passwords don't match. Please try again."
      );
      return;
    }

    if (!form.agree) {
      showNotification(
        "warning",
        "Terms Required",
        "Please agree to the terms and conditions to continue."
      );
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showNotification(
          "success",
          "Account Created",
          "Your account has been created successfully! Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showNotification(
          "error",
          "Signup Failed",
          data.message || "Unable to create account. Please try again."
        );
      }
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      showNotification(
        "error",
        "Connection Error",
        "Unable to connect to server. Please check your internet connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("✅ Google SignUp Successful:", user);
      showNotification(
        "success",
        "Google Signup",
        "Successfully signed up with Google!"
      );
      // You can send this to backend too if needed
    } catch (error) {
      console.error("❌ Google Sign-Up Error:", error);
      showNotification(
        "error",
        "Google Signup Failed",
        "Unable to sign up with Google. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="large" text="Creating your account..." />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={form.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={form.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full mb-4"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full mb-4"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              title="Enter 10 digit phone number"
              required
              disabled={isLoading}
            />

            <div className="relative mb-4">
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input input-bordered w-full pr-10"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-500"
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="form-control mb-4">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                  required
                  disabled={isLoading}
                />
                <span className="label-text">
                  I agree to the Terms and Conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mb-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="small" text="" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="btn btn-outline w-full flex items-center justify-center gap-2 mb-4"
              disabled={isLoading}
            >
              <FcGoogle className="text-xl" />
              Sign up with Google
            </button>

            <p className="mt-4 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-semibold">
                Login
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
