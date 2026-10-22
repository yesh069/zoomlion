import { DEALER, waLink } from "@/lib/site";
import { btnDark } from "@/lib/ui";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { QuoteButton } from "./QuoteProvider";

export default function CtaBand({ title = "Ready to talk machines?", machine }: { title?: string; machine?: string }) {
  return (
    <section className="relative overflow-hidden bg-lime">
      <div className="slab absolute inset-y-0 right-0 hidden w-2/5 bg-lime-bright lg:block" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="display text-4xl text-ink sm:text-5xl">{title}</h2>
          <p className="mt-3 max-w-xl text-lg text-ink/75">
            Tell us the job and we&apos;ll quote the right Zoomlion machine, with finance options if you need them.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <QuoteButton machine={machine} className={btnDark} />
          <a href={`tel:${DEALER.phone}`} className={`${btnDark} !bg-ink/10 !text-ink hover:!bg-ink/20`}>
            <PhoneIcon /> {DEALER.phoneDisplay}
          </a>
          <a
            href={waLink(machine ? `Hi, I'd like a quote for the Zoomlion ${machine}.` : "Hi, I'm interested in Zoomlion machinery.")}
            className={`${btnDark} !bg-ink/10 !text-ink hover:!bg-ink/20`}
            rel="noopener"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
