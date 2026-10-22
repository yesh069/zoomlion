import type { Metadata } from "next";
import Link from "next/link";
import { btnOutline, btnPrimary } from "@/lib/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-4 py-28 sm:px-6">
      <p className="eyebrow text-lime-deep">Error 404</p>
      <h1 className="display mt-4 text-6xl text-graphite">Page not found</h1>
      <p className="mt-5 text-lg text-steel">That page has moved or doesn&apos;t exist. Try the products page, or get in touch.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/products/" className={btnPrimary}>Browse products</Link>
        <Link href="/contact/" className={btnOutline}>Contact us</Link>
      </div>
    </section>
  );
}
