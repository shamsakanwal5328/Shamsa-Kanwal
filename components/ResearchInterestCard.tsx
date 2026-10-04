import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import type { ResearchInterest } from "@/lib/types";

interface ResearchInterestCardProps {
  interest: ResearchInterest;
  headingLevel?: "h2" | "h3";
  showEvidence?: boolean;
}

export default function ResearchInterestCard({
  interest,
  headingLevel: Heading = "h3",
  showEvidence = false,
}: ResearchInterestCardProps) {
  const SubHeading = Heading === "h2" ? "h3" : "h4";

  return (
    <article id={interest.id} className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
      <span aria-hidden="true" className="mb-4 block h-1 w-10 rounded bg-accent" />
      <Heading className="text-xl">{interest.topic}</Heading>
      <p className="mt-3 text-ink">{interest.description}</p>

      {showEvidence && interest.evidence.length > 0 && (
        <div className="mt-5">
          <SubHeading className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
            Supporting evidence
          </SubHeading>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] marker:text-accent">
            {interest.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {interest.relatedWork.length > 0 && (
        <ul className="mt-auto space-y-1 pt-5">
          {interest.relatedWork.map((work) => (
            <li key={work.url}>
              <Link
                href={work.url}
                className="inline-flex items-start gap-1.5 text-[15px] font-semibold text-secondary underline-offset-4 hover:text-primary hover:underline"
              >
                {work.label}
                <ArrowRightIcon className="mt-1 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
