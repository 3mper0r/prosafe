import { Wordmark } from "@/components/ui/wordmark";

export function Footer() {
  return (
    <footer className="site-footer">
      <Wordmark />
      <p className="technical-label">SAFETY WITHOUT COMPROMISE.</p>
      <a className="photo-credit" href="https://www.pexels.com/license/">
        Material photography: Kindel Media & Nothing Ahead / Pexels
      </a>
    </footer>
  );
}
