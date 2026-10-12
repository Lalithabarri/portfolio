import Link from "next/link";
import { Icon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";
import { mailto, navLinks, profile } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ivory/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="site-container relative flex min-h-16 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-periwinkle bg-paper font-serif text-sm font-semibold text-action transition-colors group-hover:border-action"
          >
            {profile.monogram}
          </span>
          <span className="whitespace-nowrap font-serif text-xl font-medium tracking-tight text-navy">
            {profile.name}
            <span className="sr-only"> home</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <ul className="flex flex-wrap items-center justify-end gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-wash/70 hover:text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-wash/70 hover:text-navy"
              >
                <Icon name="file" className="size-4" />
                Résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <a href={mailto} className="btn btn-primary ml-2 min-h-10 whitespace-nowrap px-4 text-sm">
            <Icon name="mail" className="size-4" />
            Let&apos;s connect
          </a>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
