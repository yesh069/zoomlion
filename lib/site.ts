// Business details used across the site, the structured data and llms.txt.
// Change contact details here and they update everywhere.

export const SITE = {
  url: "https://zoomlion.ie",
  name: "Zoomlion Ireland",
  tagline: "Zoomlion machinery in Ireland, sold and supported by O'Regan Plant Sales",
  description:
    "Zoomlion telehandlers, aerial platforms and machinery for sale in Ireland. Authorised distributor O'Regan Plant Sales, Co. Cork: quotes, finance, service.",
  locale: "en_IE",
} as const;

/** The dealer that runs zoomlion.ie. */
export const DEALER = {
  name: "O'Regan Plant Sales",
  url: "https://oreganplantsales.com",
  phone: "+353214889800",
  phoneDisplay: "021 488 9800",
  mobile: "+353857358280",
  mobileDisplay: "085 735 8280",
  /** WhatsApp number (digits with country code). */
  whatsapp: "+353857358280",
  email: "office@oreganplantsales.com",
  address: {
    street: "Unit 5, Meenane, Watergrasshill Business Park",
    locality: "Watergrasshill",
    region: "Co. Cork",
    postcode: "T56 XP77",
    country: "IE",
  },
  mapsUrl: "https://maps.google.com/?q=Watergrasshill+Business+Park,+Co.+Cork,+T56+XP77",
  areaServed: "Ireland",
} as const;

export const addressLines = [DEALER.address.street, `${DEALER.address.locality}, ${DEALER.address.region}`, DEALER.address.postcode];

/** Facts about the manufacturer, phrased so answer engines can quote them. */
export const ZOOMLION_FACTS = [
  { value: "1992", label: "Founded in Changsha, China" },
  { value: "170+", label: "Countries and regions served" },
  { value: "SZ · HK", label: "Listed in Shenzhen and Hong Kong" },
  { value: "Cork", label: "Irish sales, parts and service" },
] as const;

export function waLink(message: string) {
  return `https://wa.me/${DEALER.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body = "") {
  return `mailto:${DEALER.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const absUrl = (path: string) => SITE.url + path;
