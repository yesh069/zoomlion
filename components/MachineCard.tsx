import Link from "next/link";
import { VAT_NOTE, formatAmount, machinePath, type Machine } from "@/lib/catalogue";
import { asset } from "@/lib/asset";
import { ArrowIcon } from "./icons";
import { QuoteButton } from "./QuoteProvider";

export default function MachineCard({ machine: m, priority = false }: { machine: Machine; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col border border-line bg-white transition hover:-translate-y-1 hover:border-graphite/30 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-paper to-white">
        <div className="slab absolute inset-y-0 right-0 w-1/2 bg-lime/25 transition group-hover:bg-lime/40" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(m.image.src)}
          alt={`Zoomlion ${m.name}`}
          width={m.image.width}
          height={m.image.height}
          loading={priority ? "eager" : "lazy"}
          className="relative h-full w-full object-contain p-6 transition duration-300 group-hover:scale-[1.04]"
        />
        <span className="absolute left-0 top-4 bg-graphite px-3 py-1 font-display text-xs font-bold uppercase tracking-widest text-lime">
          {m.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-2xl text-graphite">
            <Link href={machinePath(m)} className="after:absolute after:inset-0">
              {m.name}
            </Link>
          </h3>
          <p className="shrink-0 text-right">
            <span className="display block text-2xl text-lime-deep">{formatAmount(m.price)}</span>
            <span className="block text-xs font-semibold text-steel">{VAT_NOTE}</span>
          </p>
        </div>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-steel">{m.summary}</p>
        <div className="relative z-10 mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="flex items-center gap-1.5 font-display font-bold uppercase tracking-wide text-graphite">
            View machine <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
          </span>
          <QuoteButton machine={m.name} className="font-display font-bold uppercase tracking-wide text-lime-deep hover:text-graphite">
            Enquire
          </QuoteButton>
        </div>
      </div>
    </article>
  );
}
