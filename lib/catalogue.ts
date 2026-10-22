// The product catalogue: every category and machine on the site comes from here.
// Add a machine to MACHINES and it appears on the homepage, its category page,
// the products page, the sitemap and llms.txt.
//
// NOTE: the machines below are a starting set built from the two product shots
// we already have. Replace them with the confirmed dealer range (and its
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
    slug: "aerial-work-platforms",
    name: "Aerial Work Platforms",
    singular: "aerial work platform",
    summary: "Truck-mounted, boom and scissor platforms (MEWPs) for safe work at height.",
    intro:
      "Zoomlion aerial work platforms, also called MEWPs or cherry pickers, lift people and tools safely to work at height. Zoomlion builds truck-mounted, boom and scissor platforms; O'Regan Plant Sales supplies and supports them across Ireland from Co. Cork.",
    uses: ["Building maintenance", "Utilities", "Tree surgery", "Signage", "Facilities"],
    faqs: [
      {
        q: "What is a MEWP?",
        a: "MEWP stands for mobile elevating work platform: a machine that raises a platform carrying people, tools and materials to work at height. Truck-mounted platforms, boom lifts (cherry pickers) and scissor lifts are all MEWPs.",
      },
      {
        q: "What is the difference between a truck-mounted platform and a boom lift?",
        a: "A truck-mounted platform is built onto a road vehicle, so it drives between jobs at road speed and sets up on outriggers. A self-propelled boom lift drives around the site itself but has to be transported between sites on a trailer or lorry.",
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
  {
    slug: "truck-mounted-aerial-platform",
    model: "Truck-mounted platform",
    name: "Truck-Mounted Aerial Work Platform",
    category: "aerial-work-platforms",
    image: { src: "/machines/truck-mounted-platform.webp", width: 299, height: 407 },
    summary: "A Zoomlion telescopic aerial platform on a light truck chassis: drive to the job, set up and work at height.",
    description: [
      "Zoomlion's truck-mounted aerial work platform puts a telescopic boom and a work basket on a light truck chassis. It drives between jobs on the road, sets up on four outriggers and lifts the crew and their tools to work at height.",
      "It suits utilities, building maintenance, signage and tree work, where the crew moves between several sites in a day. O'Regan Plant Sales will confirm the chassis and working height options available in Ireland.",
    ],
    highlights: ["Drives between jobs at road speed", "Telescopic boom with work basket", "Four stabilising outriggers", "Quick set-up on site"],
    specs: [],
    featured: true,
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const machinesIn = (category: string) => MACHINES.filter((m) => m.category === category);
export const machinePath = (m: Pick<Machine, "category" | "slug">) => `/products/${m.category}/${m.slug}/`;
export const categoryPath = (c: Pick<Category, "slug">) => `/products/${c.slug}/`;
