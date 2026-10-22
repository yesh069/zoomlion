// schema.org structured data (JSON-LD). Search engines and AI assistants read
// these to understand who sells what, where.
import { CATEGORIES, machinePath, type Category, type Faq, type Machine } from "./catalogue";
import { DEALER, SITE, absUrl } from "./site";

const DEALER_ID = absUrl("/#dealer");
const BRAND_ID = absUrl("/#zoomlion");
const SITE_ID = absUrl("/#website");

export const zoomlionBrand = {
  "@type": "Brand",
  "@id": BRAND_ID,
  name: "Zoomlion",
  logo: absUrl("/brand/zoomlion-logo.svg"),
  sameAs: ["https://en.zoomlion.com/", "https://en.wikipedia.org/wiki/Zoomlion"],
};

const manufacturer = {
  "@type": "Organization",
  name: "Zoomlion Heavy Industry Science & Technology Co., Ltd.",
  url: "https://en.zoomlion.com/",
};

export const dealer = {
  "@type": ["LocalBusiness", "AutoDealer"],
  "@id": DEALER_ID,
  name: DEALER.name,
  alternateName: SITE.name,
  description: `Authorised Zoomlion distributor in Ireland. ${DEALER.name} sells, delivers and services Zoomlion machinery from Watergrasshill, Co. Cork.`,
  url: SITE.url,
  logo: absUrl("/brand/zoomlion-logo.svg"),
  image: absUrl("/og.png"),
  telephone: DEALER.phone,
  email: DEALER.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: DEALER.address.street,
    addressLocality: DEALER.address.locality,
    addressRegion: DEALER.address.region,
    postalCode: DEALER.address.postcode,
    addressCountry: DEALER.address.country,
  },
  hasMap: DEALER.mapsUrl,
  areaServed: { "@type": "Country", name: DEALER.areaServed },
  brand: { "@id": BRAND_ID },
  knowsAbout: ["Zoomlion", ...CATEGORIES.map((c) => c.name), "Plant machinery finance", "Machinery parts and service"],
  contactPoint: [
    { "@type": "ContactPoint", telephone: DEALER.phone, contactType: "sales", areaServed: "IE", availableLanguage: "en" },
    { "@type": "ContactPoint", telephone: DEALER.mobile, contactType: "customer service", areaServed: "IE", availableLanguage: "en" },
  ],
  sameAs: [DEALER.url],
};

export const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: "en-IE",
  publisher: { "@id": DEALER_ID },
};

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  };
}

export function faqPage(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function webPage(path: string, name: string, description: string, type = "WebPage") {
  return {
    "@type": type,
    "@id": absUrl(path) + "#page",
    url: absUrl(path),
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": BRAND_ID },
    inLanguage: "en-IE",
  };
}

export function product(m: Machine, category: Category) {
  return {
    "@type": "Product",
    "@id": absUrl(machinePath(m)) + "#product",
    name: `Zoomlion ${m.name}`,
    model: m.model,
    description: m.description.join(" "),
    image: absUrl(m.image.src),
    url: absUrl(machinePath(m)),
    category: category.name,
    brand: { "@id": BRAND_ID },
    manufacturer,
    // No Offer: prices are not published (quotes only), and an Offer without a
    // price is flagged as an error by Google.
    additionalProperty: m.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
  };
}

export function itemList(machines: Machine[]) {
  return {
    "@type": "ItemList",
    itemListElement: machines.map((m, i) => ({ "@type": "ListItem", position: i + 1, url: absUrl(machinePath(m)), name: `Zoomlion ${m.name}` })),
  };
}

