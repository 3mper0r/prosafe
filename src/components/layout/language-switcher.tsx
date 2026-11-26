"use client";

import { usePathname } from "next/navigation";
import { Fragment, useSyncExternalStore, type SyntheticEvent } from "react";
import { LOCALES, type Locale } from "@/i18n/config";
import { useLocale, useMessages } from "@/i18n/locale-context";
import { localizePath, type InternalPath } from "@/i18n/paths";
import { saveLocalePreference } from "@/i18n/preference";
import styles from "./language-switcher.module.css";

/** Language names in their own language (endonyms); intentionally not translated. */
const LANGUAGE_NAMES: Record<Locale, string> = { sq: "Shqip", en: "English" };

/** Query string and fragment are only known in the browser; the server renders without them. */
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}
const browserSuffix = () => window.location.search + window.location.hash;
const serverSuffix = () => "";

/**
 * SQ / EN switcher. Each option is a real link to the equivalent page, so it
 * works without JavaScript; in the browser the link also carries the current
 * query string and fragment, and a click saves the explicit choice.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const label = useMessages().header.languageLabel;
  const pathname = (usePathname() || "/") as InternalPath;
  const suffix = useSyncExternalStore(subscribe, browserSuffix, serverSuffix);

  // Recompute from the live location right before use: client-side navigations
  // (e.g. links to "#protection") can change the hash without a hashchange event.
  const refresh = (target: Locale) => (event: SyntheticEvent<HTMLAnchorElement>) => {
    const { pathname: path, search, hash } = window.location;
    event.currentTarget.href = localizePath(target, `${path}${search}${hash}` as InternalPath);
  };

  return (
    <nav className={`${styles.switcher} ${className ?? ""}`} aria-label={label}>
      <ul>
        {LOCALES.map((target, index) => (
          <Fragment key={target}>
            {index > 0 && <li className={styles.separator} aria-hidden="true">/</li>}
            <li>
              <a
                href={localizePath(target, `${pathname}${suffix}` as InternalPath)}
                hrefLang={target}
                lang={target}
                aria-current={target === locale ? "true" : undefined}
                onFocus={refresh(target)}
                onPointerEnter={refresh(target)}
                onClick={(event) => {
                  refresh(target)(event);
                  saveLocalePreference(target);
                }}
              >
                {target.toUpperCase()}
                <span className="sr-only"> ({LANGUAGE_NAMES[target]})</span>
              </a>
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  );
}
