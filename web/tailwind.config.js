/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      colors: {
        gray: {
          200: '#C4C4CC',
          400: '#323238',
          600: '#8D8D99',
          800: '#202024',
          950: '#09090A',
          900: '#121214',
        },
        ignite: {
          500: '#129E57',
        },
        yellow: {
          500: '#F7DD43',
        },
        red: {
          500: '#DB4437',
          600: '#B62C20',
        },
      },
      backgroundImage: {
        gradient: "url('/bg-effects.png')",
      },
    },
  },
  plugins: [],
}
