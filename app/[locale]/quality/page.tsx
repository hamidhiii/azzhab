import type { Metadata } from "next";
import Link from "next/link";

import { Accordion, Card, CtaBand, Eyebrow, Figure, PageHead, RuleList } from "@/components/ui";
import { href, routes } from "@/lib/i18n";
import { pageMetadata, resolveLocale, type PageParams } from "@/lib/page";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, routes.quality, t.qa.title, t.qa.desc);
}

export default async function QualityPage({ params }: PageParams) {
  const { locale, t } = await resolveLocale(params);
  const q = t.qa;

  const certificates = [
    { title: q.c1t, text: q.c1x },
    { title: q.c2t, text: q.c2x },
    { title: q.c3t, text: q.c3x },
    { title: q.c4t, text: q.c4x },
    { title: q.c5t, text: q.c5x },
    { title: q.c6t, text: q.c6x },
  ];

  return (
    <main id="main">
      <PageHead
        crumbHome={t.nav.home}
        crumb={q.crumb}
        homeHref={href(locale, routes.home)}
        title={q.headTitle}
        lead={q.headLead}
      />

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{q.certsEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{q.certsTitle}</h2>
            </div>
            <p className="small" data-reveal>
              {q.certsNote}
            </p>
          </div>

          <div className="grid grid--3 mt-l">
            {certificates.map((cert, i) => (
              <Card key={cert.title} index={i + 1} title={cert.title} text={cert.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{q.testEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{q.testTitle}</h2>
              <div className="mt-l">
                <Figure src="/media/laboratory.webp" alt={q.testAlt} width={1586} height={992} ratio="wide" />
              </div>
            </div>
            <RuleList
              items={[
                { label: q.ts1 },
                { label: q.ts2 },
                { label: q.ts3 },
                { label: q.ts4 },
                { label: q.ts5 },
                { label: q.ts6 },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{q.docEyebrow}</Eyebrow>
            <h2 className="h2">{q.docTitle}</h2>
          </div>
          <div className="mt-l">
            <RuleList
              items={[
                { label: q.d1, note: q.d1x },
                { label: q.d2, note: q.d2x },
                { label: q.d3, note: q.d3x },
                { label: q.d4, note: q.d4x },
                { label: q.d5, note: q.d5x },
                { label: q.d6, note: q.d6x },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{q.regEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{q.regTitle}</h2>
            </div>
            <Accordion
              items={[
                { q: q.r1q, a: q.r1a },
                { q: q.r2q, a: q.r2a },
                { q: q.r3q, a: q.r3a },
                { q: q.r4q, a: q.r4a },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand eyebrow={q.docEyebrow} title={q.noteTitle} text={q.noteText}>
        <Link className="btn btn--light" href={href(locale, routes.contact)}>
          {t.cta.contact}
        </Link>
      </CtaBand>
    </main>
  );
}
