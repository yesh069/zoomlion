import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { NOINDEX } from "@/lib/asset";

export const dynamic = "force-static";

// Search engines and AI assistants are all welcome: being cited by ChatGPT,
// Perplexity, Gemini and Claude is part of how buyers find a dealer now.
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
