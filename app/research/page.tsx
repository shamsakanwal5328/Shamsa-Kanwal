import type { Metadata } from "next";
import { Section } from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ResearchCard from "@/components/ResearchCard";
import ResearchWorkflow from "@/components/ResearchWorkflow";
import SectionHeader from "@/components/SectionHeader";
import Timeline from "@/components/Timeline";
import { data, getFeaturedResearch } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

const featured = getFeaturedResearch();

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description: featured.metaDescription,
  path: "/research",
});

export default function ResearchPage() {
  const otherResearch = data.research.filter((project) => project.slug !== featured.slug);

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Research experience"
        description="My research experience centres on a quantitative final-year study in health psychology, carried from proposal and literature review through data collection, SPSS analysis and a written report."
      />

      <Section labelledBy="featured-title">
        <h2 id="featured-title" className="sr-only">
          Featured research project
        </h2>
        <ResearchCard project={featured} headingLevel="h2" />
        {otherResearch.length > 0 && (
          <ul className="mt-8 grid gap-6">
            {otherResearch.map((project) => (
              <li key={project.slug}>
                <ResearchCard project={project} headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section labelledBy="role-title" className="border-y border-border bg-subtle">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader id="role-title" title="My contribution" description={featured.teamContext} />
            <ul className="list-disc space-y-2 pl-5 text-lg marker:text-accent">
              {featured.role.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-8 text-2xl sm:text-3xl">Project timeline</h2>
            <Timeline entries={featured.timeline} label="Research project timeline" />
          </div>
        </div>
      </Section>

      <Section labelledBy="workflow-title">
        <SectionHeader
          id="workflow-title"
          title="Research process"
          description="The stages followed in the study, from defining the problem to reporting conclusions."
        />
        <ResearchWorkflow steps={featured.workflow} />
      </Section>
    </>
  );
}
