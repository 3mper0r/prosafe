"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import type { ProductSummary } from "@/features/catalog/types";
import { MAX_QUANTITY, removeFromQuote, setQuoteQuantity, useQuote } from "./quote-store";
import styles from "./quote.module.css";

function QuantityInput({ productId, productName, quantity }: { productId: string; productName: string; quantity: number }) {
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
      <button type="button" aria-label={`Decrease quantity for ${productName}`} disabled={quantity <= 1} onClick={() => setQuoteQuantity(productId, quantity - 1)}><Minus size={16} aria-hidden="true" /></button>
      <label>
        <span className="sr-only">Quantity for {productName}</span>
        <input type="number" min={1} max={MAX_QUANTITY} step={1} inputMode="numeric" value={draft} onChange={(event) => {
          setDraft(event.target.value);
          const value = Number(event.target.value);
          if (Number.isSafeInteger(value) && value >= 1 && value <= MAX_QUANTITY) setQuoteQuantity(productId, value);
        }} onBlur={commit} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); commit(); } }} />
      </label>
      <button type="button" aria-label={`Increase quantity for ${productName}`} disabled={quantity >= MAX_QUANTITY} onClick={() => setQuoteQuantity(productId, quantity + 1)}><Plus size={16} aria-hidden="true" /></button>
    </div>
  );
}

export function QuoteSelection({ products }: { products: readonly ProductSummary[] }) {
  const { items, ready, persistent } = useQuote();
  const [message, setMessage] = useState("");
  if (!ready) return <p className={styles.loading} role="status">Loading your quote selection…</p>;
  const total = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      {!persistent && <p role="status" className={styles.storageNotice}>Browser storage is unavailable. Changes will remain in this tab but may be lost after leaving or reloading.</p>}
      <p role="status" className={styles.announcement}>{message}</p>
      {items.length ? (
        <div className={styles.selectionLayout}>
          <ul className={styles.items} aria-label="Selected quote products">
            {items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              const image = product.images[0];
              return <li key={product.id} className={styles.item} data-quote-product={product.id}>
                <Link href={`/products/${product.slug}`} className={styles.thumbnail} aria-label={`View ${product.name}`}>
                  {image && <Image src={image.src} alt="" width={160} height={120} />}
                </Link>
                <div className={styles.itemInfo}>
                  <p className={styles.category}>{PRODUCT_CATEGORIES[product.categoryId].label} / DEMO</p>
                  <h2><Link href={`/products/${product.slug}`}>{product.name}</Link></h2>
                  <p className={styles.identifier}>{product.id}</p>
                  <p className={styles.summary}>{product.summary}</p>
                  <div className={styles.itemControls}>
                    <QuantityInput productId={product.id} productName={product.name} quantity={item.quantity} />
                    <button type="button" className={styles.remove} aria-label={`Remove ${product.name} from quote`} onClick={() => {
                      removeFromQuote(product.id);
                      setMessage(`${product.name} removed from your quote selection.`);
                    }}><Trash2 size={15} aria-hidden="true" /> Remove</button>
                  </div>
                </div>
              </li>;
            })}
          </ul>
          <aside className={styles.overview} aria-label="Quote selection overview">
            <p className={styles.eyebrow}>YOUR SELECTION</p>
            <p className={styles.total}>{items.length}<span>selected {items.length === 1 ? "product" : "products"}</span></p>
            <p className={styles.units}>{total} total {total === 1 ? "unit" : "units"}</p>
            <p className={styles.localNote}>Saved in this browser. You can return and adjust your selection.</p>
            <p className={styles.pending}>Quote requests are not open yet. Your selection has not been sent to PROSAFE.</p>
            <Link href="/products" className={`button button-primary ${styles.continue}`}>CONTINUE EXPLORING</Link>
          </aside>
        </div>
      ) : (
        <section className={styles.empty} aria-labelledby="empty-quote-heading">
          <p className={styles.eyebrow}>YOUR SELECTION / 0 PRODUCTS</p>
          <h2 id="empty-quote-heading">Start with the equipment.</h2>
          <p>Add demonstration products from the catalog, then adjust quantities here.</p>
          <Link href="/products" className="button button-primary">EXPLORE EQUIPMENT</Link>
        </section>
      )}
    </>
  );
}
