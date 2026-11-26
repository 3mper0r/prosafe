import {
  ArrowUpRight,
  Footprints,
  Glasses,
  Hand,
  HardHat,
  Headphones,
  Shirt,
} from "lucide-react";
import Link from "next/link";
import { getCatalog } from "@/content/catalog";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";

// Display order and icons are fixed; names come from the dictionary.
const equipment = [
  { key: "head", icon: HardHat },
  { key: "eyeFace", icon: Glasses },
  { key: "hearing", icon: Headphones },
  { key: "hand", icon: Hand },
  { key: "workwear", icon: Shirt },
  { key: "footwear", icon: Footprints },
] as const;

export function HomepageOverview({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home;
  return (
    <>
      <section
        id="equipment"
        className="section-shell equipment-section"
        aria-labelledby="equipment-heading"
      >
        <div className="section-heading-row">
          <p className="technical-label section-index">{t.equipment.index}</p>
          <div>
            <h2 id="equipment-heading" className="section-heading">
              <Lines lines={t.equipment.heading} />
            </h2>
            <p className="section-intro">
              {t.equipment.intro}
            </p>
          </div>
          <Link href={localizePath(locale, "/products")} className="technical-label preview-label">
            <Lines lines={t.equipment.catalogLink} />
          </Link>
        </div>
        <ul className="equipment-list">
          {equipment.map(({ key, icon: Icon }, index) => (
            <li key={key}>
              <span className="technical-label equipment-number">
                0{index + 1}
              </span>
              <Icon aria-hidden="true" size={30} strokeWidth={1.25} />
              <h3>{t.equipment.items[key]}</h3>
            </li>
          ))}
        </ul>
      </section>
      <section
        id="protection"
        className="section-shell protection-section"
        aria-labelledby="protection-heading"
      >
        <p className="technical-label section-index">
          {t.approach.index}
        </p>
        <div>
          <h2 id="protection-heading" className="section-heading">
            {t.approach.heading}
            <br />
            <span className="text-accent">{t.approach.headingAccent}</span>
          </h2>
          <p className="section-intro">
            {t.approach.intro}
          </p>
          <Link href={localizePath(locale, "/protection-explorer")} className="button button-text mt-6">
            {t.approach.explorerLink}{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link href={localizePath(locale, "/find-your-protection")} className="button button-text mt-6 sm:ml-8">
            {t.approach.industryLink} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        id="industries"
        className="section-shell industries-section"
        aria-labelledby="industries-heading"
      >
        <div className="section-heading-row">
          <p className="technical-label section-index">{t.industries.index}</p>
          <h2 id="industries-heading" className="section-heading">
            <Lines lines={t.industries.heading} />
          </h2>
        </div>
        <ul className="industry-list">
          {getCatalog(locale).industries.map((industry, index) => (
            <li key={industry.slug}>
              <span className="technical-label">0{index + 1}</span>
              <Link href={localizePath(locale, `/industries/${industry.slug}`)} className="flex min-h-11 items-center gap-4 transition-colors hover:text-accent">
                {industry.name} <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="technical-label feature-note">
          <Link href={localizePath(locale, "/industries")} className="button button-text">{t.industries.allIndustries} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </p>
      </section>
      <section
        id="about"
        className="section-shell about-section"
        aria-labelledby="about-heading"
      >
        <p className="technical-label section-index">{t.about.index}</p>
        <div>
          <h2 id="about-heading" className="section-heading">
            <Lines lines={t.about.heading} />
          </h2>
          <p className="section-intro">
            {t.about.intro}
          </p>
          <Link href={localizePath(locale, "/about")} className="button button-text mt-6">{t.about.link} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <section
        id="contact"
        className="section-shell contact-section"
        aria-labelledby="quote"
      >
        <p className="technical-label section-index">{t.contact.index}</p>
        <div>
          <p className="technical-label contact-status">
            <span className="orange-square" /> {t.contact.status}
          </p>
          <h2 id="quote" className="section-heading">
            <Lines lines={t.contact.heading} />
            <span className="text-accent">.</span>
          </h2>
          <p className="section-intro">
            {t.contact.intro}
          </p>
          <p className="contact-footnote">
            {t.contact.footnote}
          </p>
          <Link href={localizePath(locale, "/quote")} className="button button-text mt-6">{t.contact.quoteLink} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link href={localizePath(locale, "/contact")} className="button button-text mt-6 sm:ml-8">{t.contact.contactLink} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <ArrowUpRight
          className="contact-arrow"
          size={100}
          strokeWidth={0.8}
          aria-hidden="true"
        />
      </section>
    </>
  );
}
