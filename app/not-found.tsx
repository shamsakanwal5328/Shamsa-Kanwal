import type { Metadata } from "next";
import Button from "@/components/Button";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-secondary">Page not found</p>
      <h1 className="mt-3 text-3xl sm:text-4xl">This page does not exist</h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
        The link may be out of date. You can return to the home page or go straight to the research.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/">Home</Button>
        <Button href="/research" variant="secondary">
          Research
        </Button>
      </div>
    </Container>
  );
}
