import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import DataTable from "@/components/DataTable";
import EvidenceNote from "@/components/EvidenceNote";
import { CheckIcon, DocumentIcon, MinusIcon } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import ResearchWorkflow from "@/components/ResearchWorkflow";
import Tag, { TagList } from "@/components/Tag";
import { absoluteUrl, data, getResearchBySlug } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return data.research.map((project) => ({ slug: project.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getResearchBySlug((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.shortTitle,
    description: project.metaDescription,
    path: `/research/${project.slug}`,
    type: "article",
  });
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Question & objectives" },
  { id: "background", label: "Background" },
  { id: "methodology", label: "Methodology" },
  { id: "variables", label: "Variables & instruments" },
  { id: "analysis", label: "Analysis & results" },
  { id: "findings", label: "Findings" },
  { id: "conclusion", label: "Conclusion & limitations" },
  { id: "reflection", label: "Reflection" },
  { id: "skills", label: "Skills developed" },
  { id: "report", label: "Research report" },
] as const;

function DetailSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="mb-5 text-2xl sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="space-y-4 text-lg">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-accent">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-xl">{children}</h3>;
}

export default async function ResearchDetailPage({ params }: PageProps) {
  const project = getResearchBySlug((await params).slug);
  if (!project) notFound();

  const { methodology, results } = project;

  const overviewFacts = [
    { label: "Research type", value: project.type },
    { label: "Course", value: project.course },
    { label: "Institution", value: project.institution },
    { label: "Supervisor", value: project.supervisor },
    { label: "Status", value: project.status },
    { label: "Team", value: project.teamContext },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    abstract: project.summary,
    genre: "Undergraduate research project",
    url: absoluteUrl(`/research/${project.slug}`),
    dateCreated: project.year,
    inLanguage: "en",
    keywords: project.keywords.join(", "),
    author: { "@type": "Person", name: data.personal.name },
    sourceOrganization: { "@type": "CollegeOrUniversity", name: data.education[0].institution },
  };

  return (
    <>
      <JsonLd data={schema} />

      <header className="border-b border-border bg-surface">
        <Container className="animate-fade-up py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-5 text-[15px]">
            <ol className="flex flex-wrap items-center gap-2 text-muted">
              <li>
                <Link href="/research" className="text-secondary underline-offset-4 hover:underline">
                  Research
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{project.shortTitle}</li>
            </ol>
          </nav>
          <div className="flex flex-wrap gap-2">
            <Tag>{project.type}</Tag>
            <Tag tone="neutral">{project.year}</Tag>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl sm:text-4xl lg:text-[2.75rem]">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-muted">{project.summary}</p>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <nav aria-label="On this page" className="print-hidden mb-10 lg:mb-0">
            <div className="rounded-lg border border-border bg-surface p-4 lg:sticky lg:top-24">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">On this page</p>
              <ol className="grid grid-cols-1 gap-0.5 text-[15px] sm:grid-cols-2 lg:grid-cols-1">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded px-2 py-1.5 text-secondary hover:bg-subtle hover:text-primary"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="min-w-0 max-w-3xl">
            <DetailSection id="overview" title="Research overview">
              <dl className="grid gap-4 sm:grid-cols-3">
                {project.keyFigures.map((figure) => (
                  <div key={figure.label} className="rounded-md border border-border bg-surface p-4">
                    <dt className="text-sm font-semibold uppercase tracking-wider text-muted">{figure.label}</dt>
                    <dd className="mt-1 font-serif text-2xl font-semibold text-primary">{figure.value}</dd>
                    <dd className="text-[15px] text-muted">{figure.detail}</dd>
                  </div>
                ))}
              </dl>
              <dl className="divide-y divide-border rounded-lg border border-border bg-surface px-5 text-base">
                {overviewFacts.map((fact) => (
                  <div key={fact.label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="font-semibold text-muted">{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </DetailSection>

            <DetailSection id="objectives" title="Research question and objectives">
              {project.researchQuestion && (
                <p className="border-l-4 border-primary bg-surface p-4 font-serif text-xl text-primary">
                  {project.researchQuestion}
                </p>
              )}
              <SubHeading>Objectives</SubHeading>
              <BulletList items={project.objectives} />
              <SubHeading>Hypotheses</SubHeading>
              <ul className="space-y-3">
                {project.hypotheses.map((hypothesis) => {
                  const supported = hypothesis.outcome === "Supported";
                  return (
                    <li key={hypothesis.id} className="rounded-md border border-border bg-surface p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-semibold text-primary">{hypothesis.id}</span>
                        <Tag tone={supported ? "success" : "neutral"}>
                          {supported ? <CheckIcon /> : <MinusIcon />}
                          {hypothesis.outcome}
                        </Tag>
                      </div>
                      <p className="mt-2 text-base">{hypothesis.text}</p>
                    </li>
                  );
                })}
              </ul>
            </DetailSection>

            <DetailSection id="background" title="Background">
              {project.background.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </DetailSection>

            <DetailSection id="methodology" title="Methodology">
              <dl className="space-y-4">
                {[
                  { label: "Approach", value: methodology.approach },
                  { label: "Design", value: methodology.design },
                  { label: "Sampling", value: methodology.sampling },
                  { label: "Participants", value: methodology.participants },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="font-semibold text-primary">{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <SubHeading>Inclusion criteria</SubHeading>
                  <div className="mt-2 text-base">
                    <BulletList items={methodology.inclusionCriteria} />
                  </div>
                </div>
                <div>
                  <SubHeading>Exclusion criteria</SubHeading>
                  <div className="mt-2 text-base">
                    <BulletList items={methodology.exclusionCriteria} />
                  </div>
                </div>
              </div>
              <SubHeading>Data collection</SubHeading>
              <p>{methodology.dataCollection}</p>
              <SubHeading>Ethical considerations</SubHeading>
              <BulletList items={methodology.ethics} />
              <SubHeading>Research workflow</SubHeading>
              <div className="text-base">
                <ResearchWorkflow steps={project.workflow} />
              </div>
            </DetailSection>

            <DetailSection id="variables" title="Variables and instruments">
              <DataTable
                caption="Study variables"
                headers={["Variable", "Role", "Measured by"]}
                rows={project.variables.map((variable) => [variable.name, variable.role, variable.measure])}
              />
              <DataTable
                caption="Instruments"
                headers={["Instrument", "Items", "Measures", "Source"]}
                rows={project.instruments.map((instrument) => [
                  instrument.abbreviation ? `${instrument.name} (${instrument.abbreviation})` : instrument.name,
                  instrument.items > 0 ? instrument.items : "—",
                  instrument.measures,
                  instrument.citation || "—",
                ])}
              />
            </DetailSection>

            <DetailSection id="analysis" title="Analysis and results">
              <p>
                Data were analysed in <strong>{project.analysis.software}</strong> using:
              </p>
              <BulletList items={project.analysis.procedures} />
              <DataTable
                caption={`Descriptive statistics (N = ${results.correlation.n})`}
                headers={["Scale", "N", "Min", "Max", "Mean", "SD"]}
                rows={results.descriptives.map((row) => [row.measure, row.n, row.min, row.max, row.mean, row.sd])}
              />
              <DataTable
                caption="Internal consistency reliability"
                headers={["Scale", "Items (k)", "Cronbach's α"]}
                rows={results.reliability.map((row) => [row.scale, row.items, row.alpha])}
              />
              <DataTable
                caption="Pearson correlation"
                headers={["Variables", "N", "r", "p"]}
                rows={[[results.correlation.variables, results.correlation.n, results.correlation.r, results.correlation.p]]}
                note="Correlation is significant at the 0.01 level."
              />
              <DataTable
                caption="Independent samples t-test: men (n = 100) vs women (n = 100)"
                headers={["Measure", "t", "p", "Result"]}
                rows={results.groupComparisons.map((row) => [
                  row.measure,
                  row.t,
                  row.p,
                  row.significant ? "Significant difference" : "No significant difference",
                ])}
              />
            </DetailSection>

            <DetailSection id="findings" title="Findings">
              <BulletList items={project.findings} />
            </DetailSection>

            <DetailSection id="conclusion" title="Conclusion and limitations">
              <p>{project.conclusion}</p>
              <SubHeading>Limitations</SubHeading>
              <BulletList items={project.limitations} />
              <SubHeading>Implications</SubHeading>
              <BulletList items={project.implications} />
            </DetailSection>

            <DetailSection id="reflection" title="Reflection">
              <p>{project.reflection}</p>
            </DetailSection>

            <DetailSection id="skills" title="Skills developed">
              <TagList items={project.skills} label="Skills developed through this research" />
              <SubHeading>My contribution</SubHeading>
              <p className="text-base text-muted">{project.teamContext}</p>
              <BulletList items={project.role} />
            </DetailSection>

            <DetailSection id="report" title="Research report and documents">
              {project.documents.length > 0 && (
                <ul className="space-y-3">
                  {project.documents.map((document) => (
                    <li key={document.url} className="flex gap-3 rounded-md border border-border bg-surface p-4">
                      <DocumentIcon className="mt-1 shrink-0 text-xl text-secondary" />
                      <div>
                        <a
                          href={document.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-secondary underline underline-offset-4 hover:text-primary"
                        >
                          {document.label}
                          <span className="sr-only"> ({document.type}, opens in a new tab)</span>
                        </a>
                        <span className="ml-2 text-sm text-muted">{document.type}</span>
                        <p className="mt-1 text-base text-muted">{document.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {project.reportNote && (
                <div className="text-base">
                  <EvidenceNote>
                    {project.reportNote}{" "}
                    <Link href="/contact" className="font-semibold text-secondary underline underline-offset-4">
                      Request the report
                    </Link>
                  </EvidenceNote>
                </div>
              )}
            </DetailSection>
          </article>
        </div>
      </Container>
    </>
  );
}
