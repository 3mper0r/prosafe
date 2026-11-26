import localFont from "next/font/local";

// Declared once and shared by both root layouts so each font file is emitted once.
export const displayFont = localFont({
  src: "../assets/fonts/BarlowCondensed-Bold.ttf",
  variable: "--font-barlow-condensed",
  display: "swap",
  weight: "700",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

export const bodyFont = localFont({
  src: "../assets/fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
  fallback: ["Arial", "sans-serif"],
});
