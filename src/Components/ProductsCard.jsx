
import React from "react";
import heart from "../assets/heart.png";
import { useNavigate } from "react-router-dom";

export const ProductsCard = ({
  products,
  heading,
  isDynamic = false,
}) => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#101412] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
              Discover Products
            </p>

            <h2 className="text-2xl font-bold text-[#F4F6F4] md:text-3xl">
              {heading.header}
            </h2>

            <p className="mt-2 text-sm text-[#A5AEA8]">
              {heading.para}
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="shrink-0 text-sm font-medium text-[#3D9B79] transition hover:text-[#65C9A3]"
          >
            View All →
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {products.map((arrival) => (
            <div
              key={arrival.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#303A34] bg-[#191F1C] transition-all duration-300 hover:-translate-y-1 hover:border-[#3D9B79] hover:shadow-[0_10px_30px_rgba(61,155,121,0.12)]"
            >
              {/* Wishlist Button */}
              <button
                type="button"
                aria-label={`Add ${arrival.name} to wishlist`}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#303A34] bg-[#26332D] transition hover:scale-110 hover:border-[#3D9B79]"
              >
                <img
                  src={heart}
                  alt=""
                  className="h-5 w-5 brightness-0 invert"
                />
              </button>

              {/* Product Image */}
              <div
                className={`flex h-44 items-center justify-center overflow-hidden bg-[#F4F6F4] sm:h-52 ${
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
                  loading="lazy"
                  className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Information */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-2 min-h-[48px] text-sm font-medium leading-6 text-[#F4F6F4] sm:text-base">
                  {arrival.name}
                </h3>

                <div className="mt-auto pt-3">
                  <p className="text-lg font-bold text-[#3D9B79]">
                    ${arrival.price}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-amber-400">
                      ★
                    </span>

                    <span className="text-sm text-[#A5AEA8]">
                      {arrival.rating ?? "Not rated"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Products State */}
        {products.length === 0 && (
          <div className="mt-8 rounded-xl border border-[#303A34] bg-[#191F1C] px-6 py-12 text-center">
            <p className="text-lg font-semibold text-[#F4F6F4]">
              No products found
            </p>
            <p className="mt-2 text-sm text-[#A5AEA8]">
              Try exploring another category or search term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsCard;
