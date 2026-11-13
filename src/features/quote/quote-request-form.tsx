"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { QUOTE_LIMITS } from "./request/limits";
import { validateQuoteRequest } from "./request/validation";
import type { QuoteErrors } from "./request/types";
import type { QuoteItem } from "./quote-store";
import styles from "./quote.module.css";

type Session = { available: boolean; token: string };
type Props = {
  items: readonly QuoteItem[];
  knownProductIds: readonly string[];
  available: boolean;
  onPending: (pending: boolean) => void;
  onAccepted: (reference: string, submitted: readonly QuoteItem[]) => void;
};

const fields = [
  { name: "company", label: "Company name", required: true, autoComplete: "organization", max: QUOTE_LIMITS.company },
  { name: "contact", label: "Contact person", required: true, autoComplete: "name", max: QUOTE_LIMITS.contact },
  { name: "email", label: "Business email", required: true, autoComplete: "email", max: QUOTE_LIMITS.email, type: "email" },
  { name: "phone", label: "Phone number", required: false, autoComplete: "tel", max: QUOTE_LIMITS.phone, type: "tel" },
  { name: "city", label: "Delivery location / city", required: false, autoComplete: "address-level2", max: QUOTE_LIMITS.city },
] as const;

export function QuoteRequestForm({ items, knownProductIds, available, onPending, onAccepted }: Props) {
  const [session, setSession] = useState<Session | null>(null);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [message, setMessage] = useState("");
  const [sessionError, setSessionError] = useState(false);
  const inFlight = useRef(false);
  const attempt = useRef<{ body: string; key: string } | null>(null);

  async function refreshSession() {
    try {
      const response = await fetch("/api/quote", { cache: "no-store" });
      const data: unknown = await response.json();
      if (!response.ok || !data || typeof data !== "object" || !("token" in data) || typeof data.token !== "string" || !("available" in data) || typeof data.available !== "boolean") throw new Error("session");
      setSession({ available: data.available, token: data.token });
      setSessionError(false);
    } catch { setSessionError(true); setSession(null); }
  }

  useEffect(() => {
    let active = true;
    fetch("/api/quote", { cache: "no-store" }).then((response) => response.json()).then((data: unknown) => {
      if (!active) return;
      if (data && typeof data === "object" && "token" in data && typeof data.token === "string" && "available" in data && typeof data.available === "boolean") setSession({ token: data.token, available: data.available });
      else setSessionError(true);
    }).catch(() => { if (active) setSessionError(true); });
    return () => { active = false; };
  }, []);

  const enabled = available && session?.available === true;
  function focusErrors(nextErrors: QuoteErrors) {
    requestAnimationFrame(() => {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first === "items" ? "selected-products" : `quote-${first}`)?.focus();
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !enabled || !session || !items.length) return;
    const form = new FormData(event.currentTarget);
    const result = validateQuoteRequest({
      company: form.get("company"), contact: form.get("contact"), email: form.get("email"),
      phone: form.get("phone"), city: form.get("city"), requirements: form.get("requirements"),
      consent: form.get("consent") === "on", website: form.get("website"), items,
    }, knownProductIds);
    if (!result.ok) { setErrors(result.errors); setMessage("Please review the highlighted fields."); focusErrors(result.errors); return; }
    setErrors({});
    const body = JSON.stringify(result.value);
    if (!attempt.current || attempt.current.body !== body) attempt.current = { body, key: crypto.randomUUID() };
    inFlight.current = true;
    setPending(true);
    onPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST", headers: { "Content-Type": "application/json", "X-Quote-Token": session.token, "Idempotency-Key": attempt.current.key },
        body, signal: AbortSignal.timeout(25000),
      });
      const data: unknown = await response.json();
      if (response.ok && data && typeof data === "object" && "ok" in data && data.ok === true && "reference" in data && typeof data.reference === "string") {
        onAccepted(data.reference, result.value.items);
      } else {
        setMessage("We could not confirm delivery. Your form and selection are preserved. Retry the same request to avoid duplicates.");
        if (data && typeof data === "object" && "code" in data) {
          if (data.code === "session") { await refreshSession(); setMessage("The submission session was refreshed. Please wait a moment and retry; your details are preserved."); }
          if (data.code === "unavailable") { setSession({ available: false, token: session.token }); setMessage("Submission is unavailable. Your request has not been sent and your selection is preserved."); }
          if (data.code === "rate_limited") setMessage("Too many attempts. Please wait ten minutes before retrying.");
          if (data.code === "validation" && "errors" in data && data.errors && typeof data.errors === "object") {
            const nextErrors: QuoteErrors = {};
            for (const [key, value] of Object.entries(data.errors)) if (typeof value === "string" && ["company", "contact", "email", "phone", "city", "requirements", "consent", "items", "website"].includes(key)) nextErrors[key as keyof QuoteErrors] = value;
            setErrors(nextErrors); focusErrors(nextErrors); setMessage("Please review the highlighted fields.");
          }
        }
      }
    } catch { setMessage("We could not confirm delivery. Your details and selection are preserved. Please retry the same request."); }
    finally { inFlight.current = false; setPending(false); onPending(false); }
  }

  return (
    <section className={styles.requestSection} aria-labelledby="request-heading">
      <p className={styles.eyebrow}>BUSINESS ENQUIRIES / REQUEST A QUOTATION</p>
      <h2 id="request-heading">Tell us about your team.</h2>
      <p className={styles.formIntro}>The products and quantities above will accompany your request. Contact details stay in this form and are not saved in browser storage.</p>
      <p className={styles.formHint}><Link href="/privacy" className="underline underline-offset-4">Privacy information (draft; business details pending)</Link></p>
      <p className={styles.formHint}>Up to {QUOTE_LIMITS.maxItems} products, {QUOTE_LIMITS.maxQuantity} units per product, and {QUOTE_LIMITS.maxTotalQuantity} units in total.</p>
      {!available || session?.available === false ? <p className={styles.storageNotice} role="status">Submission is unavailable in the current demo environment because delivery is not configured. Your selection has not been sent.</p> : null}
      {sessionError && <p className={styles.storageNotice} role="status">We could not prepare the submission session. <button type="button" onClick={refreshSession}>Retry connection</button></p>}
      <form onSubmit={submit} noValidate aria-busy={pending}>
        <fieldset disabled={!enabled || pending} className={styles.formFields}>
          <legend className="sr-only">Business contact and quotation requirements</legend>
          <div className={styles.formGrid}>
            {fields.map((field) => <div key={field.name} className={styles.formField}>
              <label htmlFor={`quote-${field.name}`}>{field.label} {field.required ? <span aria-hidden="true">*</span> : <span className={styles.optional}>(optional)</span>}</label>
              <input id={`quote-${field.name}`} name={field.name} type={"type" in field ? field.type : "text"} autoComplete={field.autoComplete} maxLength={field.max} required={field.required} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `quote-${field.name}-error` : undefined} />
              {errors[field.name] && <p id={`quote-${field.name}-error`} className={styles.fieldError}>{errors[field.name]}</p>}
            </div>)}
          </div>
          <div className={styles.formField}>
            <label htmlFor="quote-requirements">Additional requirements <span className={styles.optional}>(optional)</span></label>
            <textarea id="quote-requirements" name="requirements" rows={5} maxLength={QUOTE_LIMITS.requirements} aria-invalid={Boolean(errors.requirements)} aria-describedby="requirements-help quote-requirements-error" />
            <p id="requirements-help" className={styles.formHint}>Up to {QUOTE_LIMITS.requirements} characters. Include any sizing or delivery requirements; avoid sensitive personal information.</p>
            <p id="quote-requirements-error" className={styles.fieldError}>{errors.requirements}</p>
          </div>
          <div className={styles.honeypot} aria-hidden="true"><label htmlFor="quote-website">Leave this field empty</label><input id="quote-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className={styles.consent}>
            <input id="quote-consent" name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} aria-describedby="privacy-purpose quote-consent-error" />
            <label htmlFor="quote-consent">I agree that PROSAFE may use my contact details and request information to respond to this quotation enquiry. <span aria-hidden="true">*</span></label>
          </div>
          <p id="privacy-purpose" className={styles.formHint}>If submission is enabled, your details and selection are sent to the configured PROSAFE quotation recipient through its email provider. They are used to handle this enquiry.</p>
          <p id="quote-consent-error" className={styles.fieldError}>{errors.consent}</p>
          <p id="quote-items-error" className={styles.fieldError}>{errors.items}</p>
          <button type="submit" className={`button button-primary ${styles.submit}`} disabled={!enabled || !items.length || pending}>{pending ? "SENDING REQUEST…" : "SEND QUOTATION REQUEST"}</button>
        </fieldset>
        <p role="status" aria-live="polite" className={styles.formStatus}>{pending ? "Sending your request. Please wait for confirmation." : message}</p>
      </form>
    </section>
  );
}
