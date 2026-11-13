import styles from "./industries.module.css";

export function RiskAssessmentNote() {
  return (
    <aside className={styles.assessmentNote} aria-label="Equipment selection note">
      <p>
        Final equipment selection depends on a workplace risk assessment and
        applicable safety requirements. Industry browsing does not determine
        which PPE is required or suitable for a specific workplace.
      </p>
      <a href="https://oshwiki.osha.europa.eu/en/themes/ppe">
        PPE selection principles / EU-OSHA ↗
      </a>
    </aside>
  );
}
