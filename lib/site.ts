/* ==========================================================================
   Company details. Edit here; every page reads these values.
   The form endpoint comes from the environment so it can differ per deploy:
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx
   ========================================================================== */
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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azzhab.com",

  /** POST target for the three forms. Empty -> mailto fallback. */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
export const waHref = (n: string) => `https://wa.me/${n.replace(/\D/g, "")}`;
