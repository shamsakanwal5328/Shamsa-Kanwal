import rawData from "@/data/data.json";
import type { Link, PortfolioData, ResearchProject } from "@/lib/types";

// Assigning (not casting) makes TypeScript check data.json against the types.
export const data: PortfolioData = rawData;

export function getFeaturedResearch(): ResearchProject {
  return data.research.find((project) => project.featured) ?? data.research[0];
}

export function getResearchBySlug(slug: string): ResearchProject | undefined {
  return data.research.find((project) => project.slug === slug);
}

export function getContactEmail(): string {
  return data.contact.email || data.personal.email;
}

const SOCIAL_LABELS: Record<keyof PortfolioData["socialLinks"], string> = {
  linkedin: "LinkedIn",
  googleScholar: "Google Scholar",
  orcid: "ORCID",
};

/** Returns only the profiles that have a URL in data.json. */
export function getSocialLinks(): Link[] {
  return (Object.keys(SOCIAL_LABELS) as (keyof typeof SOCIAL_LABELS)[])
    .filter((key) => data.socialLinks[key])
    .map((key) => ({ label: SOCIAL_LABELS[key], url: data.socialLinks[key] }));
}

/** Site origin: explicit env var, then Netlify's built-in URL variable, then data.json. */
export function absoluteUrl(path = "/"): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || data.site.url).replace(/\/$/, "");
  return `${base}${path === "/" ? "" : path}`;
}

export function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url);
}
