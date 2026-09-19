import type { Metadata } from "next";

import WholesaleForm from "@/components/forms/WholesaleForm";
import { Eyebrow, Figure, Num, PageHead, Steps, pad } from "@/components/ui";
import { href, routes } from "@/lib/i18n";
import { pageMetadata, resolveLocale, type PageParams } from "@/lib/page";
import { site, telHref, waHref } from "@/lib/site";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, routes.wholesale, t.ws.title, t.ws.desc);
}

export default async function WholesalePage({ params }: PageParams) {
  const { locale, t } = await resolveLocale(params);
  const ws = t.ws;

  return (
    <main id="main">
      <PageHead
        crumbHome={t.nav.home}
        crumb={ws.crumb}
        homeHref={href(locale, routes.home)}
        title={ws.headTitle}
        lead={ws.headLead}
      />

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{ws.lineEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{ws.lineTitle}</h2>
              <p className="lead mt-m">{ws.lineText}</p>
            </div>
            <Figure seed="azzhab-amani" width={1000} height={1000} ratio="square" />
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{ws.rangeEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{ws.rangeTitle}</h2>
            </div>
            <p className="lead" data-reveal>
              {ws.rangeText}
            </p>
          </div>

          <ul className="certs mt-l" data-reveal>
            <li>
              <b>{ws.tag1}</b>
            </li>
            <li>
              <b>{ws.tag2}</b>
            </li>
            <li>
              <b>{ws.tag3}</b>
              <span>{ws.tag3x}</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{ws.shelfEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{ws.shelfTitle}</h2>
            </div>
            <p className="lead" data-reveal>
              {ws.shelfText}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{ws.buyEyebrow}</Eyebrow>
            <h2 className="h2">{ws.buyTitle}</h2>
          </div>
          <Steps
            items={[
              { title: ws.b1t, text: ws.b1x },
              { title: ws.b2t, text: ws.b2x },
              { title: ws.b3t, text: ws.b3x },
            ]}
          />
        </div>
      </section>

      <section className="section" id="line-sheet">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{ws.formEyebrow}</Eyebrow>
            <h2 className="h2">{ws.formTitle}</h2>
            <p className="lead w-46">{ws.formLead}</p>
          </div>

          <div className="grid--form mt-l">
            <WholesaleForm locale={locale} form={t.form} ws={ws} />

            <aside className="form-aside" data-reveal>
              <div>
                <Eyebrow plain>{t.form.next}</Eyebrow>
                <ul className="list-rule mt-m">
                  {[ws.next1, ws.next2, ws.next3].map((item, i) => (
                    <li key={item}>
                      <div className="row">
                        <Num>{pad(i + 1)}</Num>
                        <span className="grow small">{item}</span>
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
                  <a className="link" href={waHref(site.whatsapp)} target="_blank" rel="noopener">
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
