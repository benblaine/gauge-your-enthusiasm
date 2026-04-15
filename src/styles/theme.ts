/**
 * The Penthouse Observatory — design tokens.
 *
 * 1980s luxury penthouse aesthetic meets _why's (Poignant) Guide to Ruby:
 * deep navy, brass, neon, jewel tones, glassmorphism, tropical plants.
 */

export const colors = {
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
} as const;

export const fonts = {
  display: "Playfair Display, Georgia, serif",
  body: "Space Grotesk, system-ui, sans-serif",
  mono: "JetBrains Mono, ui-monospace, monospace",
  accent: "Orbitron, system-ui, sans-serif",
} as const;

export const radii = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
} as const;

export const shadows = {
  neonPink: "0 0 5px rgba(255,105,180,0.6), 0 0 20px rgba(255,105,180,0.25)",
  neonCyan: "0 0 5px rgba(0,255,255,0.6), 0 0 18px rgba(0,255,255,0.25)",
  warmGlow: "0 0 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.08)",
  brassBorder: "0 0 8px rgba(212,175,55,0.18)",
} as const;

export type ColorTokens = typeof colors;
