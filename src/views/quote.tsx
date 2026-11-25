import type { Metadata } from "next";
import { connection } from "next/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getCatalog } from "@/content/catalog";
import { DemoNotice } from "@/features/catalog/demo-notice";
import { QuoteSelection } from "@/features/quote/quote-selection";
import { getQuoteDeliveryAvailability } from "@/features/quote/request/delivery.server";
import { quoteHttpConfigurationValid } from "@/features/quote/request/http.server";
import styles from "@/features/catalog/catalog.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";

export function quoteMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).quote;
  return { title: t.metaTitle, description: t.metaDescription, robots: { index: false, follow: true } };
}

export async function QuoteView({ locale }: { locale: Locale }) {
  await connection();
  const available = getQuoteDeliveryAvailability() && quoteHttpConfigurationValid();
  const t = getDictionary(locale).quote;
  const catalog = getCatalog(locale);
  const summaries = catalog.products.map(({ id, slug, name, categoryId, summary, images }) => ({ id, slug, name, categoryId, summary, images, categoryLabel: catalog.categories[categoryId].label }));
  return <>
    <a className="skip-link" href="#main-content">{getDictionary(locale).common.skipToContent}</a>
    <Header />
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1><Lines lines={t.title} /></h1>
        <p>{t.intro}</p>
      </header>
      <DemoNotice locale={locale} />
      <noscript>{t.noscript}</noscript>
      <QuoteSelection products={summaries} available={available} messages={{ selection: t.selection, form: t.form }} />
    </main>
    <Footer locale={locale} />
  </>;
}
