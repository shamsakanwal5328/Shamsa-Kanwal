import type { ReactNode } from "react";

type Tone = "default" | "success" | "neutral";

const tones: Record<Tone, string> = {
  default: "bg-accent-soft text-secondary",
  success: "bg-success-soft text-success",
  neutral: "bg-neutral-soft text-muted",
};

export default function Tag({ children, tone = "default" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-sm font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
