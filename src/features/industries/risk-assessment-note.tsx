import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import styles from "./industries.module.css";

export function RiskAssessmentNote({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).riskNote;
  return (
    <aside className={styles.assessmentNote} aria-label={t.label}>
      <p>{t.body}</p>
      <a href="https://oshwiki.osha.europa.eu/en/themes/ppe">
        {t.link}
      </a>
    </aside>
  );
}
