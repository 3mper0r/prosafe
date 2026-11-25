"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { QUOTE_LIMITS } from "./request/limits";
import { validateQuoteRequest } from "./request/validation";
import type { QuoteErrors } from "./request/types";
import type { QuoteItem } from "./quote-store";
import styles from "./quote.module.css";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatMessage } from "@/i18n/format";
import { useLocale } from "@/i18n/locale-context";
import { localizePath } from "@/i18n/paths";

type Session = { available: boolean; token: string };
type Props = {
  messages: Dictionary["quote"]["form"];
  items: readonly QuoteItem[];
  knownProductIds: readonly string[];
  available: boolean;
  onPending: (pending: boolean) => void;
  onAccepted: (reference: string, submitted: readonly QuoteItem[]) => void;
};

// Labels come from messages.fields[name].
const fields = [
  { name: "company", required: true, autoComplete: "organization", max: QUOTE_LIMITS.company },
  { name: "contact", required: true, autoComplete: "name", max: QUOTE_LIMITS.contact },
  { name: "email", required: true, autoComplete: "email", max: QUOTE_LIMITS.email, type: "email" },
  { name: "phone", required: false, autoComplete: "tel", max: QUOTE_LIMITS.phone, type: "tel" },
  { name: "city", required: false, autoComplete: "address-level2", max: QUOTE_LIMITS.city },
] as const;

export function QuoteRequestForm({ messages: t, items, knownProductIds, available, onPending, onAccepted }: Props) {
  const locale = useLocale();
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
    if (!result.ok) { setErrors(result.errors); setMessage(t.reviewFields); focusErrors(result.errors); return; }
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
        setMessage(t.notConfirmed);
        if (data && typeof data === "object" && "code" in data) {
          if (data.code === "session") { await refreshSession(); setMessage(t.sessionRefreshed); }
          if (data.code === "unavailable") { setSession({ available: false, token: session.token }); setMessage(t.submissionUnavailable); }
          if (data.code === "rate_limited") setMessage(t.rateLimited);
          if (data.code === "validation" && "errors" in data && data.errors && typeof data.errors === "object") {
            const nextErrors: QuoteErrors = {};
            for (const [key, value] of Object.entries(data.errors)) if (typeof value === "string" && ["company", "contact", "email", "phone", "city", "requirements", "consent", "items", "website"].includes(key)) nextErrors[key as keyof QuoteErrors] = value;
            setErrors(nextErrors); focusErrors(nextErrors); setMessage(t.reviewFields);
          }
        }
      }
    } catch { setMessage(t.networkError); }
    finally { inFlight.current = false; setPending(false); onPending(false); }
  }

  return (
    <section className={styles.requestSection} aria-labelledby="request-heading">
      <p className={styles.eyebrow}>{t.eyebrow}</p>
      <h2 id="request-heading">{t.heading}</h2>
      <p className={styles.formIntro}>{t.intro}</p>
      <p className={styles.formHint}><Link href={localizePath(locale, "/privacy")} className="underline underline-offset-4">{t.privacyLink}</Link></p>
      <p className={styles.formHint}>{formatMessage(t.limits, { maxItems: QUOTE_LIMITS.maxItems, maxQuantity: QUOTE_LIMITS.maxQuantity, maxTotalQuantity: QUOTE_LIMITS.maxTotalQuantity })}</p>
      {!available || session?.available === false ? <p className={styles.storageNotice} role="status">{t.unavailable}</p> : null}
      {sessionError && <p className={styles.storageNotice} role="status">{t.sessionError} <button type="button" onClick={refreshSession}>{t.retryConnection}</button></p>}
      <form onSubmit={submit} noValidate aria-busy={pending}>
        <fieldset disabled={!enabled || pending} className={styles.formFields}>
          <legend className="sr-only">{t.fieldsLegend}</legend>
          <div className={styles.formGrid}>
            {fields.map((field) => <div key={field.name} className={styles.formField}>
              <label htmlFor={`quote-${field.name}`}>{t.fields[field.name]} {field.required ? <span aria-hidden="true">*</span> : <span className={styles.optional}>{t.optional}</span>}</label>
              <input id={`quote-${field.name}`} name={field.name} type={"type" in field ? field.type : "text"} autoComplete={field.autoComplete} maxLength={field.max} required={field.required} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `quote-${field.name}-error` : undefined} />
              {errors[field.name] && <p id={`quote-${field.name}-error`} className={styles.fieldError}>{errors[field.name]}</p>}
            </div>)}
          </div>
          <div className={styles.formField}>
            <label htmlFor="quote-requirements">{t.requirementsLabel} <span className={styles.optional}>{t.optional}</span></label>
            <textarea id="quote-requirements" name="requirements" rows={5} maxLength={QUOTE_LIMITS.requirements} aria-invalid={Boolean(errors.requirements)} aria-describedby="requirements-help quote-requirements-error" />
            <p id="requirements-help" className={styles.formHint}>{formatMessage(t.requirementsHelp, { max: QUOTE_LIMITS.requirements })}</p>
            <p id="quote-requirements-error" className={styles.fieldError}>{errors.requirements}</p>
          </div>
          <div className={styles.honeypot} aria-hidden="true"><label htmlFor="quote-website">{t.honeypotLabel}</label><input id="quote-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className={styles.consent}>
            <input id="quote-consent" name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} aria-describedby="privacy-purpose quote-consent-error" />
            <label htmlFor="quote-consent">{t.consent} <span aria-hidden="true">*</span></label>
          </div>
          <p id="privacy-purpose" className={styles.formHint}>{t.privacyPurpose}</p>
          <p id="quote-consent-error" className={styles.fieldError}>{errors.consent}</p>
          <p id="quote-items-error" className={styles.fieldError}>{errors.items}</p>
          <button type="submit" className={`button button-primary ${styles.submit}`} disabled={!enabled || !items.length || pending}>{pending ? t.sending : t.submit}</button>
        </fieldset>
        <p role="status" aria-live="polite" className={styles.formStatus}>{pending ? t.sendingStatus : message}</p>
      </form>
    </section>
  );
}
