import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT_CATEGORY_IDS, isProductCategoryId } from "@/lib/product-categories";
import { cleanSearchQuery } from "@/features/catalog/search";
import { getCatalog } from "@/content/catalog";
import { ProductCard } from "@/features/catalog/product-card";
import { DemoNotice } from "@/features/catalog/demo-notice";
import { industryCatalogHref } from "@/features/industries/industries";
import { RiskAssessmentNote } from "@/features/industries/risk-assessment-note";
import styles from "@/features/catalog/catalog.module.css";
import type { Locale } from "@/i18n/config";
import { formatMessage, formatPlural } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";

export function productsMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).catalog;
  return { title: t.metaTitle, description: t.metaDescription };
}

export function ProductsView({ locale, searchParams: query }: {
  locale: Locale;
  searchParams: { q?: string | string[]; category?: string | string[]; industry?: string | string[] };
}) {
  const t = getDictionary(locale).catalog;
  const catalog = getCatalog(locale);
  const search = cleanSearchQuery(query.q);
  const categoryInput = typeof query.category === "string" ? query.category : "";
  const category = isProductCategoryId(categoryInput) ? categoryInput : "";
  const industryInput = typeof query.industry === "string" ? query.industry : "";
  const industry = catalog.getIndustryBySlug(industryInput);
  const products = catalog.filterProducts({ query: search, categoryId: category, industry });
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1><Lines lines={t.title} /></h1>
        <p>{t.intro}</p>
      </header>
      <DemoNotice locale={locale} />
      {industry && <>
        <RiskAssessmentNote locale={locale} />
        <Link href={localizePath(locale, `/industries/${industry.slug}`)} className={styles.textLink}>{formatMessage(t.industryGuide, { industry: industry.name })}</Link>
        {industry.equipmentNote && <p className={styles.note}>{industry.equipmentNote}</p>}
      </>}
      <form key={JSON.stringify([search, category, industry?.slug])} action={localizePath(locale, "/products")} method="get" className={styles.filters} role="search" aria-label={t.filtersLabel}>
        <label className={styles.field}>
          {t.searchLabel}
          <input type="search" name="q" defaultValue={search} placeholder={t.searchPlaceholder} maxLength={200} />
        </label>
        <label className={styles.field}>
          {t.categoryLabel}
          <select name="category" defaultValue={category}>
            <option value="">{t.allCategories}</option>
            {PRODUCT_CATEGORY_IDS.map((id) => <option key={id} value={id}>{catalog.categories[id].label}</option>)}
          </select>
        </label>
        <label className={styles.field}>
          {t.industryLabel}
          <select name="industry" defaultValue={industry?.slug ?? ""}>
            <option value="">{t.allIndustries}</option>
            {catalog.industries.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
          </select>
        </label>
        <button type="submit" className="button button-primary">{t.applyFilters}</button>
      </form>
      {categoryInput && !category && <p className={styles.note}>{t.unknownCategory}</p>}
      {industryInput && !industry && <p className={styles.note}>{t.unknownIndustry}</p>}
      <div className={styles.resultsBar}>
        <p>{formatPlural(locale, products.length, t.resultCount)}{industry ? formatMessage(t.resultIndustry, { industry: industry.name }) : ""}{category ? formatMessage(t.resultCategory, { category: catalog.categories[category].label }) : t.resultAllCategories}{search ? formatMessage(t.resultSearch, { search }) : ""}</p>
        {(search || categoryInput || industryInput) && <Link href={localizePath(locale, "/products")} className={styles.textLink}>{t.clearFilters}</Link>}
      </div>
      {products.length ? (
        <ul className={styles.grid} aria-label={t.resultsLabel}>{products.map((product) => <ProductCard key={product.id} locale={locale} product={product} />)}</ul>
      ) : (
        <section className={styles.empty} aria-labelledby="empty-heading">
          <p className={styles.eyebrow}>{t.emptyEyebrow}</p>
          <h2 id="empty-heading">{t.emptyHeading}</h2>
          <p>{t.emptyBody}</p>
          <Link href={localizePath(locale, industry ? industryCatalogHref(industry) : "/products")} className="button button-primary">{industry ? t.viewIndustryExamples : t.viewAllExamples}</Link>
        </section>
      )}
      <div className={styles.bottomLink}><Link href={localizePath(locale, "/protection-explorer")} className={styles.textLink}>{t.explorerLink}</Link></div>
    </main>
  );
}
