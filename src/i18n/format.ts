import type { Locale } from "./config";

/** Plural forms used by both supported languages (Albanian and English share one/other). */
export type PluralForms = { readonly one: string; readonly other: string };

/** Replace `{name}` placeholders. Templates stay plain strings so they can cross the server/client boundary. */
export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/gu, (match, name: string) => (name in values ? String(values[name]) : match));
}

export function formatPlural(locale: Locale, count: number, forms: PluralForms, values: Record<string, string | number> = {}): string {
  const form = new Intl.PluralRules(locale).select(count) === "one" ? forms.one : forms.other;
  return formatMessage(form, { count, ...values });
}
