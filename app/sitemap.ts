import type { MetadataRoute } from "next";
import { absoluteUrl, data } from "@/lib/data";
import { NAV_LINKS } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = NAV_LINKS.map(({ href }) => ({
    url: absoluteUrl(href),
    changeFrequency: "monthly" as const,
    priority: href === "/" ? 1 : 0.8,
  }));

  const research = data.research.map((project) => ({
    url: absoluteUrl(`/research/${project.slug}`),
    changeFrequency: "yearly" as const,
    priority: 0.9,
  }));

  return [...pages, ...research];
}
