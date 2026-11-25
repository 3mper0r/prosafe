import { ArrowDown, ArrowUpRight, HardHat, Plus } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { WorkerPortrait } from "./worker-portrait";
import styles from "./hero.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.hero;
  return (
    <div className={styles.composition}>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <aside
          className={styles.sidebar}
          aria-label={t.sidebarLabel}
        >
          <span className={`technical-label ${styles.sidebarIndex}`}>
            {t.sidebarIndex}
          </span>
          <div className={styles.sidebarPurpose}>
            <span className={styles.sidebarIcon}>
              <HardHat size={24} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <p>
              <Lines lines={t.purpose} />
            </p>
            <span>
              <Lines lines={t.purposeNote} />
            </span>
          </div>
          <p className={styles.sidebarSlogan}>
            SAFETY WITHOUT
            <br />
            COMPROMISE.
          </p>
          <Plus
            className={styles.sidebarCross}
            size={20}
            strokeWidth={1}
            aria-hidden="true"
          />
        </aside>
        <div className={styles.stage}>
          <div className={styles.headlineBlock}>
            <p className={`technical-label ${styles.eyebrow}`}>
              {t.eyebrow}
            </p>
            <h1 id="hero-heading" className={styles.headline}>
              {t.headline.map((part, index) => <Fragment key={index}>{index > 0 && " "}<span>{part}</span></Fragment>)}
            </h1>
            <div className={styles.actions}>
              <Link
                href={localizePath(locale, "/products")}
                className={`button button-primary ${styles.primary}`}
              >
                {t.primaryAction} <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href={localizePath(locale, "/find-your-protection")} className={styles.secondary}>
                {t.secondaryAction}{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <WorkerPortrait alt={t.workerAlt} />
          <div className={styles.technicalPanel}>
            <span className={styles.leaderLine} aria-hidden="true" />
            <p className={`technical-label ${styles.panelIndex}`}>
              {t.panelIndex}
            </p>
            <h2>
              <Lines lines={t.panelHeading} />
            </h2>
            <p className={styles.supportingCopy}>
              {t.panelCopy}
            </p>
            <Link href={localizePath(locale, "/products")} className={styles.panelLink}>
              {t.panelLink} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <span className={`technical-label ${styles.panelFootnote}`}>
              <Lines lines={t.panelFootnote} />
            </span>
          </div>
          <a href="#equipment" className={styles.scrollIndicator}>
            <span className="technical-label">{t.scrollIndicator}</span>
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
