import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";

/**
 * Localized 404 rendered inside the matching root layout.
 *
 * Root-level not-found boundaries are attached to every route in their root
 * segment, so their CSS is loaded on every page. This view therefore uses only
 * global classes from globals.css (no CSS modules, no Header/Footer imports).
 */
export function NotFoundView({ locale }: { locale: Locale }) {
  const { common, notFound: t } = getDictionary(locale);
  return (
    <main id="main-content" tabIndex={-1} className="section-shell">
      <Wordmark locale={locale} label={common.homeLabel} />
      <p className="technical-label section-index">{t.eyebrow}</p>
      <h1 className="section-heading">{t.heading}</h1>
      <p className="section-intro">{t.body}</p>
      <Link href={localizePath(locale, "/")} className="button button-primary mt-6">{t.home}</Link>
    </main>
  );
}
