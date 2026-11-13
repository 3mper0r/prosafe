import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { DemoNotice } from "@/features/catalog/demo-notice";
import { ProductCard } from "@/features/catalog/product-card";
import catalogStyles from "@/features/catalog/catalog.module.css";
import { getIndustryProducts, industryCatalogHref, type Industry } from "./industries";
import styles from "./industries.module.css";

export function IndustryEquipment({ industry }: { industry: Industry }) {
  const products = getIndustryProducts(industry);
  return (
    <div data-industry-equipment={industry.slug}>
      <section className={styles.categorySection} aria-labelledby="categories-heading">
        <p className={styles.eyebrow}>01 / EQUIPMENT CATEGORIES</p>
        <h2 id="categories-heading">Relevant categories to explore</h2>
        <p className={styles.sectionIntro}>A browsing starting point, not a complete equipment list for every task.</p>
        <ul className={styles.categoryLinks}>
          {industry.categoryIds.map((id) => (
            <li key={id}>
              <Link href={industryCatalogHref(industry, id)}>
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
            <p className={styles.eyebrow}>02 / DEMONSTRATION EQUIPMENT</p>
            <h2 id="examples-heading">Examples for {industry.name.toLowerCase()}</h2>
          </div>
          <Link href={industryCatalogHref(industry)} className={catalogStyles.textLink}>
            Filter in the catalog <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <DemoNotice />
        {industry.equipmentNote && <p className={styles.equipmentNote}>{industry.equipmentNote}</p>}
        <ul className={catalogStyles.grid} aria-label="Industry demonstration products">
          {products.map((product) => <ProductCard key={product.id} product={product} headingLevel={3} />)}
        </ul>
      </section>
      <aside className={styles.quotePrompt} aria-label="Prepare a quote selection">
        <div>
          <p className={styles.eyebrow}>YOUR TEAM / YOUR SELECTION</p>
          <h2>Bring your equipment list together.</h2>
          <p>Add examples to your selection and adjust quantities, then review the quotation form and submission availability.</p>
        </div>
        <Link href="/quote" className="button button-primary">
          PREPARE A QUOTE <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
