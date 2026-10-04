import Image from "next/image";
import type { Certificate } from "@/lib/types";

interface CertificateCardProps {
  certificate: Certificate;
  onView: (certificate: Certificate) => void;
}

export default function CertificateCard({ certificate, onView }: CertificateCardProps) {
  return (
    <article id={certificate.id} className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <div className="relative aspect-[1.414/1] border-b border-border bg-subtle">
        <Image
          src={certificate.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-2"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold text-secondary">{certificate.category}</p>
        <h3 className="mt-1 text-lg">{certificate.title}</h3>
        <dl className="mt-3 space-y-1 text-[15px]">
          <div>
            <dt className="inline font-semibold text-ink">Provider: </dt>
            <dd className="inline text-muted">{certificate.provider}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-ink">Date: </dt>
            <dd className="inline text-muted">{certificate.date}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-ink">Topic: </dt>
            <dd className="inline text-muted">{certificate.topic}</dd>
          </div>
        </dl>
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => onView(certificate)}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-primary bg-surface px-4 py-2 font-semibold text-primary transition-colors hover:bg-subtle"
          >
            View certificate<span className="sr-only">: {certificate.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
