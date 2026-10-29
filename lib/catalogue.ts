// Reads the machine list from /data.js (the file people edit) and turns each
// entry into what the pages use: image paths with their pixel sizes, spec groups
// plus a flat spec list, and price helpers. To change machines, edit data.js,
// not this file.
import machineData from "@/data";
import imageSizes from "./image-sizes.json";

export type Faq = { q: string; a: string };

export type SpecRow = { label: string; value: string };
export type SpecGroup = { title: string; rows: SpecRow[] };

export type Img = { src: string; width: number; height: number };

/** One machine as written in data.js (see the guide at the top of that file). */
export type MachineData = {
  slug: string;
  model: string;
  name: string;
  type: string;
  /** Euro, excluding VAT; null = price on request. */
  price: number | null;
  image: string;
  photo?: { file: string; alt: string };
  summary: string;
  description: string[];
  highlights: string[];
  specs: Record<string, Record<string, string>>;
  specSheet?: string;
  source?: string;
  faqs?: Faq[];
};

/** A machine as the pages use it. */
export type Machine = Omit<MachineData, "image" | "photo" | "specs"> & {
  image: Img;
  photo?: Img & { alt: string };
  specGroups: SpecGroup[];
  /** Every spec row, ungrouped, in order. */
  specs: SpecRow[];
};

const sizes: Record<string, { width: number; height: number }> = imageSizes;

/** "ze27gu.png" → the converted /machines/ze27gu.webp with its size. */
function img(file: string, slug: string): Img {
  const name = file.replace(/\.\w+$/, "");
  const size = sizes[name];
  if (!size) throw new Error(`data.js (${slug}): image "${file}" not found in assets/machines/`);
  return { src: `/machines/${name}.webp`, ...size };
}

function toMachine(d: MachineData): Machine {
  const specGroups = Object.entries(d.specs).map(([title, rows]) => ({
    title,
    rows: Object.entries(rows).map(([label, value]) => ({ label, value })),
  }));
  return {
    ...d,
    image: img(d.image, d.slug),
    photo: d.photo && { ...img(d.photo.file, d.slug), alt: d.photo.alt },
    specGroups,
    specs: specGroups.flatMap((g) => g.rows),
  };
}

export const MACHINES: Machine[] = (machineData as MachineData[]).map(toMachine);

const slugs = MACHINES.map((m) => m.slug);
const dupe = slugs.find((s, i) => slugs.indexOf(s) !== i);
if (dupe) throw new Error(`data.js: two machines use the slug "${dupe}"; each needs its own.`);

export const machineBySlug = (slug: string) => MACHINES.find((m) => m.slug === slug);
export const machinePath = (m: Pick<Machine, "slug">) => `/products/${m.slug}/`;
export const specValue = (m: Machine, label: string) => m.specs.find((s) => s.label === label)?.value;

// Prices are ex-VAT; null means "price on request".
// formatPrice is for text ("€27,800 + VAT"). Big price displays show
// formatAmount with priceNote set smaller beside it.
const EUR = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const PRICE_ON_REQUEST = "Price on request";
export const formatAmount = (p: number | null) => (p === null ? "On request" : EUR.format(p));
export const priceNote = (p: number | null) => (p === null ? "Ask for a quote" : "+ VAT");
export const formatPrice = (p: number | null) => (p === null ? PRICE_ON_REQUEST : `${EUR.format(p)} + VAT`);
