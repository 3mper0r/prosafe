"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { ClientMessages } from "./dictionaries/en";

type LocaleContextValue = { locale: Locale; messages: ClientMessages };

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Provided by each root layout; client components read the active locale and their messages from it. */
export function LocaleProvider({ locale, messages, children }: LocaleContextValue & { children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale, messages }}>{children}</LocaleContext.Provider>;
}

function useLocaleContext(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("LocaleProvider is missing from the root layout.");
  return value;
}

export function useLocale(): Locale {
  return useLocaleContext().locale;
}

export function useMessages(): ClientMessages {
  return useLocaleContext().messages;
}
