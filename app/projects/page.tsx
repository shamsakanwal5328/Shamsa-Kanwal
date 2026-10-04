import type { Metadata } from "next";
import { Section } from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { data } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Academic Projects",
  description: `Academic projects by ${data.personal.name}: final-year research, a community psychology project and a supervised clinical case report.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Academic projects"
        title="Academic projects"
        description="Assessed academic work completed during my BS Psychology degree. Where a document contains information about participants or patients, it is described here but not published."
      />
      <Section>
        <ul className="grid gap-6 lg:grid-cols-2">
          {data.projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
