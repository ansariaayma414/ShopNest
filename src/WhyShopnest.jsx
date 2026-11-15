
import React from "react";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headset,
} from "lucide-react";

export const WhyShopnest = () => {
  const benefits = [
    {
      id: 1,
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹999",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      id: 3,
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Hassle-free returns",
    },
    {
      id: 4,
      icon: Headset,
      title: "24/7 Support",
      description: "We're here to help",
    },
  ];

  return (
    <section className="w-full border-y border-[#303A34] bg-[#141916] py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.id}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors duration-300 hover:bg-[#191F1C]"
              >
                {/* Icon Container */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#305344] bg-[#1E3A2F] transition-all duration-300 group-hover:border-[#3D9B79] group-hover:bg-[#263F33]">
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    className="text-[#3D9B79]"
                  />
                </div>

                {/* Benefit Information */}
                <div>
                  <h3 className="text-base font-semibold text-[#F4F6F4]">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-[#A5AEA8]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyShopnest;
