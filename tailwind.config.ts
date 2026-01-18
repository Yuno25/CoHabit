import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: "#102b1f",
        rose: "#bd7880",
        wine: "#4d0011",
        blush: "#ffd9d9",
      },
    },
  },
  plugins: [],
};

export default config;
