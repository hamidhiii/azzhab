import type { Metadata } from "next";
import Link from "next/link";

import EnquiryForm from "@/components/forms/EnquiryForm";
import { Eyebrow, Figure, Num, PageHead, SpecTable, pad } from "@/components/ui";
import { href, routes } from "@/lib/i18n";
import { pageMetadata, resolveLocale, type PageParams } from "@/lib/page";
import { site, telHref, waHref } from "@/lib/site";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, routes.contact, t.contact.title, t.contact.desc);
}

export default async function ContactPage({ params }: PageParams) {
  const { locale, t } = await resolveLocale(params);
  const c = t.contact;
  const address = locale === "ar" ? site.addressAr : site.address;
  const hours = locale === "ar" ? site.hoursAr : site.hours;

  const channels = [
    { title: c.ch1t, text: c.ch1x, action: c.alt1, path: routes.privateLabel },
    { title: c.ch2t, text: c.ch2x, action: c.alt2, path: routes.wholesale },
    { title: c.ch3t, text: c.ch3x, action: t.nav.quality, path: routes.quality },
  ];

  return (
    <main id="main">
      <PageHead
        crumbHome={t.nav.home}
        crumb={c.crumb}
        homeHref={href(locale, routes.home)}
        title={c.headTitle}
        lead={c.headLead}
      />

      <section className="section">
        <div className="shell">
          <div data-reveal>
            <Eyebrow>{c.chEyebrow}</Eyebrow>
          </div>
          <div className="grid grid--3 mt-l">
            {channels.map((channel, i) => (
              <div className="card" key={channel.title} data-reveal>
                <Num>{pad(i + 1)}</Num>
                <h3 className="h3">{channel.title}</h3>
                <p className="card__body">{channel.text}</p>
                <Link className="link" href={href(locale, channel.path)}>
                  <span>{channel.action}</span>
                  <span className="arw" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{c.visitEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{c.visitTitle}</h2>
              <p className="mt-m measure">{c.visitText}</p>

              <SpecTable
                rows={[
                  [t.footer.address, address],
                  [t.footer.phone, site.phone],
                  [t.footer.email, site.email],
                  [t.footer.hours, hours],
                ]}
              />

              <p className="btn-row mt-l">
                <a
                  className="btn btn--ghost"
                  href={waHref(site.whatsapp)}
                  target="_blank"
                  rel="noopener"
                >
                  {c.whatsapp}
                </a>
                <a className="btn btn--ghost" href={site.mapUrl} target="_blank" rel="noopener">
                  {c.mapLabel}
                </a>
              </p>
            </div>

            <Figure
              src="/media/filling-line.webp"
              alt={c.facilityAlt}
              width={1672}
              height={941}
              ratio="wide"
            />
          </div>
        </div>
      </section>

      <section className="section" id="enquiry">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{c.formEyebrow}</Eyebrow>
            <h2 className="h2">{c.formTitle}</h2>
            <p className="lead w-46">{c.formLead}</p>
          </div>

          <div className="grid--form mt-l">
            <EnquiryForm locale={locale} form={t.form} contact={c} />

            <aside className="form-aside" data-reveal>
              <div>
                <Eyebrow plain>{c.altTitle}</Eyebrow>
                <ul className="list-rule mt-m">
                  <li>
                    <div className="row">
                      <Num>01</Num>
                      <Link className="grow" href={href(locale, routes.privateLabel)}>
                        {c.alt1}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <Num>02</Num>
                      <Link className="grow" href={href(locale, routes.wholesale)}>
                        {c.alt2}
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <Eyebrow plain>{t.footer.contact}</Eyebrow>
                <p className="mt-s">
                  <a className="h4" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </p>
                <p className="small">
                  <a href={telHref(site.phone)}>{site.phone}</a>
                </p>
                <p className="small muted mt-s">{hours}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
