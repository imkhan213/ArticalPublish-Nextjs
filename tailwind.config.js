/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "main-blue": "#32335A"
      },
      fontFamily: {
        "zilla": "Zilla Slab"
      }
    },
  },
  plugins: [],
}