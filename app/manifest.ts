import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { asset } from "@/lib/asset";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Zoomlion IE",
    description: SITE.description,
    start_url: asset("/"),
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#333640",
    icons: [{ src: asset("/icon.svg"), sizes: "any", type: "image/svg+xml" }],
  };
}
