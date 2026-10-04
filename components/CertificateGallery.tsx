"use client";

import Image from "next/image";
import { useState } from "react";
import CertificateCard from "@/components/CertificateCard";
import { ExternalIcon } from "@/components/Icons";
import Modal from "@/components/Modal";
import type { Certificate } from "@/lib/types";

interface CertificateGalleryProps {
  certificates: Certificate[];
  recipientName: string;
}

export default function CertificateGallery({ certificates, recipientName }: CertificateGalleryProps) {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <li key={certificate.id}>
            <CertificateCard certificate={certificate} onView={setSelected} />
          </li>
        ))}
      </ul>

      <Modal open={selected !== null} onClose={() => setSelected(null)} title={selected?.title ?? "Certificate"}>
        {selected && (
          <div>
            <div className="relative aspect-[1.414/1] w-full rounded border border-border bg-subtle">
              <Image
                src={selected.image}
                alt={`Certificate: ${selected.title}, issued to ${recipientName} by ${selected.provider}`}
                fill
                sizes="(min-width: 896px) 860px, 100vw"
                className="object-contain"
              />
            </div>
            <dl className="mt-4 grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-2">
              <div>
                <dt className="font-semibold">Provider</dt>
                <dd className="text-muted">{selected.provider}</dd>
              </div>
              <div>
                <dt className="font-semibold">Date</dt>
                <dd className="text-muted">{selected.date}</dd>
              </div>
              {selected.credentialId && (
                <div>
                  <dt className="font-semibold">Certificate number</dt>
                  <dd className="text-muted">{selected.credentialId}</dd>
                </div>
              )}
              {selected.verification && (
                <div>
                  <dt className="font-semibold">Verification</dt>
                  <dd className="text-muted">{selected.verification}</dd>
                </div>
              )}
            </dl>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href={selected.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-secondary underline underline-offset-4 hover:text-primary"
              >
                <ExternalIcon />
                Open original file
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              {selected.verificationUrl && (
                <a
                  href={selected.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-secondary underline underline-offset-4 hover:text-primary"
                >
                  <ExternalIcon />
                  Verify certificate
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
