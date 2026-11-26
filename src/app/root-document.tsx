import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getSearchConfig } from "@/lib/site-url";
import type { Locale } from "@/i18n/config";
import { getClientMessages, getDictionary } from "@/i18n/get-dictionary";
import { LocaleProvider } from "@/i18n/locale-context";
import { bodyFont, displayFont } from "./fonts";
import "./globals.css";

/** Shared by the Albanian `(sq)` and English `en` root layouts. */
export function rootMetadata(locale: Locale): Metadata {
  const { origin, indexable } = getSearchConfig();
  const { meta } = getDictionary(locale);
  return {
    metadataBase: origin ? new URL(origin) : undefined,
    // Indexable only with SITE_URL and SEARCH_INDEXING=enabled; pages may still opt out with noindex.
    robots: { index: indexable, follow: true },
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
