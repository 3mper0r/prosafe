import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES, industryCatalogHref } from "@/features/industries/industries";
import { RiskAssessmentNote } from "@/features/industries/risk-assessment-note";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import catalogStyles from "@/features/catalog/catalog.module.css";
import styles from "@/features/industries/industries.module.css";

export const metadata: Metadata = {
  title: "Industries",
  description: "Explore PROSAFE demonstration equipment by industry, from construction and manufacturing to logistics, electrical work, and industrial maintenance.",
};

export default function IndustriesPage() {
  return (
    <main id="main-content" tabIndex={-1} className={catalogStyles.page}>
      <header className={catalogStyles.intro}>
        <p className={styles.eyebrow}>PROSAFE / INDUSTRIES</p>
        <h1>DIFFERENT WORK.<br />ONE PURPOSE.</h1>
        <p>Start with your working environment. Explore protection categories and demonstration equipment for your industry.</p>
      </header>
      <div className={styles.guidedEntry}>
        <Link href="/find-your-protection" className="button button-primary">
          FIND YOUR PROTECTION <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <p>Choose your industry in one step to see a starting collection of equipment examples.</p>
      </div>
      <RiskAssessmentNote />
      <ul className={styles.industryList} aria-label="Industries">
        {INDUSTRIES.map((industry, index) => (
          <li key={industry.slug} className={styles.industryCard} data-industry={industry.slug}>
            <div className={styles.industryTitle}>
              <p className={styles.eyebrow}>0{index + 1} / INDUSTRY</p>
              <h2><Link href={`/industries/${industry.slug}`}>{industry.name}</Link></h2>
            </div>
            <div className={styles.industryBody}>
              <p>{industry.description}</p>
              <ul className={styles.categoryTags} aria-label={`${industry.name} protection categories`}>
                {industry.categoryIds.map((id) => <li key={id}>{PRODUCT_CATEGORIES[id].label}</li>)}
              </ul>
              <div className={styles.industryActions}>
                <Link href={`/industries/${industry.slug}`} className={catalogStyles.textLink}>
                  Explore industry <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link href={industryCatalogHref(industry)} className={catalogStyles.textLink}>
                  Browse demo products <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
