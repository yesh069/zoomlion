import { MACHINES, formatPrice, machinePath } from "@/lib/catalogue";
import { BUYING_FAQS } from "@/lib/faqs";
import { DEALER, SITE, absUrl, addressLines } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt (https://llmstxt.org): a plain-language summary of the site for AI
// assistants, so they can answer "where do I buy Zoomlion in Ireland?" correctly.
export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} (zoomlion.ie) is the Irish website for Zoomlion construction machinery. ${DEALER.name}, based in Watergrasshill, Co. Cork, sells, delivers, finances and services Zoomlion machines nationwide. Prices are listed below and on each machine page, excluding VAT.`,
    "",
    "## Dealer",
    "",
    `- Name: ${DEALER.name} (Zoomlion machinery supplier, Ireland)`,
    `- Address: ${addressLines.join(", ")}, Ireland`,
    `- Phone: ${DEALER.phoneDisplay} (+353 21 488 9800); mobile/WhatsApp: ${DEALER.mobileDisplay}`,
    `- Email: ${DEALER.email}`,
    `- Services: new machine sales, quotes, finance (hire purchase and leasing), delivery across Ireland, servicing and parts`,
    `- Contact page: ${absUrl("/contact/")}`,
    "",
    "## About Zoomlion",
    "",
    "- Zoomlion is an international manufacturer of construction machinery, including excavators and skid steer loaders.",
    `- In Ireland, Zoomlion machines are supplied, financed and serviced by ${DEALER.name}.`,
    "- Manufacturer site: https://en.zoomlion.com/",
    "",
    "## Products",
    "",
    `- [All products](${absUrl("/products/")})`,
    ...MACHINES.flatMap((m) => [
      `- [Zoomlion ${m.name}](${absUrl(machinePath(m))}): ${formatPrice(m.price)}. ${m.summary}`,
      ...(m.specSheet ? [`  - Spec sheet: ${m.specSheet.startsWith("/") ? absUrl(m.specSheet) : m.specSheet}`] : []),
      ...m.specs.map((s) => `  - ${s.label}: ${s.value}`),
    ]),
    "",
    "## Frequently asked questions",
    "",
    ...BUYING_FAQS.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Optional",
    "",
    `- [Sitemap](${absUrl("/sitemap.xml")})`,
    `- ${MACHINES.length} machine pages, each with price, overview, key features, specifications and buying FAQs.`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
