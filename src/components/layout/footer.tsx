import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";
import styles from "./footer.module.css";

export function Footer({ locale }: { locale: Locale }) {
  const { common, footer: t } = getDictionary(locale);
  return (
    <footer className="site-footer">
      <Wordmark locale={locale} label={common.homeLabel} />
      <p className="technical-label">SAFETY WITHOUT COMPROMISE.</p>
      <nav className={styles.navigation} aria-label={t.navigationLabel}>
        <ul>
          {t.links.map(({ href, label }) => <li key={href}><Link href={localizePath(locale, href)}>{label}</Link></li>)}
        </ul>
      </nav>
      <a className="photo-credit" href="https://www.pexels.com/license/">
        {t.photoCredit}
      </a>
    </footer>
  );
}
