import Link from "next/link";
import styles from "@/features/catalog/catalog.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";

export function ProductNotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).productNotFound;
  return <main id="main-content" tabIndex={-1} className={styles.page}><div className={styles.empty}>
    <p className={styles.eyebrow}>{t.eyebrow}</p>
    <h1>{t.heading}</h1>
    <p>{t.body}</p>
    <Link href={localizePath(locale, "/products")} className="button button-primary">{t.action}</Link>
  </div></main>;
}
