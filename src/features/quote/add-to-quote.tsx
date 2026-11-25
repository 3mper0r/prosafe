"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { formatMessage } from "@/i18n/format";
import { useMessages } from "@/i18n/locale-context";
import { addToQuote, MAX_QUANTITY, useQuote } from "./quote-store";
import styles from "./quote.module.css";

export function AddToQuote({ productId, productName }: { productId: string; productName: string }) {
  const t = useMessages().addToQuote;
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
        aria-label={formatMessage(t.ariaLabel, { name: productName })}
        onClick={() => { addToQuote(productId); setAdded(true); }}
      >
        {atLimit ? t.limitReached : t.add} <Plus size={16} aria-hidden="true" />
      </button>
      <p role="status" className={styles.addStatus}>
        {ready && added && quantity > 0 ? formatMessage(t.added, { name: productName, quantity }) : ""}
        {ready && !persistent ? t.storageUnavailable : ""}
      </p>
    </div>
  );
}
