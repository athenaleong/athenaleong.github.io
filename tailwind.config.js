/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        'max': '2147483647',
      }
    },
  },
  plugins: [],
};
