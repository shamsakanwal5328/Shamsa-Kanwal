import Link from "next/link";
import { DocumentIcon } from "@/components/Icons";
import { TagList } from "@/components/Tag";
import type { Experience } from "@/lib/types";

interface ExperienceCardProps {
  experience: Experience;
  headingLevel?: "h2" | "h3";
  compact?: boolean;
}

export function formatPeriod({ startDate, endDate }: Pick<Experience, "startDate" | "endDate">): string {
  return endDate ? `${startDate} – ${endDate}` : startDate;
}

function ListBlock({ title, items, Heading }: { title: string; items: string[]; Heading: "h3" | "h4" }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-5">
      <Heading className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">{title}</Heading>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-accent">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceCard({ experience, headingLevel: Heading = "h2", compact = false }: ExperienceCardProps) {
  const SubHeading = Heading === "h2" ? "h3" : "h4";

  return (
    <article id={experience.id} className="rounded-lg border border-border bg-surface p-6">
      <p className="text-sm font-semibold text-secondary">{formatPeriod(experience)}</p>
      <Heading className="mt-1 text-xl sm:text-2xl">{experience.position}</Heading>
      <p className="mt-1 font-semibold text-ink">{experience.organization}</p>
      <p className="text-[15px] text-muted">
        {experience.type}
        {experience.location && ` · ${experience.location}`}
      </p>
      <p className="mt-4 text-ink">{experience.summary}</p>
      {experience.supervision && <p className="mt-2 text-[15px] text-muted">{experience.supervision}.</p>}

      {!compact && (
        <>
          <ListBlock title="Responsibilities and activities" items={experience.responsibilities} Heading={SubHeading} />
          <ListBlock title="Learning outcomes" items={experience.learningOutcomes} Heading={SubHeading} />
          {experience.skills.length > 0 && (
            <div className="mt-5">
              <SubHeading className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-muted">
                Skills developed
              </SubHeading>
              <TagList items={experience.skills} label={`Skills developed at ${experience.organization}`} />
            </div>
          )}
          {experience.scopeNote && (
            <p className="mt-5 border-l-4 border-accent bg-subtle p-3 text-[15px] text-ink">{experience.scopeNote}</p>
          )}
          {experience.evidence.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2" aria-label="Evidence">
              {experience.evidence.map((item) => (
                <li key={item.label} className="inline-flex items-center gap-2 text-[15px]">
                  <DocumentIcon className="text-secondary" />
                  {item.url ? (
                    <Link href={item.url} className="font-semibold text-secondary underline underline-offset-4 hover:text-primary">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-muted">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </article>
  );
}
