import type { Metadata } from "next";
import { Section } from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ResearchInterestCard from "@/components/ResearchInterestCard";
import { data } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Research Interests",
  description: `Research interests of ${data.personal.name}: ${data.researchInterests.map((interest) => interest.topic.toLowerCase()).join("; ")}.`,
  path: "/research-interests",
});

export default function ResearchInterestsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research interests"
        title="Research interests"
        description={data.about.researchDirection}
      />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          {data.researchInterests.map((interest) => (
            <li key={interest.id}>
              <ResearchInterestCard interest={interest} headingLevel="h2" showEvidence />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
