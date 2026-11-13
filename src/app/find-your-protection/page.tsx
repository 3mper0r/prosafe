import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { INDUSTRIES, getIndustryBySlug } from "@/features/industries/industries";
import { IndustryEquipment } from "@/features/industries/industry-equipment";
import { RiskAssessmentNote } from "@/features/industries/risk-assessment-note";
import catalogStyles from "@/features/catalog/catalog.module.css";
import styles from "@/features/industries/industries.module.css";

export const metadata: Metadata = {
  title: "Find Your Protection",
  description: "Choose an industry to explore relevant protection categories and demonstration equipment from the PROSAFE catalog.",
};

export default async function FindYourProtectionPage({ searchParams }: {
  searchParams: Promise<{ industry?: string | string[] }>;
}) {
  const input = (await searchParams).industry;
  const industry = typeof input === "string" ? getIndustryBySlug(input) : undefined;
  const invalid = Boolean(input && !industry);
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1} className={catalogStyles.page}>
        <header className={catalogStyles.intro}>
          <p className={styles.eyebrow}>PROSAFE / FIND YOUR PROTECTION</p>
          <h1>START WITH<br />YOUR INDUSTRY.</h1>
          <p>Choose your working environment. Explore a starting collection of equipment categories and demonstration products, then add examples to your quote selection.</p>
        </header>
        <form key={industry?.slug ?? "unselected"} action="/find-your-protection#discovery-results" method="get" className={styles.guidedForm} aria-label="Find equipment by industry">
          <label className={catalogStyles.field}>
            Your industry
            <select name="industry" defaultValue={industry?.slug ?? ""} required aria-describedby="industry-help">
              <option value="" disabled>Choose your industry</option>
              {INDUSTRIES.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
            </select>
          </label>
          <button type="submit" className="button button-primary">
            SHOW EQUIPMENT <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </form>
        <p id="industry-help" className={catalogStyles.note}>One industry selection. You can change it at any time.</p>
        <RiskAssessmentNote />
        {industry ? (
          <section id="discovery-results" tabIndex={-1} className={styles.guidedResult} aria-labelledby="discovery-heading">
            <p className={styles.eyebrow}>YOUR INDUSTRY / EQUIPMENT STARTING POINT</p>
            <h2 id="discovery-heading">{industry.name}</h2>
            <Link href={`/industries/${industry.slug}`} className={catalogStyles.textLink}>
              Read the industry guide <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <IndustryEquipment industry={industry} />
          </section>
        ) : (
          <section id="discovery-results" tabIndex={-1} className={styles.unselected} aria-label="Industry selection status">
            <p>{invalid ? "That industry is unavailable. Choose one of the five industries above to continue." : "Choose your industry above to see equipment categories and examples."}</p>
            <Link href="/industries" className={catalogStyles.textLink}>Or browse all industry guides →</Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
