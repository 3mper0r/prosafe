import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/features/catalog/catalog.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";
import { NOINDEX } from "@/i18n/seo";

/** Localized 404 title and an explicit noindex; never a canonical or alternates. */
export function industryNotFoundMetadata(locale: Locale): Metadata {
  return { title: getDictionary(locale).industryDetail.notFoundTitle, robots: NOINDEX };
}

export function IndustryNotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).industryNotFound;
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={styles.empty}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1>{t.heading}</h1>
        <p>{t.body}</p>
        <Link href={localizePath(locale, "/industries")} className="button button-primary">{t.action}</Link>
      </div>
    </main>
  );
}
