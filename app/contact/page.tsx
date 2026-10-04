import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Section } from "@/components/Container";
import DownloadButton from "@/components/DownloadButton";
import PageHeader from "@/components/PageHeader";
import SocialLinks from "@/components/SocialLinks";
import { data, getContactEmail, getSocialLinks } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${data.personal.name} about master's admissions, scholarships or research opportunities in psychology.`,
  path: "/contact",
});

export default function ContactPage() {
  const { contact, cv } = data;
  const email = getContactEmail();
  const hasContactMethods = Boolean(email) || getSocialLinks().length > 0;

  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" description={contact.intro} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl">Professional contact</h2>
              {hasContactMethods ? (
                <SocialLinks className="mt-4 text-lg" />
              ) : (
                <p className="mt-3 text-muted">Professional contact details will be added shortly.</p>
              )}
            </div>
            <div>
              <h2 className="text-xl">Availability</h2>
              <p className="mt-3">{contact.availability}</p>
              <p className="mt-2 text-muted">{contact.responseNote}</p>
            </div>
            <div>
              <h2 className="text-xl">References and documents</h2>
              <p className="mt-3">{cv.references}</p>
              <div className="mt-5">
                <DownloadButton href={cv.pdfUrl} fileName={cv.fileName} variant="secondary" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
            <h2 className="mb-5 text-2xl">Send a message</h2>
            {email ? (
              <ContactForm recipient={email} />
            ) : (
              <p className="text-muted">
                The contact form will be available once a professional email address is published. In the meantime, you
                can download my CV for full details of my education and experience.
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
