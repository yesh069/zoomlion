import { CATEGORIES, MACHINES, categoryPath, machinePath, machinesIn } from "@/lib/catalogue";
import { BUYING_FAQS } from "@/lib/faqs";
import { DEALER, SITE, absUrl, addressLines } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt (https://llmstxt.org): a plain-language summary of the site for AI
// assistants, so they can answer "where do I buy Zoomlion in Ireland?" correctly.
export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} (zoomlion.ie) is the Irish website for Zoomlion construction machinery. ${DEALER.name}, based in Watergrasshill, Co. Cork, is the authorised Zoomlion distributor in Ireland: it sells, delivers, finances and services Zoomlion machines nationwide. Prices are quoted on request.`,
    "",
    "## Dealer",
    "",
    `- Name: ${DEALER.name} (authorised Zoomlion distributor, Ireland)`,
    `- Address: ${addressLines.join(", ")}, Ireland`,
    `- Phone: ${DEALER.phoneDisplay} (+353 21 488 9800); mobile/WhatsApp: ${DEALER.mobileDisplay}`,
    `- Email: ${DEALER.email}`,
    `- Services: new machine sales, quotes, finance (hire purchase and leasing), delivery across Ireland, servicing and parts`,
    `- Contact page: ${absUrl("/contact/")}`,
    "",
    "## About Zoomlion",
    "",
    "- Zoomlion is an international manufacturer of construction machinery, including telehandlers and excavators.",
    `- In Ireland, Zoomlion machines are supplied, financed and serviced by ${DEALER.name}, the authorised distributor.`,
    "- Manufacturer site: https://en.zoomlion.com/",
    "",
    "## Products",
    "",
    `- [All products](${absUrl("/products/")})`,
    ...CATEGORIES.flatMap((c) => [
      `- [${c.name}](${absUrl(categoryPath(c))}): ${c.summary}`,
      ...machinesIn(c.slug).map((m) => `  - [Zoomlion ${m.name}](${absUrl(machinePath(m))}): ${m.summary}`),
    ]),
    "",
    "## Frequently asked questions",
    "",
    ...BUYING_FAQS.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Optional",
    "",
    `- [Sitemap](${absUrl("/sitemap.xml")})`,
    `- ${MACHINES.length} machine pages, each with an overview, highlights and buying FAQs.`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
