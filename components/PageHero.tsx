import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

/** Dark title band at the top of inner pages. */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-graphite text-white">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="slab absolute inset-y-0 right-0 hidden w-1/4 bg-lime md:block" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 md:pr-[30%]">
        <Breadcrumbs items={crumbs} dark />
        <p className="eyebrow mt-10 text-lime">{eyebrow}</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{children}</div>}
      </div>
    </section>
  );
}
