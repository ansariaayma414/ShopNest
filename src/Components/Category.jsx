
import React from "react";
import { categories } from "./array";
import { Link } from "react-router-dom";

export const Category = () => {
  return (
    <section className="bg-[#101412] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
              Explore Collections
            </p>

            <h2 className="text-2xl font-bold text-[#F4F6F4] md:text-3xl">
              Shop By Category
            </h2>
          </div>

          <Link
            to="/categories"
            className="whitespace-nowrap text-sm font-medium text-[#3D9B79] transition hover:text-[#65C9A3]"
          >
            View All →
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 md:gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/categories"
              className="group overflow-hidden rounded-xl border border-[#303A34] bg-[#191F1C] transition-all duration-300 hover:-translate-y-1 hover:border-[#3D9B79] hover:shadow-[0_10px_30px_rgba(61,155,121,0.12)]"
            >
              {/* Image */}
              <div className="overflow-hidden bg-[#26332D]">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-40"
                />
              </div>

              {/* Category Information */}
              <div className="p-3 sm:p-4">
                <h3 className="text-base font-semibold text-[#F4F6F4] transition-colors group-hover:text-[#3D9B79]">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-[#A5AEA8] sm:text-sm">
                  {category.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Category;
