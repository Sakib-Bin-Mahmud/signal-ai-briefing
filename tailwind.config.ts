import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial intelligence system
        navy: "#0B132B",
        "navy-deep": "#1C2541",
        "navy-line": "#2B3358",
        paper: "#F7F5F0",
        "paper-line": "#E3DFD3",
        "paper-raised": "#FFFFFF",
        cobalt: "#2563EB",
        "cobalt-deep": "#1D4ED8",
        sky: "#7CC7FF",
        gold: "#F2C94C",
        "gold-ink": "#7A5A12",
        "gold-bg": "#FBF0D2",
        ink: "#111827",
        "ink-soft": "#4B5566",
        "ink-faint": "#647082",

        // Category accents (paired with icons so meaning never rests on color alone)
        headline: "#1C2541",
        "headline-bg": "#E7E8F1",
        product: "#6D28D9",
        "product-bg": "#EDE4FB",
        company: "#1D4ED8",
        "company-bg": "#DCE7FC",
        research: "#0F766E",
        "research-bg": "#D9F0EC",
        policy: "#9F1D3B",
        "policy-bg": "#F6DEE3",
        investment: "#147839",
        "investment-bg": "#DAF0DF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(11,19,43,0.04), 0 6px 16px -10px rgba(11,19,43,0.14)",
        "card-hover": "0 2px 6px 0 rgba(11,19,43,0.06), 0 16px 32px -14px rgba(11,19,43,0.22)",
        gold: "0 10px 26px -14px rgba(242,201,76,0.55)",
      },
      backgroundImage: {
        "paper-grain":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
        "navy-gradient":
          "radial-gradient(ellipse 70% 60% at 15% -20%, rgba(124,199,255,0.16), transparent), radial-gradient(ellipse 50% 45% at 100% 0%, rgba(242,201,76,0.08), transparent)",
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
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
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
        "orbit-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
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
        "orbit-spin": "orbit-spin 18s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
