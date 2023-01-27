/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#A69586',
        'button': '#A6592D',
        'button-second': '#D9CCC1'
      },
      opacity: {
        '10': '0.10'
      }
    },
  },
  plugins: [],
}
