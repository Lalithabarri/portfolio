import type { Metadata } from "next";
import Link from "next/link";
import { DriedSprig, LavenderSprig } from "@/components/botanicals";
import { ContactSection } from "@/components/contact-section";
import { ExperienceList } from "@/components/experience-list";
import { Icon } from "@/components/icons";
import { BirdIllustration, ProjectIllustration } from "@/components/illustrations";
import { LegacyBankWalkthrough } from "@/components/legacybank-walkthrough";
import { NoteCard } from "@/components/note-card";
import { PhotoViewer } from "@/components/photo-viewer";
import { PortraitFrame } from "@/components/portrait-frame";
import { SectionHeading } from "@/components/section-heading";
import { WashBloom, WatercolorRidge } from "@/components/watercolor";
import { getHomepagePhotos } from "@/content/photography";
import { getProject, projects } from "@/content/projects";
import { publications } from "@/content/research";
import { about, education, hero, interests, profile, siteDescription, siteTitle } from "@/content/site";
import { getLatestPublishedNote } from "@/lib/notes";
import { pageMetadata } from "@/lib/site-url";

export const metadata: Metadata = pageMetadata({ path: "/", socialTitle: siteTitle, description: siteDescription });

export default function HomePage() {
  const legacyBank = getProject("legacybank");
  const secondary = [getProject("quorum"), getProject("streamline")];
  const more = projects.filter((p) => !["legacybank", "quorum", "streamline"].includes(p.id));
  const homepagePhotos = getHomepagePhotos();
  const latestNote = getLatestPublishedNote();
  const [firstName, ...rest] = profile.name.split(" ");

  return (
    <>
      {/* 1. Introduction */}
      <section aria-labelledby="intro-heading" className="relative isolate pb-20 sm:pb-28 lg:pb-32">
        <WashBloom seed={12} className="decor -left-40 -top-32 w-[24rem] opacity-70 sm:w-[30rem]" />
        <div className="site-container grid items-center gap-12 pt-8 sm:pt-12 md:grid-cols-[1.05fr_0.95fr] md:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-14">
          <div className="relative z-10">
            <h1 id="intro-heading">
              <span className="block font-serif text-[clamp(2.75rem,11vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-navy md:text-[clamp(3.6rem,7.6vw,5.6rem)]">
                <span className="md:block">{firstName}</span> <span className="md:block">{rest.join(" ")}</span>
              </span>
              <span className="eyebrow mt-4 block text-[0.8rem] sm:text-sm">{profile.role}</span>
            </h1>
            <p className="mt-5 font-serif text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.22] text-navy">
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-4 max-w-[34rem] text-[1.02rem] leading-relaxed text-muted sm:text-[1.075rem]">{hero.supporting}</p>
            <ul className="mt-5 flex flex-col gap-1.5 text-[0.95rem] text-navy">
              <li className="flex items-start gap-2.5">
                <Icon name="briefcase" className="mt-0.5 size-[1.1rem] shrink-0 text-action" />
                {hero.status}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mapPin" className="mt-0.5 size-[1.1rem] shrink-0 text-action" />
                {hero.location}
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#experience" className="btn btn-primary">
                Explore my experience
                <Icon name="arrowRight" className="size-4" />
              </a>
              <a href="#work" className="btn btn-secondary">
                View my work
              </a>
            </div>
          </div>
          <PortraitFrame preload className="md:mr-6 lg:mr-10" />
        </div>
        <WatercolorRidge variant="hero" seed={3} className="decor inset-x-0 bottom-0 h-24 w-full sm:h-36 lg:h-44" />
        <LavenderSprig seed={9} className="decor bottom-4 left-[3%] hidden h-28 w-auto opacity-80 lg:block" />
      </section>

      {/* 2. Experience — directly after the introduction */}
      <section id="experience" aria-labelledby="experience-heading" className="relative isolate pb-section pt-4">
        <WashBloom seed={18} className="decor -right-48 top-24 hidden w-[26rem] opacity-60 lg:block" />
        <div className="site-container">
          <SectionHeading id="experience-heading" eyebrow="Experience" title="Where I've put that curiosity to work." />
          <ExperienceList />
          <p className="mt-6 text-sm text-muted">
            Full details are in my{" "}
            <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="text-link">
              résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
            .
          </p>
        </div>
      </section>

      {/* 3. Selected work */}
      <section id="work" aria-labelledby="work-heading" className="relative isolate pb-section">
        <WashBloom seed={25} className="decor -left-52 top-40 hidden w-[28rem] opacity-60 lg:block" />
        <div className="site-container">
          <SectionHeading
            id="work-heading"
            eyebrow="Projects"
            title="Selected work"
            aside={
              <Link href="/work" className="text-link inline-flex items-center gap-1.5 text-sm">
                View all work <Icon name="arrowRight" className="size-4" />
              </Link>
            }
          />

          <article aria-labelledby="legacybank-heading" className="paper-card p-6 pb-16 sm:p-8 sm:pb-20">
            <WashBloom seed={7} className="card-decor -right-24 -top-28 hidden w-96 opacity-70 lg:block" />
            <WatercolorRidge variant="card" seed={11} fade={false} className="card-decor inset-x-0 bottom-0 h-12 w-full sm:h-16" />
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
              <div>
                <p className="eyebrow">Featured · {legacyBank.dates}</p>
                <h3 id="legacybank-heading" className="mt-3 font-serif text-3xl font-medium text-navy sm:text-[2.1rem]">
                  {legacyBank.fullName}
                </h3>
                <p className="mt-2 font-serif text-xl italic text-action">{legacyBank.tagline}</p>
                <p className="mt-4 leading-relaxed text-muted">{legacyBank.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
                  {legacyBank.stack.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
                <Link href="/work#legacybank" className="text-link mt-6 inline-flex items-center gap-1.5">
                  Explore the engineering choices <Icon name="arrowRight" className="size-4" />
                </Link>
              </div>
              <div>
                <LegacyBankWalkthrough />
                <p className="mt-3 text-xs leading-relaxed text-muted">{legacyBank.caveat}</p>
              </div>
            </div>
          </article>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {secondary.map((project, i) => (
              <article key={project.id} aria-labelledby={`${project.id}-card`} className="paper-card flex flex-col p-6 pb-14 sm:p-7 sm:pb-16">
                <WatercolorRidge variant="card" seed={13 + i * 4} fade={false} className="card-decor inset-x-0 bottom-0 h-11 w-full sm:h-12" />
                <div className="mx-auto mb-4 w-full max-w-[17rem] rounded-xl border border-line/70 bg-paper/70 px-3 py-2">
                  <ProjectIllustration id={project.id} />
                </div>
                <h3 id={`${project.id}-card`} className="font-serif text-2xl font-medium text-navy">
                  {project.name}
                </h3>
                <p className="mt-1 font-serif italic text-action">{project.tagline}</p>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{project.summary}</p>
                <Link href={`/work#${project.id}`} className="text-link mt-5 inline-flex items-center gap-1.5 self-start text-sm">
                  How it works<span className="sr-only">: {project.name}</span>
                  <Icon name="arrowRight" className="size-4" />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <Link href="/work" className="text-link inline-flex items-center gap-1.5">
              All work <Icon name="arrowRight" className="size-4" />
            </Link>
            <span aria-hidden="true">·</span>
            <span>Also:</span>
            {more.map((project, i) => (
              <span key={project.id} className="inline-flex items-center gap-3">
                <Link
                  href={`/work#${project.id}`}
                  className="font-medium text-navy underline decoration-line underline-offset-4 hover:text-action hover:decoration-current"
                >
                  {project.name}
                </Link>
                {i < more.length - 1 && <span aria-hidden="true">·</span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* 4. Research */}
      <section id="research" aria-labelledby="research-heading" className="relative isolate pb-section">
        <div className="site-container">
          <SectionHeading id="research-heading" eyebrow="Research" title="Publication" />
          <ul className="grid gap-4">
            {publications.map((pub) => (
              <li key={pub.title} className="paper-card flex flex-col gap-5 p-6 pb-14 sm:flex-row sm:items-center sm:p-8 sm:pb-16">
                <WatercolorRidge variant="card" seed={19} fade={false} className="card-decor inset-x-0 bottom-0 h-11 w-full sm:h-12" />
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-wash-soft text-action">
                  <Icon name="book" className="size-6" />
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-medium leading-snug text-navy">{pub.title}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-action">
                    {pub.venue} {pub.year}
                  </p>
                </div>
                <BirdIllustration className="hidden h-24 w-auto shrink-0 sm:block" />
                <DriedSprig seed={36} stems={2} className="hidden h-28 w-auto shrink-0 md:block" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Notebook preview */}
      <section id="notebook" aria-labelledby="notebook-heading" className="relative isolate pb-section">
        <WatercolorRidge variant="section" seed={29} flip className="decor inset-x-0 -top-2 h-16 w-full opacity-70 sm:h-20" />
        <WashBloom seed={33} className="decor -right-44 bottom-10 hidden w-[26rem] opacity-60 lg:block" />
        <div className="site-container pt-10 sm:pt-14">
          <SectionHeading
            id="notebook-heading"
            eyebrow="Notebook & gallery"
            title="Beyond the editor."
            aside={
              <Link href="/notebook" className="text-link inline-flex items-center gap-1.5 text-sm">
                Open the notebook <Icon name="arrowRight" className="size-4" />
              </Link>
            }
          />
          <p className="-mt-3 mb-8 max-w-2xl font-serif text-[clamp(1.2rem,2.2vw,1.45rem)] leading-snug text-navy sm:-mt-4">
            A place for things I build, notice, and learn.
          </p>

          <PhotoViewer
            photos={homepagePhotos}
            label="Selected photographs"
            gridClassName="grid-cols-2 lg:grid-cols-4"
            sizes="(min-width: 1024px) 17rem, 46vw"
          />

          {latestNote && (
            <div className="mt-10 max-w-3xl">
              <h3 className="eyebrow mb-3">Latest note</h3>
              <NoteCard note={latestNote} headingLevel="h3" />
            </div>
          )}

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-2.5" aria-label="Interests">
              {interests.map((interest) => (
                <li key={interest.label} className="flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3.5 py-2 text-sm text-navy">
                  <Icon name={interest.icon} className="size-4 text-action" />
                  {interest.label}
                </li>
              ))}
            </ul>
            <Link href="/notebook" className="btn btn-secondary self-start sm:self-auto">
              See all photographs{latestNote ? " & notes" : ""}
              <Icon name="arrowRight" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. About, education & contact */}
      <section id="about" aria-labelledby="about-heading" className="relative isolate pb-section">
        <div className="site-container">
          <SectionHeading id="about-heading" eyebrow="About & education" title="About me" />
          <div className="grid gap-10 md:grid-cols-[1.35fr_1fr] md:gap-14">
            <div className="space-y-4 text-[1.05rem] leading-relaxed text-muted">
              <p className="text-navy">{about.professional}</p>
              <p>{about.personal}</p>
              <Link href="/about" className="text-link inline-flex items-center gap-1.5 text-base">
                More about me <Icon name="arrowRight" className="size-4" />
              </Link>
            </div>
            <div className="paper-card p-6">
              <h3 className="eyebrow">Education</h3>
              <ul className="mt-4 space-y-4">
                {education.map((item) => (
                  <li key={item.school}>
                    <p className="font-serif text-lg font-medium text-navy">{item.degreeLabel}</p>
                    <p className="text-sm text-muted">
                      {item.shortSchool} · {item.graduated}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-14">
            <ContactSection />
          </div>
        </div>
      </section>
    </>
  );
}
