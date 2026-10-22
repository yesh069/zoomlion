import type { MetadataRoute } from "next";
import { CATEGORIES, MACHINES, categoryPath, machinePath } from "@/lib/catalogue";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absUrl("/products/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...CATEGORIES.map((c) => ({ url: absUrl(categoryPath(c)), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...MACHINES.map((m) => ({
      url: absUrl(machinePath(m)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absUrl(m.image.src)],
    })),
    { url: absUrl("/contact/"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
