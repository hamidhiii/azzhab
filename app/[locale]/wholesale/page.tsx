import type { Metadata } from "next";

import WholesaleForm from "@/components/forms/WholesaleForm";
import { Card, Eyebrow, Figure, Num, PageHead, RuleList, SpecTable, pad } from "@/components/ui";
import { href, routes } from "@/lib/i18n";
import { pageMetadata, resolveLocale, type PageParams } from "@/lib/page";
import { site, waHref } from "@/lib/site";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, routes.wholesale, t.ws.title, t.ws.desc);
}

export default async function WholesalePage({ params }: PageParams) {
  const { locale, t } = await resolveLocale(params);
  const ws = t.ws;

  const models = [
    { title: ws.m1t, text: ws.m1x },
    { title: ws.m2t, text: ws.m2x },
    { title: ws.m3t, text: ws.m3x },
  ];

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
          <div className="stack" data-reveal>
            <Eyebrow>{ws.modelsEyebrow}</Eyebrow>
            <h2 className="h2">{ws.modelsTitle}</h2>
          </div>
          <div className="grid grid--3 mt-l">
            {models.map((model, i) => (
              <Card key={model.title} index={i + 1} title={model.title} text={model.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{ws.termsEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{ws.termsTitle}</h2>
              <p className="small mt-m">{ws.termsNote}</p>
              <div className="mt-l">
                <Figure seed="azzhab-export" width={1200} height={750} ratio="wide" />
              </div>
            </div>
            <SpecTable
              rows={[
                [ws.t1k, ws.t1v],
                [ws.t2k, ws.t2v],
                [ws.t3k, ws.t3v],
                [ws.t4k, ws.t4v],
                [ws.t5k, ws.t5v],
                [ws.t6k, ws.t6v],
                [ws.t7k, ws.t7v],
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{ws.supEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{ws.supTitle}</h2>
            </div>
            <RuleList
              items={[
                { label: ws.sup1 },
                { label: ws.sup2 },
                { label: ws.sup3 },
                { label: ws.sup4 },
                { label: ws.sup5 },
                { label: ws.sup6 },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section--paper" id="price-list">
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
                <Eyebrow plain>{ws.asideTitle}</Eyebrow>
                <ul className="list-rule mt-m">
                  {[ws.aside1, ws.aside2, ws.aside3, ws.aside4].map((item, i) => (
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
