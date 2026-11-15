
import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Advertisment = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: "Everyday Essentials",
      subtitle: "Simple. Useful. Stylish.",
      bg: "bg-[#191F1C]",
      accent: "bg-[#3D9B79]",
      number: "01",
    },
    {
      title: "Trending Fashion",
      subtitle: "Discover your next look.",
      bg: "bg-[#1E2A24]",
      accent: "bg-[#65C9A3]",
      number: "02",
    },
    {
      title: "Home & Lifestyle",
      subtitle: "Make your space yours.",
      bg: "bg-[#26332D]",
      accent: "bg-[#3D9B79]",
      number: "03",
    },
  ];

  return (
    <section className="bg-[#101412] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3D9B79]">
              Explore Collections
            </p>

            <h2 className="text-2xl font-bold text-[#F4F6F4] md:text-3xl">
              Shop by Style
            </h2>
          </div>

          <button
            onClick={() => navigate("/categories")}
            className="hidden items-center gap-2 text-sm font-medium text-[#3D9B79] transition-all hover:gap-3 hover:text-[#65C9A3] sm:flex"
          >
            View All
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Collection Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {collections.map((item) => (
            <div
              key={item.number}
              className={`${item.bg} group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl border border-[#303A34] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#3D9B79] hover:shadow-[0_12px_35px_rgba(61,155,121,0.12)] md:p-8`}
            >
              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#3D9B79]/10 blur-3xl transition-all duration-500 group-hover:bg-[#3D9B79]/20" />

              {/* Top Content */}
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A5AEA8]">
                    Collection
                  </p>

                  <span className="text-xs font-medium text-[#65C9A3]">
                    {item.number}
                  </span>
                </div>

                <div
                  className={`mb-5 h-1 w-10 rounded-full ${item.accent}`}
                />

                <h3 className="text-xl font-semibold text-[#F4F6F4] md:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-[#A5AEA8]">
                  {item.subtitle}
                </p>
              </div>

              {/* Explore */}
              <button
                onClick={() => navigate("/categories")}
                className="relative z-10 mt-8 flex w-fit items-center gap-2 text-sm font-semibold text-[#3D9B79] transition-all group-hover:gap-3 group-hover:text-[#65C9A3]"
              >
                Explore
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertisment;
