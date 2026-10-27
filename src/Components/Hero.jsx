import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {slides,categories} from "../Components/array"
import hero3 from "../assets/hero-3.png";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroRef = useRef(null);

  // Change slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Animate whenever currentSlide changes
  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, [currentSlide]);

const slide = slides[currentSlide];
  return (
    <>
    <div
      ref={heroRef}
      className="h-[500px] bg-cover bg-center flex items-center p-10"
      style={{
        backgroundImage: `url(${slide.image})`,
      }}
    >
      <div className="m-2 align-center">
        <h1 className="text-6xl font-bold">
          {slide.title}
     </h1>

        <p className="mt-4 text-xl">
          {slide.description}
        </p>
       <button className="mt-5 px-8 py-3 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition duration-300 shadow-lg">
  Shop Now
</button>
      </div>
    </div>
 




    </>
  );
};

export default Hero;
