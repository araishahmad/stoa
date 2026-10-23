import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = siteConfig.url ? new URL(path, siteConfig.url).href : undefined;
  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: { index: false, follow: false },
    openGraph: {
      title: `${title} | Stoa`,
      description,
      siteName: "Stoa",
      type: "website",
      ...(canonical ? { url: canonical } : {}),
    },
  };
}
