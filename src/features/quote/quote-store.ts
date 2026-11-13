"use client";

import { useSyncExternalStore } from "react";
import { getProductById } from "@/features/catalog/products";
import { QUOTE_LIMITS } from "./request/limits";

export const QUOTE_STORAGE_KEY = "prosafe.quote.v1";
export const MAX_QUANTITY = QUOTE_LIMITS.maxQuantity;

export type QuoteItem = { productId: string; quantity: number };
type QuoteSnapshot = { items: readonly QuoteItem[]; ready: boolean; persistent: boolean };

const serverSnapshot: QuoteSnapshot = { items: [], ready: false, persistent: true };
let snapshot = serverSnapshot;
let initialized = false;
const listeners = new Set<() => void>();

/** Treat browser storage as untrusted input; discard obsolete IDs and invalid quantities. */
function decode(raw: string | null): QuoteItem[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || !("version" in data) || data.version !== 1 || !("items" in data) || !Array.isArray(data.items)) return [];
    const candidates: unknown[] = data.items;
    const quantities = new Map<string, number>();
    for (const item of candidates) {
      if (!item || typeof item !== "object" || !("productId" in item) || typeof item.productId !== "string" || !getProductById(item.productId) || !("quantity" in item) || typeof item.quantity !== "number" || !Number.isSafeInteger(item.quantity) || item.quantity < 1) continue;
      quantities.set(item.productId, Math.min(MAX_QUANTITY, (quantities.get(item.productId) ?? 0) + item.quantity));
    }
    return Array.from(quantities, ([productId, quantity]) => ({ productId, quantity }));
  } catch {
    return [];
  }
}

function readStorage() {
  try {
    snapshot = { items: decode(window.localStorage.getItem(QUOTE_STORAGE_KEY)), ready: true, persistent: true };
  } catch {
    snapshot = { ...snapshot, ready: true, persistent: false };
  }
  initialized = true;
}

function getSnapshot() {
  if (!initialized) readStorage();
  return snapshot;
}

function notify() { listeners.forEach((listener) => listener()); }

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Refresh after a period with no subscribers, including changes from another tab.
  if (listeners.size === 1) {
    if (snapshot.persistent) readStorage();
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function onStorage(event: StorageEvent) {
  if (event.key === QUOTE_STORAGE_KEY || event.key === null) {
    readStorage();
    notify();
  }
}

function save(items: readonly QuoteItem[]) {
  let persistent = true;
  try {
    window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify({ version: 1, items }));
  } catch {
    persistent = false;
  }
  snapshot = { items, ready: true, persistent };
  initialized = true;
  notify();
}

export function addToQuote(productId: string) {
  if (!getProductById(productId)) return;
  const items = getSnapshot().items;
  const existing = items.find((item) => item.productId === productId);
  save(existing ? items.map((item) => item.productId === productId ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) } : item) : [...items, { productId, quantity: 1 }]);
}

export function setQuoteQuantity(productId: string, quantity: number) {
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) return;
  save(getSnapshot().items.map((item) => item.productId === productId ? { ...item, quantity } : item));
}

export function removeFromQuote(productId: string) {
  save(getSnapshot().items.filter((item) => item.productId !== productId));
}

/** Preserve any items/quantity changes made elsewhere while the request was pending. */
export function clearSubmittedQuote(submitted: readonly QuoteItem[]) {
  save(getSnapshot().items.filter((current) => !submitted.some((item) => item.productId === current.productId && item.quantity === current.quantity)));
}

export function useQuote() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
