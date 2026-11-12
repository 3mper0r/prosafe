import { ArrowDown, ArrowUpRight, HardHat, Plus } from "lucide-react";
import { WorkerPortrait } from "./worker-portrait";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <div className={styles.composition}>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <aside
          className={styles.sidebar}
          aria-label="PROSAFE workplace protection"
        >
          <span className={`technical-label ${styles.sidebarIndex}`}>
            PROSAFE / 01
          </span>
          <div className={styles.sidebarPurpose}>
            <span className={styles.sidebarIcon}>
              <HardHat size={24} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <p>
              SAFETY
              <br />
              EQUIPMENT
            </p>
            <span>
              For the people
              <br />
              behind the work.
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
              PROTECTION IS OUR PURPOSE.
            </p>
            <h1 id="hero-heading" className={styles.headline}>
              <span>PROTECTION</span> <span>IS NOT</span> <span>OPTIONAL.</span>
            </h1>
            <div className={styles.actions}>
              <a
                href="#equipment"
                className={`button button-primary ${styles.primary}`}
              >
                EXPLORE EQUIPMENT <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="#protection" className={styles.secondary}>
                FIND YOUR PROTECTION{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <WorkerPortrait />
          <div className={styles.technicalPanel}>
            <span className={styles.leaderLine} aria-hidden="true" />
            <p className={`technical-label ${styles.panelIndex}`}>
              PERSONAL PROTECTION / 01
            </p>
            <h2>
              HEAD.
              <br />
              HANDS.
              <br />
              EVERYTHING
              <br />
              IN BETWEEN.
            </h2>
            <p className={styles.supportingCopy}>
              Professional safety equipment and workplace protection solutions
              for every industry.
            </p>
            <a href="#equipment" className={styles.panelLink}>
              Explore protection <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <span className={`technical-label ${styles.panelFootnote}`}>
              CATEGORY OVERVIEW
              <br />
              PRODUCT SPECIFICATIONS AT LAUNCH
            </span>
          </div>
          <a href="#equipment" className={styles.scrollIndicator}>
            <span className="technical-label">EXPLORE EQUIPMENT</span>
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
