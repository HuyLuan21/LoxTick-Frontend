/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tiktok-red": "#fe2c55",
        "tiktok-cyan": "#25f4ee",
      },
    },
  },
  plugins: [],
};
