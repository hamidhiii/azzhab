# AZZHAB PERFUMES — website template

Static, bilingual (English / Arabic with RTL) marketing site for a fragrance
manufacturer. No build step, no framework, no server required: open
`index.html` in a browser and it runs.

```
index.html            Home
private-label.html    Private Label  + brief form
wholesale.html        Wholesale & Distribution + price-list request form
production.html       Production / Facility
quality.html          Quality & Certifications
about.html            About
contact.html          Contact + general enquiry form

assets/css/main.css       all styling (design tokens at the top)
assets/js/config.js       contact details + form endpoint  <- edit first
assets/js/content.en.js   every English string
assets/js/content.ar.js   every Arabic string
assets/js/i18n.js         language engine (EN/AR, LTR/RTL)
assets/js/main.js         header, menu, scroll reveal, form handling
assets/img/favicon.svg    placeholder favicon
```

## 1. Editing text

No text is hard-coded in the HTML. Markup carries keys, the two content files
carry the words:

```html
<h2 class="h2" data-i18n="home.introTitle"></h2>
```

```js
// assets/js/content.en.js
introTitle: "A manufacturer, not a middleman.",
```

Rules:

* `content.en.js` and `content.ar.js` must always hold **the same keys**.
  A missing Arabic key falls back to English and logs a warning in the console.
* `data-i18n` sets text, `data-i18n-html` allows `<br>` and `<em>`,
  `data-i18n-attr="placeholder:some.key"` sets an attribute.
* Contact details are not in the content files — they come from `config.js`
  through `data-cfg="phone|email|emailSales|address|hours|company"`.

## 2. Language switching

The button in the header switches EN <-> AR. It sets `lang` and `dir` on
`<html>`, so the whole layout mirrors for Arabic (the CSS uses logical
properties everywhere). The choice is remembered in `localStorage`, and
`?lang=ar` forces a language via URL — useful for sending an Arabic link.

Default language: `defaultLang` in `config.js`. Visitors whose browser is set
to Arabic get Arabic on the first visit.

## 3. Forms

Three forms: private label brief, wholesale price list, general enquiry.

Set `formEndpoint` in `assets/js/config.js` to any URL that accepts a POST with
a JSON body — Formspree, Getform, Web3Forms, a Google Apps Script, or your own
API:

```js
formEndpoint: "https://formspree.io/f/XXXXXXX",
```

While it is empty, every form falls back to opening the visitor's mail client
with all answers pre-filled, addressed to `emailSales`. Nothing is lost, but a
real endpoint is strongly recommended before launch.

Each submission includes `_form`, `_page`, `_language` and `_submitted`
alongside the answers, so one endpoint can receive all three forms.

## 4. Before going live — replace these placeholders

Everything below is invented so the pages read normally. None of it is verified.

| Where | What to replace |
|---|---|
| `assets/js/config.js` | address, phone, WhatsApp, emails, working hours, map URL |
| `content.*.js` -> `home.stat*`, `prod.stat*`, `prod.l*` | capacity, tanks, filling lines, fill range |
| `content.*.js` -> `pl.t*`, `ws.t*` | MOQ, lead times, payment and incoterms |
| `content.*.js` -> `home.cert*`, `qa.c*` | certifications — claim only what you hold |
| `content.*.js` -> `about.tm*`, `about.story*` | founding year, milestones, real history |
| `footer.licence` | trade licence number |
| Arabic brand name | currently `عزهب للعطور` — confirm the official spelling |
| Images | every `https://picsum.photos/...` URL is a grey placeholder |

Certification and capacity claims are legal statements in the UAE and the EU.
Confirm each one with the commercial team before publishing.

## 5. Logo

The wordmark is set in type (Jost 200, wide tracking) so it stays sharp at any
size and follows the theme:

```html
<a class="wordmark" href="index.html">
  <span class="wordmark__name">Azzhab</span>
  <span class="wordmark__sub"><i></i><span>Perfumes</span><i></i></span>
</a>
```

To use the original logo file instead, drop `logo.svg` into `assets/img/` and
replace that block on all seven pages with an `<img>`. An SVG is strongly
preferred over PNG: the header logo turns white over the dark hero, which an
SVG can do with `filter: invert(1)` and a raster cannot do cleanly.

## 6. Images

Replace the `picsum.photos` URLs with real photography. The stylesheet applies
`grayscale(1)` to every image so the palette stays monochrome — remove the
`filter` from `.figure img` and `.hero__media img` in `main.css` if you want
colour photography.

Suggested sizes: hero 1920x1200, wide figures 1200x750, tall figures 900x1200.

## 7. Adding a page

Copy any inner page (`about.html` is the simplest), change the two keys in the
`<head>` (`data-i18n` on `<title>` and `data-i18n-meta` on the description),
add a matching section to both content files, then add the link to the `<nav>`
and to the mobile `.menu__list` on all pages.

## 8. Local preview

Opening `index.html` directly works. To serve it over http instead (closer to
production, and required if you later add fetch-based features):

```bash
node dev-server.js
```

Then open http://localhost:4173. `dev-server.js` is a development helper only —
do not deploy it.

## 9. Deployment

Any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages or plain
shared hosting. Upload the folder as it is; there is nothing to build.

Before launch: add `sitemap.xml` and `robots.txt`, set the real domain in the
`og:` meta tags, and add a 1200x630 social preview image.

## 10. Reserved content keys

`cta.all`, `ui.close`, `form.step`, `form.required`, `form.optional`,
`footer.privacy` and `footer.terms` exist in both languages but are not used
yet — they are there for the privacy notice and terms of supply pages.
`form.ok`, `form.error`, `form.mailto`, `form.invalid` and `form.sending` are
used by JavaScript, not by markup.

## 11. Browser support

Modern Chrome, Safari, Firefox and Edge. The layout relies on CSS logical
properties and `:where()` / `:not()` selectors. No Internet Explorer support.
