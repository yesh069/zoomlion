// @ts-check
/*
 * ============================================================================
 *  ZOOMLION.IE: MACHINE DATA
 * ============================================================================
 *
 *  This file is the ONLY place you need to edit to change, add or remove a
 *  machine. Every page reads from it: the homepage, the products page, the
 *  comparison table, the menu, the footer, each machine's own page, the enquiry
 *  form, the sitemap and llms.txt. You never need to touch the page code.
 *
 *  ── TO EDIT A MACHINE ───────────────────────────────────────────────────────
 *  Find it below and change the text or numbers. Keep the quotes "..." and the
 *  commas at the end of each line.
 *
 *  ── TO ADD A MACHINE ────────────────────────────────────────────────────────
 *  1. Put its images in the  assets/machines/  folder:
 *       - a cut-out product shot on a transparent or white background, e.g.
 *         ze18gu.png  (shown on cards and at the top of its page)
 *       - optional: a photo of it at work, e.g. ze18gu-site.jpg
 *     The build converts them for the web automatically.
 *  2. Copy one whole machine block below, from its opening {  to its closing },
 *     paste it where you want it in the list, and change every field.
 *  3. Give it a new, unique  slug : that becomes its web address, e.g.
 *     slug: "ze18gu"  →  zoomlion.ie/products/ze18gu/
 *  4. Save, then push to GitHub (or run  npm run dev  to preview locally).
 *
 *  ── TO REMOVE A MACHINE ─────────────────────────────────────────────────────
 *  Delete its whole block, from {  to  },  (including the comma after it).
 *
 *  ── THE ORDER ───────────────────────────────────────────────────────────────
 *  Machines appear on the site in the same order as in this list.
 *
 *  ── FIELDS ──────────────────────────────────────────────────────────────────
 *  slug         Web address, lowercase letters/numbers/dashes only. Must be unique.
 *  model        Model code, e.g. "ZE27GU".
 *  name         Full name shown as the heading, e.g. "ZE27GU Mini Excavator".
 *  type         Machine type shown on the label, e.g. "Mini excavator".
 *  price        Price in euro EXCLUDING VAT, as a plain number with no € sign
 *               and no commas, e.g. 27800. The site adds "€" and "+ VAT".
 *               Use  null  to show "Price on request" instead.
 *  image        File name of the cut-out shot in assets/machines/ (any of
 *               .png .jpg .webp .avif), e.g. "ze27gu.png".
 *  photo        Optional. A photo of the machine at work, shown wide on its
 *               page: { file: "ze55gu-site.jpg", alt: "what the photo shows" }.
 *               Delete the line if there isn't one.
 *  summary      One sentence for cards, search results and social shares.
 *  description  The overview on the machine's page: a list of paragraphs, each
 *               in quotes, separated by commas.
 *  highlights   Key features, one short line each (shown with green ticks).
 *  specs        Specifications, in groups. Each group has a heading and a list
 *               of  "Label": "Value"  rows, exactly as in the brochure:
 *                   specs: {
 *                     "Engine": {
 *                       "Rated power": "11.8 kW @ 2,300 rpm",
 *                     },
 *                   },
 *               Keep the labels "Operating weight" and "Rated power" spelled
 *               like that: the comparison table looks for them.
 *               Only use manufacturer figures (Zoomlion brochure / website).
 *  specSheet    Optional. Link to the brochure or spec sheet PDF. Either a file
 *               you put in  public/spec-sheets/  ("/spec-sheets/name.pdf") or a
 *               full web address ("https://..."). Delete the line if none.
 *  source       Optional. Where the specs came from (not shown on the site).
 *
 *  Text tips: write "2,700 kg" with a comma for thousands; use "m³" and "°" as
 *  normal characters; if your text contains a double quote, write it as \".
 * ============================================================================
 */

// @ts-check: the build checks this file, so a typo (e.g. a price written as
// "27,800" in quotes) stops the build with an error pointing at the line.
/** @type {import("./lib/catalogue").MachineData[]} */
const machines = [
  // ── ZE18GU ─────────────────────────────────────────────────────────────────
  {
    slug: "ze18gu",
    model: "ZE18GU",
    name: "ZE18GU Mini Excavator",
    type: "Mini excavator",
    price: null, // price on request until the dealer sets one
    image: "ze18gu.png",
    photo: { file: "ze18gu-site.jpg", alt: "Zoomlion ZE18GU mini excavator digging a trench on a building site" },
    summary:
      "A 1.8-tonne mini excavator with a Kubota Stage V engine, a 990 / 1,240 mm adjustable undercarriage and 2.3 m dig depth.",
    description: [
      "The Zoomlion ZE18GU is a 1.8-tonne crawler excavator for landscaping, trenching, utilities and other work in confined spaces. Its undercarriage has two widths, 990 mm and 1,240 mm (track gauge 760 / 1,010 mm): narrow to get through gates and between buildings, wide for stability when digging.",
      "Power comes from a Kubota D902 engine rated at 11.8 kW at 2,300 rpm and certified to EU Stage V / Tier 4F. It digs to 2,316 mm, reaches 3,910 mm and dumps at up to 2,429 mm, with 17 kN of bucket digging force, and travels at up to 3.8 km/h.",
    ],
    highlights: [
      "Kubota D902 engine, 11.8 kW, EU Stage V / Tier 4F",
      "Two-width undercarriage: 990 mm or 1,240 mm",
      "17 kN bucket and 10 kN stick digging force",
      "2,316 mm max. digging depth, 3,910 mm max. reach",
      "Two-speed travel: 3.8 / 2.2 km/h",
    ],
    specs: {
      "Basic technical data": {
        "Operating weight": "1,800 kg",
        "Standard bucket capacity": "0.04 m³",
        "Slewing speed": "10 r/min",
        "Travel speed (high / low)": "3.8 / 2.2 km/h",
        "Max. drawbar pull": "18 kN",
        "Bucket digging force": "17 kN",
        "Stick digging force": "10 kN",
      },
      Engine: {
        "Engine": "Kubota D902",
        "Rated power": "11.8 kW @ 2,300 rpm",
        "Displacement": "0.898 L",
        "Emission standard": "EU Stage V / Tier 4F",
      },
      Dimensions: {
        "Length": "3,545 mm",
        "Width": "990 / 1,240 mm",
        "Height": "2,385 mm",
        "Boom length": "1,830 mm",
        "Stick length": "950 mm",
        "Tail slewing radius": "620 mm",
        "Track gauge": "760 / 1,010 mm",
        "Length of track on ground": "1,230 mm",
      },
      "Operating range": {
        "Max. digging reach": "3,910 mm",
        "Max. digging reach at ground level": "3,845 mm",
        "Max. digging depth": "2,316 mm",
        "Max. digging height": "3,542 mm",
        "Max. dumping height": "2,429 mm",
      },
    },
    specSheet: "/spec-sheets/zoomlion-ze18gu-brochure.pdf",
    source: "Zoomlion ZE18GU brochure (2024)",
  },

  // ── ZE27GU ─────────────────────────────────────────────────────────────────
  {
    slug: "ze27gu",
    model: "ZE27GU",
    name: "ZE27GU Mini Excavator",
    type: "Mini excavator",
    price: 27800,
    image: "ze27gu.png",
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
    specs: {
      "Basic technical data": {
        "Operating weight": "2,700 kg",
        "Standard bucket capacity": "0.08 m³",
        "Tail swing": "Zero-tail",
        "Operator protection": "ROPS cab",
      },
      Engine: {
        "Rated power": "15.4 kW @ 2,400 rpm",
      },
      "Operating range": {
        "Max. digging depth": "2,880 mm",
        "Max. dumping height": "4,410 mm",
      },
    },
    specSheet: "https://en-product.zoomlion.com/upload/file/2025/06/25/5626952b31ef454facff0bff8548419f.pdf",
    source: "https://en-product.zoomlion.com/product/pro-detail-105.htm",
  },

  // ── ZE55GU ─────────────────────────────────────────────────────────────────
  {
    slug: "ze55gu",
    model: "ZE55GU",
    name: "ZE55GU Mini Excavator",
    type: "Mini excavator",
    price: 45000,
    image: "ze55gu.png",
    photo: { file: "ze55gu-site.jpg", alt: "Zoomlion ZE55GU excavator digging on a construction site" },
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
    specs: {
      "Basic technical data": {
        "Operating weight": "5,800 kg",
        "Standard bucket capacity": "0.16 m³",
        "Tail swing": "Zero-tail",
      },
      Engine: {
        "Rated power": "35 kW @ 2,200 rpm",
      },
      "Operating range": {
        "Max. digging depth": "3,670 mm",
        "Max. dumping height": "5,560 mm",
      },
    },
    specSheet: "https://en-product.zoomlion.com/upload/file/2025/06/25/fd8ffcf907c642d58760a9b3e2edfe0b.pdf",
    source: "https://en-product.zoomlion.com/product/pro-detail-1036.htm",
  },

  // ── ZS090V ─────────────────────────────────────────────────────────────────
  {
    slug: "zs090v",
    model: "ZS090V",
    name: "ZS090V Skid Steer Loader",
    type: "Skid steer loader",
    price: 34500,
    image: "zs090v.png",
    photo: { file: "zs090v-site.jpg", alt: "Zoomlion ZS090V skid steer loader on a work site" },
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
    specs: {
      "Basic technical data": {
        "Operating weight": "2,998 kg",
        "Rated operating load": "901 kg",
        "Bucket capacity": "0.44 m³",
      },
      Engine: {
        "Rated power": "47.9 kW @ 2,700 rpm (Kubota, EU Stage V)",
      },
      Dimensions: {
        "Width": "1,725 mm",
        "Height": "1,998 mm",
      },
      "Operating range": {
        "Max. discharge height": "2,377 mm",
        "Max. operating height": "3,826 mm",
      },
      Hydraulics: {
        "High-flow hydraulics": "110 L/min (optional)",
      },
    },
    specSheet: "https://en-product.zoomlion.com/upload/file/2025/06/26/1bd26e1cfc8e499a8855f10d88b7c6ce.pdf",
    source: "https://en-product.zoomlion.com/product/pro-detail-128.htm",
  },
];

export default machines;
