import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { slides } from "../Components/array";
import emeraldHero from "../assets/hero-emerald.png";
// import hero from "../Components/array"

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const allSlides = [{ image: emeraldHero, fullBanner: true }, ...slides];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allSlides.length]);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
    );
  }, [currentSlide]);

  const slide = allSlides[currentSlide];

  return (
    <section className="bg-[#101412] px-4 py-6 md:px-8">
      <div
        ref={heroRef}
        className="relative mx-auto max-w-7xl overflow-hidden
                   rounded-2xl border border-[#303A34]
                   bg-[#141916]"
      >
        <div className="relative aspect-[16/9] md:aspect-[2.7/1]">
          <img
            src={slide.image}
            alt={slide.title || "ShopNest featured collection"}
            className="absolute inset-0 h-full w-full
                       object-cover object-center"
          />

          {!slide.fullBanner && (
            <div
              className="absolute inset-0 flex items-center
                            bg-gradient-to-r from-[#101412]/95
                            via-[#101412]/65 to-transparent
                            px-6 md:px-16"
            >
              <div className="max-w-xl">
                <span
                  className="text-xs font-semibold uppercase
                                 tracking-[0.25em] text-[#3D9B79]"
                >
                  Featured Collection
                </span>

                <h1
                  className="mt-4 text-3xl font-bold
                               text-white md:text-5xl"
                >
                  {slide.title}
                </h1>

                <p
                  className="mt-4 text-sm text-[#A5AEA8]
                              md:text-lg"
                >
                  {slide.description}
                </p>

                <button
                  onClick={() => navigate("/products")}
                  className="mt-6 rounded-lg bg-[#3D9B79]
                             px-7 py-3 font-semibold text-white
                             transition hover:bg-[#328568]"
                >
                  Shop Now
                </button>
              </div>
            </div>
          )}

          {slide.fullBanner && (
            <button
              onClick={() => navigate("/products")}
              aria-label="Shop the featured collection"
              className="absolute bottom-[22%] left-[6%]
                         h-[13%] w-[18%] min-w-[90px]"
            />
          )}
        </div>

        <div
          className="absolute bottom-3 left-1/2 z-10
                        flex -translate-x-1/2 gap-2"
        >
          {allSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "w-7 bg-[#3D9B79]" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
