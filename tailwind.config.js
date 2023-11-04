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
        mdPadding: "3rem",
        mdContentPadding: "4.5rem",
        lgPadding: "21.5vw",
        lgContentPadding: "23.5vw",
      },
      colors: {
        // elements
        logo: "var(--colors-logo)",
        appBg: "var(--colors-app-bg)",
        maskBg: "var(--colors-mask-bg)",
        phraseBg: "var(--colors-phrase-bg)",
        cardBg: "var(--colors-card-bg)",
        bannerTitle: "var(--colors-banner-title)",
        bannerSubTitle: "var(--colors-banner-subtitle)",
        inputBg: "var(--colors-input-bg)",
        footerBg: "var(--colors-footer-bg)",
        buttonBg: "var(--colors-button-bg)",
        buttonText: "var(--colors-button-text)",
        title: "var(--colors-title)",
        hlTitle: "var(--colors-hl-title)",
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
