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
        // backgrund color
        bgc: {
          DEFAULT: colors.white,
          dark: colors.gray["800"],
        },
        // border color
        bdc: {
          DEFAULT: colors.gray["300"],
          dark: colors.gray["600"],
        },
      },
    },
  },
  plugins: [],
};
