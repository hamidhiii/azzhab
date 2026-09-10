import Link from "next/link";

import Wordmark from "./Wordmark";
import { href, routes, type Dictionary, type Locale } from "@/lib/i18n";
import { site, telHref } from "@/lib/site";

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const address = locale === "ar" ? site.addressAr : site.address;
  const hours = locale === "ar" ? site.hoursAr : site.hours;

  const company = [
    { path: routes.about, label: t.nav.about },
    { path: routes.production, label: t.nav.production },
    { path: routes.quality, label: t.nav.quality },
  ];

  const services = [
    { path: routes.privateLabel, label: t.nav.privateLabel },
    { path: routes.wholesale, label: t.nav.wholesale },
    { path: routes.contact, label: t.nav.contact },
  ];

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <Link href={href(locale, routes.home)} className="wordmark wordmark--footer">
              <Wordmark />
            </Link>
            <p className="small mt-m w-34">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="footer__title">{t.footer.company}</h4>
            <ul>
              {company.map((item) => (
                <li key={item.path}>
                  <Link href={href(locale, item.path)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer__title">{t.footer.services}</h4>
            <ul>
              {services.map((item) => (
                <li key={item.path}>
                  <Link href={href(locale, item.path)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer__title">{t.footer.contact}</h4>
            <ul>
              <li>
                <a href={site.mapUrl} target="_blank" rel="noopener">
                  {address}
                </a>
              </li>
              <li>
                <a href={telHref(site.phone)}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className="muted">{hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <span>
            &copy; {new Date().getFullYear()} {site.company} &middot; {t.footer.rights}
          </span>
          <span>{t.footer.licence}</span>
        </div>
      </div>
    </footer>
  );
}
