import type { Metadata } from "next";
import type { ReactNode } from "react";
import Button from "@/components/Button";
import Container from "@/components/Container";
import DownloadButton from "@/components/DownloadButton";
import { formatPeriod } from "@/components/ExperienceCard";
import { ExternalIcon } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import { absoluteUrl, data, getContactEmail, getFeaturedResearch, getSocialLinks } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "CV",
  description: `Curriculum vitae of ${data.personal.name}: education, research, clinical experience, skills and training. Download the PDF CV.`,
  path: "/cv",
});

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-6 print:pt-4">
      <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-secondary">{title}</h2>
      <div className="space-y-5 print:space-y-3">{children}</div>
    </section>
  );
}

function CvEntry({ title, subtitle, meta, children }: { title: string; subtitle?: string; meta?: string; children?: ReactNode }) {
  return (
    <div className="print-avoid-break">
      <div className="flex flex-col gap-x-4 sm:flex-row sm:items-baseline sm:justify-between print:flex-row">
        <h3 className="font-sans text-lg font-semibold text-primary print:text-base">{title}</h3>
        {meta && <p className="shrink-0 text-[15px] text-muted print:text-sm">{meta}</p>}
      </div>
      {subtitle && <p className="font-semibold text-ink print:text-sm">{subtitle}</p>}
      {children && <div className="mt-1 text-[15px] text-ink print:text-sm">{children}</div>}
    </div>
  );
}

export default function CvPage() {
  const { personal, education, experience, projects, skills, certificates, otherLearning, awards, cv } = data;
  const research = getFeaturedResearch();
  const email = getContactEmail();
  const contactLine = [personal.location, email, absoluteUrl().replace(/^https?:\/\//, ""), ...getSocialLinks().map((l) => l.url)]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <>
      <div className="print-hidden">
        <PageHeader
          eyebrow="Curriculum vitae"
          title="Curriculum vitae"
          description={`Online summary of my CV. The PDF contains the same information. Last updated ${cv.lastUpdated}.`}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <DownloadButton href={cv.pdfUrl} fileName={cv.fileName} />
            <Button href={cv.pdfUrl} variant="secondary" newTab>
              <ExternalIcon />
              View CV
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </Button>
          </div>
        </PageHeader>
      </div>

      <Container className="py-12 sm:py-16 print:p-0">
        <article className="mx-auto max-w-4xl space-y-8 rounded-lg border border-border bg-surface p-6 sm:p-10 print:max-w-none print:space-y-5 print:rounded-none print:border-0 print:p-0">
          <header>
            <p className="font-serif text-3xl font-semibold text-primary print:text-[22pt]">{personal.name}</p>
            <p className="mt-1 text-lg font-semibold text-secondary print:text-base">{personal.title}</p>
            <p className="mt-2 text-[15px] text-muted print:text-sm">{contactLine}</p>
          </header>

          <CvSection title="Education">
            {education.map((item) => (
              <CvEntry key={item.degree} title={item.degree} meta={item.period}>
                <p>
                  {item.institution} · CGPA {item.cgpa} · {item.creditHours} credit hours · {item.graduation}
                </p>
                <p className="mt-1 text-muted">Relevant coursework: {item.coursework.join(", ")}.</p>
              </CvEntry>
            ))}
          </CvSection>

          <CvSection title="Research">
            <CvEntry title={research.title} meta={research.year}>
              <p>
                {research.course}, {research.institution}. Supervisor: {research.supervisor}. {research.teamContext}
              </p>
              <p className="mt-1">{research.findings[0]}</p>
              <ul className="mt-1 list-disc pl-5">
                {research.role.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CvEntry>
          </CvSection>

          <CvSection title="Clinical and professional experience">
            {experience.map((item) => (
              <CvEntry key={item.id} title={item.position} subtitle={item.organization} meta={formatPeriod(item)}>
                <p>
                  {item.summary} {item.supervision && `${item.supervision}.`}
                </p>
                {item.responsibilities.length > 0 && (
                  <ul className="mt-1 list-disc pl-5">
                    {item.responsibilities.slice(0, 4).map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                )}
              </CvEntry>
            ))}
          </CvSection>

          <CvSection title="Academic projects">
            {projects
              .filter((project) => project.id !== research.slug)
              .map((project) => (
                <CvEntry key={project.id} title={project.title} meta={project.year}>
                  <p>
                    {project.context}. {project.description}
                  </p>
                </CvEntry>
              ))}
          </CvSection>

          <CvSection title="Skills">
            <dl className="space-y-2 text-[15px] print:text-sm">
              {skills.map((group) => (
                <div key={group.category} className="grid gap-1 sm:grid-cols-[11rem_1fr] print:grid-cols-[9rem_1fr]">
                  <dt className="font-semibold text-primary">{group.category}</dt>
                  <dd>{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </CvSection>

          <CvSection title="Training and certificates">
            <ul className="space-y-1.5 text-[15px] print:text-sm">
              {certificates.map((certificate) => (
                <li key={certificate.id}>
                  <span className="font-semibold text-primary">{certificate.title}</span> — {certificate.provider},{" "}
                  {certificate.date}
                </li>
              ))}
              {otherLearning.map((activity) => (
                <li key={activity.title}>
                  <span className="font-semibold text-primary">{activity.title}</span> — {activity.provider},{" "}
                  {activity.date} ({activity.evidence.toLowerCase()})
                </li>
              ))}
            </ul>
          </CvSection>

          {awards.length > 0 && (
            <CvSection title="Awards">
              {awards.map((award) => (
                <CvEntry key={award.title} title={award.title} meta={award.date}>
                  <p>
                    {award.issuer}. {award.description}
                  </p>
                </CvEntry>
              ))}
            </CvSection>
          )}

          <CvSection title="References">
            <p className="text-[15px] print:text-sm">{cv.references}</p>
          </CvSection>
        </article>
      </Container>
    </>
  );
}
