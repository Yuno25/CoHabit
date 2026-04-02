"use client";

import { useEffect, useState } from "react";

const images = [
  "/hero/roommate-1.png",
  "/hero/roommate-2.png",
  "/hero/roommate-3.png",
  "/hero/roommate-4.png",
];

export default function HeroBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 7 seconds per image (smooth like Tinder)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[6000ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "opacity",
          }}
        />
      ))}

      {/* VERY LIGHT overlay – prevents washout but keeps sharpness */}
      <div className="absolute inset-0 " />
    </div>
  );
}
