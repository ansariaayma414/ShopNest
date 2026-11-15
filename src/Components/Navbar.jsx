import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated, dispatch } = useAuth();

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const navLink =
    "text-sm font-medium text-[#A5AEA8] hover:text-[#3D9B79] transition-colors duration-200";

  const iconStyle =
    "w-6 h-6 cursor-pointer brightness-0 invert opacity-80 hover:opacity-100 hover:scale-110 transition duration-200";

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#141916] border-b border-[#303A34] shadow-lg">
      <div className="max-w-[1600px] mx-auto h-20 px-5 md:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            className="w-10 h-10 object-contain brightness-0 saturate-100 invert-[55%] sepia-[25%] saturate-[900%] hue-rotate-[105deg]"
            src="https://cdn-icons-png.flaticon.com/128/9001/9001771.png"
            alt="ShopNest Logo"
          />

          <span className="text-2xl font-bold text-[#F4F6F4] tracking-tight">
            Shop<span className="text-[#3D9B79]">Nest</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          <li>
            <Link to="/" className={navLink}>
              Home
            </Link>
          </li>

          <li className={navLink}>
            Product
          </li>

          <li className={navLink}>
            Categories
          </li>

          <li className={navLink}>
            About
          </li>
        </ul>

        {/* Search + Actions */}
        <div className="hidden md:flex items-center gap-5">

          {/* Search */}
          <div className="flex items-center w-52 lg:w-64 h-10 px-4 rounded-full bg-[#191F1C] border border-[#303A34] focus-within:border-[#3D9B79] transition duration-200">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm text-[#F4F6F4] placeholder:text-[#A5AEA8]"
            />

            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search products"
            >
              <img
                className="w-5 h-5 brightness-0 invert opacity-70"
                src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
                alt=""
              />
            </button>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" aria-label="Wishlist">
            <img
              className={iconStyle}
              src="https://cdn-icons-png.flaticon.com/128/151/151910.png"
              alt="Wishlist"
            />
          </Link>

          {/* Account */}
          {isAuthenticated ? (
            <div className="relative">

              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Account menu"
                aria-expanded={isDropdownOpen}
              >
                <img
                  className={iconStyle}
                  src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                  alt=""
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-60 bg-[#191F1C] border border-[#303A34] rounded-xl shadow-2xl py-2 z-50">

                  <div className="px-4 py-3">
                    <p className="text-xs text-[#A5AEA8]">
                      Signed in as
                    </p>

                    <p className="text-sm font-semibold text-[#F4F6F4] truncate mt-1">
                      {user?.email}
                    </p>
                  </div>

                  <div className="border-t border-[#303A34] my-1" />

                  <Link
                    to="/wishlist"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-3 text-sm text-[#A5AEA8] hover:text-[#3D9B79] hover:bg-[#26332D] transition"
                  >
                    My Wishlist
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-3 text-sm text-[#A5AEA8] hover:text-[#3D9B79] hover:bg-[#26332D] transition"
                  >
                    My Cart
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#26332D] transition"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-[#303A34] text-[#F4F6F4] text-sm hover:border-[#3D9B79] hover:text-[#3D9B79] transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-[#3D9B79] text-white text-sm font-semibold hover:bg-[#328568] transition"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Cart */}
          <Link to="/cart" aria-label="Shopping cart">
            <img
              className={iconStyle}
              src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png"
              alt="Cart"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#F4F6F4] text-2xl"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#141916] border-t border-[#303A34] px-5 py-5 space-y-5">

          <div className="flex items-center gap-2 bg-[#191F1C] border border-[#303A34] rounded-lg px-3 py-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm text-white placeholder:text-[#A5AEA8]"
            />

            <button type="button" onClick={handleSearch}>
              <span className="text-[#3D9B79]">⌕</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLink}>
              Home
            </Link>

            <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className={navLink}>
              Wishlist
            </Link>

            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className={navLink}>
              Cart
            </Link>

            {isAuthenticated ? (
              <>
                <p className="text-xs text-[#A5AEA8]">{user?.email}</p>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-left text-sm text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-[#F4F6F4]"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-[#3D9B79]"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

