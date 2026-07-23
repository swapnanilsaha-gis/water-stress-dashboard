/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- "Deep Water" dark theme (locked in Phase 1) ----
        abyss: "#0A1520", // app background (deepest)
        surface: "#0F2231", // card / glass base
        "surface-2": "#13293B", // raised surface
        primary: "#22D3EE", // cyan — accents, links, focus
        secondary: "#2DD4BF", // teal — matches dissertation Word styling
        "accent-deep": "#0EA5E9", // ocean blue — primary CTAs
        // Water-stress semantic scale (used everywhere, consistently)
        stress: {
          low: "#15A34A",
          moderate: "#FACC15",
          high: "#EA580C",
          severe: "#DC2626",
        },
        ink: {
          primary: "#E2E8F0",
          muted: "#94A3B8",
          faint: "#64748B",
        },
        hairline: "rgba(148, 197, 214, 0.14)",
      },
      fontFamily: {
        display: ['"Rubik"', '"Segoe UI"', "system-ui", "sans-serif"],
        body: ['"Rubik"', '"Segoe UI"', "system-ui", "sans-serif"],
        mono: ['"Rubik"', '"Segoe UI"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.8rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      backdropBlur: { xs: "2px" },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
        "glow-primary": "0 0 24px rgba(34, 211, 238, 0.25)",
        "glow-soft": "0 0 40px rgba(14, 165, 233, 0.18)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 70% -10%, rgba(14,165,233,0.18), transparent 60%), radial-gradient(900px 500px at 10% 20%, rgba(45,212,191,0.10), transparent 55%)",
        "grid-faint":
          "linear-gradient(rgba(148,197,214,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,197,214,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drift": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-14px) translateX(8px)" },
        },
        "sheen": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        drift: "drift 12s ease-in-out infinite",
        sheen: "sheen 8s linear infinite",
      },
    },
  },
  plugins: [],
};
