"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { addToQuote, MAX_QUANTITY, useQuote } from "./quote-store";
import styles from "./quote.module.css";

export function AddToQuote({ productId, productName }: { productId: string; productName: string }) {
  const { items, ready, persistent } = useQuote();
  const [added, setAdded] = useState(false);
  const quantity = items.find((item) => item.productId === productId)?.quantity ?? 0;
  const atLimit = quantity >= MAX_QUANTITY;
  return (
    <div className={styles.addControl}>
      <button
        type="button"
        className={`button ${styles.addButton}`}
        disabled={!ready || atLimit}
        aria-label={`Add ${productName} to quote`}
        onClick={() => { addToQuote(productId); setAdded(true); }}
      >
        {atLimit ? "QUANTITY LIMIT REACHED" : "ADD TO QUOTE"} <Plus size={16} aria-hidden="true" />
      </button>
      <p role="status" className={styles.addStatus}>
        {ready && added && quantity > 0 ? `${productName} added. ${quantity} in your selection.` : ""}
        {ready && !persistent ? " Browser storage is unavailable; this selection may be lost when you leave or reload." : ""}
      </p>
    </div>
  );
}
