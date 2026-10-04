import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import DownloadButton from "@/components/DownloadButton";
import { ArrowRightIcon } from "@/components/Icons";
import { data } from "@/lib/data";

export default function HeroSection() {
  const { personal, hero, cv } = data;

  return (
    <section aria-labelledby="hero-title" className="border-b border-border bg-surface">
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="animate-fade-up max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">{hero.eyebrow}</p>
          <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-[3.5rem]">
            {personal.name}
          </h1>
          <p className="mt-4 text-lg font-semibold text-secondary sm:text-xl">{personal.title}</p>
          <p className="mt-6 max-w-2xl text-lg text-ink">{hero.description}</p>
          {hero.goal && <p className="mt-3 max-w-2xl text-lg text-muted">{hero.goal}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRightIcon />
            </Button>
            <DownloadButton href={cv.pdfUrl} fileName={cv.fileName} label={hero.secondaryCta.label} variant="secondary" />
          </div>
        </div>

        <div className="hidden lg:block">
          {personal.profileImage ? (
            <Image
              src={personal.profileImage}
              alt={personal.profileImageAlt}
              width={280}
              height={336}
              priority
              className="h-[336px] w-[280px] rounded-lg border border-border object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-[280px] w-[280px] items-center justify-center rounded-full border-8 border-accent-soft bg-primary font-serif text-7xl font-semibold text-white"
            >
              {personal.initials}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
