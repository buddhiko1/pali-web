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
        bgc: {
          DEFAULT: colors.white,
          dark: colors.gray["800"],
        },
        bdc: {
          DEFAULT: colors.gray["300"],
          dark: colors.gray["700"],
        },
      },
    },
  },
  plugins: [],
};
