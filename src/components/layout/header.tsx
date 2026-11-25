"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { useLocale, useMessages } from "@/i18n/locale-context";
import { localizePath, stripLocale, type InternalPath } from "@/i18n/paths";
import { QuoteLink } from "@/features/quote/quote-link";
import styles from "./header.module.css";

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale();
  const { navigation } = useMessages().header;
  // Compare locale-independent paths so /en/products marks "Products" as current.
  const current = stripLocale((usePathname() || "/") as InternalPath);
  return navigation.map((item) => (
    <li key={item.href}>
      <Link href={localizePath(locale, item.href)} onClick={onNavigate} aria-current={current === item.href || current.startsWith(`${item.href}/`) ? "page" : undefined}>
        {item.label}
      </Link>
    </li>
  ));
}

export function Header() {
  const locale = useLocale();
  const { common, header: t } = useMessages();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!dialog || !isOpen) return;

    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktopQuery = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setIsOpen(false);
    };
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      dialog.close();
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${styles.header}`}>
      <Wordmark locale={locale} label={common.homeLabel} />
      <nav className="desktop-navigation" aria-label={t.mainNavigation}>
        <ul>
          <NavigationLinks />
        </ul>
      </nav>
      <QuoteLink className={`button button-primary header-quote ${styles.quoteLink}`} />
      <QuoteLink className={styles.mobileQuote} />
      <button
        ref={triggerRef}
        type="button"
        className="menu-trigger"
        aria-label={t.openNavigation}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        <Menu aria-hidden="true" size={24} />
      </button>
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-menu"
        aria-labelledby="mobile-menu-title"
        onCancel={() => setIsOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="mobile-menu-top">
          <span id="mobile-menu-title" className="technical-label">
            {t.mobileMenuTitle}
          </span>
          <button
            type="button"
            className="menu-close"
            aria-label={t.closeNavigation}
            onClick={() => setIsOpen(false)}
          >
            <X aria-hidden="true" size={24} />
          </button>
        </div>
        <nav aria-label={t.mobileNavigation}>
          <ul>
            <NavigationLinks onNavigate={() => setIsOpen(false)} />
          </ul>
          <QuoteLink
            className="button button-primary"
            onNavigate={() => setIsOpen(false)}
          />
        </nav>
        <p className="technical-label mobile-menu-slogan">
          Safety without compromise.
        </p>
      </dialog>
    </header>
  );
}
