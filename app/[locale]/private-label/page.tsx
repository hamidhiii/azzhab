import type { Metadata } from "next";

import BriefForm from "@/components/forms/BriefForm";
import { Accordion, Card, Eyebrow, Num, PageHead, SpecTable, pad } from "@/components/ui";
import { href, routes } from "@/lib/i18n";
import { pageMetadata, resolveLocale, type PageParams } from "@/lib/page";
import { site, telHref, waHref } from "@/lib/site";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, routes.privateLabel, t.pl.title, t.pl.desc);
}

export default async function PrivateLabelPage({ params }: PageParams) {
  const { locale, t } = await resolveLocale(params);
  const pl = t.pl;

  const included = [
    { title: pl.inc1t, text: pl.inc1x },
    { title: pl.inc2t, text: pl.inc2x },
    { title: pl.inc3t, text: pl.inc3x },
    { title: pl.inc4t, text: pl.inc4x },
    { title: pl.inc5t, text: pl.inc5x },
    { title: pl.inc6t, text: pl.inc6x },
  ];

  const next = [pl.next1, pl.next2, pl.next3];

  return (
    <main id="main">
      <PageHead
        crumbHome={t.nav.home}
        crumb={pl.crumb}
        homeHref={href(locale, routes.home)}
        title={pl.headTitle}
        lead={pl.headLead}
      />

      <section className="section">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{pl.incEyebrow}</Eyebrow>
            <h2 className="h2">{pl.incTitle}</h2>
          </div>
          <div className="grid grid--3 mt-l">
            {included.map((item, i) => (
              <Card key={item.title} index={i + 1} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{pl.termsEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{pl.termsTitle}</h2>
            </div>
            <SpecTable
              rows={[
                [pl.t1k, pl.t1v],
                [pl.t2k, pl.t2v],
                [pl.t3k, pl.t3v],
                [pl.t4k, pl.t4v],
                [pl.t5k, pl.t5v],
                [pl.t6k, pl.t6v],
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{pl.faqEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{pl.faqTitle}</h2>
            </div>
            <Accordion
              items={[
                { q: pl.q1, a: pl.a1 },
                { q: pl.q2, a: pl.a2 },
                { q: pl.q3, a: pl.a3 },
                { q: pl.q4, a: pl.a4 },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section--paper" id="brief">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{pl.formEyebrow}</Eyebrow>
            <h2 className="h2">{pl.formTitle}</h2>
            <p className="lead w-46">{pl.formLead}</p>
          </div>

          <div className="grid--form mt-l">
            <BriefForm locale={locale} form={t.form} pl={pl} />

            <aside className="form-aside" data-reveal>
              <div>
                <Eyebrow plain>{t.form.next}</Eyebrow>
                <ul className="list-rule mt-m">
                  {next.map((step, i) => (
                    <li key={step}>
                      <div className="row">
                        <Num>{pad(i + 1)}</Num>
                        <span className="grow small">{step}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow plain>{t.form.or}</Eyebrow>
                <p className="mt-s">
                  <a className="h4" href={`mailto:${site.emailSales}`}>
                    {site.emailSales}
                  </a>
                </p>
                <p className="small">
                  <a href={telHref(site.phone)}>{site.phone}</a>
                </p>
                <p className="mt-s">
                  <a
                    className="link"
                    href={waHref(site.whatsapp)}
                    target="_blank"
                    rel="noopener"
                  >
                    <span>{t.contact.whatsapp}</span>
                    <span className="arw" aria-hidden="true" />
                  </a>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
