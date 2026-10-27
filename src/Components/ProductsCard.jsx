import React from "react";
import heart from "../assets/heart.png";
import { useNavigate } from "react-router-dom";

export const ProductsCard = ({ products, heading, isDynamic = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDF8F4] p-5 rounded-xl">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#1C1C1E]">
            {heading.header}
          </h2>

          <p className="text-sm text-gray-500 mt-1">{heading.para}</p>
        </div>

        <p className="text-sm font-medium text-[#7C5CFF] cursor-pointer hover:underline">
          View All →
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((arrival) => (
          <div
            key={arrival.id}
            className="relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Wishlist */}
            <button className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-sm hover:scale-110 transition-transform">
              <img src={heart} alt="Wishlist" width="22" height="22" />
            </button>

            {/* Product Image */}
            <div
              className={`h-52 flex items-center justify-center bg-white ${
                isDynamic ? "cursor-pointer" : ""
              }`}
              onClick={() => {
                if (isDynamic) {
                  navigate(`/product/${arrival.id}`);
                }
              }}
            >
              <img
                src={arrival.image}
                alt={arrival.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-base font-medium text-[#1C1C1E] truncate">
                {arrival.name}
              </h2>

              <p className="text-base font-semibold text-[#1C1C1E] mt-2">
                ${arrival.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">⭐ {arrival.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsCard;
