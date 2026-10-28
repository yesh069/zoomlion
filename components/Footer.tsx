import Link from "next/link";
import { MACHINES, machinePath } from "@/lib/catalogue";
import { DEALER, addressLines, waLink } from "@/lib/site";
import Logo from "./Logo";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="grid-bg bg-night text-white/70">
      <div className="h-1.5 bg-lime" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo dark />
          <p className="mt-6 max-w-sm leading-relaxed">
            Zoomlion machinery for sale in Ireland. Supplied, delivered and serviced by {DEALER.name}, authorised Zoomlion distributor, from
            Watergrasshill, Co. Cork.
          </p>
        </div>

        <div>
          <h2 className="eyebrow text-white">Products</h2>
          <ul className="mt-5 space-y-2.5">
            {MACHINES.map((m) => (
              <li key={m.slug}>
                <Link href={machinePath(m)} className="hover:text-lime">
                  {m.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products/" className="hover:text-lime">
                All products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-white">Company</h2>
          <ul className="mt-5 space-y-2.5">
            <li>
              <Link href="/" className="hover:text-lime">Home</Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-lime">Contact us</Link>
            </li>
            <li>
              <a href={DEALER.url} className="hover:text-lime" rel="noopener">
                {DEALER.name}
              </a>
            </li>
            <li>
              <a href="https://en.zoomlion.com/" className="hover:text-lime" rel="noopener">
                Zoomlion global
              </a>
            </li>
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="eyebrow text-white">Sales &amp; service</h2>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-lime" />
              <a href={DEALER.mapsUrl} className="hover:text-lime" rel="noopener">
                {DEALER.name}
                <br />
                {addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </a>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="size-5 shrink-0 text-lime" />
              <a href={`tel:${DEALER.phone}`} className="hover:text-lime">{DEALER.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="size-5 shrink-0 text-lime" />
              <a href={waLink("Hi, I'm interested in Zoomlion machinery.")} className="hover:text-lime" rel="noopener">
                WhatsApp {DEALER.mobileDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="size-5 shrink-0 text-lime" />
              <a href={`mailto:${DEALER.email}`} className="break-all hover:text-lime">{DEALER.email}</a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-white/50 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {DEALER.name}. Zoomlion and the Zoomlion logo are trademarks of Zoomlion Heavy Industry Science &amp; Technology Co., Ltd.</p>
          <p>zoomlion.ie</p>
        </div>
      </div>
    </footer>
  );
}
