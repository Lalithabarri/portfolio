import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile, siteDescription, siteTitle } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// The two site font families. Their CSS variables feed --font-serif and
// --font-sans in globals.css.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Production origin from lib/site-url.ts (Lalitha_Barri_WEBSITE_URL, server-only).
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: `%s · ${profile.name}`,
  },
  description: siteDescription,
  authors: [{ name: profile.name }],
  // Site-wide defaults only. Canonical URLs are set per page (via
  // pageMetadata) — never here, or every page would inherit "/".
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${dmSans.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
