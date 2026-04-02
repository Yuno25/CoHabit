"use client";

import { useEffect, useState } from "react";

const images = [
  "/hero/roommate-1.png",
  "/hero/roommate-2.png",
  "/hero/roommate-3.png",
  "/hero/roommate-4.png",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Live Better.
          <br />
          <span className="text-pink-300">Choose the Right Roommate</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200">
          CoHabit helps college students and young professionals find compatible
          roommates based on lifestyle, habits, and preferences.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg transition">
            Join CoHabit
          </button>

          <button className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
