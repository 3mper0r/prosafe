"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";
import {
  PRODUCT_CATEGORIES,
  type CatalogCategoryLinks,
} from "@/lib/product-categories";
import { PROTECTION_ZONES } from "./zones";
import { WorkerIllustration } from "./worker-illustration";
import styles from "./protection-explorer.module.css";

type ProtectionExplorerProps = {
  catalogLinks?: CatalogCategoryLinks;
};

export function ProtectionExplorer({
  catalogLinks = {},
}: ProtectionExplorerProps) {
  const instanceId = useId();
  const [selectedZone, setSelectedZone] = useState<
    (typeof PROTECTION_ZONES)[number]
  >(PROTECTION_ZONES[0]);
  const category = PRODUCT_CATEGORIES[selectedZone.categoryId];
  const catalogHref = catalogLinks[selectedZone.categoryId];
  const detailsId = `${instanceId}-details`;
  const headingId = `${instanceId}-category`;
  const catalogStatusId = `${instanceId}-catalog-status`;

  return (
    <div
      className={styles.explorer}
      data-protection-explorer=""
      data-selected-zone={selectedZone.id}
    >
      <fieldset className={styles.zonePicker}>
        <legend>Select a protection zone</legend>
        <div className={styles.zoneOptions}>
          {PROTECTION_ZONES.map((zone) => (
            <label
              key={zone.id}
              className={styles.zoneOption}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setSelectedZone(zone);
              }}
            >
              <input
                type="radio"
                name={`${instanceId}-zone`}
                value={zone.id}
                checked={selectedZone.id === zone.id}
                onChange={() => setSelectedZone(zone)}
                aria-controls={detailsId}
              />
              <span>{zone.label}</span>
            </label>
          ))}
        </div>
        <a href={`#${detailsId}`} className={styles.selectionJump}>
          View {category.name.toLowerCase()}{" "}
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </fieldset>

      <div className={styles.workspace}>
        <figure className={styles.workerFigure}>
          <div
            className={styles.viewer}
            data-selected-zone={selectedZone.id}
            role="group"
            aria-label="Full-body worker protection hotspots"
          >
            <WorkerIllustration />
            {PROTECTION_ZONES.map((zone, index) => (
              <button
                key={zone.id}
                type="button"
                className={styles.hotspot}
                style={{
                  left: `${zone.position.x}%`,
                  top: `${zone.position.y}%`,
                }}
                data-zone-id={zone.id}
                aria-label={`${zone.label} — ${PRODUCT_CATEGORIES[zone.categoryId].name}`}
                aria-pressed={selectedZone.id === zone.id}
                aria-controls={detailsId}
                onClick={() => setSelectedZone(zone)}
                onFocus={() => setSelectedZone(zone)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setSelectedZone(zone);
                }}
              >
                <span aria-hidden="true">0{index + 1}</span>
              </button>
            ))}
          </div>
          <figcaption>
            Temporary full-body illustration.
            <br />
            Final worker photography will replace this visual.
          </figcaption>
        </figure>

        <section
          id={detailsId}
          className={styles.details}
          aria-labelledby={headingId}
          tabIndex={-1}
          data-category-id={selectedZone.categoryId}
        >
          <p className={styles.eyebrow}>
            SELECTED PROTECTION / {selectedZone.label}
          </p>
          <div
            aria-live="polite"
            aria-atomic="true"
            className={styles.categoryContent}
          >
            <h2 id={headingId}>{category.name}</h2>
            <p>{category.description}</p>
          </div>
          <div className={styles.catalogAction}>
            {catalogHref ? (
              <Link
                href={catalogHref}
                className={`button button-primary ${styles.browseButton}`}
              >
                Browse {category.name.toLowerCase()}{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  className={styles.unavailableButton}
                  aria-describedby={catalogStatusId}
                >
                  Browse {category.name.toLowerCase()}{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                <p id={catalogStatusId} className={styles.catalogStatus}>
                  Catalog coming soon. This category will become available when
                  the product catalog launches.
                </p>
              </>
            )}
          </div>
          <p className={styles.selectionNote}>
            Explore another zone using the worker markers or zone selector. Your
            selection stays visible until you choose another zone.
          </p>
        </section>
      </div>
    </div>
  );
}
