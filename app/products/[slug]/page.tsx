import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import MachineCard from "@/components/MachineCard";
import { QuoteButton } from "@/components/QuoteProvider";
import { CheckIcon, DownloadIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { asset } from "@/lib/asset";
import { MACHINES, formatAmount, formatPrice, machineBySlug, machinePath, priceNote, specValue, type Faq, type Machine } from "@/lib/catalogue";
import { pageMeta } from "@/lib/meta";
import { faqPage, graph, product, webPage } from "@/lib/schema";
import { DEALER, waLink } from "@/lib/site";
import { btnOutline, btnPrimary } from "@/lib/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => MACHINES.map((m) => ({ slug: m.slug }));

const titleFor = (m: Machine) => `Zoomlion ${m.name} for Sale in Ireland${m.price === null ? "" : ` | ${formatPrice(m.price)}`}`;

/** Questions every machine page answers, plus any written for the machine itself. */
function machineFaqs(m: Machine): Faq[] {
  const kind = m.type.toLowerCase();
  return [
    {
      q: `How much is the Zoomlion ${m.model} in Ireland?`,
      a:
        m.price === null
          ? `The Zoomlion ${m.model} ${kind} is priced on request from ${DEALER.name}. Call ${DEALER.phoneDisplay} or send an enquiry for a written quote, with attachments, delivery and finance options.`
          : `The Zoomlion ${m.model} ${kind} is ${formatPrice(m.price)} from ${DEALER.name}. Attachments, delivery and finance are quoted on request: call ${DEALER.phoneDisplay} or send an enquiry.`,
    },
    {
      q: `Where can I buy the Zoomlion ${m.model} in Ireland?`,
      a: `${DEALER.name} at Watergrasshill Business Park, Co. Cork sells the Zoomlion ${m.model} and delivers it anywhere in Ireland.`,
    },
    {
      q: `What is the operating weight of the Zoomlion ${m.model}?`,
      a: `The Zoomlion ${m.model} has an operating weight of ${specValue(m, "Operating weight") ?? "listed in the spec sheet"}. Full manufacturer figures are in the specifications table and spec sheet on this page.`,
    },
    {
      q: `Who services the Zoomlion ${m.model}?`,
      a: `${DEALER.name} services and supplies genuine parts for the Zoomlion machines it sells, from its depot in Co. Cork.`,
    },
    ...(m.faqs ?? []),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = machineBySlug((await params).slug);
  if (!m) return {};
  return pageMeta({
    title: titleFor(m),
    description: `${m.summary} ${formatPrice(m.price)}, Co. Cork.`.slice(0, 160),
    path: machinePath(m),
    absoluteTitle: true,
    image: { url: m.image.src, width: m.image.width, height: m.image.height },
  });
}

export default async function MachinePage({ params }: Props) {
  const m = machineBySlug((await params).slug);
  if (!m) notFound();
  const path = machinePath(m);
  const faqs = machineFaqs(m);
  const others = MACHINES.filter((o) => o.slug !== m.slug);

  return (
    <>
      <JsonLd data={graph(webPage(path, titleFor(m), m.summary, "ItemPage"), product(m), faqPage(faqs))} />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products/" },
              { name: m.model, path },
            ]}
          />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-white sm:min-h-[460px]">
            <div className="slab absolute inset-y-0 right-0 w-3/5 bg-lime/30" aria-hidden />
            <div className="slab absolute inset-y-0 right-0 w-1/4 bg-lime" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(m.image.src)}
              alt={`Zoomlion ${m.name}`}
              width={m.image.width}
              height={m.image.height}
              fetchPriority="high"
              className="relative max-h-[420px] w-full object-contain p-6 drop-shadow-2xl"
            />
            <span className="absolute left-0 top-5 bg-graphite px-4 py-1.5 font-display text-sm font-bold uppercase tracking-widest text-lime">
              {m.type}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow text-lime-deep">Zoomlion {m.type.toLowerCase()}</p>
            <h1 className="display mt-3 text-5xl text-graphite sm:text-6xl">{m.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-steel">{m.summary}</p>

            <div className="mt-6 flex items-end gap-4 border-l-4 border-lime bg-white px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-steel">{m.price === null ? "Price" : "Price (excl. VAT)"}</p>
                <p className="display text-5xl text-graphite">
                  {formatAmount(m.price)} <span className="font-sans text-lg font-semibold normal-case text-steel">{priceNote(m.price)}</span>
                </p>
              </div>
              <p className="pb-1.5 text-sm text-steel">Finance available · Delivered across Ireland</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <QuoteButton machine={m.name} className={btnPrimary}>
                Enquire now
              </QuoteButton>
              <a href={waLink(`Hi, I'm interested in the Zoomlion ${m.name} (${formatPrice(m.price)}).`)} className={btnOutline} rel="noopener">
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href={`tel:${DEALER.phone}`} className={btnOutline}>
                <PhoneIcon /> {DEALER.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + highlights */}
      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <h2 className="display text-4xl text-graphite">Overview</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-steel">
            {m.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="display text-4xl text-graphite">Key features</h2>
          <ul className="mt-5 space-y-3">
            {m.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-lg text-graphite">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center bg-lime text-ink">
                  <CheckIcon className="size-4" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {m.photo && (
        <figure className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(m.photo.src)}
            alt={m.photo.alt}
            width={m.photo.width}
            height={m.photo.height}
            loading="lazy"
            className="aspect-[21/9] w-full object-cover"
          />
        </figure>
      )}

      {/* Specifications */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display text-4xl text-graphite">Specifications</h2>
            <p className="mt-2 text-steel">Manufacturer figures for the Zoomlion {m.model}.</p>
          </div>
          {m.specSheet && (
            <a href={m.specSheet.startsWith("/") ? asset(m.specSheet) : m.specSheet} className={btnOutline} target="_blank" rel="noopener">
              <DownloadIcon /> Spec sheet (PDF)
            </a>
          )}
        </div>
        <table className="mt-2 w-full border-collapse text-left">
          <caption className="sr-only">Zoomlion {m.name} specifications</caption>
          {m.specGroups.map((g) => (
            <tbody key={g.title}>
              <tr>
                <th scope="colgroup" colSpan={2} className="border-b-2 border-graphite px-4 pb-2 pt-8 font-display text-xl font-bold uppercase text-graphite">
                  {g.title}
                </th>
              </tr>
              {g.rows.map((s) => (
                <tr key={s.label} className="border-b border-line odd:bg-paper">
                  <th scope="row" className="w-1/2 px-4 py-3.5 font-semibold text-graphite">{s.label}</th>
                  <td className="px-4 py-3.5 text-steel">{s.value}</td>
                </tr>
              ))}
            </tbody>
          ))}
          <tbody>
            <tr>
              <th scope="colgroup" colSpan={2} className="border-b-2 border-graphite px-4 pb-2 pt-8 font-display text-xl font-bold uppercase text-graphite">
                Price
              </th>
            </tr>
            <tr className="border-b border-line">
              <th scope="row" className="w-1/2 px-4 py-3.5 font-semibold text-graphite">Price</th>
              <td className="px-4 py-3.5 font-semibold text-graphite">{formatPrice(m.price)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* FAQ */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-20">
          <h2 className="display text-4xl text-graphite sm:text-5xl">Zoomlion {m.model}: questions</h2>
          <FaqList faqs={faqs} />
        </div>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="display text-4xl text-graphite">More Zoomlion machines</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <MachineCard key={o.slug} machine={o} />
            ))}
          </div>
        </section>
      )}

      <CtaBand title={`Interested in the ${m.model}?`} machine={m.name} />
    </>
  );
}
