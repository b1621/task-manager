/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#2C73EB",
      },
    },
    fontFamily: {
      fontPlayfair: ["Playfair Display", "serif"],
      fontBarlow: ["Barlow", "sans-serif"],
    },
  },
  plugins: [],
};
