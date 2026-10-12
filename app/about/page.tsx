import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-url";
import { ContactSection } from "@/components/contact-section";
import { Icon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { publications } from "@/content/research";
import { about, education, profile, skills } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  socialTitle: "About · Lalitha Barri",
  description:
    "About Lalitha Barri: software engineering and AI interests, education at Stony Brook University and VIT, technical skills, and how to get in touch.",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title={`Hi, I'm ${profile.shortName}.`}>
        <p>{about.professional}</p>
      </PageIntro>

      <div className="site-container pb-section">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
            <h2 className="font-serif text-2xl font-medium text-navy">How I work</h2>
            <p>{about.adaptability}</p>
            <h2 className="pt-4 font-serif text-2xl font-medium text-navy">Outside work</h2>
            <p>{about.personal}</p>
            <p>
              <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1.5">
                <Icon name="file" className="size-4" />
                Download my résumé (PDF)<span className="sr-only">, opens in a new tab</span>
              </a>
            </p>
          </div>

          <section aria-labelledby="education-heading">
            <h2 id="education-heading" className="font-serif text-2xl font-medium text-navy">
              Education
            </h2>
            <ul className="mt-5 space-y-4">
              {education.map((item) => (
                <li key={item.school} className="paper-card p-5 sm:p-6">
                  <h3 className="font-serif text-lg font-medium text-navy">{item.school}</h3>
                  <p className="mt-0.5 text-navy">{item.degreeLabel}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.dates} · {item.location} · GPA {item.gpa}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-navy">Coursework: </span>
                    {item.coursework.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="skills-heading" className="mt-16">
          <h2 id="skills-heading" className="font-serif text-2xl font-medium text-navy">
            Technical skills
          </h2>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <div key={group.group} className="rounded-2xl border border-line bg-paper/70 p-5">
                <dt className="text-sm font-semibold text-navy">{group.group}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="publication-heading" className="mt-16">
          <h2 id="publication-heading" className="font-serif text-2xl font-medium text-navy">
            Publication
          </h2>
          <ul className="mt-4 space-y-2">
            {publications.map((pub) => (
              <li key={pub.title} className="flex items-start gap-3 text-muted">
                <Icon name="book" className="mt-0.5 size-5 shrink-0 text-action" />
                <span>
                  <span className="font-medium text-navy">{pub.title}</span> — {pub.venue} {pub.year}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16">
          <ContactSection />
        </div>
      </div>
    </>
  );
}
