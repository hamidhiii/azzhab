import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Dictionary, type Locale } from "./i18n";

export type PageParams = { params: Promise<{ locale: string }> };

/** Validates the locale segment and hands back its dictionary. */
export async function resolveLocale(
  params: PageParams["params"],
): Promise<{ locale: Locale; t: Dictionary }> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, t: getDictionary(locale) };
}

/** Title, description and the EN/AR alternates for one page. */
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `/${locale}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `/en${path}`, ar: `/ar${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Azzhab Perfumes",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
    },
  };
}
