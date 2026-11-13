import styles from "./catalog.module.css";

export function DemoNotice() {
  return (
    <aside className={styles.demoNotice} aria-label="Demonstration catalog notice">
      <strong>Demonstration catalog</strong>
      <p>Fictional examples for exploring the catalog and quote selection. Not real inventory. Illustrations, specifications, and variants are illustrative; no manufacturer or certified safety performance is represented.</p>
    </aside>
  );
}
