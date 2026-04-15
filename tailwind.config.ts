import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        penthouse: {
          black: "#0A0A0F",
          navy: "#0D1B2A",
          charcoal: "#1A1A2E",
          plum: "#16032F",
        },
        brass: {
          DEFAULT: "#D4AF37",
          light: "#F7E7CE",
          dark: "#8B7500",
        },
        neon: {
          pink: "#FF69B4",
          cyan: "#00FFFF",
          violet: "#B026FF",
        },
        jewel: {
          emerald: "#046307",
          sapphire: "#0F52BA",
          ruby: "#9B111E",
          amethyst: "#9966CC",
        },
        wine: "#722F37",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        accent: ["var(--font-accent)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(90deg, transparent, #D4AF37 50%, transparent)",
        "city-lights":
          "radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.07) 0%, transparent 50%), radial-gradient(ellipse at 30% 60%, rgba(15,82,186,0.05) 0%, transparent 40%), radial-gradient(ellipse at 50% 0%, rgba(255,105,180,0.04) 0%, transparent 35%)",
        "leopard-faint":
          "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.04) 0 6px, transparent 7px), radial-gradient(circle at 70% 60%, rgba(212,175,55,0.04) 0 5px, transparent 6px)",
      },
      boxShadow: {
        "neon-pink":
          "0 0 5px rgba(255,105,180,0.6), 0 0 20px rgba(255,105,180,0.25)",
        "neon-cyan":
          "0 0 5px rgba(0,255,255,0.6), 0 0 18px rgba(0,255,255,0.25)",
        "warm-glow":
          "0 0 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.08)",
        "brass-border": "0 0 8px rgba(212,175,55,0.18)",
        glass: "inset 0 1px 0 rgba(247,231,206,0.06), 0 8px 32px rgba(0,0,0,0.45)",
      },
      backdropBlur: {
        glass: "12px",
      },
      animation: {
        flicker: "flicker 4s infinite",
        "slow-pulse": "slow-pulse 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "47%": { opacity: "1" },
          "48%": { opacity: "0.4" },
          "49%": { opacity: "1" },
          "62%": { opacity: "1" },
          "63%": { opacity: "0.7" },
          "64%": { opacity: "1" },
        },
        "slow-pulse": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
