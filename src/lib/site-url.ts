/** Only an explicitly configured public origin may appear in search metadata. */
export function getSiteOrigin(value = process.env.SITE_URL): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password && url.pathname === "/" && !url.search && !url.hash) {
      return url.origin;
    }
  } catch { /* Report the configuration problem without exposing its value. */ }
  throw new Error("SITE_URL must be an HTTPS origin without credentials, path, query, or fragment.");
}
