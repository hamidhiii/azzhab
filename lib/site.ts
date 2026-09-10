/* ==========================================================================
   Company details. Edit here; every page reads these values.
   The form endpoint comes from the environment so it can differ per deploy:
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx
   ========================================================================== */
const FALLBACK_URL = "https://azzhab.com";

/**
 * Resolves the public site URL. An environment variable that exists but is
 * empty is treated as unset, and a value without a protocol still works, so a
 * half-filled hosting setting cannot break the build.
 * Falls back to the Vercel deployment domain, then to FALLBACK_URL.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // try the next candidate
    }
  }

  return FALLBACK_URL;
}

export const site = {
  company: "Azzhab Perfumes FZ-LLC",
  address: "Dubai Industrial City, Warehouse 00, Dubai, United Arab Emirates",
  addressAr: "مدينة دبي الصناعية، مستودع 00، دبي، الإمارات العربية المتحدة",
  mapUrl: "https://maps.google.com/?q=Dubai+Industrial+City",
  phone: "+971 4 000 0000",
  whatsapp: "971500000000",
  email: "info@azzhab.com",
  emailSales: "sales@azzhab.com",
  hours: "Sun – Thu, 09:00 – 18:00 (GST)",
  hoursAr: "الأحد – الخميس، 09:00 – 18:00 (بتوقيت الخليج)",
  licence: "000000",
  instagram: "",
  linkedin: "",

  /** Public site URL, used for canonical and Open Graph tags. */
  url: resolveSiteUrl(),

  /** POST target for the three forms. Empty -> mailto fallback. */
  formEndpoint: (process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "").trim(),
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
export const waHref = (n: string) => `https://wa.me/${n.replace(/\D/g, "")}`;
