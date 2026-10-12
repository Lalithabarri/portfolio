import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-url";
import { Icon } from "@/components/icons";
import { ProjectIllustration } from "@/components/illustrations";
import { LegacyBankWalkthrough } from "@/components/legacybank-walkthrough";
import { PageIntro } from "@/components/page-intro";
import { projects } from "@/content/projects";
import { profile } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  path: "/work",
  title: "Work",
  socialTitle: "Work · Lalitha Barri",
  description:
    "Projects by Lalitha Barri: LegacyBank, Quorum, Streamline, Waypoint, and an LSM-tree storage engine — what each does, the problem, what I built, and how it was validated.",
});

export default function WorkPage() {
  return (
    <>
      <PageIntro eyebrow="Work" title="Projects, problems, and how I checked them.">
        <p>
          For each project: what it does, the problem it addresses, what I built, the failures I worked through, and how it was
          validated.
        </p>
      </PageIntro>

      <div className="site-container pb-section">
        <nav aria-label="Projects on this page" className="mb-10">
          <ul className="flex flex-wrap gap-2">
            {projects.map((project) => (
              <li key={project.id}>
                <a
                  href={`#${project.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-paper/80 px-4 text-sm font-medium text-navy transition-colors hover:border-periwinkle hover:bg-wash"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              id={project.id}
              aria-labelledby={`${project.id}-title`}
              className="paper-card scroll-mt-24 overflow-hidden p-6 sm:p-9"
            >
              <header className="grid gap-6 md:grid-cols-[1fr_15rem] md:items-start">
                <div>
                  <p className="eyebrow">{project.dates}</p>
                  <h2 id={`${project.id}-title`} className="mt-2 font-serif text-[clamp(1.75rem,3.5vw,2.3rem)] font-medium leading-tight text-navy">
                    {project.fullName}
                  </h2>
                  <p className="mt-2 font-serif text-lg italic text-action">{project.tagline}</p>
                </div>
                {project.id !== "legacybank" && (
                  <div className="mx-auto w-full max-w-[15rem] rounded-xl bg-wash-soft/70 px-3 py-2">
                    <ProjectIllustration id={project.id} />
                  </div>
                )}
              </header>

              <dl className="mt-7 grid gap-6 md:grid-cols-2">
                <div>
                  <dt className="text-sm font-semibold text-navy">What it does</dt>
                  <dd className="mt-1.5 leading-relaxed text-muted">{project.whatItDoes}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-navy">The problem</dt>
                  <dd className="mt-1.5 leading-relaxed text-muted">{project.problem}</dd>
                </div>
              </dl>

              {project.id === "legacybank" && (
                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-semibold text-navy">Walkthrough</h3>
                  <LegacyBankWalkthrough />
                </div>
              )}

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {project.sections.map((section) => (
                  <section key={section.heading} aria-label={`${project.name}: ${section.heading}`}>
                    <h3 className="text-sm font-semibold text-navy">{section.heading}</h3>
                    <ul className="mt-3 space-y-2.5">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2.5 leading-relaxed text-muted">
                          <span aria-hidden="true" className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-action" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <h3 className="text-sm font-semibold text-navy">Tools</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
                {project.caveat && <p className="mt-5 rounded-lg bg-wash-soft px-4 py-3 text-sm text-muted">{project.caveat}</p>}
                {project.links && project.links.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-4">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-link text-sm">
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Icon name="github" className="size-4" />
          You can also find me on{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-link">
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </div>
    </>
  );
}
