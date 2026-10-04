import type { ReactNode } from "react";

interface DataTableProps {
  caption: string;
  headers: string[];
  rows: ReactNode[][];
  note?: string;
}

/** Results table. The wrapper scrolls horizontally on narrow screens so the page itself never does. */
export default function DataTable({ caption, headers, rows, note }: DataTableProps) {
  return (
    <figure className="print-avoid-break">
      <div
        role="region"
        aria-label={caption}
        tabIndex={0}
        className="overflow-x-auto rounded-lg border border-border bg-surface"
      >
        <table className="w-full min-w-[480px] border-collapse text-left text-[15px]">
          <caption className="border-b border-border px-4 py-3 text-left font-semibold text-primary">{caption}</caption>
          <thead>
            <tr className="bg-subtle">
              {headers.map((header) => (
                <th key={header} scope="col" className="px-4 py-2.5 font-semibold text-ink">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border">
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th key={cellIndex} scope="row" className="px-4 py-2.5 font-semibold text-ink">
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-2.5 tabular-nums text-ink">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <figcaption className="mt-2 text-sm text-muted">{note}</figcaption>}
    </figure>
  );
}
