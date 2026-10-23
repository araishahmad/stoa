const configuredUrl = process.env.SITE_URL?.trim();

function resolveSiteUrl(value: string | undefined): URL | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTP(S) origin without credentials, path, query, or fragment.");
  }
  return url;
}

export const siteConfig = {
  name: "Stoa",
  description: "Fresh perspectives on technology, relationships, and culture. Stoa is a place to explore how we live, connect, and make sense of a changing world.",
  url: resolveSiteUrl(configuredUrl),
  isPreview: true,
} as const;
