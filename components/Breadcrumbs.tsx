import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbs, graph } from "@/lib/schema";

export type Crumb = { name: string; path: string };

export default function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${dark ? "text-white/60" : "text-steel"}`}>
      <JsonLd data={graph(breadcrumbs(items))} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className={dark ? "text-white" : "text-graphite"}>{c.name}</span>
            ) : (
              <Link href={c.path} className={dark ? "hover:text-lime" : "hover:text-graphite"}>{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
