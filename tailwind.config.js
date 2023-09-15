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
        logo: "var(--colors-logo)",
        pageBg: "var(--colors-page-bg)",
        phraseBg: "var(--colors-phrase-bg)",
        dialogBg: "var(--colors-dialog-bg)",
        dialogTitle: "var(--colors-dialog-title)",
        dialogText: "var(--colors-dialog-text)",
        pageTitle: "var(--colors-page-title)",
        pageSubTitle: "var(--colors-page-subtitle)",
        inputBg: "var(--colors-input-bg)",
        footerBg: "var(--colors-footer-bg)",
        buttonBg: "var(--colors-button-bg)",
        buttonText: "var(--colors-button-text)",
        hlTitle: "var(--colors-hl-title)",
        paragraph: "var(--colors-paragraph)",
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
