"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";
import type {
  CatalogCategoryLinks,
  ProductCategoryId,
} from "@/lib/product-categories";
import type { ProtectionZone } from "@/content/catalog";
import type { CategoryContent } from "@/content/types";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatMessage } from "@/i18n/format";
import { Lines } from "@/i18n/lines";
import { WorkerIllustration } from "./worker-illustration";
import styles from "./protection-explorer.module.css";

type ProtectionExplorerProps = {
  /** Only this page's widget messages are sent to the browser. */
  messages: Dictionary["explorer"]["widget"];
  /** Localized on the server; zone order defines the selector and markers. */
  zones: readonly ProtectionZone[];
  categories: Record<ProductCategoryId, Pick<CategoryContent, "name" | "description">>;
  catalogLinks?: CatalogCategoryLinks;
};

export function ProtectionExplorer({
  messages: t,
  zones,
  categories,
  catalogLinks = {},
}: ProtectionExplorerProps) {
  const instanceId = useId();
  const [selectedZone, setSelectedZone] = useState<ProtectionZone>(zones[0]);
  const category = categories[selectedZone.categoryId];
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
        <legend>{t.zoneLegend}</legend>
        <div className={styles.zoneOptions}>
          {zones.map((zone) => (
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
          {formatMessage(t.viewCategory, { category: category.name, categoryLower: category.name.toLowerCase() })}{" "}
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </fieldset>

      <div className={styles.workspace}>
        <figure className={styles.workerFigure}>
          <div
            className={styles.viewer}
            data-selected-zone={selectedZone.id}
            role="group"
            aria-label={t.hotspotsLabel}
          >
            <WorkerIllustration />
            {zones.map((zone, index) => (
              <button
                key={zone.id}
                type="button"
                className={styles.hotspot}
                style={{
                  left: `${zone.position.x}%`,
                  top: `${zone.position.y}%`,
                }}
                data-zone-id={zone.id}
                aria-label={formatMessage(t.hotspotLabel, { zone: zone.label, category: categories[zone.categoryId].name })}
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
            <Lines lines={t.figcaption} />
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
            {formatMessage(t.selectedEyebrow, { zone: selectedZone.label })}
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
                {formatMessage(t.browseCategory, { category: category.name, categoryLower: category.name.toLowerCase() })}{" "}
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
                  {formatMessage(t.browseCategory, { category: category.name, categoryLower: category.name.toLowerCase() })}{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                <p id={catalogStatusId} className={styles.catalogStatus}>
                  {t.catalogComingSoon}
                </p>
              </>
            )}
          </div>
          <p className={styles.selectionNote}>
            {t.selectionNote}
          </p>
        </section>
      </div>
    </div>
  );
}
