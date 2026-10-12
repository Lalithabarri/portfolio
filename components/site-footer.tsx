import { SprigOrnament } from "@/components/botanicals";
import { Icon, type IconName } from "@/components/icons";
import { WatercolorRidge } from "@/components/watercolor";
import { contact, mailto, profile } from "@/content/site";

type FooterLink = { label: string; href: string; icon: IconName; external?: boolean; note?: string };

export const footerLinks: FooterLink[] = [
  { label: "GitHub", href: profile.github, icon: "github", external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin", external: true },
  { label: "Email", href: mailto, icon: "mail" },
  { label: "Résumé", href: profile.resumeHref, icon: "file", external: true, note: "PDF" },
];

export function ProfileLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-1 ${className}`}>
      {footerLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-action"
          >
            <Icon name={link.icon} className="size-[1.1rem]" />
            {link.label}
            {link.external && (
              <span className="sr-only">
                {link.note ? ` (${link.note}, opens in a new tab)` : " (opens in a new tab)"}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

const footerBase = "#dbe6f1"; // matches --color-mist

export function SiteFooter() {
  return (
    <footer className="relative isolate mt-auto">
      <WatercolorRidge
        variant="footer"
        seed={41}
        fade={false}
        baseColor={footerBase}
        className="pointer-events-none block h-24 w-full sm:h-36"
      />
      <div className="bg-mist">
        <div className="site-container flex flex-col gap-3 pb-10 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 font-serif text-lg text-navy">
            <SprigOrnament className="h-7 w-14" />
            {contact.signature}
          </p>
          <ProfileLinks />
        </div>
      </div>
    </footer>
  );
}
