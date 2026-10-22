import type { Metadata } from "next";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import MachineCard from "@/components/MachineCard";
import { QuoteButton } from "@/components/QuoteProvider";
import { ArrowIcon, EuroIcon, GlobeIcon, PinIcon, ShieldIcon, TruckIcon, WrenchIcon } from "@/components/icons";
import { CATEGORIES, MACHINES } from "@/lib/catalogue";
import { BUYING_FAQS } from "@/lib/faqs";
import { faqPage, graph, itemList, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { DEALER, SITE, ZOOMLION_FACTS } from "@/lib/site";
import { btnOutline, btnOutlineLight, btnPrimary } from "@/lib/ui";
import { asset } from "@/lib/asset";

export const metadata: Metadata = pageMeta({
  title: "Zoomlion Ireland | Telehandlers, Aerial Platforms & Machinery for Sale",
  description: SITE.description,
  path: "/",
  absoluteTitle: true,
});

const featured = MACHINES.filter((m) => m.featured);
const heroMain = featured[0];

const DEALER_POINTS = [
  { icon: PinIcon, title: "Irish dealer, Cork depot", text: "Talk to people who know the machines, at Watergrasshill Business Park, just off the M8." },
  { icon: EuroIcon, title: "Finance options", text: "Hire purchase and leasing for business customers, quoted alongside the machine." },
  { icon: WrenchIcon, title: "Parts & service", text: "Servicing, genuine parts and after-sales support for every Zoomlion we supply." },
  { icon: TruckIcon, title: "Delivered nationwide", text: "Delivery and handover to your site or yard, anywhere in Ireland." },
];

const STEPS = [
  { title: "Tell us the job", text: "What you lift, reach or dig, the site and the attachments you need." },
  { title: "Get your quote", text: "A written price for the right Zoomlion machine, with finance options if you want them." },
  { title: "Delivery & handover", text: "We deliver, walk your operators through the machine, and support it afterwards." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={graph(webPage("/", SITE.name, SITE.description), itemList(featured), faqPage(BUYING_FAQS))} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-graphite text-white">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="slab absolute inset-y-0 right-0 hidden w-[46%] bg-lime lg:block" aria-hidden />
        <div className="slab absolute inset-y-0 right-[40%] hidden w-[10%] bg-lime/15 lg:block" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:min-h-[640px] lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow text-lime">Authorised Zoomlion distributor · Ireland</p>
            <h1 className="display mt-5 text-[3.2rem] sm:text-7xl xl:text-[5.5rem]">
              Zoomlion power.
              <br />
              <span className="text-lime">Irish support.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Zoomlion telehandlers, aerial work platforms and construction machinery for sale in Ireland, supplied, financed and
              serviced by <strong className="font-semibold text-white">{DEALER.name}</strong> from Watergrasshill, Co. Cork.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/products/" className={btnPrimary}>
                Browse products <ArrowIcon />
              </Link>
              <QuoteButton className={btnOutlineLight} />
            </div>
          </div>

          <div className="relative mx-auto h-[340px] w-full max-w-lg sm:h-[440px]">
            {heroMain && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset(heroMain.image.src)}
                alt={`Zoomlion ${heroMain.name}`}
                width={heroMain.image.width}
                height={heroMain.image.height}
                fetchPriority="high"
                className="absolute bottom-0 left-1/2 h-[92%] w-auto -translate-x-1/2 object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]"
              />
            )}
          </div>
        </div>

        {/* Key facts strip */}
        <div className="relative border-t border-white/10 bg-night/80">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
            {ZOOMLION_FACTS.map((f, i) => (
              <div key={f.label} className={`py-6 ${i % 2 ? "pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""}`}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="display text-4xl text-lime">{f.value}</dd>
                <dd className="mt-1 text-sm text-white/65">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-lime-deep">The range</p>
            <h2 className="display mt-3 text-5xl text-graphite sm:text-6xl">Shop by machine type</h2>
          </div>
          <p className="max-w-md text-steel">
            Zoomlion builds machinery for construction, access and agriculture. These are the lines we supply in Ireland.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <CategoryTile key={c.slug} category={c} index={i} />
          ))}
        </div>
      </section>

      {/* Featured machines */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-lime-deep">Featured</p>
              <h2 className="display mt-3 text-5xl text-graphite sm:text-6xl">Machines in focus</h2>
            </div>
            <Link href="/products/" className={btnOutline}>
              All products <ArrowIcon />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((m) => (
              <MachineCard key={m.slug} machine={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Zoomlion */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="eyebrow text-lime">Why Zoomlion</p>
            <h2 className="display mt-3 text-5xl sm:text-6xl">One of the world&apos;s largest machinery makers</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-white/75">
            <p>
              Zoomlion Heavy Industry was founded in 1992 in Changsha, China, and is listed on the Shenzhen and Hong Kong stock
              exchanges. It designs and builds cranes, aerial work platforms, telehandlers, earthmoving, concrete and agricultural
              machinery for customers in more than 170 countries and regions.
            </p>
            <p>
              In Europe, Zoomlion&apos;s group includes long-established engineering brands such as CIFA in Italy and Wilbert and m-tec
              in Germany. That scale shows in the machines: modern cabs, strong steel structures and competitive pricing.
            </p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <div className="flex gap-3 border-l-4 border-lime bg-white/5 p-5">
                <GlobeIcon className="size-7 shrink-0 text-lime" />
                <p className="text-base">A global manufacturer behind every machine</p>
              </div>
              <div className="flex gap-3 border-l-4 border-lime bg-white/5 p-5">
                <ShieldIcon className="size-7 shrink-0 text-lime" />
                <p className="text-base">Manufacturer warranty, backed locally in Ireland</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why buy from O'Regan */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow text-lime-deep">Your Zoomlion dealer</p>
          <h2 className="display mt-3 text-5xl text-graphite sm:text-6xl">Bought in Ireland, backed in Ireland</h2>
          <p className="mt-5 text-lg leading-relaxed text-steel">
            {DEALER.name} is the authorised Zoomlion distributor in Ireland. We have sold and hired plant machinery from Co. Cork for
            years, and we stay with you after the sale.
          </p>
        </div>
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {DEALER_POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white p-7">
              <span className="grid size-12 place-items-center bg-lime text-ink">
                <Icon />
              </span>
              <h3 className="display mt-5 text-2xl text-graphite">{title}</h3>
              <p className="mt-2 leading-relaxed text-steel">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <p className="eyebrow text-lime-deep">How buying works</p>
          <h2 className="display mt-3 text-5xl text-graphite sm:text-6xl">Three steps to your machine</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative bg-white p-8">
                <span className="display absolute right-6 top-4 text-7xl text-lime/40" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="display relative text-2xl text-graphite">{s.title}</h3>
                <p className="relative mt-3 leading-relaxed text-steel">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-28">
        <div>
          <p className="eyebrow text-lime-deep">FAQ</p>
          <h2 className="display mt-3 text-5xl text-graphite sm:text-6xl">Buying Zoomlion in Ireland</h2>
          <p className="mt-5 text-steel">
            Can&apos;t find your answer? <Link href="/contact/" className="font-semibold text-graphite underline decoration-lime decoration-2 underline-offset-4">Contact our sales team</Link>.
          </p>
        </div>
        <FaqList faqs={BUYING_FAQS} />
      </section>

      <CtaBand />
    </>
  );
}
