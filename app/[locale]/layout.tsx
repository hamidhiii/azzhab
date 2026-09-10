import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import {
  Cormorant_Garamond,
  Jost,
  JetBrains_Mono,
  Amiri,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { dir, getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const displayAr = Amiri({
  subsets: ["arabic"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display-ar",
  display: "swap",
});

const sansAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400"],
  variable: "--font-sans-ar",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F7F6F3",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const l = locale as Locale;
  const t = getDictionary(l);
  const fonts = [display, sans, mono, displayAr, sansAr]
    .map((f) => f.variable)
    .join(" ");

  return (
    <html lang={l} dir={dir(l)} className={fonts}>
      <body>
        <a className="skip" href="#main">
          {t.ui.skip}
        </a>
        <div className="ambient" aria-hidden="true" />

        <Header locale={l} nav={t.nav} cta={t.cta.quote} ui={t.ui} />

        {children}

        <Footer locale={l} t={t} />
        <ScrollReveal />
      </body>
    </html>
  );
}
