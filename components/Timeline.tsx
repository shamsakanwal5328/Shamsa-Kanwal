import type { TimelineEntry } from "@/lib/types";

/** Vertical timeline. Each entry is an <li> so screen readers announce the count. */
export default function Timeline({ entries, label }: { entries: TimelineEntry[]; label: string }) {
  return (
    <ol aria-label={label} className="relative border-l-2 border-border pl-6">
      {entries.map((entry) => (
        <li key={`${entry.date}-${entry.title}`} className="print-avoid-break relative pb-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-secondary"
          />
          <p className="text-sm font-semibold text-secondary">{entry.date}</p>
          <p className="mt-0.5 font-semibold text-primary">{entry.title}</p>
          <p className="mt-1 text-[15px] text-muted">{entry.description}</p>
        </li>
      ))}
    </ol>
  );
}
