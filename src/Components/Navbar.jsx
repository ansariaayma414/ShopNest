import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Cart from "../Pages/Cart";

export const Navbar = () => {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    
    navigate(`/search?q=${encodeURIComponent(search)}`);  // search = user search 
  };

  return (
    <nav className="w-full h-20 px-10 flex items-center justify-between bg-white shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 object-contain"
          src="https://cdn-icons-png.flaticon.com/128/9001/9001771.png"
          alt="ShopNest Logo"
        />

        <p className="text-2xl font-bold text-gray-800">
          ShopNest
        </p>
      </div>

      {/* Navigation */}
      <ul className="flex items-center gap-8 text-gray-600 font-medium">

        <Link to="/">
          <li className="cursor-pointer hover:text-black transition">
            Home
          </li>
        </Link>

        <li className="cursor-pointer hover:text-black transition">
          Product
        </li>

        <li className="cursor-pointer hover:text-black transition">
          Categories
        </li>

        <li className="cursor-pointer hover:text-black transition">
          About
        </li>

      </ul>

      {/* Search + Icons */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="flex items-center w-64 h-10 px-4 border border-gray-300 rounded-full focus-within:border-black transition">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            type="text"
            placeholder="Search for products"
            className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />

          <img
            onClick={handleSearch}
            className="w-5 h-5 cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
            alt="Search"
          />

        </div>

            <Link to ="/wishlist">
        <img
          className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          src="https://cdn-icons-png.flaticon.com/128/151/151910.png"
          alt=""
        />
  </Link>
        <img
          className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
          alt=""
        />

        {/* Cart */}
       <Link to="/cart"> 
       <img
          className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png"
          alt="Cart" 
          />
          </Link>

      </div>

    </nav>
  );
};