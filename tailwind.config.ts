import type { Config } from 'tailwindcss'

export default {
  important: true,
  darkMode: ["class", '[data-mode="night"]'],
  content: ["./src/**/*.{html,ts,svg}"],
  theme: {
    screens: {
      tablat: "640px",
      pc: "1024px",
    },
    extend: {
      spacing: {
        phoneXspan: "1.75rem",
        phonePageXspan: "3rem",
        tablatXspan: "3rem",
        tablatPageXspan: "4.5rem",
        pcXspan: "21.5vw",
        pcPageXspan: "23.5vw",
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
} satisfies Config
