import type { Metadata } from "next";
import { SITE } from "./site";

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: SITE.tagline };

/**
 * Page metadata with canonical URL and social cards. Next replaces (not merges)
 * a page's openGraph object, so the share image has to be set on every page.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number };
  absoluteTitle?: boolean;
}): Metadata {
  const images = image ? [image, OG_IMAGE] : [OG_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: SITE.locale, siteName: SITE.name, url: path, title, description, images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}
