import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-3"
          />

          {/* Password Input with Toggle */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pr-10"
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/*Forgot Password Link */}
          <div className="mb-3 text-right">
            <a href="/forgot-password" className="text-primary font-semibold text-sm">
              Forgot Password?
            </a>
          </div>


          {/* Submit Button */}
          <button className="btn btn-primary w-full mb-2">Login</button>
        </form>

        <div className="divider">OR</div>

        {/* Google Login Button */}
        <button className="btn btn-outline w-full flex items-center gap-2">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Signup Link */}
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
