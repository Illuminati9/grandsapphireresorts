export function readSiteConfig(env: Record<string, string | undefined> = process.env) {
  const configuredUrl = env.SITE_URL?.trim() || env.URL?.trim();
  if (env.CONTEXT === "production" && !configuredUrl) {
    throw new Error("Set SITE_URL or use Netlify's URL environment variable before publishing.");
  }
  const url = new URL(configuredUrl || "http://localhost:3000");
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/" ||
      (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
      (env.CONTEXT === "production" && local)) {
    throw new Error("SITE_URL must be a public HTTPS origin without a path, credentials, query or fragment.");
  }
  const indexable = Boolean(configuredUrl) && !local &&
    (env.CONTEXT ? env.CONTEXT === "production" : env.NODE_ENV === "production");
  return { origin: url.origin, indexable, googleVerification: env.GOOGLE_SITE_VERIFICATION?.trim() || undefined };
}
