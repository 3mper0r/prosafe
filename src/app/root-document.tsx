import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getSearchConfig } from "@/lib/site-url";
import type { Locale } from "@/i18n/config";
import { getClientMessages, getDictionary } from "@/i18n/get-dictionary";
import { NOINDEX } from "@/i18n/seo";
import { LocaleProvider } from "@/i18n/locale-context";
import { bodyFont, displayFont } from "./fonts";
import "./globals.css";

/** Shared by the Albanian `(sq)` and English `en` root layouts. */
export function rootMetadata(locale: Locale): Metadata {
  const { origin } = getSearchConfig();
  const { meta } = getDictionary(locale);
  return {
    metadataBase: origin ? new URL(origin) : undefined,
    // Site-wide default: noindex. Only indexableMetadata() (the 28 eligible pages
    // per language) emits index, and only when getSearchConfig() allows it.
    robots: NOINDEX,
    title: { default: meta.defaultTitle, template: "%s | PROSAFE" },
    description: meta.description,
    applicationName: "PROSAFE",
  };
}

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101214",
  colorScheme: "dark",
};

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <LocaleProvider locale={locale} messages={getClientMessages(locale)}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
