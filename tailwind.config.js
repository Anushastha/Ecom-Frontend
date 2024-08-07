/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "blue": "#2E266D",
        "green": "#87CB28",
      },
      fontFamily: {
        "primary": ["Playfair Display", "sans-serif"],
        "secondary": ["Lato", "sans-serif"]
      },
    },
  },
  plugins: [],
}

