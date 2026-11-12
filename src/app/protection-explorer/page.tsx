import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProtectionExplorer } from "@/features/protection-explorer/protection-explorer";
import styles from "@/features/protection-explorer/protection-explorer.module.css";

export const metadata: Metadata = {
  title: "Protection Explorer",
  description:
    "Explore workplace protection from head to toe: safety helmets, protective eyewear, gloves, clothing, and footwear.",
};

export default function ProtectionExplorerPage() {
  return (
    <main className={styles.page}>
      <Link href="/#protection" className={styles.backLink}>
        <ArrowLeft size={17} aria-hidden="true" /> Back to PROSAFE
      </Link>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>
          PROSAFE / INTERACTIVE PROTECTION EXPLORER
        </p>
        <h1>
          PROTECTION.
          <br />
          FROM HEAD TO TOE.
        </h1>
        <p>
          Choose a zone to explore the equipment category. Hover or click on
          desktop, tap on mobile, or use Tab and the arrow keys in the zone
          selector.
        </p>
      </header>
      <ProtectionExplorer />
    </main>
  );
}
