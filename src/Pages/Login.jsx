
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (email.trim() === "") {
      newErrors.email = "Email cannot be empty";
    } else if (!emailRegex.test(email.trim())) {
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

    if (!validateForm()) return;

    dispatch({
      type: "LOGIN",
      payload: { email: email.trim() },
    });

    navigate(from, { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101412] px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="mb-9 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2"
          >
            <span className="text-3xl font-bold tracking-tight text-[#F4F6F4]">
              Shop<span className="text-[#3D9B79]">Nest</span>
            </span>
          </Link>

          <p className="mt-3 text-sm text-[#A5AEA8]">
            Welcome back! Sign in to continue shopping.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#303A34] bg-[#191F1C] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.12)] sm:p-8">

          <div className="mb-7">
            <h1 className="text-2xl font-bold text-[#F4F6F4]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-[#A5AEA8]">
              Enter your details to access your account.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
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
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className={`w-full rounded-lg border bg-[#141916] py-3 pl-11 pr-4 text-sm text-[#F4F6F4] outline-none placeholder:text-[#77847D] transition focus:ring-2 focus:ring-[#3D9B79]/15 ${
                    errors.email
                      ? "border-[#E16B6B]"
                      : "border-[#303A34] focus:border-[#3D9B79]"
                  }`}
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
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-[#F4F6F4]"
                >
                  Password
                </label>

                <span className="text-xs font-medium text-[#3D9B79]">
                  Forgot Password?
                </span>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5AEA8]"
                />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  className={`w-full rounded-lg border bg-[#141916] py-3 pl-11 pr-12 text-sm text-[#F4F6F4] outline-none placeholder:text-[#77847D] transition focus:ring-2 focus:ring-[#3D9B79]/15 ${
                    errors.password
                      ? "border-[#E16B6B]"
                      : "border-[#303A34] focus:border-[#3D9B79]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A5AEA8] transition hover:text-[#3D9B79]"
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

            {/* Remember Me */}
            <label className="flex w-fit cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#3D9B79]"
              />

              <span className="text-sm text-[#A5AEA8]">
                Remember me
              </span>
            </label>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#3D9B79] py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#328568] active:scale-[0.99]"
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <p className="mt-7 text-center text-sm text-[#A5AEA8]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#3D9B79] transition hover:text-[#65C9A3] hover:underline"
            >
              Create Account
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

export default Login;
