import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import MachineCard from "@/components/MachineCard";
import PageHero from "@/components/PageHero";
import { QuoteButton } from "@/components/QuoteProvider";
import { CATEGORIES, categoryBySlug, categoryPath, machinesIn } from "@/lib/catalogue";
import { faqPage, graph, itemList, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { DEALER } from "@/lib/site";
import { btnPrimary } from "@/lib/ui";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ category: c.slug }));

const titleFor = (name: string) => `Zoomlion ${name} for Sale in Ireland`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = categoryBySlug((await params).category);
  if (!c) return {};
  const description = `${c.summary} Authorised Irish dealer in Co. Cork: quotes, finance and service.`;
  return pageMeta({ title: titleFor(c.name), description, path: categoryPath(c), absoluteTitle: true });
}

export default async function CategoryPage({ params }: Props) {
  const c = categoryBySlug((await params).category);
  if (!c) notFound();
  const machines = machinesIn(c.slug);
  const path = categoryPath(c);

  return (
    <>
      <JsonLd data={graph(webPage(path, titleFor(c.name), c.summary, "CollectionPage"), itemList(machines), faqPage(c.faqs))} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          { name: c.name, path },
        ]}
        eyebrow="Zoomlion range"
        title={c.name}
      >
        <p>{c.intro}</p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-display font-bold uppercase tracking-wide text-steel">Used for</span>
          {c.uses.map((u) => (
            <span key={u} className="bg-lime-tint px-3 py-1.5 text-sm font-semibold text-graphite">{u}</span>
          ))}
        </div>

        {machines.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {machines.map((m, i) => (
              <MachineCard key={m.slug} machine={m} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-5 border-l-4 border-lime bg-paper p-8">
            <h2 className="display text-3xl text-graphite">Ask about Zoomlion {c.name.toLowerCase()}</h2>
            <p className="max-w-2xl text-steel">
              We&apos;re adding the {c.name.toLowerCase()} range to the site. Tell us what you need and we&apos;ll come back with the
              models, availability and a price.
            </p>
            <QuoteButton machine={`Zoomlion ${c.singular}`} className={btnPrimary}>
              Enquire now
            </QuoteButton>
          </div>
        )}
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-20">
          <div>
            <p className="eyebrow text-lime-deep">Questions</p>
            <h2 className="display mt-3 text-4xl text-graphite sm:text-5xl">{c.name}: common questions</h2>
            <p className="mt-5 text-steel">
              Other machine types:{" "}
              {CATEGORIES.filter((o) => o.slug !== c.slug).map((o, i, arr) => (
                <span key={o.slug}>
                  <Link href={categoryPath(o)} className="font-semibold text-graphite underline decoration-lime decoration-2 underline-offset-4">
                    {o.name}
                  </Link>
                  {i < arr.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
          <FaqList faqs={c.faqs} />
        </div>
      </section>

      <CtaBand title={`Get a price on ${c.name.toLowerCase()}`} />
    </>
  );
}
