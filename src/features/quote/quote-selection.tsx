"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ProductSummary } from "@/features/catalog/types";
import { MAX_QUANTITY, removeFromQuote, setQuoteQuantity, useQuote, clearSubmittedQuote } from "./quote-store";
import { QuoteRequestForm } from "./quote-request-form";
import styles from "./quote.module.css";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatMessage, formatPlural } from "@/i18n/format";
import { useLocale } from "@/i18n/locale-context";
import { localizePath } from "@/i18n/paths";

/** Only the quotation page receives these messages (passed as props from the server view). */
export type QuoteMessages = Pick<Dictionary["quote"], "selection" | "form">;

function QuantityInput({ t, productId, productName, quantity }: { t: QuoteMessages["selection"]; productId: string; productName: string; quantity: number }) {
  const [draft, setDraft] = useState(String(quantity));
  const [previousQuantity, setPreviousQuantity] = useState(quantity);
  if (previousQuantity !== quantity) {
    setPreviousQuantity(quantity);
    setDraft(String(quantity));
  }
  function commit() {
    const value = Number(draft);
    if (draft.trim() && Number.isSafeInteger(value) && value >= 1 && value <= MAX_QUANTITY) setQuoteQuantity(productId, value);
    else setDraft(String(quantity));
  }
  return (
    <div className={styles.quantity}>
      <button type="button" aria-label={formatMessage(t.decrease, { name: productName })} disabled={quantity <= 1} onClick={() => setQuoteQuantity(productId, quantity - 1)}><Minus size={16} aria-hidden="true" /></button>
      <label>
        <span className="sr-only">{formatMessage(t.quantity, { name: productName })}</span>
        <input type="number" min={1} max={MAX_QUANTITY} step={1} inputMode="numeric" value={draft} onChange={(event) => {
          setDraft(event.target.value);
          const value = Number(event.target.value);
          if (Number.isSafeInteger(value) && value >= 1 && value <= MAX_QUANTITY) setQuoteQuantity(productId, value);
        }} onBlur={commit} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); commit(); } }} />
      </label>
      <button type="button" aria-label={formatMessage(t.increase, { name: productName })} disabled={quantity >= MAX_QUANTITY} onClick={() => setQuoteQuantity(productId, quantity + 1)}><Plus size={16} aria-hidden="true" /></button>
    </div>
  );
}

export function QuoteSelection({ products, available, messages }: { products: readonly ProductSummary[]; available: boolean; messages: QuoteMessages }) {
  const locale = useLocale();
  const t = messages.selection;
  const { items, ready, persistent } = useQuote();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [receipt, setReceipt] = useState("");
  if (!ready) return <p className={styles.loading} role="status">{t.loading}</p>;
  const total = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      {!persistent && <p role="status" className={styles.storageNotice}>{t.storageUnavailable}</p>}
      <p role="status" className={styles.announcement}>{message}</p>
      {receipt ? <section className={styles.confirmation} tabIndex={-1} id="quote-confirmation" aria-labelledby="confirmation-heading" role="status">
        <p className={styles.eyebrow}>{t.acceptedEyebrow}</p>
        <h2 id="confirmation-heading">{t.acceptedHeading}</h2>
        <p>{t.acceptedBody}</p>
        <p className={styles.reference}>{formatMessage(t.reference, { reference: receipt })}</p>
        <p>{t.acceptedRemoved}</p>
        <Link href={localizePath(locale, "/products")} className="button button-primary">{t.exploreEquipment}</Link>
        {items.length > 0 && <button type="button" className="button button-text" onClick={() => setReceipt("")}>{t.viewRemaining}</button>}
      </section> : items.length ? <>
        <div className={styles.selectionLayout}>
          <fieldset disabled={pending} className={styles.selectionFields} id="selected-products" tabIndex={-1} aria-describedby="quote-items-error">
          <legend className="sr-only">{t.itemsLegend}</legend>
          <ul className={styles.items} aria-label={t.itemsLabel}>
            {items.map((item, index) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              const image = product.images[0];
              return <li key={product.id} className={styles.item} data-quote-product={product.id}>
                <Link href={localizePath(locale, `/products/${product.slug}`)} className={styles.thumbnail} aria-label={formatMessage(t.viewProduct, { name: product.name })}>
                  {image && <Image src={image.src} alt="" width={160} height={120} />}
                </Link>
                <div className={styles.itemInfo}>
                  <p className={styles.category}>{formatMessage(t.categoryDemo, { category: product.categoryLabel })}</p>
                  <h2><Link href={localizePath(locale, `/products/${product.slug}`)}>{product.name}</Link></h2>
                  <p className={styles.identifier}>{product.id}</p>
                  <p className={styles.summary}>{product.summary}</p>
                  <div className={styles.itemControls}>
                    <QuantityInput t={t} productId={product.id} productName={product.name} quantity={item.quantity} />
                    <button type="button" className={styles.remove} aria-label={formatMessage(t.removeLabel, { name: product.name })} onClick={() => {
                      const nextItem = items[index + 1] ?? items[index - 1];
                      removeFromQuote(product.id);
                      setMessage(formatMessage(t.removed, { name: product.name }));
                      requestAnimationFrame(() => {
                        const nextControl = nextItem
                          ? document.querySelector<HTMLInputElement>(`[data-quote-product="${nextItem.productId}"] input[type="number"]`)
                          : null;
                        (nextControl ?? document.getElementById("empty-quote-heading"))?.focus();
                      });
                    }}><Trash2 size={15} aria-hidden="true" /> {t.remove}</button>
                  </div>
                </div>
              </li>;
            })}
          </ul>
          </fieldset>
          <aside className={styles.overview} aria-label={t.overviewLabel}>
            <p className={styles.eyebrow}>{t.overviewEyebrow}</p>
            <p className={styles.total}>{items.length}<span>{formatPlural(locale, items.length, t.selectedProducts)}</span></p>
            <p className={styles.units}>{formatPlural(locale, total, t.totalUnits)}</p>
            <p className={styles.localNote}>{t.savedLocally}</p>
            <p className={styles.pending}>{available ? t.availableNote : t.unavailableNote}</p>
            <Link href={localizePath(locale, "/products")} className={`button button-primary ${styles.continue}`}>{t.continueExploring}</Link>
          </aside>
        </div>
        <QuoteRequestForm messages={messages.form} items={items} knownProductIds={products.map((product) => product.id)} available={available} onPending={setPending} onAccepted={(reference, submitted) => {
          setReceipt(reference);
          clearSubmittedQuote(submitted);
          requestAnimationFrame(() => document.getElementById("quote-confirmation")?.focus());
        }} />
      </> : (
        <section className={styles.empty} aria-labelledby="empty-quote-heading">
          <p className={styles.eyebrow}>{t.emptyEyebrow}</p>
          <h2 id="empty-quote-heading" tabIndex={-1}>{t.emptyHeading}</h2>
          <p>{t.emptyBody}</p>
          <Link href={localizePath(locale, "/products")} className="button button-primary">{t.exploreEquipment}</Link>
        </section>
      )}
    </>
  );
}
