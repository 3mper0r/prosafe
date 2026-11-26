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

export function brandsMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).brands;
  return indexableMetadata(locale, "/brands", { title: t.metaTitle, description: t.metaDescription });
}

export function BrandsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).brands;
  return (
    <BusinessPage locale={locale} eyebrow={t.eyebrow} title={<Lines lines={t.title} />} intro={t.intro}>
      <section className={styles.section} aria-labelledby="partnership-heading">
        <h2 id="partnership-heading">{t.partnershipHeading}</h2>
        <div className={styles.body}>
          <p>{t.partnershipBody}</p>
          <ul>
            {t.principles.map((item) => <li key={item.term}><strong>{item.term}</strong> {item.text}</li>)}
          </ul>
        </div>
      </section>
      <section className={styles.partnerSpace} aria-labelledby="partners-heading">
        <p className="technical-label">{t.partnersLabel}</p>
        <div className={styles.body}>
          <h2 id="partners-heading"><strong>{t.partnersHeading}</strong></h2>
          {t.partnersBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className={styles.callout} aria-labelledby="manufacturer-heading">
        <h2 id="manufacturer-heading">{t.manufacturerHeading}</h2>
        <p>{t.manufacturerBody}</p>
        <div className={styles.actions}>
          <Link href={localizePath(locale, "/contact#manufacturer-partnerships")} className="button button-primary">{t.partnershipInquiries} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </BusinessPage>
  );
}
