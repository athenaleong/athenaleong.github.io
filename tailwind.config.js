/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor : {
        'default': "url('./assets/default.svg'), default",
        'pointer': "url('assets/pointer.png'), pointer", 
  
      },
      zIndex: {
        'max': 's2147483647',
      },
      fontFamily: {
        'code': ['Fira Code', 'monospace'],
        'fira-sans': ['Fira Sans', 'sans-serif'],
        'hanken': ['Hanken Grotesk', 'sans-serif'],
        'sans': ['Livvic', 'sans-serif'],
      },
      colors: {
        'rainbow': {
          'red': '#FF595E',
          'yellow': '#FFCA3A',
          'green': '#8AC926',
          'blue': '#1982C4',
          'purple': '#6A4C93',
        },
        'rainbow-dark': {
          'red': '#D73A49',
          'yellow': '#F9A03F',
          'green': '#7BB026',
          'blue': '#0F609B',
          'purple': '#592E7A',
        },
        'rainbow-light': {
          'red': '#FFCDD2',
          'yellow': '#FFF3C4',
          'green': '#C2E699',
          'blue': '#9CDCFE',
          'purple': '#D4C4E9',
        },
        'figma': {
          'red': '#FD3D39',
          'orange':'#FE9526',
          'yellow': '#FFCB2F',
          'green': '53D86A',
          'light-blue': '#3CABDB',
          'blue': '#167FFC',
          'purple': '595BD4',
          'pink': '#FD3259',
          'light-pink': '#FF5C8D',
        },
        'figma-dark': {
          'pink': '#CB1D40',
          'blue': '#0F609B',
        },
        'muted': {
          'blue': '#347CBC',
          'pink': '#EDD3C9',
          'yellow': '#F1CA62',
          'orange': '#E3703B',
          'green': '#53B575',
          'dark-green':'#43935C',
          'brown':'#8B4D31'
        }
      },
    },
  },
  plugins: [],
};
