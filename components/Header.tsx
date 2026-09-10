"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Wordmark from "./Wordmark";
import { href, otherLocale, routes, type Dictionary, type Locale } from "@/lib/i18n";
import { site, telHref } from "@/lib/site";

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
  cta: string;
  ui: Dictionary["ui"];
};

export default function Header({ locale, nav, cta, ui }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /** The home page carries a dark hero the header sits on top of. */
  const overHero = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 40);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-menu-open", menuOpen);
    return () => document.documentElement.classList.remove("is-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const items = [
    { path: routes.privateLabel, label: nav.privateLabel },
    { path: routes.wholesale, label: nav.wholesale },
    { path: routes.production, label: nav.production },
    { path: routes.quality, label: nav.quality },
    { path: routes.about, label: nav.about },
    { path: routes.contact, label: nav.contact },
  ];

  const menuItems = [{ path: routes.home, label: nav.home }, ...items];

  /** Same page, other language. */
  const next = otherLocale(locale);
  const swapped = pathname.replace(new RegExp(`^/${locale}`), `/${next}`);

  const headerClass = [
    "site-header",
    scrolled || !overHero ? "site-header--solid" : "",
    overHero && !scrolled ? "site-header--over" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass} data-over-hero={overHero || undefined}>
        <div className="shell site-header__inner">
          <Link href={href(locale, routes.home)} className="wordmark" aria-label="Azzhab Perfumes">
            <Wordmark />
          </Link>

          <nav className="nav nav--main" aria-label="Main">
            {items.map((item) => (
              <Link
                key={item.path}
                href={href(locale, item.path)}
                aria-current={pathname === href(locale, item.path) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-tools">
            <Link className="lang" href={swapped} hrefLang={next} aria-label={ui.language}>
              <b>{next.toUpperCase()}</b>
              <i>/</i>
              <em>{next === "ar" ? "عربي" : "English"}</em>
            </Link>

            <Link className="btn btn--solid header-cta" href={href(locale, routes.contact)}>
              {cta}
            </Link>

            <button
              className="burger"
              type="button"
              aria-controls="menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? ui.close : ui.menu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="menu" id="menu" aria-hidden={!menuOpen}>
        <nav aria-label={ui.menu}>
          <ul className="menu__list">
            {menuItems.map((item, i) => (
              <li key={item.path || "home"}>
                <Link href={href(locale, item.path)} tabIndex={menuOpen ? undefined : -1}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <a href={telHref(site.phone)}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{ui.based}</span>
        </div>
      </div>
    </>
  );
}
