/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts,svg}"],
  theme: {
    extend: {
      spacing: {
        smPadding: "1.75rem",
        lgPadding: "26rem",
      },
      colors: {
        bc: {
          DEFAULT: colors.white,
          dark: colors.gray["900"],
        },
      },
    },
  },
  plugins: [],
};
