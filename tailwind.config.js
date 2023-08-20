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
        bg: "var(--colors-bg)",
        border: "var(--colors-border)",
        title: "var(--colors-title)",
        titleHighlight: "var(--colors-title-highlight)",
        text: "var(--colors-text)",
        focus: "var(--colors-focus)",
        error: "var(--colors-error)",
        success: "var(--colors-success)",
        highlight: "var(--colors-highlight)",
        dialogBg: "var(--colors-dialog-bg)",
        inputBg: "var(--colors-input-bg)",
        footerBg: "var(--colors-footer-bg)",
        buttonBg: "var(--colors-button-bg)",
        buttonHover: "var(--colors-button-hover)",
        ring: "var(--colors-ring)",
        readingBg: "var(--colors-reading-bg)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
