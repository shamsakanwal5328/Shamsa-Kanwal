import type { ReactNode } from "react";
import { LockIcon } from "@/components/Icons";

/** Explains why a piece of evidence exists but is intentionally not published. */
export default function EvidenceNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 rounded-md border border-border bg-subtle p-3 text-[15px] text-muted">
      <LockIcon className="mt-1 shrink-0 text-base text-secondary" />
      <span>{children}</span>
    </p>
  );
}
