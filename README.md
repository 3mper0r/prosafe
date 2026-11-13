# PROSAFE

**Safety Without Compromise.** Workplace protection solutions for businesses, initially in Kosovo.

M4 adds industry discovery at `/industries` and a one-step guided experience at `/find-your-protection`. Both reuse the existing demonstration catalog and browser-local quote selection. The approved homepage composition and campaign photograph are preserved.

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
```

The type check generates Next.js route types before running `tsc --noEmit`, so it also works on a fresh clone. Next.js maintains the ignored `next-env.d.ts` file.

## Architecture

- `src/app`: App Router routes, root layout, SEO metadata, and global styles. Components render on the server by default.
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

`design-reference.jpeg` is the supplied design reference, retained outside the public assets directory.

## M4 scope

The catalog contains 15 clearly labeled fictional demonstration products, three in each shared protection category. Product names, descriptions, example specifications, and example variants are structured for later replacement with verified manufacturer data. Original category illustrations are placeholders, not product photography. No brands, prices, inventory, certifications, or safety performance claims are asserted.

The five industry guides cover Construction, Manufacturing, Logistics & Warehousing, Electrical Work, and Industrial Maintenance. Each includes general workplace considerations, relevant category links, existing demo product cards, and a link to prepare a quote. The catalog combines industry, category, and keyword filters; Find Your Protection shows a collection after one industry selection. These are editorial browsing suggestions, not determinations of required or suitable PPE. Final equipment selection depends on workplace risk assessment and applicable safety requirements.

The existing quote selection supports adding, quantity changes (1–999), removal, selected-product counts, and browser persistence. Variants are informational; the current selection records products and quantities only. Nothing is submitted. Quote submission belongs to M5 and requires separate approval. The full-body explorer photograph, real manufacturer data and photography, backend, authentication, checkout, and deployment infrastructure remain outside this milestone.
