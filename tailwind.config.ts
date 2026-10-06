import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gris: "#a6a6a6", // gris del logo: color de marca
        grafito: { DEFAULT: "#1f2124", 2: "#2a2d31" },
        piedra: "#5f6368",
        hormigon: "#e4e4e1",
        papel: "#f6f6f4",
        teal: { DEFAULT: "#0f766e", dark: "#0b5f59", light: "#4fbfb0" },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: { display: "-0.045em", tight2: "-0.03em", label: "0.08em" },
      borderRadius: { DEFAULT: "2px" },
      maxWidth: { site: "1320px" },
    },
  },
  plugins: [],
};
export default config;
