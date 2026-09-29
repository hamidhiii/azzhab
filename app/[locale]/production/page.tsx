import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand, Eyebrow, Figure, PageHead, SpecTable, Stats, Steps } from "@/components/ui";
import { href, routes } from "@/lib/i18n";
import { pageMetadata, resolveLocale, type PageParams } from "@/lib/page";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, routes.production, t.prod.title, t.prod.desc);
}

export default async function ProductionPage({ params }: PageParams) {
  const { locale, t } = await resolveLocale(params);
  const p = t.prod;

  return (
    <main id="main">
      <PageHead
        crumbHome={t.nav.home}
        crumb={p.crumb}
        homeHref={href(locale, routes.home)}
        title={p.headTitle}
        lead={p.headLead}
      />

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{p.introEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{p.introTitle}</h2>
            </div>
            <div className="stack" data-reveal>
              <p className="lead">{p.introText}</p>
              <p>{p.introText2}</p>
            </div>
          </div>

          <div className="grid grid--3 mt-l">
            <Figure src="/media/compounding.webp" width={1024} height={1536} ratio="tall" caption={p.fig1} />
            <Figure src="/media/evaluation.webp" width={1086} height={1448} ratio="tall" caption={p.fig2} />
            <Figure src="/media/packing.webp" width={1086} height={1448} ratio="tall" caption={p.fig3} />
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{p.lineEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{p.lineTitle}</h2>
              <p className="small mt-m">{p.lineNote}</p>
            </div>
            <SpecTable
              rows={[
                [p.l1k, p.l1v],
                [p.l2k, p.l2v],
                [p.l3k, p.l3v],
                [p.l4k, p.l4v],
                [p.l5k, p.l5v],
                [p.l6k, p.l6v],
              ]}
            />
          </div>
        </div>
      </section>

      <Stats
        items={[
          { value: p.stat1n, label: p.stat1t },
          { value: p.stat2n, label: p.stat2t },
          { value: p.stat3n, label: p.stat3t },
          { value: p.stat4n, label: p.stat4t },
        ]}
      />

      <section className="section">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{p.flowEyebrow}</Eyebrow>
            <h2 className="h2">{p.flowTitle}</h2>
          </div>
          <Steps
            items={[
              { title: p.f1t, text: p.f1x },
              { title: p.f2t, text: p.f2x },
              { title: p.f3t, text: p.f3x },
              { title: p.f4t, text: p.f4x },
              { title: p.f5t, text: p.f5x },
            ]}
          />
        </div>
      </section>

      <CtaBand eyebrow={p.crumb} title={p.visitTitle} text={p.visitText}>
        <Link className="btn btn--light" href={href(locale, routes.contact)}>
          {t.cta.contact}
        </Link>
      </CtaBand>
    </main>
  );
}
