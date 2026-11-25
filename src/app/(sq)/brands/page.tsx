import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BusinessPage } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";

export const metadata: Metadata = {
  title: "Brands & Manufacturer Partnerships",
  description: "Learn about PROSAFE’s approach to manufacturer partnerships and verified product information for B2B safety equipment distribution in Kosovo.",
};

export default function BrandsPage() {
  return (
    <BusinessPage eyebrow="BRANDS & PARTNERSHIPS" title={<>STRONG RELATIONSHIPS.<br />CLEAR STANDARDS.</>} intro="Our manufacturer partnership approach starts with a shared focus on workplace protection and clear information for business customers in Kosovo.">
      <section className={styles.section} aria-labelledby="partnership-heading">
        <h2 id="partnership-heading">A considered approach to distribution.</h2>
        <div className={styles.body}>
          <p>We aim to develop manufacturer relationships that support informed equipment selection and dependable business communication.</p>
          <ul>
            <li><strong>Verified identity and authorization.</strong> Confirm the manufacturer and the scope of any distribution relationship before publishing a partnership.</li>
            <li><strong>Documented product information.</strong> Review specifications, intended uses, and supporting documentation before adding real products.</li>
            <li><strong>Practical business support.</strong> Establish clear contacts for quotations, availability, and product questions.</li>
          </ul>
        </div>
      </section>
      <section className={styles.partnerSpace} aria-labelledby="partners-heading">
        <p className="technical-label">VERIFIED PARTNERS / FUTURE DIRECTORY</p>
        <div className={styles.body}>
          <h2 id="partners-heading"><strong>No manufacturer partners published yet.</strong></h2>
          <p>This space is reserved for future verified partners. Manufacturer names, logos, and relationship details will be added only after verification and permission to publish.</p>
          <p>Demonstration products in the catalog do not represent manufacturer partnerships or authorized distribution agreements.</p>
        </div>
      </section>
      <section className={styles.callout} aria-labelledby="manufacturer-heading">
        <h2 id="manufacturer-heading">For manufacturers.</h2>
        <p>Interested in PROSAFE’s B2B distribution focus in Kosovo? Review the partnership inquiry information on our contact page. A verified direct contact channel is still pending.</p>
        <div className={styles.actions}>
          <Link href="/contact#manufacturer-partnerships" className="button button-primary">PARTNERSHIP INQUIRIES <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </BusinessPage>
  );
}
