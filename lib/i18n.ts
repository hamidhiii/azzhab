import { en } from "./dictionaries/en";
import { ar } from "./dictionaries/ar";
import type { Dictionary } from "./dictionaries/en";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

/** Route paths without the locale prefix. */
export const routes = {
  home: "",
  privateLabel: "/private-label",
  wholesale: "/wholesale",
  production: "/production",
  quality: "/quality",
  about: "/about",
  contact: "/contact",
} as const;

/** Build a locale-prefixed href: href("ar", routes.wholesale) -> "/ar/wholesale" */
export function href(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

export type { Dictionary };
