import type { Metadata } from "next";
import { absoluteUrl, data } from "@/lib/data";

export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: data.site.title };

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
}

export function pageMetadata({ title, description, path, type = "website" }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${data.personal.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: data.site.title,
      locale: data.site.locale,
      type,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
