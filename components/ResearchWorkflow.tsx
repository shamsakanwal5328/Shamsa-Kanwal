import type { WorkflowStep } from "@/lib/types";

/** Research process from problem to conclusion. Vertical on small screens, a grid on large ones. */
export default function ResearchWorkflow({ steps }: { steps: WorkflowStep[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.step} className="relative flex gap-4 rounded-lg border border-border bg-surface p-4">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
          >
            {index + 1}
          </span>
          <div>
            <p className="font-semibold text-primary">
              <span className="sr-only">Step {index + 1}: </span>
              {step.step}
            </p>
            <p className="mt-1 text-[15px] text-muted">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
