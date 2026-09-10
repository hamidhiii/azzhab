# AZZHAB PERFUMES — website

Bilingual (English / Arabic with RTL) marketing site for a fragrance
manufacturer, built with Next.js 16 (App Router, React 19, TypeScript).
Every page is prerendered as static HTML at build time.

```
app/[locale]/                 one route tree, two languages
  layout.tsx                  <html lang/dir>, fonts, header, footer
  page.tsx                    Home
  private-label/page.tsx      Private Label + brief form
  wholesale/page.tsx          Wholesale & Distribution + price-list form
  production/page.tsx         Production / Facility
  quality/page.tsx            Quality & Certifications
  about/page.tsx              About
  contact/page.tsx            Contact + enquiry form
app/globals.css               the whole design system (tokens at the top)

components/                   Header, Footer, ScrollReveal, ui primitives
components/forms/             the three forms + shared fields and submit hook

lib/dictionaries/en.ts        every English string
lib/dictionaries/ar.ts        every Arabic string, typed against en.ts
lib/i18n.ts                   locales, routes, href() helper
lib/site.ts                   company details and env-driven settings
lib/page.ts                   locale resolution + per-page metadata

_static-html/                 the plain HTML version this was ported from
```

## Getting started

```bash
npm install
npm run dev
```

http://localhost:3000 redirects to `/en`. Production build:

```bash
npm run build
npm start
```

## Routing and languages

Both languages live in one route tree under `app/[locale]`, so `/en/wholesale`
and `/ar/wholesale` are the same component with a different dictionary. Each
locale is prerendered at build time via `generateStaticParams`.

* `<html lang>` and `dir` are set per locale — Arabic renders the entire
  layout mirrored, because the CSS uses logical properties throughout.
* The header language button links to the **same page** in the other language
  and carries `hrefLang`.
* Every page emits `alternates.languages` for `en`, `ar` and `x-default`, so
  search engines see the pair.
* An unknown locale (`/fr`) or unknown path returns 404.

Link to pages with the helper rather than hard-coded strings:

```tsx
import { href, routes } from "@/lib/i18n";

<Link href={href(locale, routes.wholesale)}>…</Link>
```

## Editing text

All copy lives in `lib/dictionaries/`. `ar.ts` is typed as `Dictionary`, the
type inferred from `en.ts`, so **a missing or misspelled Arabic key fails
`npm run build`** — the two languages cannot drift apart.

```ts
// lib/dictionaries/en.ts
home: { introTitle: "A manufacturer, not a middleman.", … }
```

```tsx
// app/[locale]/page.tsx
<h2 className="h2">{t.home.introTitle}</h2>
```

A few strings carry markup (`<br>`, `<em>`) — those render through the `Rich`
component in `components/ui.tsx`.

## Company details and environment

Phone, address, emails and working hours live in `lib/site.ts`. Two values come
from the environment (copy `.env.example` to `.env.local`):

```
NEXT_PUBLIC_SITE_URL=https://azzhab.com
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Both may be left empty. `NEXT_PUBLIC_SITE_URL` then falls back to the Vercel
deployment domain and finally to the value in `lib/site.ts`; an empty form
endpoint switches the forms to their mailto fallback.

`NEXT_PUBLIC_*` values are inlined at build time, so set them in the hosting
provider **before** the production build, not after.

## Forms

Private label brief, wholesale price list, general enquiry. All three share
`components/forms/useAzzhabForm.ts`, which validates the required fields, marks
the invalid ones, and POSTs JSON:

```json
{
  "company": "…", "contactName": "…", "email": "…",
  "productType": ["Eau de parfum"],
  "_form": "private-label", "_language": "ar",
  "_page": "/ar/private-label", "_submitted": "2026-01-01T00:00:00.000Z"
}
```

`_form` tells the three apart, so one endpoint can receive all of them. With
`NEXT_PUBLIC_FORM_ENDPOINT` empty, a submission falls back to opening the
visitor's mail client with the answers pre-filled — nothing is lost, but set a
real endpoint before launch.

To handle submissions in-app instead, add `app/api/enquiry/route.ts` and point
the endpoint at `/api/enquiry`; note that this turns the deployment into a
running server rather than pure static output.

## Design system

`app/globals.css` holds the tokens (colour, type scale, spacing, easing) at the
top and the components below. Fonts are self-hosted through `next/font`:
Cormorant Garamond, Jost and JetBrains Mono for Latin, Amiri and IBM Plex Sans
Arabic for Arabic, wired to the same CSS variables so the Arabic build swaps
faces automatically. Arabic also drops Latin letter-spacing, which would
otherwise break the joins between letters.

## Images

Every image is a grey `picsum.photos` placeholder served through `next/image`.
Replace them with real photography: drop files into `public/` and change the
`src` (the `Figure` component in `components/ui.tsx` and the hero in
`app/[locale]/page.tsx`). Local images can then drop `remotePatterns` from
`next.config.ts`.

The stylesheet applies `grayscale(1)` to every image so the palette stays
monochrome — remove the `filter` from `.figure img` / `.hero__media img` if you
want colour photography.

Suggested sizes: hero 1920x1200, wide figures 1200x750, tall figures 900x1200.

## Before going live — replace these placeholders

Everything below is invented so the pages read normally. None of it is verified.

| Where | What to replace |
|---|---|
| `lib/site.ts` | address, phone, WhatsApp, emails, working hours, licence, map URL |
| `dictionaries` -> `home.stat*`, `prod.stat*`, `prod.l*` | capacity, tanks, filling lines, fill range |
| `dictionaries` -> `pl.t*`, `ws.t*` | MOQ, lead times, payment and incoterms |
| `dictionaries` -> `home.cert*`, `qa.c*` | certifications — claim only what you hold |
| `dictionaries` -> `about.tm*`, `about.story*` | founding year, milestones, real history |
| Arabic brand name | currently `عزهب للعطور` — confirm the official spelling |
| `public/favicon.svg` | placeholder mark |
| Images | every `picsum.photos` URL |

Certification and capacity claims are legal statements in the UAE and the EU.
Confirm each one with the commercial team before publishing.

## Logo

The wordmark is set in type (`components/Wordmark.tsx`, Jost 200 with wide
tracking) so it stays sharp at any size and turns white over the dark hero. To
use the original file, drop `logo.svg` into `public/` and render an `<Image>`
inside that component. SVG is strongly preferred over PNG — the header inverts
the mark over the hero, which a raster cannot do cleanly.

## Adding a page

1. `app/[locale]/<route>/page.tsx` — copy `about/page.tsx` as the shortest example.
2. Add its strings to **both** dictionaries (the build enforces this).
3. Add the path to `routes` in `lib/i18n.ts` and to the arrays in
   `components/Header.tsx` and `components/Footer.tsx`.

## Deployment

Vercel, or any Node host: `npm run build` then `npm start`. The pages are
static; only the image optimizer needs the server. `app/sitemap.ts` and
`app/robots.ts` generate `/sitemap.xml` (with hreflang alternates) and
`/robots.txt` from the resolved site URL. Still missing before launch: a
1200x630 Open Graph image.

## The static version

`_static-html/` holds the original plain HTML/CSS/JS build of the same site
(same design, same copy, client-side language switch). It is kept for
reference and can be deleted once the Next version is live.
