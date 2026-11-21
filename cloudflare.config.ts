import { bindings, defineConfig, defineWorker } from "cf/config";

// Only variables declared here exist in the deployed Worker; each deploy
// removes undeclared plain variables. Never put credentials in this file:
// secrets are declared with bindings.secret() and their values are uploaded
// separately (see docs/cloudflare-deployment.md).
export default defineConfig({
  worker: defineWorker({
    name: "prosafe",
    entrypoint: "vinext/server/fetch-handler",
    // Dates on or after 2026-08-04 enable nodejs_compat (node:crypto, Buffer,
    // process.env populated from bindings) by default.
    compatibilityDate: "2026-11-21",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // Quotation delivery stays disabled until verified Resend credentials and
      // sender/recipient addresses exist. To enable it, change this to
      // "resend", declare QUOTE_FROM_EMAIL / QUOTE_TO_EMAIL /
      // QUOTE_PUBLIC_ORIGIN with bindings.text(...), and declare
      // QUOTE_RESEND_API_KEY: bindings.secret().
      QUOTE_DELIVERY_PROVIDER: bindings.text("none"),
      // Required to sign quotation sessions (>= 32 random characters). Without
      // a valid value, submission fails closed.
      QUOTE_FORM_SECRET: bindings.secret(),
      // SITE_URL is intentionally not declared: previews render noindex,
      // robots.txt disallows crawling, and the sitemap is empty.
    },
  }),
});
