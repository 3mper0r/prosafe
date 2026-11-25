import Link from "next/link";
import styles from "@/features/catalog/catalog.module.css";

export default function IndustryNotFound() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={styles.empty}>
        <p className={styles.eyebrow}>INDUSTRY NOT FOUND</p>
        <h1>This industry guide is unavailable.</h1>
        <p>Choose one of the five industries to explore equipment examples.</p>
        <Link href="/industries" className="button button-primary">VIEW INDUSTRIES</Link>
      </div>
    </main>
  );
}
