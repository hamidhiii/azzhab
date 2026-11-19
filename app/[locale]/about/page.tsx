import type { Metadata } from "next";
import Link from "next/link";

import { Card, CtaBand, Eyebrow, Figure, PageHead, RuleList } from "@/components/ui";
import { href, routes } from "@/lib/i18n";
import { pageMetadata, resolveLocale, type PageParams } from "@/lib/page";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, routes.about, t.about.title, t.about.desc);
}

export default async function AboutPage({ params }: PageParams) {
  const { locale, t } = await resolveLocale(params);
  const a = t.about;

  return (
    <main id="main">
      <PageHead
        crumbHome={t.nav.home}
        crumb={a.crumb}
        homeHref={href(locale, routes.home)}
        title={a.headTitle}
        lead={a.headLead}
      />

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{a.storyEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{a.storyTitle}</h2>
              <div className="mt-l">
                <Figure src="/media/datum-store.webp" alt={a.storyAlt} width={1086} height={1448} ratio="tall" />
              </div>
            </div>
            <div className="stack" data-reveal>
              <p className="lead">{a.story1}</p>
              <p>{a.story2}</p>
              <p>{a.story3}</p>
              <p>{a.story4}</p>
              <p>{a.story5}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{a.valEyebrow}</Eyebrow>
            <h2 className="h2">{a.valTitle}</h2>
          </div>
          <div className="grid grid--3 mt-l">
            <Card index={1} title={a.v1t} text={a.v1x} />
            <Card index={2} title={a.v2t} text={a.v2x} />
            <Card index={3} title={a.v3t} text={a.v3x} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{a.timeEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{a.timeTitle}</h2>
            </div>
            <RuleList
              items={[
                { lead: a.tm1y, label: a.tm1t },
                { lead: a.tm2y, label: a.tm2t },
                { lead: a.tm3y, label: a.tm3t },
                { lead: a.tm4y, label: a.tm4t },
                { lead: a.tm5y, label: a.tm5t },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{a.mktEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{a.mktTitle}</h2>
              <p className="mt-m measure">{a.mktText}</p>
            </div>
            <RuleList
              strong
              items={[
                { label: a.mkt1 },
                { label: a.mkt2 },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand eyebrow={a.crumb} title={a.ctaTitle} text={a.ctaText}>
        <Link className="btn btn--light" href={href(locale, routes.privateLabel)}>
          {t.cta.brief}
        </Link>
        <Link className="btn btn--light" href={href(locale, routes.contact)}>
          {t.cta.talk}
        </Link>
      </CtaBand>
    </main>
  );
}
