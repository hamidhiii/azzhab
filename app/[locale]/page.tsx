import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  Arrow,
  CtaBand,
  Eyebrow,
  Figure,
  LinkCard,
  Rich,
  RuleList,
  Stats,
  Steps,
} from "@/components/ui";
import { href, routes } from "@/lib/i18n";
import { pageMetadata, resolveLocale, type PageParams } from "@/lib/page";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return pageMetadata(locale, "", t.home.title, t.home.desc);
}

export default async function HomePage({ params }: PageParams) {
  const { locale, t } = await resolveLocale(params);
  const h = t.home;

  return (
    <main id="main">
      <section className="hero">
        <div className="hero__media">
          <Image
            src="https://picsum.photos/seed/azzhab-atelier/1920/1200"
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="hero__inner">
          <div className="shell">
            <div className="hero__grid">
              <div className="stack stack--l">
                <Eyebrow>{h.heroEyebrow}</Eyebrow>
                <Rich as="h1" className="display" html={h.heroTitle} />
                <p className="lead">{h.heroLead}</p>
                <div className="btn-row">
                  <Link className="btn btn--solid" href={href(locale, routes.privateLabel)}>
                    {t.cta.brief}
                  </Link>
                  <Link className="btn btn--light" href={href(locale, routes.wholesale)}>
                    {t.cta.price}
                  </Link>
                </div>
              </div>
              <dl className="hero__meta">
                <div>
                  <dt>{h.heroMeta1k}</dt>
                  <dd>{h.heroMeta1v}</dd>
                </div>
                <div>
                  <dt>{h.heroMeta2k}</dt>
                  <dd>{h.heroMeta2v}</dd>
                </div>
                <div>
                  <dt>{h.heroMeta3k}</dt>
                  <dd>{h.heroMeta3v}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{h.introEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{h.introTitle}</h2>
            </div>
            <div className="stack" data-reveal>
              <p className="lead">{h.introText}</p>
              <p>{h.introText2}</p>
              <div className="mt-s">
                <Arrow href={href(locale, routes.about)}>{t.cta.read}</Arrow>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="stack" data-reveal>
            <Eyebrow>{h.capsEyebrow}</Eyebrow>
            <h2 className="h2">{h.capsTitle}</h2>
          </div>

          <div className="grid grid--2 mt-l">
            <LinkCard
              href={href(locale, routes.privateLabel)}
              index={1}
              title={h.cap1t}
              text={h.cap1x}
              action={t.cta.read}
            />
            <LinkCard
              href={href(locale, routes.wholesale)}
              index={2}
              title={h.cap2t}
              text={h.cap2x}
              action={t.cta.read}
            />
            <LinkCard
              href={href(locale, routes.production)}
              index={3}
              title={h.cap3t}
              text={h.cap3x}
              action={t.cta.read}
            />
            <LinkCard
              href={href(locale, routes.quality)}
              index={4}
              title={h.cap4t}
              text={h.cap4x}
              action={t.cta.read}
            />
          </div>
        </div>
      </section>

      <Stats
        items={[
          { value: h.stat1n, label: h.stat1t },
          { value: h.stat2n, label: h.stat2t },
          { value: h.stat3n, label: h.stat3t },
          { value: h.stat4n, label: h.stat4t },
        ]}
      />

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{h.processEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{h.processTitle}</h2>
            </div>
            <p className="lead" data-reveal>
              {h.processLead}
            </p>
          </div>

          <Steps
            items={[
              { title: h.p1t, text: h.p1x },
              { title: h.p2t, text: h.p2x },
              { title: h.p3t, text: h.p3x },
              { title: h.p4t, text: h.p4x },
              { title: h.p5t, text: h.p5x },
              { title: h.p6t, text: h.p6x },
            ]}
          />
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{h.catsEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{h.catsTitle}</h2>
            </div>
            <Figure seed="azzhab-bottles" width={1200} height={750} ratio="wide" />
          </div>

          <div className="mt-l">
            <RuleList
              items={[
                { label: h.cat1, note: h.cat1x },
                { label: h.cat2, note: h.cat2x },
                { label: h.cat3, note: h.cat3x },
                { label: h.cat4, note: h.cat4x },
                { label: h.cat5, note: h.cat5x },
                { label: h.cat6, note: h.cat6x },
                { label: h.cat7, note: h.cat7x },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid grid--split">
            <div data-reveal>
              <Eyebrow>{h.certsEyebrow}</Eyebrow>
              <h2 className="h2 mt-m">{h.certsTitle}</h2>
            </div>
            <div className="stack" data-reveal>
              <p className="small">{h.certsLead}</p>
              <Arrow href={href(locale, routes.quality)}>{t.nav.quality}</Arrow>
            </div>
          </div>

          <ul className="certs mt-l" data-reveal>
            <li>
              <b>{h.cert1}</b>
              <span>{h.cert1x}</span>
            </li>
            <li>
              <b>{h.cert2}</b>
              <span>{h.cert2x}</span>
            </li>
            <li>
              <b>{h.cert3}</b>
              <span>{h.cert3x}</span>
            </li>
            <li>
              <b>{h.cert4}</b>
              <span>{h.cert4x}</span>
            </li>
            <li>
              <b>{h.cert5}</b>
              <span>{h.cert5x}</span>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand eyebrow={h.ctaEyebrow} title={h.ctaTitle} text={h.ctaText}>
        <Link className="btn btn--light" href={href(locale, routes.privateLabel)}>
          {t.cta.brief}
        </Link>
        <Link className="btn btn--light" href={href(locale, routes.wholesale)}>
          {t.cta.price}
        </Link>
      </CtaBand>
    </main>
  );
}
