// =====================================================================
//  PRODUCTION ORIGIN — the one place the site's public address is set.
// =====================================================================
//
// Not configured yet: no production domain exists. Don't put a guessed URL
// here.
//
// Until it is set:
//   • Social-sharing images still work on Vercel: Next.js fills in the
//     deployment's own address (VERCEL_PROJECT_PRODUCTION_URL in
//     production, the branch URL on preview deployments).
//   • No canonical URLs, sitemap or robots file are published.
//
// When the real domain exists (post-deployment task):
//   1. In Vercel → Project → Settings → Environment Variables, add
//      NEXT_PUBLIC_SITE_URL = https://your-real-domain (Production only),
//      then redeploy. `metadataBase` below picks it up automatically.
//   2. Give each page its OWN canonical path in its `metadata` export,
//      e.g. `alternates: { canonical: "/work" }` in app/work/page.tsx.
//      Never point every page at "/".
//   3. Add app/sitemap.ts listing the public routes (and only published,
//      non-draft notes — use getNotes({ publishedOnly: true })), and
//      app/robots.ts pointing at `${siteUrl}/sitemap.xml`.
//   4. Remove any temporary noindex settings if a preview domain used them.

const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** The production origin, or undefined until NEXT_PUBLIC_SITE_URL is set. */
export const siteUrl: URL | undefined = raw ? new URL(raw) : undefined;
