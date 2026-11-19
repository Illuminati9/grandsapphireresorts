import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const { readSiteConfig } = await import("../src/lib/site-config.ts");
const site = readSiteConfig();
console.log(site.indexable ? `Search indexing enabled for ${site.origin}.` : "Search indexing disabled for this local or preview build.");
