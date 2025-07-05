// Signup.jsx
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import BASE_URL from '../utils/api.js';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!form.agree) {
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        alert(data.message || "Signup successful");
        console.log('✅ Server Response:', data);
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("Something went wrong");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('✅ Google SignUp Successful:', user);
      // You can send this to backend too if needed
    } catch (error) {
      console.error('❌ Google Sign-Up Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
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
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={form.lastName}
              onChange={handleChange}
              required
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
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              value={form.password}
              onChange={handleChange}
              required
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
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input input-bordered w-full pr-10"
              value={form.confirmPassword}
              onChange={handleChange}
              required
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
              />
              <span className="label-text">I agree to the Terms and Conditions</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-full mb-2">
            Sign Up
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="btn btn-outline w-full flex items-center justify-center gap-2 mb-4"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          <p className="mt-4 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-primary font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
