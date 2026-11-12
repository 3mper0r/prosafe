# PROSAFE

**Safety Without Compromise.** Workplace protection solutions for businesses, initially in Kosovo.

M2 adds a dedicated interactive protection explorer at `/protection-explorer`. The approved M1.3 homepage and campaign photograph are preserved; the existing protection section now links to the feature.

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

`src/features/protection-explorer` owns zone selection, accessible controls, its temporary full-body illustration, and responsive styling. `src/lib/product-categories.ts` supplies the stable shared category identifiers and metadata for later catalog integration. See [the explorer contract and interaction notes](docs/protection-explorer.md). Future catalog and quotation behavior belongs in `src/features/catalog` and `src/features/quote`.

`design-reference.jpeg` is the supplied design reference, retained outside the public assets directory.

## M2 scope

The homepage protection section opens the functional five-zone explorer. It supports desktop hover/click, touch, and keyboard selection, with category details and an explicit temporary catalog state. Brands, quotation, and contact availability remain marked as pending launch.

The full catalog, quotation workflow, backend, database, authentication, payments, and deployment infrastructure remain outside this milestone. Catalog browse controls are disabled until category routes exist; no broken catalog links are rendered. The full-body worker illustration is explicitly temporary. Further development requires separate approval.
