// The machines O'Regan Plant Sales supplies. Every machine on the site comes
// from here: add one to MACHINES and it appears on the homepage, the products
// page, the menu, the sitemap and llms.txt, with its own page.
//
// Specs and highlights are taken from Zoomlion's product pages and spec sheets;
// never invent figures. Prices are in euro, as set by the dealer.

export type Faq = { q: string; a: string };

export type SpecRow = { label: string; value: string };

export type Img = { src: string; width: number; height: number };

export type Machine = {
  slug: string;
  model: string;
  /** Full display name, e.g. "ZE27GU Mini Excavator". */
  name: string;
  /** Machine type for labels and sentences, e.g. "Mini excavator". */
  type: string;
  /** Price in euro, excluding VAT. */
  price: number;
  /** Cut-out product shot (transparent background). */
  image: Img;
  /** Photo of the machine at work, shown on its page. */
  photo?: Img & { alt: string };
  /** One sentence for cards and the meta description. */
  summary: string;
  /** A few paragraphs for the machine page. */
  description: string[];
  highlights: string[];
  specs: SpecRow[];
  /** Manufacturer spec sheet PDF (hosted by Zoomlion: the files are 30–100 MB). */
  pdf?: string;
  /** The Zoomlion product page the specs come from. */
  source: string;
  faqs?: Faq[];
};

export const MACHINES: Machine[] = [
  {
    slug: "ze27gu",
    model: "ZE27GU",
    name: "ZE27GU Mini Excavator",
    type: "Mini excavator",
    price: 27800,
    image: { src: "/machines/ze27gu.webp", width: 806, height: 590 },
    summary: "A 2.7-tonne zero-tail-swing mini excavator with a ROPS cab and air conditioning, built for tight sites.",
    description: [
      "The Zoomlion ZE27GU is a 2.7-tonne mini excavator with zero-tail swing, so the rear of the machine stays inside its tracks as it slews. That makes it a strong fit for gardens, back lanes, footpaths and other tight sites where a conventional tail would hit walls or traffic.",
      "The operator sits in a ROPS cab with air conditioning for heating and cooling. Load-sensing hydraulics with low pressure loss keep the controls smooth, and bidirectional auxiliary piping with flow regulation runs breakers, augers and other attachments. An enlarged undercarriage with four track rollers keeps it stable when digging over the side.",
    ],
    highlights: [
      "Zero-tail swing for tight spaces",
      "ROPS cab with air conditioning (heating & cooling)",
      "Bidirectional auxiliary piping with flow regulation",
      "Enlarged undercarriage with four track rollers",
      "Load-sensing hydraulics with low pressure loss",
    ],
    specs: [
      { label: "Operating weight", value: "2,700 kg" },
      { label: "Rated power", value: "15.4 kW @ 2,400 rpm" },
      { label: "Standard bucket capacity", value: "0.08 m³" },
      { label: "Max. digging depth", value: "2,880 mm" },
      { label: "Max. dumping height", value: "4,410 mm" },
      { label: "Tail swing", value: "Zero-tail" },
      { label: "Operator protection", value: "ROPS cab" },
    ],
    pdf: "https://en-product.zoomlion.com/upload/file/2025/06/25/5626952b31ef454facff0bff8548419f.pdf",
    source: "https://en-product.zoomlion.com/product/pro-detail-105.htm",
  },
  {
    slug: "ze55gu",
    model: "ZE55GU",
    name: "ZE55GU Mini Excavator",
    type: "Mini excavator",
    price: 45000,
    image: { src: "/machines/ze55gu.webp", width: 646, height: 581 },
    photo: { src: "/machines/ze55gu-site.webp", width: 1400, height: 933, alt: "Zoomlion ZE55GU excavator digging on a construction site" },
    summary: "A 5.5-tonne class zero-tail-swing excavator with a 35 kW engine, 3.67 m dig depth and a heated and cooled cab.",
    description: [
      "The Zoomlion ZE55GU is a 5.5-tonne class excavator for groundworks, drainage, foundations and site preparation. A high-power engine works with an electronically controlled main pump, giving strong digging force with good fuel control, and it reaches a maximum digging depth of 3,670 mm.",
      "Zero-tail swing keeps the counterweight inside the tracks, so it works safely beside walls, fences and live traffic. The operator gets ROPS protection, a suspended seat and a high-power air conditioner for heating and cooling, and a fully opening hood gives easy access for daily checks and servicing.",
    ],
    highlights: [
      "High-power engine with electronically controlled main pump",
      "Zero-tail swing",
      "ROPS operator protection and suspended seat",
      "High-power air conditioning (heating & cooling)",
      "Fully opening hood for easy servicing",
    ],
    specs: [
      { label: "Operating weight", value: "5,800 kg" },
      { label: "Rated power", value: "35 kW @ 2,200 rpm" },
      { label: "Standard bucket capacity", value: "0.16 m³" },
      { label: "Max. digging depth", value: "3,670 mm" },
      { label: "Max. dumping height", value: "5,560 mm" },
      { label: "Tail swing", value: "Zero-tail" },
    ],
    pdf: "https://en-product.zoomlion.com/upload/file/2025/06/25/fd8ffcf907c642d58760a9b3e2edfe0b.pdf",
    source: "https://en-product.zoomlion.com/product/pro-detail-1036.htm",
  },
  {
    slug: "zs090v",
    model: "ZS090V",
    name: "ZS090V Skid Steer Loader",
    type: "Skid steer loader",
    price: 34500,
    image: { src: "/machines/zs090v.webp", width: 723, height: 563 },
    photo: { src: "/machines/zs090v-site.webp", width: 1400, height: 656, alt: "Zoomlion ZS090V skid steer loader on a work site" },
    summary: "A vertical-lift skid steer loader with a 47.9 kW Kubota Stage V engine, 901 kg rated load and 2,377 mm discharge height.",
    description: [
      "The Zoomlion ZS090V is a vertical-lift skid steer loader powered by a 47.9 kW Kubota high-pressure common-rail engine with DPF regeneration, fully compliant with EU Stage V emissions. Vertical lift gives a maximum discharge height of 2,377 mm with a 42° tilt angle, so it loads trucks and stacks material precisely in narrow spaces.",
      "Optional 110 L/min high-flow hydraulics drive high-power attachments such as breakers, planers and mulchers. The pressurised, dust-proof cab has side-window defogging for clear visibility, and ground-level service access with LCD real-time monitoring makes daily maintenance quick.",
    ],
    highlights: [
      "EU Stage V 47.9 kW Kubota common-rail engine with DPF",
      "Vertical lift: 2,377 mm max. discharge height, 42° tilt",
      "Optional 110 L/min high-flow hydraulics for breakers and other attachments",
      "Pressurised, dust-proof cab with side-window defogging",
      "Ground-level service access and LCD monitoring",
    ],
    specs: [
      { label: "Operating weight", value: "2,998 kg" },
      { label: "Rated power", value: "47.9 kW @ 2,700 rpm (Kubota, EU Stage V)" },
      { label: "Rated operating load", value: "901 kg" },
      { label: "Bucket capacity", value: "0.44 m³" },
      { label: "Max. discharge height", value: "2,377 mm" },
      { label: "Max. operating height", value: "3,826 mm" },
      { label: "Width", value: "1,725 mm" },
      { label: "Height", value: "1,998 mm" },
      { label: "High-flow hydraulics", value: "110 L/min (optional)" },
    ],
    pdf: "https://en-product.zoomlion.com/upload/file/2025/06/26/1bd26e1cfc8e499a8855f10d88b7c6ce.pdf",
    source: "https://en-product.zoomlion.com/product/pro-detail-128.htm",
  },
];

export const machineBySlug = (slug: string) => MACHINES.find((m) => m.slug === slug);
export const machinePath = (m: Pick<Machine, "slug">) => `/products/${m.slug}/`;

// Prices are ex-VAT. formatPrice is for text ("€27,800 + VAT"); big price
// displays show formatAmount with the VAT note set smaller beside it.
const EUR = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const VAT_NOTE = "+ VAT";
export const formatAmount = (n: number) => EUR.format(n);
export const formatPrice = (n: number) => `${EUR.format(n)} ${VAT_NOTE}`;
