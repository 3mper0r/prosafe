import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BusinessPage } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";
import { indexableMetadata } from "@/i18n/seo";

export function aboutMetadata(locale: Locale): Metadata {
  const { about } = getDictionary(locale);
  return indexableMetadata(locale, "/about", { title: about.metaTitle, description: about.metaDescription });
}

/** Shared /about implementation for every locale. */
export function AboutView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).about;
  return (
    <BusinessPage locale={locale} eyebrow={t.eyebrow} title={<>SAFETY WITHOUT<br />COMPROMISE.</>} intro={t.intro}>
      <dl className={styles.facts}>
        {t.facts.map((fact) => <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.value}</dd></div>)}
      </dl>
      <section className={styles.section} aria-labelledby="mission-heading">
        <h2 id="mission-heading">{t.missionHeading}</h2>
        <div className={styles.body}>
          <p>{t.missionBody}</p>
          <p><strong lang="en">SAFETY WITHOUT COMPROMISE.</strong> {t.sloganBody}</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="distribution-heading">
        <h2 id="distribution-heading">{t.distributionHeading[0]}<br />{t.distributionHeading[1]}</h2>
        <div className={styles.body}>
          {t.distributionBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className={styles.callout} aria-labelledby="approach-heading">
        <h2 id="approach-heading">{t.calloutHeading}</h2>
        <p>{t.calloutBody}</p>
        <div className={styles.actions}>
          <Link href={localizePath(locale, "/industries")} className="button button-primary">{t.exploreIndustries} <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href={localizePath(locale, "/brands")} className="button button-text">{t.partnershipApproach} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </BusinessPage>
  );
}
