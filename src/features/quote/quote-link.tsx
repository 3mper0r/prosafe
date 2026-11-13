"use client";

import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { useQuote } from "./quote-store";
import styles from "./quote.module.css";

export function QuoteLink({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const { items, ready } = useQuote();
  const count = ready ? items.length : 0;
  return (
    <Link href="/quote" className={className} onClick={onNavigate} aria-label={`Quote selection, ${count} selected ${count === 1 ? "product" : "products"}`}>
      <ClipboardList size={16} aria-hidden="true" />
      <span>Quote <span className={styles.count} aria-hidden="true">{count}</span></span>
    </Link>
  );
}
