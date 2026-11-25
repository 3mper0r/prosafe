import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/features/industries/industries";
import { IndustryEquipment } from "@/features/industries/industry-equipment";
import { RiskAssessmentNote } from "@/features/industries/risk-assessment-note";
import catalogStyles from "@/features/catalog/catalog.module.css";
import styles from "@/features/industries/industries.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDUSTRIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustryBySlug((await params).slug);
  return industry
    ? { title: industry.name, description: industry.description }
    : { title: "Industry not found" };
}

export default async function IndustryPage({ params }: Props) {
  const industry = getIndustryBySlug((await params).slug);
  if (!industry) notFound();
  return (
    <main id="main-content" tabIndex={-1} className={catalogStyles.page} data-industry-page={industry.slug}>
      <nav className={catalogStyles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/industries" className={catalogStyles.textLink}>All industries</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{industry.name}</span>
      </nav>
      <header className={catalogStyles.intro}>
        <p className={styles.eyebrow}>PROSAFE / INDUSTRY DISCOVERY</p>
        <h1>{industry.name}</h1>
        <p>{industry.introduction}</p>
      </header>
      <RiskAssessmentNote />
      <section className={styles.considerations} aria-labelledby="considerations-heading">
        <p className={styles.eyebrow}>THE WORKPLACE / BEFORE THE EQUIPMENT</p>
        <h2 id="considerations-heading">Common protection considerations</h2>
        <ul className={styles.considerationList}>
          {industry.considerations.map((item) => (
            <li key={item.title}><h3>{item.title}</h3><p>{item.description}</p></li>
          ))}
        </ul>
      </section>
      <IndustryEquipment industry={industry} />
      <div className={catalogStyles.bottomLink}>
        <Link href="/find-your-protection" className={catalogStyles.textLink}>Choose another industry in Find Your Protection →</Link>
      </div>
    </main>
  );
}
