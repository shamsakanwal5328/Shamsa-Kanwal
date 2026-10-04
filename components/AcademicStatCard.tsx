import Link from "next/link";
import type { AcademicStat } from "@/lib/types";

export default function AcademicStatCard({ stat }: { stat: AcademicStat }) {
  const content = (
    <>
      <dt className="text-sm font-semibold uppercase tracking-wider text-muted">{stat.label}</dt>
      <dd className="mt-2 font-serif text-xl font-semibold text-primary sm:text-2xl">{stat.value}</dd>
      <dd className="mt-1 text-[15px] text-muted">{stat.detail}</dd>
    </>
  );

  const cardClass = "block h-full rounded-lg border border-border bg-surface p-5";

  // A <dl> per card keeps term/description semantics; the link wraps the content when evidence exists.
  return stat.href ? (
    <Link href={stat.href} className={`${cardClass} transition-colors hover:border-accent`}>
      <dl>{content}</dl>
    </Link>
  ) : (
    <dl className={cardClass}>{content}</dl>
  );
}
