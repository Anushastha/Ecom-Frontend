/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "pink": "#E02189",
        "black": "#242626",
        "grey": "#9B9A9D"
      },
      fontFamily: {
        "primary": ["Playfair Display", "sans-serif"],
        "secondary": ["Lato", "sans-serif"]
      },
    },
  },
  plugins: [],
}

