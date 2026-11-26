import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industryCatalogHref } from "@/features/industries/industries";
import { RiskAssessmentNote } from "@/features/industries/risk-assessment-note";
import { getCatalog } from "@/content/catalog";
import catalogStyles from "@/features/catalog/catalog.module.css";
import styles from "@/features/industries/industries.module.css";
import type { Locale } from "@/i18n/config";
import { formatMessage } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";
import { indexableMetadata } from "@/i18n/seo";

export function industriesMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).industries;
  return indexableMetadata(locale, "/industries", { title: t.metaTitle, description: t.metaDescription });
}

export function IndustriesView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).industries;
  const catalog = getCatalog(locale);
  return (
    <main id="main-content" tabIndex={-1} className={catalogStyles.page}>
      <header className={catalogStyles.intro}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1><Lines lines={t.title} /></h1>
        <p>{t.intro}</p>
      </header>
      <div className={styles.guidedEntry}>
        <Link href={localizePath(locale, "/find-your-protection")} className="button button-primary">
          {t.findProtection} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <p>{t.findProtectionNote}</p>
      </div>
      <RiskAssessmentNote locale={locale} />
      <ul className={styles.industryList} aria-label={t.listLabel}>
        {catalog.industries.map((industry, index) => (
          <li key={industry.slug} className={styles.industryCard} data-industry={industry.slug}>
            <div className={styles.industryTitle}>
              <p className={styles.eyebrow}>{formatMessage(t.cardEyebrow, { number: `0${index + 1}` })}</p>
              <h2><Link href={localizePath(locale, `/industries/${industry.slug}`)}>{industry.name}</Link></h2>
            </div>
            <div className={styles.industryBody}>
              <p>{industry.description}</p>
              <ul className={styles.categoryTags} aria-label={formatMessage(t.categoriesLabel, { industry: industry.name })}>
                {industry.categoryIds.map((id) => <li key={id}>{catalog.categories[id].label}</li>)}
              </ul>
              <div className={styles.industryActions}>
                <Link href={localizePath(locale, `/industries/${industry.slug}`)} className={catalogStyles.textLink}>
                  {t.exploreIndustry} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link href={localizePath(locale, industryCatalogHref(industry))} className={catalogStyles.textLink}>
                  {t.browseProducts} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
