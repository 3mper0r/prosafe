import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import styles from "./catalog.module.css";

export function DemoNotice({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).demoNotice;
  return (
    <aside className={styles.demoNotice} aria-label={t.label}>
      <strong>{t.title}</strong>
      <p>{t.body}</p>
    </aside>
  );
}
