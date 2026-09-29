import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** Small typographic and layout primitives shared by every page. */

export function Eyebrow({ children, plain }: { children: ReactNode; plain?: boolean }) {
  return <p className={plain ? "eyebrow eyebrow--plain" : "eyebrow"}>{children}</p>;
}

export function Num({ children }: { children: ReactNode }) {
  return <span className="num">{children}</span>;
}

/** Index label: 1 -> "01" */
export const pad = (n: number) => String(n).padStart(2, "0");

/** Text that carries markup from the dictionary (<br>, <em>). */
export function Rich({
  as: Tag = "span",
  html,
  className,
}: {
  as?: "h1" | "h2" | "p" | "span";
  html: string;
  className?: string;
}) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Card({
  index,
  title,
  text,
  footer,
}: {
  index?: number;
  title: string;
  text: string;
  footer?: ReactNode;
}) {
  return (
    <div className="card" data-reveal>
      {index !== undefined && <Num>{pad(index)}</Num>}
      <h3 className="h3">{title}</h3>
      <p className="card__body">{text}</p>
      {footer}
    </div>
  );
}

export function LinkCard({
  href,
  index,
  title,
  text,
  action,
}: {
  href: string;
  index: number;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <Link className="card" href={href} data-reveal>
      <div className="card__top">
        <h3 className="h3">{title}</h3>
        <Num>{pad(index)}</Num>
      </div>
      <p className="card__body">{text}</p>
      <span className="link">
        <span>{action}</span>
        <span className="arw" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function Arrow({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className="link" href={href}>
      <span>{children}</span>
      <span className="arw" aria-hidden="true" />
    </Link>
  );
}

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="steps mt-l">
      {items.map((item, i) => (
        <li className="step" key={item.title} data-reveal>
          <Num>{pad(i + 1)}</Num>
          <h3 className="h3">{item.title}</h3>
          <p className="step__text">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <section className="section--tight">
      <div className="shell">
        <ul className="stats">
          {items.map((item) => (
            <li className="stat" key={item.label}>
              <b>{item.value}</b>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SpecTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="spec" data-reveal>
      <tbody>
        {rows.map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function RuleList({
  items,
  numbered = true,
  strong,
}: {
  items: { label: string; note?: string; lead?: string }[];
  numbered?: boolean;
  strong?: boolean;
}) {
  return (
    <ul className="list-rule" data-reveal>
      {items.map((item, i) => (
        <li key={item.label}>
          <div className="row">
            {numbered && <Num>{item.lead ?? pad(i + 1)}</Num>}
            <span className={item.note || strong ? "grow h4" : "grow"}>{item.label}</span>
            {item.note && <span className="small">{item.note}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="acc" data-reveal>
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <div className="acc__body">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

export function Figure({
  seed,
  src,
  alt = "",
  width,
  height,
  ratio = "wide",
  caption,
  className,
  priority,
}: {
  /** Placeholder seed, used until a real photo is supplied via src. */
  seed?: string;
  /** Real photo from /public — shown in colour. */
  src?: string;
  alt?: string;
  width: number;
  height: number;
  ratio?: "wide" | "tall" | "square";
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`figure figure--${ratio}${src ? " figure--photo" : ""}${className ? ` ${className}` : ""}`}
      data-reveal
    >
      <Image
        src={src ?? `https://picsum.photos/seed/${seed}/${width}/${height}`}
        alt={alt}
        fill
        sizes="(max-width: 900px) 100vw, 45vw"
        priority={priority}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function CtaBand({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <section className="section--tight">
      <div className="shell">
        <div className="cta-band" data-reveal>
          <div className="cta-band__grid">
            <div className="stack">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="h2">{title}</h2>
              <p className="w-46">{text}</p>
            </div>
            <div className="btn-row">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHead({
  crumbHome,
  crumb,
  homeHref,
  title,
  lead,
}: {
  crumbHome: string;
  crumb: string;
  homeHref: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="page-head">
      <div className="shell">
        <p className="crumb">
          <Link href={homeHref}>{crumbHome}</Link> &middot; <span>{crumb}</span>
        </p>
        <div className="page-head__grid">
          <Rich as="h1" className="h1" html={title} />
          <p className="lead">{lead}</p>
        </div>
      </div>
    </section>
  );
}
