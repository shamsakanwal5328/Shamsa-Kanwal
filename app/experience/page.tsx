import type { Metadata } from "next";
import { Section } from "@/components/Container";
import ExperienceCard, { formatPeriod } from "@/components/ExperienceCard";
import PageHeader from "@/components/PageHeader";
import Timeline from "@/components/Timeline";
import { data } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Internship & Experience",
  description: `Supervised clinical psychology internship and experience of ${data.personal.name}, including training at ${data.experience[0].organization}.`,
  path: "/experience",
});

export default function ExperiencePage() {
  const { experience } = data;

  return (
    <>
      <PageHeader
        eyebrow="Internship & experience"
        title="Clinical and professional experience"
        description="Supervised clinical psychology training in hospital settings. All activities took place under qualified supervision and within the scope of a student role. No patient-identifying information is published."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside aria-labelledby="experience-timeline-title" className="lg:sticky lg:top-24 lg:h-fit">
            <h2 id="experience-timeline-title" className="mb-6 text-xl">
              Timeline
            </h2>
            <Timeline
              label="Experience timeline"
              entries={experience.map((item) => ({
                date: formatPeriod(item),
                title: item.position,
                description: item.organization,
              }))}
            />
          </aside>

          <ul className="space-y-6">
            {experience.map((item) => (
              <li key={item.id}>
                <ExperienceCard experience={item} />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
