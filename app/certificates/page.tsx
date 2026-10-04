import type { Metadata } from "next";
import CertificateGallery from "@/components/CertificateGallery";
import { Section } from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import Tag from "@/components/Tag";
import { data } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Certificates & Training",
  description: `Certificates and professional training of ${data.personal.name}, including Psychological First Aid, mental-health awareness, suicide prevention and a clinical psychology internship.`,
  path: "/certificates",
});

export default function CertificatesPage() {
  const { certificates, otherLearning, personal } = data;

  return (
    <>
      <PageHeader
        eyebrow="Certificates & training"
        title="Certificates and training"
        description="Workshops, webinars and training completed alongside my degree. Certificates of participation are presented as evidence of attendance, not as professional qualifications."
      />

      <Section labelledBy="certificates-title">
        <SectionHeader
          id="certificates-title"
          title="Certificates"
          description="Select a certificate to view it here, or open the original file."
        />
        <CertificateGallery certificates={certificates} recipientName={personal.name} />
      </Section>

      {otherLearning.length > 0 && (
        <Section labelledBy="other-learning-title" className="border-t border-border bg-subtle">
          <SectionHeader
            id="other-learning-title"
            title="Other professional learning"
            description="Activities I took part in that did not issue a certificate. They are listed separately so they are not mistaken for certified training."
          />
          <ul className="grid gap-4 md:grid-cols-2">
            {otherLearning.map((activity) => (
              <li key={activity.title} className="rounded-lg border border-border bg-surface p-5">
                <h3 className="text-lg">{activity.title}</h3>
                <p className="mt-1 text-[15px] text-muted">
                  {activity.provider} · {activity.date}
                </p>
                <p className="mt-2">{activity.topic}</p>
                <div className="mt-3">
                  <Tag tone="neutral">{activity.evidence}</Tag>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
