const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontSize: {
        sm2: '1rem',
      },
      container: {
        center: true,
      },
      colors: {
        'verde': '#23CE99',
        'verde-light': '#56ff88',
        'verde-shadow': '#177757',
        'cinza': '#898989',
        'preto': '#000000',
        'rosa': '#E56399',
      },
     
    },
    screens: {
      'xs': '390px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [

    require('flowbite/plugin'),
  

  ],
};
