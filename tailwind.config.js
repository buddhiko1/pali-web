/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  darkMode: "class",
  content: ["./src/**/*.{html,ts,svg}"],
  theme: {
    extend: {
      spacing: {
        smPadding: "1.75rem",
        smContentPadding: "3rem",
        lgPadding: "26rem",
        lgContentPadding: "27rem",
      },
      colors: {
        // background color
        bgc: {
          DEFAULT: colors.white,
          dark: colors.gray["800"],
        },
        // border color
        bdc: {
          DEFAULT: colors.gray["300"],
          dark: colors.gray["600"],
        },
        // color of focus text
        tfc: {
          DEFAULT: colors.blue["400"],
          dark: colors.blue["400"],
        },
        trc: {
          DEFAULT: "#ad0101",
          dark: "#ad0101",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
