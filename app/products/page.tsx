import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import MachineCard from "@/components/MachineCard";
import PageHero from "@/components/PageHero";
import { ArrowIcon } from "@/components/icons";
import { CATEGORIES, MACHINES, categoryPath, machinesIn } from "@/lib/catalogue";
import { graph, itemList, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { DEALER } from "@/lib/site";

const TITLE = "Zoomlion Machinery for Sale in Ireland | O'Regan Plant Sales";
const DESCRIPTION = `Every Zoomlion machine available in Ireland: ${CATEGORIES.map((c) => c.name.toLowerCase()).join(", ")}. Quotes and finance from ${DEALER.name}.`;

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/products/", absoluteTitle: true });

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={graph(webPage("/products/", TITLE, DESCRIPTION, "CollectionPage"), itemList(MACHINES))} />
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
        ]}
        eyebrow="Products"
        title="Zoomlion machinery"
      >
        <p>
          Zoomlion telehandlers and excavators for sale in Ireland. Every machine is supplied with delivery,
          finance options, servicing and parts from {DEALER.name} in Co. Cork. Prices are quoted to your specification.
        </p>
      </PageHero>

      {/* Category jump links */}
      <nav aria-label="Categories" className="sticky top-[108px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="shrink-0 border border-line px-4 py-2 font-display font-bold uppercase tracking-wide text-graphite hover:border-graphite hover:bg-lime-tint"
            >
              {c.name} <span className="text-steel">({machinesIn(c.slug).length})</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:py-20">
        {CATEGORIES.map((c) => {
          const machines = machinesIn(c.slug);
          return (
            <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-h`} className="scroll-mt-48">
              <div className="flex flex-col gap-4 border-b-2 border-graphite pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 id={`${c.slug}-h`} className="display text-4xl text-graphite sm:text-5xl">{c.name}</h2>
                  <p className="mt-2 max-w-2xl text-steel">{c.summary}</p>
                </div>
                <Link href={categoryPath(c)} className="flex shrink-0 items-center gap-2 font-display font-bold uppercase tracking-wide text-graphite hover:text-lime-deep">
                  About {c.name.toLowerCase()} <ArrowIcon className="size-4" />
                </Link>
              </div>
              {machines.length ? (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {machines.map((m) => (
                    <MachineCard key={m.slug} machine={m} />
                  ))}
                </div>
              ) : (
                <p className="mt-8 border-l-4 border-lime bg-paper p-6 text-steel">
                  We&apos;re adding Zoomlion {c.name.toLowerCase()} to the site.{" "}
                  <Link href="/contact/" className="font-semibold text-graphite underline decoration-lime decoration-2 underline-offset-4">
                    Ask us what&apos;s available now
                  </Link>
                  .
                </p>
              )}
            </section>
          );
        })}
      </div>

      <CtaBand title="Not sure which machine?" />
    </>
  );
}
