import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { DemoNotice } from "@/features/catalog/demo-notice";
import { ProductCard } from "@/features/catalog/product-card";
import catalogStyles from "@/features/catalog/catalog.module.css";
import { getIndustryProducts, industryCatalogHref, type Industry } from "./industries";
import styles from "./industries.module.css";
import type { Locale } from "@/i18n/config";
import { formatMessage } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";

export function IndustryEquipment({ locale, industry }: { locale: Locale; industry: Industry }) {
  const products = getIndustryProducts(industry);
  const t = getDictionary(locale).industryEquipment;
  return (
    <div data-industry-equipment={industry.slug}>
      <section className={styles.categorySection} aria-labelledby="categories-heading">
        <p className={styles.eyebrow}>{t.categoriesEyebrow}</p>
        <h2 id="categories-heading">{t.categoriesHeading}</h2>
        <p className={styles.sectionIntro}>{t.categoriesIntro}</p>
        <ul className={styles.categoryLinks}>
          {industry.categoryIds.map((id) => (
            <li key={id}>
              <Link href={localizePath(locale, industryCatalogHref(industry, id))}>
                {PRODUCT_CATEGORIES[id].label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="equipment" className={styles.equipmentSection} aria-labelledby="examples-heading">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>{t.examplesEyebrow}</p>
            <h2 id="examples-heading">{formatMessage(t.examplesHeading, { industry: industry.name.toLocaleLowerCase(locale) })}</h2>
          </div>
          <Link href={localizePath(locale, industryCatalogHref(industry))} className={catalogStyles.textLink}>
            {t.filterInCatalog} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <DemoNotice locale={locale} />
        {industry.equipmentNote && <p className={styles.equipmentNote}>{industry.equipmentNote}</p>}
        <ul className={catalogStyles.grid} aria-label={t.productsLabel}>
          {products.map((product) => <ProductCard key={product.id} locale={locale} product={product} headingLevel={3} />)}
        </ul>
      </section>
      <aside className={styles.quotePrompt} aria-label={t.quotePromptLabel}>
        <div>
          <p className={styles.eyebrow}>{t.quotePromptEyebrow}</p>
          <h2>{t.quotePromptHeading}</h2>
          <p>{t.quotePromptBody}</p>
        </div>
        <Link href={localizePath(locale, "/quote")} className="button button-primary">
          {t.quotePromptAction} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
