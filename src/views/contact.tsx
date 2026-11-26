import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BusinessPage } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";
import { indexableMetadata } from "@/i18n/seo";

export function contactMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).contact;
  return indexableMetadata(locale, "/contact", { title: t.metaTitle, description: t.metaDescription });
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).contact;
  return (
    <BusinessPage locale={locale} eyebrow={t.eyebrow} title={<Lines lines={t.title} />} intro={t.intro}>
      <section className={styles.callout} aria-labelledby="quotation-heading">
        <h2 id="quotation-heading">{t.quotationHeading}</h2>
        <p>{t.quotationBody}</p>
        <div className={styles.actions}>
          <Link href={localizePath(locale, "/quote")} className="button button-primary">{t.prepareQuotation} <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href={localizePath(locale, "/products")} className="button button-text">{t.browseEquipment} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="business-heading">
        <h2 id="business-heading">{t.businessHeading}</h2>
        <div className={styles.body}>
          <p>{t.businessBody}</p>
          <p><strong>{t.businessPending.strong}</strong> {t.businessPending.text}</p>
        </div>
      </section>
      <section id="manufacturer-partnerships" className={styles.section} aria-labelledby="manufacturer-heading">
        <h2 id="manufacturer-heading">{t.manufacturerHeading}</h2>
        <div className={styles.body}>
          <p>{t.manufacturerBody}</p>
          <p><strong>{t.manufacturerPending.strong}</strong> {t.manufacturerPending.text}</p>
          <p><Link href={localizePath(locale, "/brands")}>{t.brandsLink}</Link></p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="contact-privacy-heading">
        <h2 id="contact-privacy-heading">{t.privacyHeading}</h2>
        <div className={styles.body}>
          <p>{t.privacyBody}</p>
          <p><Link href={localizePath(locale, "/privacy")}>{t.privacyLink}</Link></p>
        </div>
      </section>
    </BusinessPage>
  );
}
