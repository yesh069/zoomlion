import Link from "next/link";
import { categoryPath, machinesIn, type Category } from "@/lib/catalogue";
import { ArrowIcon } from "./icons";
import { asset } from "@/lib/asset";

export default function CategoryTile({ category: c, index }: { category: Category; index: number }) {
  const machines = machinesIn(c.slug);
  const hero = machines[0];
  return (
    <Link
      href={categoryPath(c)}
      className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-graphite p-7 text-white transition hover:bg-ink"
    >
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="slab absolute -right-10 bottom-0 h-2/3 w-3/4 bg-lime/90 transition duration-300 group-hover:w-[85%]" aria-hidden />
      <div className="relative">
        <span className="font-display text-sm font-bold tracking-[0.2em] text-lime">0{index + 1}</span>
        <h3 className="display mt-2 text-4xl">{c.name}</h3>
        <p className="mt-3 max-w-xs text-white/70">{c.summary}</p>
      </div>
      {hero ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(hero.image.src)}
          alt=""
          width={hero.image.width}
          height={hero.image.height}
          loading="lazy"
          className="relative ml-auto h-48 w-auto object-contain drop-shadow-2xl transition duration-300 group-hover:scale-105"
        />
      ) : (
        <p className="relative ml-auto max-w-[12rem] text-right font-display text-xl font-bold uppercase leading-tight text-ink">
          Ask about the range
        </p>
      )}
      <span className="relative mt-4 flex items-center gap-2 font-display font-bold uppercase tracking-wide text-white group-hover:text-lime">
        {machines.length ? `${machines.length} ${machines.length === 1 ? "machine" : "machines"}` : "Enquire"}
        <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
