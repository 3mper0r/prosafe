import Link from "next/link";
import styles from "@/features/catalog/catalog.module.css";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

export function ProductNotFoundView({ locale }: { locale: Locale }) {
  return <main id="main-content" tabIndex={-1} className={styles.page}><div className={styles.empty}>
    <p className={styles.eyebrow}>PRODUCT NOT FOUND</p>
    <h1>This equipment entry is unavailable.</h1>
    <p>Return to the catalog to explore the demonstration products.</p>
    <Link href={localizePath(locale, "/products")} className="button button-primary">BACK TO EQUIPMENT</Link>
  </div></main>;
}
