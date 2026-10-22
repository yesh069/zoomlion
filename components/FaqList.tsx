import type { Faq } from "@/lib/catalogue";
import { PlusIcon } from "./icons";

/** Question-and-answer list. Answers stay in the HTML (closed <details>), so crawlers read them. */
export default function FaqList({ faqs, dark = false }: { faqs: Faq[]; dark?: boolean }) {
  return (
    <div className={`divide-y border-y ${dark ? "divide-white/10 border-white/10" : "divide-line border-line"}`}>
      {faqs.map((f, i) => (
        <details key={f.q} className="group" open={i === 0}>
          <summary className={`flex cursor-pointer items-start justify-between gap-6 py-5 ${dark ? "text-white" : "text-graphite"}`}>
            <h3 className="font-display text-xl font-bold leading-snug">{f.q}</h3>
            <PlusIcon className="faq-icon mt-1 size-5 shrink-0 text-lime-deep transition" />
          </summary>
          <p className={`max-w-3xl pb-6 leading-relaxed ${dark ? "text-white/70" : "text-steel"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
