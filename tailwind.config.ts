import type { Config } from 'tailwindcss';

export default {
  important: true,
  content: ['./src/**/*.{html,ts,svg}'],
  safelist: [],
  theme: {
    screens: {
      tablet: '640px',
      pc: '1450px',
    },
    extend: {
      spacing: {
        phoneXspan: '1.75rem',
        phonePageXspan: '3rem',
        tabletXspan: '3rem',
        tabletPageXspan: '4.5rem',
        pcXspan: '21.5vw',
        pcPageXspan: '23.5vw',
      },
      colors: {
        // elements
        logo: 'var(--colors-logo)',
        primaryBg: 'var(--colors-primary-bg)',
        secondaryBg: 'var(--colors-secondary-bg)',
        phraseBg: 'var(--colors-phrase-bg)',
        footerBg: 'var(--colors-footer-bg)',
        title: 'var(--colors-title)',
        text: 'var(--colors-text)',
        border: 'var(--colors-border)',
        overlay: 'var(--colors-overlay)',
        bannerTitle: 'var(--colors-banner-title)',
        bannerSubTitle: 'var(--colors-banner-subtitle)',
        inputBg: 'var(--colors-input-bg)',
        buttonBg: 'var(--colors-button-bg)',
        hlButtonBg: 'var(--colors-hl-button-bg)',
        hlButtonText: 'var(--colors-hl-button-text)',

        // status
        hoverBg: 'var(--colors-hover-bg)',
        warning: 'var(--colors-warning)',
        focus: 'var(--colors-focus)',
        error: 'var(--colors-error)',
        ok: 'var(--colors-ok)',
        disabled: 'var(--colors-disabled)',
      },
    },
  },
} satisfies Config;
