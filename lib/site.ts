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
  address: "Behind 3rd Industrial Street, Industrial Area 6, Sharjah, United Arab Emirates",
  addressAr: "خلف الشارع الصناعي الثالث، المنطقة الصناعية 6، الشارقة، الإمارات العربية المتحدة",
  mapUrl: "https://maps.google.com/?q=3rd+Industrial+Street,+Industrial+Area+6,+Sharjah,+UAE",
  phone: "+971 58 943 0016",
  whatsapp: "971589430016",
  // Temporary: move to an azzhab.com mailbox once the domain is registered.
  email: "info@essent.ae",
  emailSales: "info@essent.ae",
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
