import type { Metadata } from "next";
import { connection } from "next/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PRODUCTS } from "@/features/catalog/products";
import { DemoNotice } from "@/features/catalog/demo-notice";
import { QuoteSelection } from "@/features/quote/quote-selection";
import { getQuoteDeliveryAvailability } from "@/features/quote/request/delivery.server";
import { quoteHttpConfigurationValid } from "@/features/quote/request/http.server";
import styles from "@/features/catalog/catalog.module.css";

export const metadata: Metadata = { title: "Request a quotation", description: "Review your equipment selection and prepare a business quotation enquiry with PROSAFE.", robots: { index: false, follow: true } };

export default async function QuotePage() {
  await connection();
  const available = getQuoteDeliveryAvailability() && quoteHttpConfigurationValid();
  const summaries = PRODUCTS.map(({ id, slug, name, categoryId, summary, images }) => ({ id, slug, name, categoryId, summary, images }));
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>PROSAFE / QUOTE PREPARATION</p>
        <h1>YOUR TEAM.<br />YOUR SELECTION.</h1>
        <p>Review products and quantities for your workplace, then provide your business contact details. Your equipment selection is saved in this browser; contact details are not.</p>
      </header>
      <DemoNotice />
      <noscript>JavaScript is needed to load your saved selection and submit a quotation request.</noscript>
      <QuoteSelection products={summaries} available={available} />
    </main>
    <Footer />
  </>;
}
