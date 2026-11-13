import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { getSiteOrigin } from "@/lib/site-url";
import "./globals.css";

const displayFont = localFont({
  src: "../assets/fonts/BarlowCondensed-Bold.ttf",
  variable: "--font-barlow-condensed",
  display: "swap",
  weight: "700",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const bodyFont = localFont({
  src: "../assets/fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
  fallback: ["Arial", "sans-serif"],
});

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  robots: { index: Boolean(siteOrigin), follow: true },
  title: {
    default: "PROSAFE — Safety Without Compromise.",
    template: "%s | PROSAFE",
  },
  description:
    "PROSAFE provides premium workplace safety equipment and complete protection solutions for businesses in Kosovo. Safety Without Compromise.",
  applicationName: "PROSAFE",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101214",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
