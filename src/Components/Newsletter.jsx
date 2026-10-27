import React from "react";

export const Newsletter = () => {
  return (
    <section className="px-6 md:px-10 lg:px-16 my-10">
      <div className="relative overflow-hidden rounded-xl bg-[#1C2A25] px-6 py-7 md:px-10">

        {/* Decorative leaves */}
        <div className="absolute left-0 bottom-0 text-[#53665D] opacity-50 text-5xl">
          ❧
        </div>

        <div className="absolute right-0 top-0 rotate-180 text-[#53665D] opacity-50 text-5xl">
          ❧
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Left Content */}
          <div className="flex items-center gap-4 text-white">

            {/* Email Icon */}
            <div className="text-3xl">
              ✉
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-semibold">
                Stay in the Loop
              </h2>

              <p className="text-xs md:text-sm text-gray-300 mt-1">
                Get exclusive offers, new arrivals and fashion updates.
              </p>
            </div>

          </div>

          {/* Subscribe Form */}
          <form className="flex w-full lg:w-auto items-center gap-2">

            <input
              type="email"
              placeholder="Enter your email address"
              className="
                w-full lg:w-[280px]
                h-10
                rounded-full
                bg-white
                px-5
                text-sm
                text-[#1C1C1E]
                outline-none
                placeholder:text-gray-400
              "
            />

            <button
              type="submit"
              className="
                h-10
                rounded-full
                bg-[#F5E8DC]
                px-6
                text-sm
                font-medium
                text-[#1C1C1E]
                transition
                hover:bg-white
                whitespace-nowrap
              "
            >
              Subscribe
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;