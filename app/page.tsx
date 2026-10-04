import type { Metadata } from "next";
import AcademicStatCard from "@/components/AcademicStatCard";
import Button from "@/components/Button";
import Container, { Section } from "@/components/Container";
import DownloadButton from "@/components/DownloadButton";
import ExperienceCard from "@/components/ExperienceCard";
import HeroSection from "@/components/HeroSection";
import JsonLd from "@/components/JsonLd";
import ResearchCard from "@/components/ResearchCard";
import ResearchInterestCard from "@/components/ResearchInterestCard";
import SectionHeader from "@/components/SectionHeader";
import { absoluteUrl, data, getContactEmail, getFeaturedResearch, getSocialLinks } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Home", description: data.site.description, path: "/", type: "profile" }),
  title: { absolute: data.site.title },
};

export default function HomePage() {
  const featured = getFeaturedResearch();
  const { personal, education, academicSnapshot, researchInterests, experience, contact, cv, about } = data;
  const email = getContactEmail();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    url: absoluteUrl(),
    description: data.site.description,
    ...(email && { email: `mailto:${email}` }),
    alumniOf: { "@type": "CollegeOrUniversity", name: education[0].institution },
    knowsAbout: about.academicInterests,
    sameAs: getSocialLinks().map((link) => link.url),
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <HeroSection />

      <Section labelledBy="snapshot-title">
        <SectionHeader
          id="snapshot-title"
          eyebrow="At a glance"
          title="Academic snapshot"
          description="Key facts from my degree, research and training. Each card links to the supporting detail."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {academicSnapshot.map((stat) => (
            <li key={stat.label}>
              <AcademicStatCard stat={stat} />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="featured-research-title" className="border-y border-border bg-subtle">
        <SectionHeader
          id="featured-research-title"
          eyebrow="Featured research"
          title="Final-year research project"
          action={{ label: "All research", href: "/research" }}
        />
        <ResearchCard project={featured} />
      </Section>

      <Section labelledBy="interests-title">
        <SectionHeader
          id="interests-title"
          eyebrow="Research interests"
          title="Areas I want to study further"
          description="Each interest is linked to coursework, research or practical experience I have completed."
          action={{ label: "All interests", href: "/research-interests" }}
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {researchInterests.map((interest) => (
            <li key={interest.id}>
              <ResearchInterestCard interest={interest} />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="experience-title" className="border-t border-border bg-subtle">
        <SectionHeader
          id="experience-title"
          eyebrow="Practical experience"
          title="Clinical and professional experience"
          action={{ label: "Full experience", href: "/experience" }}
        />
        <ul className="grid gap-4 lg:grid-cols-3">
          {experience.map((item) => (
            <li key={item.id}>
              <ExperienceCard experience={item} headingLevel="h3" compact />
            </li>
          ))}
        </ul>
      </Section>

      <section aria-labelledby="contact-cta-title" className="bg-primary text-white">
        <Container className="flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="contact-cta-title" className="text-2xl text-white sm:text-3xl">
              Reviewing an application?
            </h2>
            <p className="mt-3 text-lg text-white/85">{contact.intro}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <DownloadButton href={cv.pdfUrl} fileName={cv.fileName} variant="secondary" />
            <Button href="/contact" className="border border-white bg-primary text-white hover:bg-primary-hover">
              Contact me
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
