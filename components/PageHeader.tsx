import type { ReactNode } from "react";
import Container from "@/components/Container";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-surface">
      <Container className="animate-fade-up py-12 sm:py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">{eyebrow}</p>
        <h1 className="max-w-3xl text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </header>
  );
}
