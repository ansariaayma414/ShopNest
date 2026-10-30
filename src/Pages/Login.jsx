import React from "react";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {};
    if (email.trim() === "") {
      newErrors.email = "Email cannot be empty";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (password.trim() === "") {
      newErrors.password = "Please enter your password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    const validate = validateForm();
    if (!validate) {
      return;
    }

    dispatch({
      type: "LOGIN",
      payload: { email: email.trim() },
    });
    console.log("Login action dispatched");
    navigate(from, { replace: true });
  };
  return (
    <div className="min-h-screen bg-[#FDF8F4] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C211F]">ShopNest</h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Login to continue shopping.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-semibold text-[#1C211F] mb-2">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Enter your details to access your account.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1C211F] mb-2">
                Email Address
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border border-gray-200
                outline-none focus:border-[#7C5CFF]
                focus:ring-2 focus:ring-[#7C5CFF]/10 transition ${errors.email ? "border-red-500" : "border-gray-200"}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#1C211F]">
                  Password
                </label>

                <span className="text-sm text-[#7C5CFF] cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-lg border border-gray-200
                outline-none focus:border-[#7C5CFF]
                focus:ring-2 focus:ring-[#7C5CFF]/10 transition ${errors.password ? "border-red-500" : "border-gray-200"}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#7C5CFF]" />

              <span className="text-sm text-gray-500">Remember me</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#7C5CFF] text-white py-3 rounded-lg
              font-medium hover:bg-[#6948e8] transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <span className="text-[#7C5CFF] font-medium cursor-pointer hover:underline">
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
