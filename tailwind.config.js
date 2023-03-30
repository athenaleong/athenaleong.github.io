/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        'max': '2147483647',
      },
      fontFamily: {
        'code': ['Fira Code', 'monospace'],
        'fira-sans': ['Fira Sans', 'sans-serif'],
        'hanken': ['Hanken Grotesk', 'sans-serif'],
        'sans': ['Livvic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
