import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/features/industries/industries";
import { IndustryEquipment } from "@/features/industries/industry-equipment";
import { RiskAssessmentNote } from "@/features/industries/risk-assessment-note";
import catalogStyles from "@/features/catalog/catalog.module.css";
import styles from "@/features/industries/industries.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";

export function industryStaticParams() {
  return INDUSTRIES.map(({ slug }) => ({ slug }));
}

export function industryDetailMetadata(locale: Locale, slug: string): Metadata {
  const industry = getIndustryBySlug(slug);
  return industry
    ? { title: industry.name, description: industry.description }
    : { title: getDictionary(locale).industryDetail.notFoundTitle };
}

export function IndustryDetailView({ locale, slug }: { locale: Locale; slug: string }) {
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  const t = getDictionary(locale).industryDetail;
  return (
    <main id="main-content" tabIndex={-1} className={catalogStyles.page} data-industry-page={industry.slug}>
      <nav className={catalogStyles.breadcrumb} aria-label={t.breadcrumb}>
        <Link href={localizePath(locale, "/industries")} className={catalogStyles.textLink}>{t.allIndustries}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{industry.name}</span>
      </nav>
      <header className={catalogStyles.intro}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1>{industry.name}</h1>
        <p>{industry.introduction}</p>
      </header>
      <RiskAssessmentNote locale={locale} />
      <section className={styles.considerations} aria-labelledby="considerations-heading">
        <p className={styles.eyebrow}>{t.considerationsEyebrow}</p>
        <h2 id="considerations-heading">{t.considerationsHeading}</h2>
        <ul className={styles.considerationList}>
          {industry.considerations.map((item) => (
            <li key={item.title}><h3>{item.title}</h3><p>{item.description}</p></li>
          ))}
        </ul>
      </section>
      <IndustryEquipment locale={locale} industry={industry} />
      <div className={catalogStyles.bottomLink}>
        <Link href={localizePath(locale, "/find-your-protection")} className={catalogStyles.textLink}>{t.chooseAnother}</Link>
      </div>
    </main>
  );
}
