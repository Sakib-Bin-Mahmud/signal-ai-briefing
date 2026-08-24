import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wire: "#ECEEF1",
        "wire-line": "#D3D8DE",
        ink: "#10151F",
        "ink-soft": "#4B5566",
        signal: "#BA3E0C",
        "signal-bg": "#FBE3D4",
        research: "#0F766E",
        "research-bg": "#D9F0EC",
        product: "#6D28D9",
        "product-bg": "#EBE1FB",
        company: "#1D4ED8",
        "company-bg": "#DCE7FC",
        policy: "#9F1D3B",
        "policy-bg": "#F6DEE3",
        investment: "#147839",
        "investment-bg": "#DAF0DF",
        headline: "#334155",
        "headline-bg": "#E2E6EB",
        gold: "#E8A93D",
        "gold-bg": "#FBEEDA",
        "gold-deep": "#8B6525",
      },
      fontFamily: {
        display: ["var(--font-serif)", "Georgia", "serif"],
        hero: ["var(--font-hero)", "var(--font-serif)", "Georgia", "serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16,21,31,0.04), 0 6px 16px -8px rgba(16,21,31,0.12)",
        "card-hover": "0 2px 6px 0 rgba(16,21,31,0.07), 0 18px 36px -14px rgba(16,21,31,0.20)",
        signal: "0 10px 28px -12px rgba(186,62,12,0.45)",
        gold: "0 10px 28px -12px rgba(232,169,61,0.5)",
      },
      backgroundImage: {
        "wire-gradient":
          "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(186,62,12,0.07), transparent), radial-gradient(ellipse 55% 40% at 100% 0%, rgba(15,118,110,0.05), transparent)",
        "signal-gold": "linear-gradient(135deg, #BA3E0C, #E8A93D)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-10deg)" },
          "75%": { transform: "rotate(10deg)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "60%": { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.55)", opacity: "0.7" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        "draw-check": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.5s ease-out both",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        "toast-in": "toast-in 0.22s ease-out both",
        wiggle: "wiggle 0.4s ease-in-out",
        "pop-in": "pop-in 0.45s ease-out both",
        "pulse-ring": "pulse-ring 1.4s cubic-bezier(0.2,0.6,0.4,1) infinite",
        "draw-check": "draw-check 0.5s cubic-bezier(0.65,0,0.35,1) 0.15s both",
      },
    },
  },
  plugins: [],
};
export default config;
