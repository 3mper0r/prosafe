import type { Metadata } from "next";
import Link from "next/link";
import { BusinessPage, CompletionNotice } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";

export const metadata: Metadata = {
  title: "Privacy — Draft",
  description: "Draft PROSAFE privacy information describing the current quotation workflow and the business information that must be completed before launch.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <BusinessPage eyebrow="PRIVACY / DRAFT" title={<>PRIVACY<br />INFORMATION.</>} intro="This draft describes the current website’s quotation workflow. Business-specific privacy information remains incomplete.">
      <CompletionNotice>This is not a finalized privacy notice. The operator must complete and approve the identified information before launch and before collecting real business inquiries. No effective date has been assigned.</CompletionNotice>
      <section className={styles.section} aria-labelledby="operator-heading">
        <h2 id="operator-heading">01 / Responsible business.</h2>
        <div className={styles.body}>
          <p>PROSAFE is the brand used on this website. The legal entity responsible for personal information has not yet been provided.</p>
          <p><strong>Complete before launch:</strong> legal entity name, registered address, privacy contact email, and any applicable representative or data protection contact.</p>
          <p><Link href="/imprint">See the draft company information</Link></p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="inquiry-data-heading">
        <h2 id="inquiry-data-heading">02 / Quotation information.</h2>
        <div className={styles.body}>
          <p>The quotation form asks for company name, contact person, business email, product selections and quantities, and agreement to use the information to respond to the inquiry. Phone number, delivery city, and additional requirements are optional.</p>
          <p>Contact details stay in the current form and are not written to browser storage. When submission is enabled and you submit, the website validates the request and sends the details and selection to the configured quotation recipient through its email delivery provider.</p>
          <p>The stated purpose is to handle the quotation inquiry. The form does not request marketing permission. The application has no database or durable quotation archive.</p>
          <p><strong>Complete before launch:</strong> confirm the purposes and applicable legal basis for each processing activity, the responsible recipients, and how privacy requests will be handled.</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="storage-heading">
        <h2 id="storage-heading">03 / Browser storage & technical processing.</h2>
        <div className={styles.body}>
          <p>The quotation selection uses browser local storage under <code>prosafe.quote.v1</code> to remember product identifiers and quantities across visits. It has no automatic expiry. You can remove items on the quotation page or clear this website’s storage in your browser. Accepted submissions remove the submitted selection, while preserving concurrent changes.</p>
          <p>The quotation service uses temporary session tokens, request identifiers, request fingerprints, and attempt counters to validate submissions, limit abuse, and reduce duplicate delivery. The in-memory request registry retains entries for up to 24 hours, subject to cleanup and process restarts; it does not keep raw contact fields in completed entries.</p>
          <p><strong>Complete before launch:</strong> review the deployed hosting logs, network metadata, cookies, and storage inventory; identify the hosting provider and any additional tools. Confirm retention and any consent requirements for the final deployment.</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="recipients-heading">
        <h2 id="recipients-heading">04 / Providers, recipients & retention.</h2>
        <div className={styles.body}>
          <p>The existing optional email adapter supports Resend. This describes supported software, rather than confirmation of a contracted provider. Delivery remains unavailable until valid configuration is supplied. The configured provider and recipient mailbox handle accepted inquiry information.</p>
          <p><strong>Complete before launch:</strong> identify the actual provider and mailbox recipients; document processing arrangements, processing locations, any international transfers and safeguards, and retention and deletion periods for inquiry emails, provider records, and logs.</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="rights-heading">
        <h2 id="rights-heading">05 / Privacy requests & updates.</h2>
        <div className={styles.body}>
          <p><strong>Complete before launch:</strong> explain applicable rights, how to exercise them, any consent withdrawal process, and the relevant supervisory authority and complaint channel. Publish a verified privacy contact and an effective or last-updated date after review.</p>
          <p>A privacy request channel has not yet been published. This draft must be reviewed against the actual business, deployment, and applicable requirements.</p>
          <p><Link href="/contact">View the contact information status</Link></p>
        </div>
      </section>
    </BusinessPage>
  );
}
