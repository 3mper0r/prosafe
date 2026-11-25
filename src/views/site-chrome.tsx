import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">{getDictionary(locale).common.skipToContent}</a>
      <Header />
      {children}
      <Footer locale={locale} />
    </>
  );
}
