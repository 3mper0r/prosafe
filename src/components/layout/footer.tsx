import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import styles from "./footer.module.css";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/brands", label: "Brands" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy (draft)" },
  { href: "/imprint", label: "Imprint (draft)" },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <Wordmark />
      <p className="technical-label">SAFETY WITHOUT COMPROMISE.</p>
      <nav className={styles.navigation} aria-label="Company and legal navigation">
        <ul>
          {footerLinks.map(({ href, label }) => <li key={href}><Link href={href}>{label}</Link></li>)}
        </ul>
      </nav>
      <a className="photo-credit" href="https://www.pexels.com/license/">
        Material photography: Kindel Media & Nothing Ahead / Pexels
      </a>
    </footer>
  );
}
