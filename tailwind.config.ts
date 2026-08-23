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
        signal: "#C2410C",
        "signal-bg": "#FBE3D4",
        research: "#0F766E",
        "research-bg": "#D9F0EC",
        product: "#6D28D9",
        "product-bg": "#EBE1FB",
        company: "#1D4ED8",
        "company-bg": "#DCE7FC",
        policy: "#9F1D3B",
        "policy-bg": "#F6DEE3",
        investment: "#15803D",
        "investment-bg": "#DAF0DF",
        headline: "#334155",
        "headline-bg": "#E2E6EB",
      },
      fontFamily: {
        display: ["var(--font-serif)", "Georgia", "serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
