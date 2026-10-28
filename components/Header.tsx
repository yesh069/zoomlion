"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MACHINES, formatPrice, machinePath } from "@/lib/catalogue";
import { asset } from "@/lib/asset";
import { DEALER } from "@/lib/site";
import { btnPrimary } from "@/lib/ui";
import Logo from "./Logo";
import { QuoteButton } from "./QuoteProvider";
import { ChevronIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "./icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products/", label: "Products", menu: true },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const path = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-night text-[0.82rem] text-white/75">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <p className="truncate">
            <span className="font-semibold text-lime">Authorised Zoomlion distributor</span>
            <span className="hidden sm:inline"> · {DEALER.name}, Co. Cork</span>
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a href={`tel:${DEALER.phone}`} className="flex items-center gap-1.5 hover:text-white">
              <PhoneIcon className="size-4" />
              {DEALER.phoneDisplay}
            </a>
            <a href={`mailto:${DEALER.email}`} className="hidden items-center gap-1.5 hover:text-white md:flex">
              <MailIcon className="size-4" />
              {DEALER.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {NAV.map((item) =>
              item.menu ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="nav-link flex items-center gap-1 font-display text-[1.05rem] font-bold uppercase tracking-wide text-graphite"
                  >
                    {item.label}
                    <ChevronIcon className="size-4 transition group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-5 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="border-t-4 border-lime bg-white p-2 shadow-xl">
                      {MACHINES.map((m) => (
                        <Link key={m.slug} href={machinePath(m)} className="flex items-center gap-4 px-3 py-2.5 hover:bg-paper">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={asset(m.image.src)} alt="" width={m.image.width} height={m.image.height} className="h-12 w-16 shrink-0 object-contain" />
                          <span>
                            <span className="block font-display text-lg font-bold uppercase leading-tight text-graphite">{m.model}</span>
                            <span className="block text-sm text-steel">
                              {m.type} · <span className="font-semibold text-graphite">{formatPrice(m.price)}</span>
                            </span>
                          </span>
                        </Link>
                      ))}
                      <Link href="/products/" className="mt-1 block bg-paper px-4 py-3 text-sm font-semibold text-graphite hover:bg-lime-tint">
                        View all products →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="nav-link font-display text-[1.05rem] font-bold uppercase tracking-wide text-graphite"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <QuoteButton className={`${btnPrimary} hidden !py-2.5 sm:inline-flex`} />
            <button
              type="button"
              className="grid size-11 place-items-center text-graphite md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpenOn(open ? null : path)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white px-4 pb-6 pt-2 md:hidden">
            {NAV.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block border-b border-line py-3.5 font-display text-xl font-bold uppercase text-graphite"
                >
                  {item.label}
                </Link>
                {item.menu &&
                  MACHINES.map((m) => (
                    <Link key={m.slug} href={machinePath(m)} className="flex justify-between border-b border-line py-3 pl-4 text-steel">
                      {m.name}
                      <span className="font-semibold text-graphite">{formatPrice(m.price)}</span>
                    </Link>
                  ))}
              </div>
            ))}
            <QuoteButton className={`${btnPrimary} mt-5 w-full`} />
          </nav>
        )}
      </div>
    </header>
  );
}
