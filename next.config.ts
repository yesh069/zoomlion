import type { NextConfig } from "next";

// Static export: the whole site is plain HTML in out/, served by Firebase Hosting.
// NEXT_PUBLIC_BASE_PATH is "/zoomlion" on github.io and blank on zoomlion.ie.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { inlineCss: true },
};

export default nextConfig;
