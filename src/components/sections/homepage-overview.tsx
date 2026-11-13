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

const equipment = [
  { name: "Head protection", icon: HardHat },
  { name: "Eye & face protection", icon: Glasses },
  { name: "Hearing protection", icon: Headphones },
  { name: "Hand protection", icon: Hand },
  { name: "Protective workwear", icon: Shirt },
  { name: "Safety footwear", icon: Footprints },
];

export function HomepageOverview() {
  return (
    <>
      <section
        id="equipment"
        className="section-shell equipment-section"
        aria-labelledby="equipment-heading"
      >
        <div className="section-heading-row">
          <p className="technical-label section-index">01 / EQUIPMENT</p>
          <div>
            <h2 id="equipment-heading" className="section-heading">
              EVERY LAYER
              <br />
              OF PROTECTION.
            </h2>
            <p className="section-intro">
              From the first task to the last shift. Discover the essentials of
              workplace protection.
            </p>
          </div>
          <Link href="/products" className="technical-label preview-label">
            EQUIPMENT CATALOG ↗
            <br />
            EXPLORE DEMONSTRATION PRODUCTS
          </Link>
        </div>
        <ul className="equipment-list">
          {equipment.map(({ name, icon: Icon }, index) => (
            <li key={name}>
              <span className="technical-label equipment-number">
                0{index + 1}
              </span>
              <Icon aria-hidden="true" size={30} strokeWidth={1.25} />
              <h3>{name}</h3>
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
          02 / A COMPLETE APPROACH
        </p>
        <div>
          <h2 id="protection-heading" className="section-heading">
            THE WORK CHANGES.
            <br />
            <span className="text-accent">OUR PURPOSE DOESN’T.</span>
          </h2>
          <p className="section-intro">
            Protection starts with understanding the work. PROSAFE brings
            equipment and workplace needs together, with the people doing the
            job at the center.
          </p>
          <Link href="/protection-explorer" className="button button-text mt-6">
            OPEN PROTECTION EXPLORER{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        id="industries"
        className="section-shell industries-section"
        aria-labelledby="industries-heading"
      >
        <div className="section-heading-row">
          <p className="technical-label section-index">03 / INDUSTRIES</p>
          <h2 id="industries-heading" className="section-heading">
            DIFFERENT ENVIRONMENTS.
            <br />
            ONE STANDARD OF CARE.
          </h2>
        </div>
        <ul className="industry-list">
          {[
            "Construction",
            "Manufacturing",
            "Logistics",
            "Energy & utilities",
          ].map((industry, index) => (
            <li key={industry}>
              <span className="technical-label">0{index + 1}</span>
              <span>{industry}</span>
            </li>
          ))}
        </ul>
        <p className="technical-label feature-note">
          INDUSTRY OVERVIEW / DEDICATED COLLECTIONS COMING SOON
        </p>
      </section>
      <section
        id="about"
        className="section-shell about-section"
        aria-labelledby="about-heading"
      >
        <p className="technical-label section-index">04 / ABOUT PROSAFE</p>
        <div>
          <h2 id="about-heading" className="section-heading">
            MORE THAN EQUIPMENT.
            <br />A COMMITMENT TO PEOPLE.
          </h2>
          <p className="section-intro">
            PROSAFE is a workplace protection partner for businesses in Kosovo.
            Our purpose is simple: bring professional safety equipment and a
            complete approach to protection to every working day.
          </p>
        </div>
      </section>
      <section
        id="contact"
        className="section-shell contact-section"
        aria-labelledby="quote"
      >
        <p className="technical-label section-index">05 / BUSINESS ENQUIRIES</p>
        <div>
          <p className="technical-label contact-status">
            <span className="orange-square" /> QUOTATION SERVICE / COMING SOON
          </p>
          <h2 id="quote" className="section-heading">
            LET’S TALK
            <br />
            PROTECTION<span className="text-accent">.</span>
          </h2>
          <p className="section-intro">
            Equipping a team starts with a conversation. Direct contact details
            and B2B quotation requests will be available at launch.
          </p>
          <p className="contact-footnote">
            This is a homepage preview. Quotation submissions are not yet open.
          </p>
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
