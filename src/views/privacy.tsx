import type { Metadata } from "next";
import Link from "next/link";
import { BusinessPage, CompletionNotice } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";

export function privacyMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).privacy;
  return { title: t.metaTitle, description: t.metaDescription, robots: { index: false, follow: true } };
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).privacy;
  const pending = (text: string) => <p><strong>{t.completeBeforeLaunch}</strong> {text}</p>;
  return (
    <BusinessPage locale={locale} eyebrow={t.eyebrow} title={<Lines lines={t.title} />} intro={t.intro}>
      <CompletionNotice locale={locale}>{t.notice}</CompletionNotice>
      <section className={styles.section} aria-labelledby="operator-heading">
        <h2 id="operator-heading">{t.operator.heading}</h2>
        <div className={styles.body}>
          <p>{t.operator.body}</p>
          {pending(t.operator.pending)}
          <p><Link href={localizePath(locale, "/imprint")}>{t.operator.link}</Link></p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="inquiry-data-heading">
        <h2 id="inquiry-data-heading">{t.inquiryData.heading}</h2>
        <div className={styles.body}>
          {t.inquiryData.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {pending(t.inquiryData.pending)}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="storage-heading">
        <h2 id="storage-heading">{t.storage.heading}</h2>
        <div className={styles.body}>
          <p>{t.storage.selectionBeforeKey} <code>prosafe.quote.v1</code> {t.storage.selectionAfterKey}</p>
          <p>{t.storage.service}</p>
          {pending(t.storage.pending)}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="recipients-heading">
        <h2 id="recipients-heading">{t.recipients.heading}</h2>
        <div className={styles.body}>
          <p>{t.recipients.body}</p>
          {pending(t.recipients.pending)}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="rights-heading">
        <h2 id="rights-heading">{t.rights.heading}</h2>
        <div className={styles.body}>
          {pending(t.rights.pending)}
          <p>{t.rights.body}</p>
          <p><Link href={localizePath(locale, "/contact")}>{t.rights.link}</Link></p>
        </div>
      </section>
    </BusinessPage>
  );
}
