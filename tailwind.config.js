/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  darkMode: ["class", '[data-mode="night"]'],
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
        // elements
        bg: "var(--colors-bg)",
        readingBg: "var(--colors-reading-bg)",
        dialogBg: "var(--colors-dialog-bg)",
        inputBg: "var(--colors-input-bg)",
        footerBg: "var(--colors-footer-bg)",
        buttonBg: "var(--colors-button-bg)",
        buttonText: "var(--colors-button-text)",
        title: "var(--colors-title)",
        titleFocus: "var(--colors-title-focus)",
        text: "var(--colors-text)",
        border: "var(--colors-border)",
        // status
        hover: "var(--colors-hover)",
        focus: "var(--colors-focus)",
        error: "var(--colors-error)",
        ok: "var(--colors-ok)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
