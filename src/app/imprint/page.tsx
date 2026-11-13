import type { Metadata } from "next";
import Link from "next/link";
import { BusinessPage, CompletionNotice } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";

export const metadata: Metadata = {
  title: "Imprint — Draft",
  description: "Draft PROSAFE company and website operator information, with legal identity, registration, and contact details pending verification before launch.",
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return (
    <BusinessPage eyebrow="IMPRINT / DRAFT" title={<>COMPANY<br />INFORMATION.</>} intro="PROSAFE is focused on B2B workplace safety distribution, with Kosovo as its initial market. Verified legal and operator details are still required.">
      <CompletionNotice>This imprint is an incomplete draft. PROSAFE is a brand name here, not a verified legal entity name. All fields below must be completed or confirmed as not applicable and reviewed before launch.</CompletionNotice>
      <section className={styles.section} aria-labelledby="identity-heading">
        <h2 id="identity-heading">01 / Website operator.</h2>
        <div className={styles.body}>
          <ul>
            <li><strong>Legal entity name:</strong> to be provided and verified.</li>
            <li><strong>Legal form:</strong> to be provided and verified.</li>
            <li><strong>Registered business address:</strong> to be provided and verified.</li>
            <li><strong>Authorized representative:</strong> name and role to be provided and verified.</li>
          </ul>
          <p>Kosovo is the initial market; this does not establish the operator’s place of registration or registered address.</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="registration-heading">
        <h2 id="registration-heading">02 / Registration & tax details.</h2>
        <div className={styles.body}>
          <ul>
            <li><strong>Business registration number and register:</strong> to be provided and verified.</li>
            <li><strong>Tax / VAT identification:</strong> to be provided and verified, where applicable.</li>
            <li><strong>Relevant licensing or supervisory details:</strong> applicability to be confirmed.</li>
          </ul>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="legal-contact-heading">
        <h2 id="legal-contact-heading">03 / Business contact.</h2>
        <div className={styles.body}>
          <ul>
            <li><strong>Business email:</strong> verified public address pending.</li>
            <li><strong>Business phone:</strong> verified public number pending.</li>
            <li><strong>Correspondence address:</strong> to be confirmed with the operator.</li>
          </ul>
          <p><Link href="/contact">Business inquiry and quotation information</Link></p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="publication-heading">
        <h2 id="publication-heading">04 / Publication review.</h2>
        <div className={styles.body}>
          <p><strong>Complete before launch:</strong> confirm the applicable disclosure requirements, any additional responsible-person information, and a publication or review date. Replace the pending fields with approved business details.</p>
          <p><Link href="/privacy">Read the draft privacy information</Link></p>
        </div>
      </section>
    </BusinessPage>
  );
}
