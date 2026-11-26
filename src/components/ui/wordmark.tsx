import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";

/** Rendered by both server components and the client Header, so it takes its label as a prop. */
export function Wordmark({ locale, label }: { locale: Locale; label: string }) {
  return (
    <Link href={localizePath(locale, "/")} className="wordmark" aria-label={label}>
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      PROSAFE
      <span className="wordmark-dot" aria-hidden="true">
        +
      </span>
    </Link>
  );
}
