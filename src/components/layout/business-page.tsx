import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import catalogStyles from "@/features/catalog/catalog.module.css";
import styles from "./business-page.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function BusinessPage({ locale, eyebrow, title, intro, children }: {
  locale: Locale;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">{getDictionary(locale).common.skipToContent}</a>
      <Header />
      <main id="main-content" tabIndex={-1} className={`${catalogStyles.page} ${styles.page}`}>
        <header className={catalogStyles.intro}>
          <p className={catalogStyles.eyebrow}>PROSAFE / {eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}

export function CompletionNotice({ children }: { children: ReactNode }) {
  return (
    <aside className={styles.notice} aria-label="Before launch">
      <p className="technical-label">DRAFT / COMPLETE BEFORE LAUNCH</p>
      <p>{children}</p>
    </aside>
  );
}
