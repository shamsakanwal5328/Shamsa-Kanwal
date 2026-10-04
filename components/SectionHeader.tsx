import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/Icons";

interface SectionHeaderProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  action?: { label: string; href: string };
}

/** Renders an h2. Pages own their single h1 via PageHeader or HeroSection. */
export default function SectionHeader({ id, eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-secondary">{eyebrow}</p>
        )}
        <h2 id={id} className="text-2xl sm:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-lg text-muted">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-secondary underline-offset-4 hover:text-primary hover:underline"
        >
          {action.label}
          <ArrowRightIcon />
        </Link>
      )}
    </div>
  );
}
