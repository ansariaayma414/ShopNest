import React from "react";
import { ArrowRight } from "lucide-react";

export const Advertisment = () => {
  const collections = [
    {
      title: "Everyday Essentials",
      subtitle: "Simple. Useful. Stylish.",
      bg: "bg-[#F3EEE8]",
    },
    {
      title: "Trending Fashion",
      subtitle: "Discover your next look.",
      bg: "bg-[#EDE9F7]",
    },
    {
      title: "Home & Lifestyle",
      subtitle: "Make your space yours.",
      bg: "bg-[#EEF1EC]",
    },
  ];

  return (
    <section className="px-5 md:px-8 lg:px-10 py-10">
      
      {/* Heading */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">
            Explore
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#1C211F]">
            Shop by Style
          </h2>
        </div>

        <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#1C211F] hover:gap-3 transition-all">
          View All
          <ArrowRight size={17} />
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {collections.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-2xl p-7 md:p-8 min-h-[190px] flex flex-col justify-between group cursor-pointer transition-transform duration-300 hover:-translate-y-1`}
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                Collection
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-[#1C211F]">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {item.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-[#1C211F]">
              Explore
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
