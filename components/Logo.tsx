import Link from "next/link";
import { asset } from "@/lib/asset";

/** Zoomlion wordmark with the "Ireland" market tag. */
export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Zoomlion Ireland home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/brand/zoomlion-logo.svg")} alt="Zoomlion" width={144} height={48} className="h-10 w-auto sm:h-11" />
      <span className={`display border-l-2 pl-3 text-lg leading-none ${dark ? "border-white/25 text-white" : "border-graphite/20 text-graphite"}`}>
        Ireland
      </span>
    </Link>
  );
}
