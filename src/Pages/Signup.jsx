
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (password === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!terms) {
      newErrors.terms = "Please agree to the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch({
      type: "SIGNUP",
      payload: {
        name: name.trim(),
        email: email.trim(),
      },
    });

    navigate("/");
  };

  const inputClass = (error) =>
    `w-full rounded-lg border bg-[#141916] py-3 pl-11 pr-12
     text-sm text-[#F4F6F4] outline-none
     placeholder:text-[#77847D] transition
     focus:ring-2 focus:ring-[#3D9B79]/15
     ${
       error
         ? "border-[#E16B6B]"
         : "border-[#303A34] focus:border-[#3D9B79]"
     }`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101412] px-4 py-12">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-9 text-center">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold tracking-tight text-[#F4F6F4]">
              Shop<span className="text-[#3D9B79]">Nest</span>
            </span>
          </Link>

          <p className="mt-3 text-sm text-[#A5AEA8]">
            Create your account and start shopping.
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-2xl border border-[#303A34] bg-[#191F1C] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.12)] sm:p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-[#F4F6F4]">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-[#A5AEA8]">
              Enter your details to create your ShopNest account.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="mb-2 block text-sm font-medium text-[#F4F6F4]"
              >
                Full Name
              </label>

              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5AEA8]"
                />

                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass(errors.name)}
                />
              </div>

              {errors.name && (
                <p className="mt-2 text-xs text-[#E16B6B]">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-medium text-[#F4F6F4]"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5AEA8]"
                />

                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass(errors.email)}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-xs text-[#E16B6B]">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="mb-2 block text-sm font-medium text-[#F4F6F4]"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5AEA8]"
                />

                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  className={inputClass(errors.password)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A5AEA8] hover:text-[#3D9B79]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-[#E16B6B]">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm-password"
                className="mb-2 block text-sm font-medium text-[#F4F6F4]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5AEA8]"
                />

                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  className={inputClass(errors.confirmPassword)}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A5AEA8] hover:text-[#3D9B79]"
                >
                  {showConfirmPassword
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-[#E16B6B]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#3D9B79]"
                />

                <span className="text-sm leading-6 text-[#A5AEA8]">
                  I agree to the{" "}
                  <span className="font-medium text-[#3D9B79]">
                    Terms & Conditions
                  </span>
                </span>
              </label>

              {errors.terms && (
                <p className="mt-2 text-xs text-[#E16B6B]">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#3D9B79] py-3.5 text-sm font-semibold text-white transition hover:bg-[#328568] active:scale-[0.99]"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-[#A5AEA8]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#3D9B79] transition hover:text-[#65C9A3] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-[#77847D]">
          ShopNest · A better way to shop
        </p>
      </div>
    </main>
  );
};

export default Signup;
