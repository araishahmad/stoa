/** Build Google's documented domain-level deeplink only after owner activation. */
export function preferredSourceHref(siteUrl: URL | undefined, enabled: boolean): string | null {
  if (!enabled || !siteUrl || siteUrl.protocol !== "https:" || siteUrl.port) return null;

  const hostname = siteUrl.hostname.toLowerCase().replace(/\.$/, "");
  const reservedHost = /(?:^|\.)(?:localhost|local|internal|test|invalid|example)$/.test(hostname)
    || /(?:^|\.)example\.(?:com|net|org)$/.test(hostname);
  const ipAddress = hostname.includes(":") || /^\d+(?:\.\d+){3}$/.test(hostname);
  if (!hostname.includes(".") || reservedHost || ipAddress) return null;

  const destination = new URL("https://www.google.com/preferences/source");
  destination.searchParams.set("q", hostname);
  return destination.href;
}
