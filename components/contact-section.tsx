import { DriedSprig, LavenderSprig } from "@/components/botanicals";
import { Icon } from "@/components/icons";
import { ProfileLinks } from "@/components/site-footer";
import { WashBloom, WatercolorRidge } from "@/components/watercolor";
import { contact, mailto, profile } from "@/content/site";

export function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="relative">
      <div className="paper-card px-6 pb-20 pt-10 sm:px-10 sm:pb-24 sm:pt-12">
        <WashBloom seed={31} className="card-decor -right-20 -top-24 hidden w-80 opacity-80 sm:block" />
        <WatercolorRidge variant="card" seed={33} fade={false} className="card-decor inset-x-0 bottom-0 h-16 w-full sm:h-20" />
        <LavenderSprig seed={6} className="card-decor bottom-3 right-[30%] hidden h-24 w-auto md:block" />
        <DriedSprig seed={17} flip className="card-decor -bottom-4 right-3 hidden h-56 w-auto md:block" />
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2
              id="contact-heading"
              className="mt-3 font-serif text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.05] tracking-tight text-navy"
            >
              {contact.heading}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{contact.body}</p>
            <a href={mailto} className="btn btn-primary mt-7">
              {contact.cta}
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          </div>
          <div className="md:border-l md:border-line md:pl-8 md:pr-20">
            <a
              href={mailto}
              className="inline-flex min-h-11 items-center gap-2 break-all text-[0.95rem] font-semibold text-action hover:text-action-strong"
            >
              <Icon name="mail" className="size-5 shrink-0" />
              {profile.email}
            </a>
            <ProfileLinks className="mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
