import Button from "@/components/Button";
import EvidenceNote from "@/components/EvidenceNote";
import { ArrowRightIcon } from "@/components/Icons";
import Tag, { TagList } from "@/components/Tag";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.id} className="flex h-full flex-col rounded-lg border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{project.category}</Tag>
        <span className="text-sm text-muted">{project.year}</span>
      </div>
      <h2 className="mt-4 text-xl sm:text-2xl">{project.title}</h2>
      <p className="mt-1 text-[15px] font-semibold text-secondary">{project.context}</p>
      <p className="mt-4 text-ink">{project.description}</p>

      <h3 className="mt-5 font-sans text-sm font-semibold uppercase tracking-wider text-muted">Outcome</h3>
      <p className="mt-1 text-ink">{project.outcome}</p>

      <h3 className="mt-5 mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-muted">Skills and tools</h3>
      <TagList items={project.skills} label={`Skills used in ${project.title}`} />

      <div className="mt-auto pt-6">
        {project.link ? (
          <Button href={project.link.url} variant="secondary">
            {project.link.label}
            <ArrowRightIcon />
          </Button>
        ) : (
          project.confidentialityNote && <EvidenceNote>{project.confidentialityNote}</EvidenceNote>
        )}
      </div>
    </article>
  );
}
