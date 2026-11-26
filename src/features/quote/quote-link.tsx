"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { formatPlural } from "@/i18n/format";
import { useLocale, useMessages } from "@/i18n/locale-context";
import { localizePath } from "@/i18n/paths";
import { useQuote } from "./quote-store";
import styles from "./quote.module.css";

export function QuoteLink({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const locale = useLocale();
  const t = useMessages().quoteLink;
  const { items, ready } = useQuote();
  const count = ready ? items.length : 0;
  return (
    <Link href={localizePath(locale, "/quote")} className={className} onClick={onNavigate} aria-label={formatPlural(locale, count, t.ariaLabel)}>
      <ClipboardList size={16} aria-hidden="true" />
      <span>{t.label} <span className={styles.count} aria-hidden="true">{count}</span></span>
    </Link>
  );
}
