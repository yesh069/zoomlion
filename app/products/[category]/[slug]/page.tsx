import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import MachineCard from "@/components/MachineCard";
import { QuoteButton } from "@/components/QuoteProvider";
import { CheckIcon, DownloadIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { MACHINES, categoryBySlug, categoryPath, machinePath, machinesIn, type Category, type Faq, type Machine } from "@/lib/catalogue";
import { faqPage, graph, product, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { DEALER, waLink } from "@/lib/site";
import { btnOutline, btnPrimary } from "@/lib/ui";
import { asset } from "@/lib/asset";

type Props = { params: Promise<{ category: string; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => MACHINES.map((m) => ({ category: m.category, slug: m.slug }));

function find(category: string, slug: string) {
  const machine = MACHINES.find((m) => m.category === category && m.slug === slug);
  const cat = categoryBySlug(category);
  return machine && cat ? { machine, cat } : null;
}

const titleFor = (m: Machine) => `Zoomlion ${m.name} for Sale in Ireland`;

/** Questions every machine page answers, plus any written for the machine itself. */
function machineFaqs(m: Machine, c: Category): Faq[] {
  return [
    {
      q: `How much does the Zoomlion ${m.model} cost in Ireland?`,
      a: `The price of the Zoomlion ${m.model} depends on specification, attachments and delivery, so ${DEALER.name} quotes it individually. Request a quote online or call ${DEALER.phoneDisplay} for a written price, with finance options if needed.`,
    },
    {
      q: `Where can I buy the Zoomlion ${m.model} in Ireland?`,
      a: `${DEALER.name}, the authorised Zoomlion distributor at Watergrasshill Business Park, Co. Cork, sells the ${m.model} and delivers it anywhere in Ireland.`,
    },
    {
      q: `Who services the Zoomlion ${m.model}?`,
      a: `${DEALER.name} services and supplies parts for the Zoomlion ${c.singular}s it sells, from its depot in Co. Cork.`,
    },
    ...(m.faqs ?? []),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const found = find(category, slug);
  if (!found) return {};
  const { machine: m } = found;
  const description = `${m.summary} Quotes, finance and service in Ireland.`;
  return pageMeta({ title: titleFor(m), description, path: machinePath(m), absoluteTitle: true, image: { url: m.image.src, width: m.image.width, height: m.image.height } });
}

export default async function MachinePage({ params }: Props) {
  const { category, slug } = await params;
  const found = find(category, slug);
  if (!found) notFound();
  const { machine: m, cat } = found;
  const path = machinePath(m);
  const faqs = machineFaqs(m, cat);
  const related = machinesIn(cat.slug).filter((r) => r.slug !== m.slug).concat(MACHINES.filter((r) => r.category !== cat.slug)).slice(0, 3);

  return (
    <>
      <JsonLd data={graph(webPage(path, titleFor(m), m.summary, "ItemPage"), product(m, cat), faqPage(faqs))} />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products/" },
              { name: cat.name, path: categoryPath(cat) },
              { name: m.model, path },
            ]}
          />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Image */}
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-white sm:min-h-[460px]">
            <div className="slab absolute inset-y-0 right-0 w-3/5 bg-lime/30" aria-hidden />
            <div className="slab absolute inset-y-0 right-0 w-1/4 bg-lime" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(m.image.src)}
              alt={`Zoomlion ${m.name}`}
              width={m.image.width}
              height={m.image.height}
              fetchPriority="high"
              className="relative h-[300px] w-auto object-contain p-4 drop-shadow-2xl sm:h-[420px]"
            />
            <span className="absolute left-0 top-5 bg-graphite px-4 py-1.5 font-display text-sm font-bold uppercase tracking-widest text-lime">
              {cat.name}
            </span>
          </div>

          {/* Summary + actions */}
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-lime-deep">Zoomlion {cat.singular}</p>
            <h1 className="display mt-3 text-5xl text-graphite sm:text-6xl">{m.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-steel">{m.summary}</p>
            <ul className="mt-6 space-y-2.5">
              {m.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-graphite">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center bg-lime text-ink">
                    <CheckIcon className="size-4" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <QuoteButton machine={m.name} className={btnPrimary}>
                Get a quote
              </QuoteButton>
              <a href={waLink(`Hi, I'd like a quote for the Zoomlion ${m.name}.`)} className={btnOutline} rel="noopener">
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href={`tel:${DEALER.phone}`} className={btnOutline}>
                <PhoneIcon /> {DEALER.phoneDisplay}
              </a>
            </div>
            <p className="mt-5 text-sm text-steel">
              Price on request · Finance available · Delivered across Ireland · Sold &amp; serviced by {DEALER.name}
            </p>
          </div>
        </div>
      </section>

      {/* Overview + specs */}
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
          <h2 className="display text-4xl text-graphite">Specifications</h2>
          {m.specs.length ? (
            <table className="mt-5 w-full border-collapse text-left">
              <caption className="sr-only">Zoomlion {m.name} specifications</caption>
              <tbody>
                {m.specs.map((s) => (
                  <tr key={s.label} className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 font-semibold text-graphite">{s.label}</th>
                    <td className="py-3 text-steel">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="mt-5 border-l-4 border-lime bg-paper p-6">
              <p className="text-steel">
                The full manufacturer specification for the Zoomlion {m.model} is available on request. We&apos;ll send it with your
                quote, or ask us any question about lift, reach, weight or dimensions.
              </p>
              <QuoteButton machine={`${m.name} (specification)`} className="mt-4 font-display font-bold uppercase tracking-wide text-graphite underline decoration-lime decoration-2 underline-offset-4">
                Request the spec sheet
              </QuoteButton>
            </div>
          )}
          {m.pdf && (
            <a href={m.pdf} className={`${btnOutline} mt-6`} download>
              <DownloadIcon /> Download spec sheet (PDF)
            </a>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-20">
          <h2 className="display text-4xl text-graphite sm:text-5xl">Zoomlion {m.model}: questions</h2>
          <FaqList faqs={faqs} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="display text-4xl text-graphite">More Zoomlion machines</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <MachineCard key={r.slug} machine={r} />
            ))}
          </div>
        </section>
      )}

      <CtaBand title={`Get a price on the ${m.model}`} machine={m.name} />
    </>
  );
}
