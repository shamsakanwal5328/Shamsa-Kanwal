import type { Metadata } from "next";
import { Section } from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import { TagList } from "@/components/Tag";
import { data } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `Academic background of ${data.personal.name}: ${data.education[0].degree}, ${data.education[0].institution}, CGPA ${data.education[0].cgpa}. Coursework, research direction and goals.`,
  path: "/about",
});

export default function AboutPage() {
  const { about, education, awards } = data;
  const degree = education[0];

  const facts = [
    { label: "Degree", value: `${degree.degree} (${degree.programme})` },
    { label: "University", value: degree.institution },
    { label: "Session", value: degree.period },
    { label: "Graduation", value: degree.graduation },
    { label: "CGPA", value: degree.cgpa },
    { label: "Credit hours", value: String(degree.creditHours) },
    { label: "Medium of instruction", value: degree.mediumOfInstruction },
  ];

  return (
    <>
      <PageHeader eyebrow="About" title="Academic background" description={about.researchDirection} />

      <Section labelledBy="background-title">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeader id="background-title" title="Background" />
            <div className="space-y-5 text-lg">
              {about.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside aria-labelledby="education-facts-title" className="h-fit rounded-lg border border-border bg-surface p-6">
            <h2 id="education-facts-title" className="text-xl">
              Education
            </h2>
            <dl className="mt-4 divide-y divide-border">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[minmax(0,9rem)_1fr] gap-3 py-3">
                  <dt className="text-[15px] font-semibold text-muted">{fact.label}</dt>
                  <dd className="text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <Section labelledBy="coursework-title" className="border-y border-border bg-subtle">
        <SectionHeader
          id="coursework-title"
          title="Relevant coursework"
          description="Core modules from the BS Psychology programme that underpin my research and clinical training."
        />
        <TagList items={degree.coursework} label="Relevant coursework" />

        <h3 className="mt-10 text-xl">Degree highlights</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
          {degree.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="interests-goals-title">
        <h2 id="interests-goals-title" className="sr-only">
          Interests and goals
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl">Academic interests</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
              {about.academicInterests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl">Academic strengths</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
              {about.academicStrengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl">Academic and career goals</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
              {about.goals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {awards.length > 0 && (
          <div className="mt-12 rounded-lg border border-border bg-surface p-6">
            <h3 className="text-xl">Awards</h3>
            <ul className="mt-3 space-y-3">
              {awards.map((award) => (
                <li key={award.title}>
                  <p className="font-semibold text-primary">
                    {award.title}
                    {award.date && <span className="font-normal text-muted"> · {award.date}</span>}
                  </p>
                  <p className="text-[15px] text-muted">
                    {award.issuer}. {award.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
