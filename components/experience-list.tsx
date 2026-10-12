import { Icon } from "@/components/icons";
import { experience } from "@/content/experience";

// Each role shows organization, role, dates, a plain-English summary and one
// contribution up front. Choices, tools and validation sit in a native
// <details> accordion (keyboard accessible without JavaScript).
export function ExperienceList() {
  return (
    <ol className="flex flex-col gap-4">
      {experience.map((job) => (
        <li key={job.id} className="paper-card overflow-hidden">
          <article aria-labelledby={`${job.id}-org`} className="p-5 sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-10">
              <header className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-wash-soft text-action"
                >
                  <Icon name={job.icon} className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 id={`${job.id}-org`} className="font-serif text-xl font-medium leading-snug text-navy">
                    {job.organization}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-action">{job.role}</p>
                  <p className="mt-2 text-sm text-muted">
                    <time>{job.dates}</time>
                    <span aria-hidden="true"> · </span>
                    <span className="sr-only">, </span>
                    {job.location}
                  </p>
                </div>
              </header>

              <div className="min-w-0 lg:border-l lg:border-line lg:pl-10">
                <p className="text-[1.05rem] leading-relaxed text-navy">{job.summary}</p>
                <p className="mt-3 flex gap-2.5 text-[0.95rem] leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-action" />
                  <span>
                    <span className="sr-only">Highlight: </span>
                    {job.highlight}
                  </span>
                </p>
              </div>
            </div>

            <details className="group mt-5 border-t border-line pt-1 lg:ml-[19.5rem]">
              <summary className="flex min-h-11 items-center justify-between gap-3 rounded-lg text-sm font-semibold text-action hover:text-action-strong">
                <span>
                  Choices, tools &amp; validation
                  <span className="sr-only"> at {job.organization}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-full border border-periwinkle bg-paper transition-transform duration-200 group-open:rotate-45"
                >
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <div className="pb-2 pt-3">
                <dl className="grid gap-4">
                  {job.details.map((detail) => (
                    <div key={detail.label} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                      <dt className="text-sm font-semibold text-navy">{detail.label}</dt>
                      <dd className="text-[0.95rem] leading-relaxed text-muted">{detail.text}</dd>
                    </div>
                  ))}
                </dl>
                {job.note && (
                  <p className="mt-4 rounded-lg bg-wash-soft px-4 py-3 text-sm text-muted">{job.note}</p>
                )}
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Tools used at ${job.organization}`}>
                  {job.tools.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </article>
        </li>
      ))}
    </ol>
  );
}
