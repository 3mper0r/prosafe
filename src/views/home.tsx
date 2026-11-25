import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { HomepageOverview } from "@/components/sections/homepage-overview";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <a className="skip-link" href="#main-content">{getDictionary(locale).common.skipToContent}</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero locale={locale} />
        <HomepageOverview locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
