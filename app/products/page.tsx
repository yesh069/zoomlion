import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import MachineCard from "@/components/MachineCard";
import PageHero from "@/components/PageHero";
import { MACHINES, formatPrice, specValue } from "@/lib/catalogue";
import { pageMeta } from "@/lib/meta";
import { graph, itemList, webPage } from "@/lib/schema";
import { DEALER } from "@/lib/site";

const TITLE = "Zoomlion Mini Excavators & Skid Steers for Sale in Ireland";
const DESCRIPTION = `Zoomlion ${MACHINES.map((m) => m.model).join(", ")} for sale in Ireland, with prices, specs and spec sheets. Authorised dealer ${DEALER.name}, Co. Cork.`;

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
        title="Zoomlion machines"
      >
        <p>
          Zoomlion mini excavators and skid steer loaders for sale in Ireland, with prices. Every machine comes with delivery, finance
          options, servicing and genuine parts from {DEALER.name} in Co. Cork.
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MACHINES.map((m, i) => (
            <MachineCard key={m.slug} machine={m} priority={i < 3} />
          ))}
        </div>

        {/* Quick comparison: answer engines and buyers both like a table. */}
        <h2 className="display mt-20 text-4xl text-graphite">Compare at a glance</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-graphite font-display text-lg uppercase text-graphite">
                <th scope="col" className="px-4 py-3">Model</th>
                <th scope="col" className="px-4 py-3">Type</th>
                <th scope="col" className="px-4 py-3">Operating weight</th>
                <th scope="col" className="px-4 py-3">Rated power</th>
                <th scope="col" className="px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {MACHINES.map((m) => (
                <tr key={m.slug} className="border-b border-line odd:bg-paper">
                  <th scope="row" className="px-4 py-3.5 font-semibold text-graphite">Zoomlion {m.model}</th>
                  <td className="px-4 py-3.5 text-steel">{m.type}</td>
                  <td className="px-4 py-3.5 text-steel">{specValue(m, "Operating weight")}</td>
                  <td className="px-4 py-3.5 text-steel">{specValue(m, "Rated power")}</td>
                  <td className="px-4 py-3.5 font-semibold text-graphite">{formatPrice(m.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CtaBand title="Not sure which machine?" />
    </>
  );
}
