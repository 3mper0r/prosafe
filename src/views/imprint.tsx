import type { Metadata } from "next";
import Link from "next/link";
import { BusinessPage, CompletionNotice } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";

export function imprintMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).imprint;
  return { title: t.metaTitle, description: t.metaDescription, robots: { index: false, follow: true } };
}

function Items({ items }: { items: readonly { term: string; text: string }[] }) {
  return <ul>{items.map((item) => <li key={item.term}><strong>{item.term}</strong> {item.text}</li>)}</ul>;
}

export function ImprintView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).imprint;
  return (
    <BusinessPage locale={locale} eyebrow={t.eyebrow} title={<Lines lines={t.title} />} intro={t.intro}>
      <CompletionNotice locale={locale}>{t.notice}</CompletionNotice>
      <section className={styles.section} aria-labelledby="identity-heading">
        <h2 id="identity-heading">{t.identity.heading}</h2>
        <div className={styles.body}>
          <Items items={t.identity.items} />
          <p>{t.identity.note}</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="registration-heading">
        <h2 id="registration-heading">{t.registration.heading}</h2>
        <div className={styles.body}>
          <Items items={t.registration.items} />
        </div>
      </section>
      <section className={styles.section} aria-labelledby="legal-contact-heading">
        <h2 id="legal-contact-heading">{t.contact.heading}</h2>
        <div className={styles.body}>
          <Items items={t.contact.items} />
          <p><Link href={localizePath(locale, "/contact")}>{t.contact.link}</Link></p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="publication-heading">
        <h2 id="publication-heading">{t.publication.heading}</h2>
        <div className={styles.body}>
          <p><strong>{t.publication.pendingLabel}</strong> {t.publication.pending}</p>
          <p><Link href={localizePath(locale, "/privacy")}>{t.publication.link}</Link></p>
        </div>
      </section>
    </BusinessPage>
  );
}
