import Button from "@/components/Button";
import { ArrowRightIcon } from "@/components/Icons";
import Tag, { TagList } from "@/components/Tag";
import type { ResearchProject } from "@/lib/types";

interface ResearchCardProps {
  project: ResearchProject;
  headingLevel?: "h2" | "h3";
}

export default function ResearchCard({ project, headingLevel: Heading = "h3" }: ResearchCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="border-l-4 border-primary p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <Tag>{project.type}</Tag>
          <Tag tone="neutral">{project.course}</Tag>
        </div>
        <Heading className="mt-4 text-2xl sm:text-[1.75rem]">{project.title}</Heading>
        <p className="mt-4 max-w-3xl text-lg text-ink">{project.summary}</p>
        <p className="mt-2 text-muted">{project.teamContext}</p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {project.keyFigures.map((figure) => (
            <div key={figure.label} className="rounded-md bg-subtle p-4">
              <dt className="text-sm font-semibold uppercase tracking-wider text-muted">{figure.label}</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-primary">{figure.value}</dd>
              <dd className="text-[15px] text-muted">{figure.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <TagList items={project.skills.slice(0, 6)} label="Methods and skills" />
        </div>

        <div className="mt-8">
          <Button href={`/research/${project.slug}`}>
            Read the full study
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </article>
  );
}
