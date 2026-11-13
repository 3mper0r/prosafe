import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BusinessPage } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";

export const metadata: Metadata = {
  title: "Contact & Business Inquiries",
  description: "Prepare a PROSAFE business quotation and find information for general business and manufacturer partnership inquiries. Initial market: Kosovo.",
};

export default function ContactPage() {
  return (
    <BusinessPage eyebrow="CONTACT" title={<>LET’S TALK<br />PROTECTION.</>} intro="For businesses equipping their teams and manufacturers exploring a distribution relationship. Our initial market is Kosovo.">
      <section className={styles.callout} aria-labelledby="quotation-heading">
        <h2 id="quotation-heading">Business quotations.</h2>
        <p>Build a selection from the demonstration catalog, then review quantities and business requirements in the existing quotation workflow. Submission availability is shown on the quotation page; delivery requires configuration.</p>
        <div className={styles.actions}>
          <Link href="/quote" className="button button-primary">PREPARE A QUOTATION <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/products" className="button button-text">BROWSE DEMO EQUIPMENT <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="business-heading">
        <h2 id="business-heading">General business inquiries.</h2>
        <div className={styles.body}>
          <p>For an equipment inquiry, include your company, working environment, approximate team size, and any sizing or delivery requirements in the quotation form. A product selection is required to submit a quotation request.</p>
          <p><strong>Direct contact details are not yet published.</strong> A verified business email, phone number, and business address must be supplied before launch. A channel for inquiries unrelated to equipment quotations is still pending.</p>
        </div>
      </section>
      <section id="manufacturer-partnerships" className={styles.section} aria-labelledby="manufacturer-heading">
        <h2 id="manufacturer-heading">Manufacturer partnerships.</h2>
        <div className={styles.body}>
          <p>For a future partnership discussion, prepare a company introduction, product categories, relevant product documentation, and your proposed distribution scope for Kosovo.</p>
          <p><strong>Partnership inquiries are not yet open.</strong> A verified partnership contact will be published here before launch.</p>
          <p><Link href="/brands">Read our manufacturer partnership approach</Link></p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="contact-privacy-heading">
        <h2 id="contact-privacy-heading">Your inquiry information.</h2>
        <div className={styles.body}>
          <p>Use the quotation form for business requirements and avoid sensitive personal information. Contact details are not saved in browser storage.</p>
          <p><Link href="/privacy">Read the privacy information and pending launch details</Link></p>
        </div>
      </section>
    </BusinessPage>
  );
}
