import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/content/site";
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

const description =
  "Lalitha Barri — software engineer working across full-stack applications, backend services, applied AI, and distributed systems. Open to software engineering and applied AI roles across the USA.";

export const metadata: Metadata = {
  // Production origin: configured in lib/site-url.ts (unset until the real
  // domain exists — see the steps there).
  metadataBase: siteUrl,
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description,
    type: "website",
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
