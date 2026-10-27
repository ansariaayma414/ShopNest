import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z]+$/.test(name)) {
      newErrors.name = "Name can only contain letters";
    }
    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email must be valid";
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }
    if (password.length < 8) {
      newErrors.password = "Password length must be atleast 8 characters";
    }
    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password do not match";
    }
    if (!terms) {
      newErrors.terms = "Terms and conditions should be checked";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) {
      return;
    }
    console.log("form submitted");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-[#FDF8F4] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C211F]">ShopNest</h1>

          <p className="text-gray-500 mt-2">
            Create your account and start shopping
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-semibold text-[#1C211F] mb-2">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Enter your details to create your ShopNest account.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#1C211F] mb-2">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.name ? "border-red:500" : "border-gray-200"}`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-medium text-[#1C211F] mb-2">
                Email Address
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.email ? "border-red:500" : "border-gray-200"}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm font-medium text-[#1C211F] mb-2">
                Password
              </label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create a password"
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.password ? "border-red:500" : "border-gray-200"}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#1C211F] mb-2">
                Confirm Password
              </label>

              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 
                outline-none focus:border-[#7C5CFF] focus:ring-2 
                focus:ring-[#7C5CFF]/10 transition ${errors.confirmPassword ? "border-red:500" : "border-gray-200"}`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1 accent-[#7C5CFF]"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />

              <p className="text-sm text-gray-500">
                I agree to the{" "}
                <span className="text-[#7C5CFF] cursor-pointer">
                  Terms & Conditions
                </span>
              </p>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-[#7C5CFF] text-white py-3 rounded-lg
              font-medium hover:bg-[#6948e8] transition duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span className="text-[#7C5CFF] font-medium cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
