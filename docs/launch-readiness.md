# PROSAFE — M7 launch readiness

## Readiness decision

The MVP passes technical checks and the complete customer journeys in the tested Chromium and Firefox runtimes. A legacy WebKit runtime fails client-side startup; current Safari/iOS verification remains outstanding. **Public launch is blocked** by that verification gap, missing verified company/contact information, unfinished legal notices, demonstration manufacturer/product data, and unverified live email delivery. Successful tests do not resolve these business and operational requirements.

This milestone reviews the existing M0–M6 MVP. It adds no product features, infrastructure, authentication, payments, or CMS. Approved design and photography are preserved. Nothing is deployed, committed, or pushed.

## Completed MVP functionality

- Homepage, protection explorer with five equipment zones, catalog with 15 clearly labeled demonstration products, product details, and search/category/industry filters.
- Five industry guides and guided discovery, with consistent links to catalog results and quotations. Guidance is a browsing starting point, not a workplace risk assessment or a determination of PPE suitability.
- Quote selection, quantity controls, removal, browser persistence, storage-denial fallback, and native cross-tab updates.
- Business quotation form with shared client/server validation, purpose-specific consent, configured email delivery, pending/error states, and same-key retries. Provider acceptance is not a purchase, guaranteed inbox receipt, or a response-time commitment.
- About, Brands, Contact, and clearly identified Privacy/Imprint drafts; responsive navigation, footer, and existing photography attribution.

## M7 fixes and small integration improvements

1. **Blank optional quotation configuration:** empty `QUOTE_FORM_SECRET` previously produced an empty HMAC signing key; empty `QUOTE_PUBLIC_ORIGIN` rejected normal local requests. Both now use their documented fallbacks, just as an unset variable does. Two regression tests reproduced the failures before the fix and pass afterward. Public deployments must still pin an origin and supply a strong shared secret.
2. **Search metadata:** added `robots.txt` and `sitemap.xml` with no invented public domain or modification dates. Empty `SITE_URL` yields global `noindex`, a crawl exclusion, and no sitemap URLs. A configured HTTPS origin enables a 28-entry sitemap generated from existing pages/products/industries. It excludes the quote page, legal drafts, and query variants. Privacy, Imprint, and Quote remain individually `noindex`.
3. **Response headers:** added `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin` across routes.
4. **Keyboard focus after quote removal:** removing an item previously sent focus to the document body. Focus now moves to the next/previous item’s quantity input, or to the empty-selection heading after the final item is removed. This was reproduced with a browser regression check.
5. **Repeatable automated checks:** added `npm test` to run quote and search-metadata tests, retaining `npm run test:quote`. The small test compiler also resolves the existing `@/` alias for the metadata dependency graph. No dependency was added.

`SITE_URL` is a build-time search-metadata setting, not proof of domain ownership or launch approval. Set it only for an approved public launch and rebuild. Robots directives are crawler guidance, not access control; staging still needs deployment-level access restrictions if it must be private.

## Validation results

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed after the final application change. |
| `npm run lint` | Passed, zero warnings. |
| `npm run build` | Passed; 35 generated pages, including both new metadata routes. |
| `npm test` | 30 individual tests passed: 27 quote service/HTTP cases and three search-metadata cases. Includes the two new empty-variable regressions. |
| Internal links | Crawled 31 pages, checked 63 distinct internal URLs and 34 fragment references; no broken destinations. All 15 product details and five industry guides were reached. Unknown product, industry, and general routes returned real 404s. |
| External links | The existing [EU-OSHA PPE page](https://oshwiki.osha.europa.eu/en/themes/ppe) and [Pexels license page](https://www.pexels.com/license/) were reachable during review. |
| Accessibility | 30 axe-core WCAG 2 A/AA and WCAG 2.1 AA scans reported zero violations in Chromium, including the final selected/empty quote states at desktop and mobile widths. Form labels, main headings, error focus, menu focus wrapping, Escape, restored trigger focus, skip navigation, visible keyboard focus, and removal focus were checked. |
| Reduced motion | Confirmed `prefers-reduced-motion` switches scrolling to `auto` and reduces transitions; keyboard zone selection also works. |
| HTTP and configuration | Unconfigured delivery returned 503 without success; foreign-origin submission returned 403. Session responses are no-store. Security headers, preview robots/sitemap behavior, route metadata, and configured sitemap generation passed. |
| Sensitive configuration | Scanned 40 emitted client JavaScript chunks: no server secret-variable references or fixture credential appeared. No real secret value was printed or added to source. |
| Dependencies | Production audit: zero vulnerabilities. Full audit: seven moderate findings in the development-only TypeScript ESLint/minimatch chain, all tracing to the existing minimatch advisory. `npm audit fix --dry-run --ignore-scripts` proposed zero compatible changes; no forced override or dependency upgrade was made. |
| Design preservation | No changes to approved image assets, hero/portrait components, or approved section CSS. No dependency/lockfile changes. `git diff --check` passed. |

The quote suite can also run without test-process isolation in restricted environments: `node --test --test-isolation=none tests/*.test.mjs`. The normal `npm test` command was run outside the restrictive subprocess sandbox and reported all 30 individual results.

### Customer journeys and browser coverage

| Runtime | Responsive review | End-to-end result |
| --- | --- | --- |
| Chromium 155.0.8059.40 | 78 page/viewport checks at 1440, 1024, 768, 390, 375, and 320 px; no overflow or broken images. | Both journeys passed at 1440 and 390 px. No JavaScript exceptions. |
| Firefox 139.0.4 | 24 page/viewport checks at 1440, 768, and 390 px; no overflow or broken images. | Both journeys passed at 1440 and 390 px. No JavaScript exceptions. |
| WebKitGTK 2.38.6 | 24 server-rendered page/viewport checks completed at 1440, 768, and 390 px. | **Interactive journey failed.** This installed engine rejects a class static initialization block in Next.js’s generated router chunk (`SyntaxError: Unexpected token '{'`); client startup fails, so the explorer cannot change zones. It is not a successful WebKit functional pass. |

The installed Next.js guide lists Safari 16.4+ as its supported Safari baseline (`node_modules/next/dist/docs/03-architecture/supported-browsers.md`). The old WebKitGTK runtime is not evidence of compatibility with that baseline or current Safari. No supported modern WebKit/Safari or iOS runtime was available here. Verify both complete journeys on a supported current Safari/iOS setup before public launch; broadening framework support to this legacy engine was not attempted.

The eight passing end-to-end runs used actual route navigation and the actual `/api/quote` handler with a local recording fixture intercepting the provider boundary. Coverage includes explorer categories, product details, combined search/category/industry filters, quantities and reload persistence, required/email/consent validation, pending controls, delivery failure with unchanged retry, and a lost HTTP response followed by a retry without another delivery. No real email was sent and no fake-success mode was added to application code.

Additional Chromium checks passed for quantity bounds with native text/Tab input, invalid/empty filter recovery, real cross-tab storage events, corrupt/denied storage, catalog results without JavaScript, refreshed submission sessions, double-submit protection, and concurrent quantity changes while a request is accepted. Removal focus was verified for both a remaining item and the final empty state.

Desktop/mobile screenshots were captured and representative home, catalog/explorer, and quote layouts visually inspected. Temporary evidence is at `/tmp/prosafe-m7-qa-results.json` and `/tmp/prosafe-m7-<browser>-<page>-<width>.png`; fixture/runtime helpers remain outside the repository. Physical devices, a manual screen-reader audit, real provider delivery, and deployed-network performance were not tested.

### Performance and SEO review

The approved hero uses Next.js Image with a preload hint, responsive sizes, and reserved fill geometry. Catalog illustrations have explicit dimensions and default lazy loading. Fonts are self-hosted; page content and URL-driven filters remain server rendered. No additional client component, third-party JavaScript, or library was introduced by M7.

A local production sample at a 320 px viewport transferred 148,548 encoded bytes of JavaScript (about 145 KiB) and a 10,416-byte optimized hero image (about 10.2 KiB; 352 px intrinsic width). Recorded DOMContentLoaded was 47.4 ms and navigation duration 83.4 ms on the local machine. This is a single unthrottled local sample, excludes other resource/prefetch payloads from those byte totals, and is not a field Core Web Vitals result or a performance score. No image-quality reduction or client architecture rewrite was justified by this review. Recheck real network/device performance on the eventual deployment.

Route titles/descriptions and preview indexing behavior were verified. Sitemap coverage improves from no sitemap to 28 generated canonical-path entries when a public origin is configured; no filtered URL, quote selection, or incomplete legal page is advertised in it. Product titles and visible content continue to identify demonstrations. Canonical-domain ownership, final content, and real deployment indexing must be reviewed before enabling `SITE_URL`.

## Security and data integrity review

- Server-side validation independently checks types, normalized text, required company/contact/email, consent as boolean `true`, known catalog identifiers, unique selected IDs, and integer quantities. Server catalog data replaces client-supplied product names or claims.
- Limits: company 120 characters, contact 100, email 254, phone 40, city 160, additional requirements 3,000; 1–20 distinct items, 1–999 units each, and 5,000 units total. Both raw and normalized text are bounded. HTML email content is escaped; subject/sender/recipient are not taken from arbitrary user input.
- The endpoint accepts JSON only, checks Origin and cross-site fetch metadata, and ignores forwarded-origin headers. Set `QUOTE_PUBLIC_ORIGIN` behind a public proxy; the Host-derived fallback exists for local development, not as a substitute for a pinned deployment origin.
- Payloads are capped at 32,768 bytes while streaming, including when Content-Length is absent. The application does not impose a separate body-read deadline; deployment request/header/body timeouts and size limits must cover slow clients.
- Signed session tokens require at least two seconds of age and expire after two hours. A hidden honeypot and attempt counters provide basic abuse controls. Tokens can be obtained by automated clients; these measures are not bot identity verification.
- Attempts are limited to five per token and 50 globally per process per ten-minute window. A new token bypasses the token-specific counter, but not that process’s global counter. **Throttling is process-local:** it resets on restart and is not shared across replicas. Global saturation can also delay legitimate customers. Deployment operators must assess expected volume and abuse monitoring; no distributed limiter was added.
- The bounded 1,000-entry process-local request registry uses payload fingerprints, pending operations, and acceptance outcomes, with up to 24-hour retention subject to cleanup and restart. Same-key changed payloads are rejected; concurrent matching requests share delivery. It is not a durable archive or a distributed exactly-once guarantee. The provider also receives a stable idempotency key; its finite retention window does not replace a durable operational delivery process.
- The optional adapter uses a fixed Resend endpoint, forbids redirects, times out after ten seconds, and requires a successful response with an acknowledgement. Unknown/failing delivery never produces a success confirmation. The client times out after 25 seconds, preserves input/selection on failure, and reuses the key for unchanged retries within the mounted form. Reloading or leaving the form loses contact fields and the in-memory retry key; operators cannot reconcile long-term outcomes without provider/mailbox records.
- Only product IDs and quantities are persisted to localStorage. Contact fields stay in form memory until submitted; no marketing consent or contact-data storage is added. Completed local request entries contain no raw contact fields. The provider, mailbox, hosting access logs, and backups require their own documented retention/access practices.
- Delivery modules remain server-only. Only `.env.example` is tracked; credentials must never use `NEXT_PUBLIC_` or be committed. Public client bundles and environment configuration are checked without printing secret values.
- No authentication or payments are present. A strict Content Security Policy is not added without a verified deployment strategy for Next.js scripts; TLS/HSTS, host restrictions, request timeouts, secure secret injection, log access, and monitoring remain deployment responsibilities.

## Required business and content configuration

| Area | Public-launch requirement |
| --- | --- |
| Legal operator | Verified legal name, form, registration/register, registered address, representative, and applicable tax/VAT or licensing details. Kosovo as the initial market does not establish incorporation or an office address. |
| Public contact | Approved email, phone, correspondence address, general inquiry channel, privacy contact, and manufacturer partnership contact. Replace pending-status copy only with verified details. |
| Manufacturer relationships | Confirm each agreement, distribution scope, partner identity, and permission to publish names and logos. The empty Brands directory implies no existing partnerships. |
| Product catalog | Replace all 15 fictional demonstration records and generic illustrations with authorized manufacturer data/photography. Verify identifiers, specifications, variants, intended uses, documentation, availability, and any certification/performance claims. Review industry mappings against actual products. |
| Legal review | Complete and approve Privacy and Imprint against the real operator and deployment; identify controller/contacts, purposes/legal bases, recipients/processors, hosting/log/storage inventory, locations/transfers/safeguards, retention/deletion, applicable rights, and complaint channels. Assign effective/review dates. Draft labels and noindex remain until finalized. |
| Content review | Approve final English copy, market/service claims, contact availability, and the status of the explorer illustration. Approved homepage campaign photography remains unchanged. |

See [M6’s detailed completion list](essential-business-pages.md) and [asset provenance](assets.md).

## Email delivery configuration

| Variable | Requirement |
| --- | --- |
| `QUOTE_DELIVERY_PROVIDER` | `resend` only when real delivery is approved. Empty leaves submission disabled. |
| `QUOTE_RESEND_API_KEY` | Valid least-privilege server-side sending credential, stored outside source control. |
| `QUOTE_FROM_EMAIL` | Single sender mailbox on a domain verified with the provider. |
| `QUOTE_TO_EMAIL` | Controlled business destination with approved access and retention. |
| `QUOTE_PUBLIC_ORIGIN` | Exact HTTPS public origin, no path or trailing slash; coordinate it with the proxy/host configuration. |
| `QUOTE_FORM_SECRET` | Strong random secret of at least 32 characters, shared across replicas. Rotating it invalidates active sessions. Empty/unset uses an ephemeral process secret for local development. |

Before launch, verify real provider acceptance, sender authentication, receipt in the destination mailbox, Reply-To, failure behavior, and operational ownership of inquiries. Local recording fixtures do not verify a real provider account, DNS, deliverability, spam placement, or inbox receipt. See [quotation operations](quotation-requests.md).

## Deployment prerequisites and remaining limitations

- Use Node.js 24 (pinned in `.nvmrc`) and the lockfile with `npm ci`. Use the existing supported Webpack build, `npm run build`, then `npm start`; this application requires a Node runtime for dynamic catalog/discovery and quotation endpoints, rather than static-only hosting.
- Supply the verified `SITE_URL` before the production build, after content/legal/business approval. Changing it requires rebuilding static metadata/robots/sitemap. Recheck emitted URLs and indexing rules on the actual public domain.
- Provision HTTPS, the verified host/origin, private environment injection, production process management, provider network access, request limits/timeouts, restricted logs, operational monitoring, and a rollback procedure in the chosen deployment environment. This milestone provisions none of these.
- Agree on process-local throttling/deduplication limits and replica behavior. There is no database, durable request archive, CRM, webhook reconciliation, or cross-device selection history.
- Finish manual accessibility and real-device review as appropriate for launch. Automated scans and desktop viewport emulation do not certify accessibility or replace physical device testing.
- Resolve or explicitly accept remaining development-tool dependency advisories before running untrusted tooling inputs. Do not force incompatible dependency overrides merely to clear an audit count.

**Technical readiness and public readiness are separate decisions.** Passing application checks supports a controlled technical review; real public inquiries must wait for the business, content, legal, delivery, and deployment prerequisites above.
