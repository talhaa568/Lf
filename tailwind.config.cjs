/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
      keyframes: {
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.70)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
       animation: {
         fadeInScale: 'fadeInScale 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
       colors: {
        silver:'#778F9B',
      lightsilver:'#CFD8DC',
      },
    },

  },
  plugins: [
     require('tailwind-scrollbar-hide'),
  ],
});
