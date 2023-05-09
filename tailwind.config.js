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
        background: {
          DEFAULT: colors.white,
          dark: colors.gray["800"],
        },
        border: {
          DEFAULT: colors.gray["300"],
          dark: colors.gray["600"],
        },
        title: {
          DEFAULT: colors.gray["700"],
          dark: colors.gray["50"],
        },
        text: {
          DEFAULT: colors.gray["500"],
          dark: colors.gray["200"],
          red: colors.red["400"],
        },
        focus: {
          DEFAULT: colors.blue["400"],
          dark: colors.blue["400"],
        },
        error: {
          DEFAULT: colors.red["500"],
          dark: colors.red["500"],
        },
        success: {
          DEFAULT: colors.blue["500"],
          dark: colors.blue["500"],
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
