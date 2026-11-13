import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PRODUCTS } from "@/features/catalog/products";
import { DemoNotice } from "@/features/catalog/demo-notice";
import { QuoteSelection } from "@/features/quote/quote-selection";
import styles from "@/features/catalog/catalog.module.css";

export const metadata: Metadata = { title: "Quote selection", description: "Review your locally saved demonstration equipment selection. Quote submission is not yet available.", robots: { index: false, follow: true } };

export default function QuotePage() {
  const summaries = PRODUCTS.map(({ id, slug, name, categoryId, summary, images }) => ({ id, slug, name, categoryId, summary, images }));
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>PROSAFE / QUOTE PREPARATION</p>
        <h1>YOUR TEAM.<br />YOUR SELECTION.</h1>
        <p>Review products and quantities for your workplace. This selection is saved in your browser; quote requests are not open yet.</p>
      </header>
      <DemoNotice />
      <QuoteSelection products={summaries} />
    </main>
    <Footer />
  </>;
}
