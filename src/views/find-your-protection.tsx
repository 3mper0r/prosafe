import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getCatalog } from "@/content/catalog";
import { IndustryEquipment } from "@/features/industries/industry-equipment";
import { RiskAssessmentNote } from "@/features/industries/risk-assessment-note";
import catalogStyles from "@/features/catalog/catalog.module.css";
import styles from "@/features/industries/industries.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";
import { indexableMetadata } from "@/i18n/seo";

export function findYourProtectionMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).findYourProtection;
  return indexableMetadata(locale, "/find-your-protection", { title: t.metaTitle, description: t.metaDescription });
}

export function FindYourProtectionView({ locale, searchParams }: {
  locale: Locale;
  searchParams: { industry?: string | string[] };
}) {
  const input = searchParams.industry;
  const catalog = getCatalog(locale);
  const industry = typeof input === "string" ? catalog.getIndustryBySlug(input) : undefined;
  const invalid = Boolean(input && !industry);
  const t = getDictionary(locale).findYourProtection;
  return (
    <>
      <a className="skip-link" href="#main-content">{getDictionary(locale).common.skipToContent}</a>
      <Header />
      <main id="main-content" tabIndex={-1} className={catalogStyles.page}>
        <header className={catalogStyles.intro}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1><Lines lines={t.title} /></h1>
          <p>{t.intro}</p>
        </header>
        <form key={industry?.slug ?? "unselected"} action={localizePath(locale, "/find-your-protection#discovery-results")} method="get" className={styles.guidedForm} aria-label={t.formLabel}>
          <label className={catalogStyles.field}>
            {t.industryLabel}
            <select name="industry" defaultValue={industry?.slug ?? ""} required aria-describedby="industry-help">
              <option value="" disabled>{t.industryPlaceholder}</option>
              {catalog.industries.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
            </select>
          </label>
          <button type="submit" className="button button-primary">
            {t.submit} <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </form>
        <p id="industry-help" className={catalogStyles.note}>{t.help}</p>
        <RiskAssessmentNote locale={locale} />
        {industry ? (
          <section id="discovery-results" tabIndex={-1} className={styles.guidedResult} aria-labelledby="discovery-heading">
            <p className={styles.eyebrow}>{t.resultEyebrow}</p>
            <h2 id="discovery-heading">{industry.name}</h2>
            <Link href={localizePath(locale, `/industries/${industry.slug}`)} className={catalogStyles.textLink}>
              {t.industryGuide} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <IndustryEquipment locale={locale} industry={industry} />
          </section>
        ) : (
          <section id="discovery-results" tabIndex={-1} className={styles.unselected} aria-label={t.statusLabel}>
            <p>{invalid ? t.invalidIndustry : t.chooseIndustry}</p>
            <Link href={localizePath(locale, "/industries")} className={catalogStyles.textLink}>{t.browseGuides}</Link>
          </section>
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}
