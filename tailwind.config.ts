import type { Config } from "tailwindcss";

/**
 * Утилиты Tailwind указывают на токены Lark DS.
 * Литеральных значений здесь нет — только var(--lark-*) и локальные
 * токены сайта из src/styles/variables.css.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--lark-bg)",
        surface: "var(--lark-surface)",
        elevated: "var(--lark-surface-elevated)",
        text: "var(--lark-text)",
        "text-2": "var(--lark-text-2)",
        "text-3": "var(--lark-text-3)",
        "text-off": "var(--lark-text-off)",
        accent: "var(--lark-color-yellow)",
        "accent-light": "var(--lark-color-yellow-light)",
        /* Текстовая роль акцента: в тёмной теме жёлтый, в светлой #8A6410.
           Бренд-жёлтый как текст на светлом фоне запрещён — 1,44:1. */
        ink: "var(--lark-accent-ink)",
        "on-accent": "var(--lark-on-accent)",
        "accent-soft": "var(--site-accent-soft)",
        border: "var(--lark-border)",
        "border-strong": "var(--lark-border-strong)",
        success: "var(--lark-color-success)",
        warning: "var(--lark-color-warning)",
        error: "var(--lark-color-error)",
      },
      fontFamily: {
        display: ["var(--lark-font-display)", "system-ui", "sans-serif"],
        sans: ["var(--lark-font-text)", "system-ui", "sans-serif"],
        mono: ["var(--lark-font-mono)", "ui-monospace", "monospace"],
      },
      spacing: {
        1: "var(--lark-space-1)",
        2: "var(--lark-space-2)",
        3: "var(--lark-space-3)",
        4: "var(--lark-space-4)",
        5: "var(--lark-space-5)",
        6: "var(--lark-space-6)",
        7: "var(--lark-space-7)",
        8: "var(--lark-space-8)",
        9: "var(--lark-space-9)",
        10: "var(--lark-space-10)",
      },
      borderRadius: {
        xs: "var(--lark-radius-xs)",
        s: "var(--lark-radius-s)",
        m: "var(--lark-radius-m)",
        l: "var(--lark-radius-l)",
        card: "var(--lark-radius-card)",
        pill: "var(--lark-radius-pill)",
      },
      boxShadow: {
        sm: "var(--lark-shadow-sm)",
        md: "var(--lark-shadow-md)",
        lg: "var(--lark-shadow-lg)",
      },
      borderColor: {
        DEFAULT: "var(--lark-border)",
      },
      maxWidth: {
        shell: "var(--site-shell-max)",
      },
      transitionDuration: {
        rise: "var(--lark-motion-rise-duration)",
        hover: "var(--lark-motion-hover-duration)",
        land: "var(--lark-motion-land-duration)",
      },
      transitionTimingFunction: {
        rise: "var(--lark-motion-rise-ease)",
        hover: "var(--lark-motion-hover-ease)",
        land: "var(--lark-motion-land-ease)",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};

export default config;
