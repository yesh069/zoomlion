import type { Metadata } from "next";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { BUYING_FAQS } from "@/lib/faqs";
import { faqPage, graph, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { DEALER, addressLines, waLink } from "@/lib/site";

const TITLE = "Contact Zoomlion Ireland | O'Regan Plant Sales, Cork";
const DESCRIPTION = `Contact ${DEALER.name} about Zoomlion machinery in Ireland. Call ${DEALER.phoneDisplay}, WhatsApp or visit us in Watergrasshill, Co. Cork.`;

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/contact/", absoluteTitle: true });

const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(`${DEALER.name}, ${addressLines.join(", ")}`)}&z=14&output=embed`;

const CONTACT_FAQS = BUYING_FAQS.filter((f) => /buy|deliver|service/i.test(f.q));

export default function ContactPage() {
  const channels = [
    { icon: PhoneIcon, label: "Sales & office", value: DEALER.phoneDisplay, href: `tel:${DEALER.phone}` },
    { icon: PhoneIcon, label: "Mobile", value: DEALER.mobileDisplay, href: `tel:${DEALER.mobile}` },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Message us", href: waLink("Hi, I'm interested in Zoomlion machinery.") },
    { icon: MailIcon, label: "Email", value: DEALER.email, href: `mailto:${DEALER.email}` },
  ];

  return (
    <>
      <JsonLd data={graph(webPage("/contact/", TITLE, DESCRIPTION, "ContactPage"), faqPage(CONTACT_FAQS))} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ]}
        eyebrow="Talk to our sales team"
        title="Contact us"
      >
        <p>
          Zoomlion machinery in Ireland is sold and supported by {DEALER.name} in Watergrasshill, Co. Cork. Send an enquiry, call or
          WhatsApp and we&apos;ll get back to you, usually the same working day.
        </p>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:py-20">
        <div>
          <h2 className="display text-4xl text-graphite">Get in touch</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a href={href} className="group flex items-center gap-4 border border-line p-4 transition hover:border-graphite" rel="noopener">
                  <span className="grid size-11 shrink-0 place-items-center bg-graphite text-lime transition group-hover:bg-lime group-hover:text-ink">
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-steel">{label}</span>
                    <span className="block break-all font-semibold text-graphite">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <address className="mt-8 flex gap-4 border-l-4 border-lime bg-paper p-6 not-italic">
            <PinIcon className="mt-0.5 size-6 shrink-0 text-lime-deep" />
            <div>
              <p className="font-display text-xl font-bold uppercase text-graphite">{DEALER.name}</p>
              {addressLines.map((l) => (
                <p key={l} className="text-steel">{l}</p>
              ))}
              <a href={DEALER.mapsUrl} className="mt-3 inline-block font-semibold text-graphite underline decoration-lime decoration-2 underline-offset-4" rel="noopener">
                Get directions
              </a>
            </div>
          </address>
        </div>

        <div className="border-t-4 border-lime bg-white p-6 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.15)] sm:p-9">
          <h2 className="display text-4xl text-graphite">Send an enquiry</h2>
          <p className="mt-2 text-steel">Quotes, specifications, finance, parts or service: tell us what you need.</p>
          <div className="mt-7">
            <LeadForm source="contact-page" />
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <iframe
          title={`Map: ${DEALER.name}, Watergrasshill, Co. Cork`}
          src={MAP_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[420px] w-full border-0 grayscale-[30%]"
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-20">
        <h2 className="display text-4xl text-graphite sm:text-5xl">Before you get in touch</h2>
        <FaqList faqs={CONTACT_FAQS} />
      </section>
    </>
  );
}
