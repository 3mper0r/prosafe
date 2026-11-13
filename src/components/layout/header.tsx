"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/wordmark";
import { QuoteLink } from "@/features/quote/quote-link";
import styles from "./header.module.css";

const navigation = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Brands", href: null },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  return navigation.map((item) => (
    <li key={item.label}>
      {item.href ? (
        <Link href={item.href} onClick={onNavigate}>
          {item.label}
        </Link>
      ) : (
        <span className="navigation-unavailable">
          {item.label}
          <span className="soon-label">Soon</span>
        </span>
      )}
    </li>
  ));
}

export function Header() {
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
      <Wordmark />
      <nav className="desktop-navigation" aria-label="Main navigation">
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
        aria-label="Open navigation"
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
            PROSAFE / Navigation
          </span>
          <button
            type="button"
            className="menu-close"
            aria-label="Close navigation"
            onClick={() => setIsOpen(false)}
          >
            <X aria-hidden="true" size={24} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
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
