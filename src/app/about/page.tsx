import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BusinessPage } from "@/components/layout/business-page";
import styles from "@/components/layout/business-page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Meet PROSAFE: a B2B workplace safety distribution business focused on protecting people at work, with Kosovo as its initial market.",
};

export default function AboutPage() {
  return (
    <BusinessPage eyebrow="ABOUT" title={<>SAFETY WITHOUT<br />COMPROMISE.</>} intro="PROSAFE brings a focused approach to workplace protection: people first, equipment with a purpose, and business relationships built on clarity.">
      <dl className={styles.facts}>
        <div><dt>Our focus</dt><dd>Workplace safety</dd></div>
        <div><dt>Our model</dt><dd>B2B distribution</dd></div>
        <div><dt>Initial market</dt><dd>Kosovo</dd></div>
      </dl>
      <section className={styles.section} aria-labelledby="mission-heading">
        <h2 id="mission-heading">A commitment to the people doing the work.</h2>
        <div className={styles.body}>
          <p>Our mission is to help businesses make workplace protection part of every working day. From construction sites to production floors and warehouses, the starting point is the person behind the task.</p>
          <p><strong>SAFETY WITHOUT COMPROMISE.</strong> This is the standard we set for our approach: understand the work, communicate clearly, and build a considered equipment selection around workplace needs.</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="distribution-heading">
        <h2 id="distribution-heading">Built for business.<br />Starting in Kosovo.</h2>
        <div className={styles.body}>
          <p>PROSAFE is focused on business-to-business distribution of workplace safety equipment. Our approach connects business purchasing needs with manufacturer information and a clear quotation process.</p>
          <p>Kosovo is our initial market. We are developing the product information and manufacturer relationships needed to support businesses equipping their teams.</p>
          <p>The current catalog contains clearly identified demonstration products. Product availability, specifications, and suitability must be confirmed before purchasing.</p>
        </div>
      </section>
      <section className={styles.callout} aria-labelledby="approach-heading">
        <h2 id="approach-heading">Find a starting point for your workplace.</h2>
        <p>Explore equipment by industry or learn how we approach manufacturer partnerships.</p>
        <div className={styles.actions}>
          <Link href="/industries" className="button button-primary">EXPLORE INDUSTRIES <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link href="/brands" className="button button-text">OUR PARTNERSHIP APPROACH <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </BusinessPage>
  );
}
