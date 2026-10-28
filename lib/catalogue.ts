// The product catalogue: every category and machine on the site comes from here.
// Add a machine to MACHINES and it appears on the homepage, its category page,
// the products page, the sitemap and llms.txt.
//
// NOTE: the machine below is a starting entry built from the product shot we
// already have. Replace them with the confirmed dealer range (and its
// manufacturer specs) when it arrives. Never invent spec figures: leave `specs`
// empty and the page shows "full specification on request".

export type Faq = { q: string; a: string };

export type Category = {
  slug: string;
  name: string;
  /** Singular, for sentences: "a telehandler". */
  singular: string;
  /** One-line summary for cards and meta descriptions. */
  summary: string;
  /** Answer-first intro shown at the top of the category page. */
  intro: string;
  /** Typical jobs, shown as chips. */
  uses: string[];
  faqs: Faq[];
};

export type SpecRow = { label: string; value: string };

export type Machine = {
  slug: string;
  model: string;
  /** Full display name, e.g. "ZTH3513 Telehandler". */
  name: string;
  category: string;
  image: { src: string; width: number; height: number };
  /** One sentence for cards and the meta description. */
  summary: string;
  /** A few paragraphs for the machine page. */
  description: string[];
  highlights: string[];
  specs: SpecRow[];
  /** Spec sheet PDF in /public, if we have one. */
  pdf?: string;
  featured?: boolean;
  faqs?: Faq[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "telehandlers",
    name: "Telehandlers",
    singular: "telehandler",
    summary: "Telescopic handlers for lifting, loading and placing materials on site and on the farm.",
    intro:
      "Zoomlion telehandlers are telescopic handlers built for lifting, loading and placing materials at height. In Ireland they are sold, delivered and serviced by O'Regan Plant Sales, the authorised Zoomlion distributor in Watergrasshill, Co. Cork.",
    uses: ["Construction sites", "Agriculture", "Pallet handling", "Bulk loading", "Yard work"],
    faqs: [
      {
        q: "What is a telehandler used for?",
        a: "A telehandler (telescopic handler) lifts and places loads at height and reach using a telescopic boom. With forks it moves pallets and building materials; with a bucket or other attachments it loads bulk material, which makes it common on building sites and farms.",
      },
      {
        q: "Who sells Zoomlion telehandlers in Ireland?",
        a: "O'Regan Plant Sales in Watergrasshill, Co. Cork is the authorised Zoomlion distributor in Ireland. Call 021 488 9800 or request a quote on zoomlion.ie.",
      },
    ],
  },
  {
    slug: "excavators",
    name: "Excavators",
    singular: "excavator",
    summary: "Mini, midi and crawler excavators for digging, trenching and groundworks.",
    intro:
      "Zoomlion excavators range from compact mini diggers to crawler excavators for groundworks, trenching and site preparation. Ask O'Regan Plant Sales, the authorised Zoomlion distributor in Ireland, which models are available now.",
    uses: ["Groundworks", "Trenching", "Landscaping", "Demolition", "Drainage"],
    faqs: [
      {
        q: "Can I buy a Zoomlion excavator in Ireland?",
        a: "Yes. O'Regan Plant Sales in Watergrasshill, Co. Cork supplies Zoomlion excavators in Ireland. Tell us the job and the size of machine you need and we will quote the right model.",
      },
    ],
  },
];

export const MACHINES: Machine[] = [
  {
    slug: "zth3513",
    model: "ZTH3513",
    name: "ZTH3513 Telehandler",
    category: "telehandlers",
    image: { src: "/machines/zth3513-telehandler.webp", width: 321, height: 366 },
    summary: "Zoomlion's ZTH3513 telescopic handler for lifting and placing loads on construction sites and farms.",
    description: [
      "The Zoomlion ZTH3513 is a telescopic handler for lifting, loading and placing materials at height. It pairs a long telescopic boom with a fully enclosed operator's cab and four-wheel off-road tyres, so it works on rough ground as well as on the yard.",
      "Fit forks for pallets and building materials, or a bucket for bulk loading. O'Regan Plant Sales supplies the ZTH3513 in Ireland with delivery, handover, servicing and parts from our Co. Cork depot.",
    ],
    highlights: ["Telescopic boom for lift and reach", "Enclosed operator's cab", "Off-road tyres for rough terrain", "Forks, bucket and other attachments"],
    specs: [],
    featured: true,
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const machinesIn = (category: string) => MACHINES.filter((m) => m.category === category);
export const machinePath = (m: Pick<Machine, "category" | "slug">) => `/products/${m.category}/${m.slug}/`;
export const categoryPath = (c: Pick<Category, "slug">) => `/products/${c.slug}/`;
