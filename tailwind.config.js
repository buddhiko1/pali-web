/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  darkMode: ["class", '[data-mode="night"]'],
  content: ["./src/**/*.{html,ts,svg}"],
  theme: {
    extend: {
      spacing: {
        smXspan: "1.75rem",
        smPageXspan: "3rem",
        mdXspan: "3rem",
        mdPageXspan: "4.5rem",
        lgXspan: "21.5vw",
        lgPageXspan: "23.5vw",
      },
      colors: {
        // elements
        logo: "var(--colors-logo)",
        appBg: "var(--colors-app-bg)",
        phraseBg: "var(--colors-phrase-bg)",
        cardBg: "var(--colors-card-bg)",
        overlay: "var(--colors-overlay)",
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
};
