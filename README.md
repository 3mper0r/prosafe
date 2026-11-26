# PROSAFE

**Safety Without Compromise.** Workplace protection solutions for businesses, initially in Kosovo.

The site is bilingual: Albanian (default, no URL prefix) and English (`/en`). See [localization](docs/localization.md) for routing, dictionaries, localized catalog data, search and the language switcher, and the [Albanian translation review](docs/translation-review-sq.md) (pending native-speaker review). The approved design and photography are preserved. See [launch readiness](docs/launch-readiness.md) for the M7 baseline and public launch blockers. The business/legal pages remain incomplete drafts and delivery remains unavailable without configuration.

## Setup

Use Node.js 24 LTS (pinned in `.nvmrc`) and npm 10 or newer. With nvm installed:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open the local URL printed by Next.js (normally http://localhost:3000). No environment variables or external services are required.

```sh
npm run typecheck  # Strict TypeScript checks
npm run lint       # ESLint; warnings fail the check
npm run build      # Production build
npm start          # Serve the completed production build
npm run test:quote # Validation, delivery, idempotency, and HTTP security tests
npm test           # All unit tests (quote, search, localization, SEO)
```

Cloudflare Workers builds use vinext alongside the unchanged Next.js commands:

```sh
npm run dev:vinext    # Local Workers runtime (port 3001)
npm run build:vinext  # Production Worker build
npm run start:vinext  # Serve the Worker build locally in workerd (port 4173)
```

See [Cloudflare deployment](docs/cloudflare-deployment.md) for configuration, secrets, deploy commands, and Workers Free limits.

The type check generates Next.js route types before running `tsc --noEmit`, so it also works on a fresh clone. Next.js maintains the ignored `next-env.d.ts` file.

Search indexing needs two settings: `SITE_URL` (the public HTTPS origin, which enables canonical, hreflang and `og:url` metadata) and `SEARCH_INDEXING=enabled` (indexing permission). With anything less, pages emit noindex, robots.txt disallows crawling and the sitemap is empty. Leave `SEARCH_INDEXING` unset until launch approval; see [Cloudflare deployment](docs/cloudflare-deployment.md#search-configuration) for build and runtime requirements. `QUOTE_PUBLIC_ORIGIN` is a separate runtime setting for quotation security. `.env.example` documents both. Public launch requires completion of the [readiness prerequisites](docs/launch-readiness.md).

## Architecture

- `src/app`: App Router routes. `src/app/(sq)` (Albanian, unprefixed) and `src/app/en` are thin wrappers around the shared views in `src/views`; `src/i18n` holds the language configuration, dictionaries, path helpers and SEO metadata; `src/content` holds localized catalog text. Components render on the server by default.
- Development and production builds use Next.js's supported Webpack bundler because this environment blocks the local worker ports required by Turbopack.
- `src/app/globals.css`: CSS design tokens mapped to Tailwind v4 utilities with `@theme inline`. Approved brand colors are preserved; a lighter supporting gray provides readable small text. Responsive typography, focus indicators, and reduced-motion defaults live here.
- Barlow Condensed Bold and Manrope Variable are self-hosted with `next/font/local`. System monospace handles technical labels. Font licenses and photography provenance are documented in [docs/assets.md](docs/assets.md).
- TypeScript uses strict mode and the `@/*` alias for `src/*`. ESLint uses Next.js Core Web Vitals and TypeScript flat configurations.
- ESLint 9 is pinned because the React, accessibility, and import plugins bundled by Next.js do not yet declare ESLint 10 compatibility. npm currently marks ESLint 9 deprecated; update when the upstream plugin peer ranges support the newer major.
- The development lint toolchain currently inherits a [minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249). `npm audit fix` cannot resolve it within the upstream version ranges; a compatible upstream update is pending. The production dependency audit is clean.
- Direct dependencies use exact versions; `package-lock.json` records the resolved tree for `npm ci`.

`src/components/ui` contains the shared wordmark; `src/components/layout` contains navigation and footer; `src/components/sections` contains the cinematic hero, campaign portrait, and existing homepage overviews. Scoped CSS Modules preserve the approved composition. The portrait is a Server Component using Next.js Image, proportional cropping, and subtle edge blending. Navigation and the interactive explorer are isolated Client Components. Hover transitions respect reduced-motion preferences; Motion for React is not needed.

`src/features/protection-explorer` owns zone selection, accessible controls, its temporary full-body illustration, and responsive styling. `src/lib/product-categories.ts` supplies the shared category identifiers, metadata, and catalog URL helper. See [the explorer contract and interaction notes](docs/protection-explorer.md).

`src/features/catalog` owns the typed demonstration product records, reusable cards, notices, and catalog styling. Listing, search/filter results, metadata, and product details render on the server. A standard GET form keeps filters in the URL and works without client JavaScript. Product detail pages are generated at build time.

`src/features/quote` owns the small client-side selection store and its controls. `useSyncExternalStore` synchronizes controls across routes and tabs without a global provider or state library. Only product IDs and quantities are persisted, under the versioned `prosafe.quote.v1` localStorage key. Invalid or obsolete stored entries are discarded; storage denial falls back to in-memory selection with a visible notice. See [the M3 catalog and quote contract](docs/catalog.md).

`src/features/industries` owns the five typed industry definitions, references to existing category and product IDs, shared equipment collection, and risk-assessment note. Industry details are statically generated. The guided selector and catalog filters use standard GET forms and URL parameters; M4 adds no Client Components or dependencies. See [the industry discovery contract](docs/industries.md).

`src/features/quote/request` holds shared input validation and server-only delivery, submission, and HTTP protections. `/api/quote` accepts requests only after server validation and delegates delivery through a small adapter interface. Optional Resend integration uses native `fetch`; no email SDK is installed. `/quote` evaluates availability at request time and reports success only after provider acceptance. See [quotation configuration, security, tests, and limits](docs/quotation-requests.md). Copy `.env.example` to `.env.local` and supply an actual verified sender and recipient only when enabling email delivery. Environment files remain ignored.

`design-reference.jpeg` is the supplied design reference, retained outside the public assets directory.

## Existing M3–M5 functionality

The catalog contains 15 clearly labeled fictional demonstration products, three in each shared protection category. Product names, descriptions, example specifications, and example variants are structured for later replacement with verified manufacturer data. Original category illustrations are placeholders, not product photography. No brands, prices, inventory, certifications, or safety performance claims are asserted.

The five industry guides cover Construction, Manufacturing, Logistics & Warehousing, Electrical Work, and Industrial Maintenance. Each includes general workplace considerations, relevant category links, existing demo product cards, and a link to prepare a quote. The catalog combines industry, category, and keyword filters; Find Your Protection shows a collection after one industry selection. These are editorial browsing suggestions, not determinations of required or suitable PPE. Final equipment selection depends on workplace risk assessment and applicable safety requirements.

The quote selection supports adding, quantity changes (1–999), removal, selected-product counts, and browser persistence. The form adds business contact details, optional requirements, and required purpose-specific privacy consent. Contact fields stay in page memory and are not persisted to browser storage. Requests contain up to 20 unique products and 5,000 total units. Variants remain informational.

Email submission requires a configured provider and destination. Failures preserve form input and selections; identical retries reuse the delivery idempotency key. Confirmed acceptance clears submitted selections while preserving concurrent changes from another tab. Success means the email provider accepted the request, not guaranteed inbox delivery or an order. No database, accounts, checkout, payments, CRM, or deployment infrastructure is added. Real manufacturer data and photography remain pending.
