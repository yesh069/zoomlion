import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import QuoteProvider from "@/components/QuoteProvider";
import Analytics from "@/components/Analytics";
import { dealer, graph, website, zoomlionBrand } from "@/lib/schema";
import { SITE } from "@/lib/site";
import "./globals.css";
import { NOINDEX } from "@/lib/asset";

const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const heading = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Zoomlion Ireland | Telehandlers, Aerial Platforms & Machinery", template: "%s | Zoomlion Ireland" },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { type: "website", locale: SITE.locale, siteName: SITE.name, url: "/", images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.tagline }] },
  twitter: { card: "summary_large_image" },
  robots: NOINDEX
    ? { index: false, follow: false }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  other: { "geo.region": "IE-CO", "geo.placename": "Watergrasshill, Co. Cork" },
};

export const viewport: Viewport = { themeColor: "#333640" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IE" className={`${body.variable} ${heading.variable}`}>
      <body className="font-sans">
        <JsonLd data={graph(website, dealer, zoomlionBrand)} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-lime focus:px-4 focus:py-2 focus:font-semibold">
          Skip to content
        </a>
        <QuoteProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </QuoteProvider>
        <Analytics />
      </body>
    </html>
  );
}
