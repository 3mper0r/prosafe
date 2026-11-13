# M4 industry discovery

## Routes and shared model

- `/industries` lists the five industries, their descriptions, relevant protection categories, guide links, and filtered demo catalog links.
- `/industries/[slug]` statically generates each introduction, common workplace considerations, category links, and equipment collection. Unknown slugs return a 404.
- `/find-your-protection` offers one required native industry selector. Submitting opens `?industry=<slug>#discovery-results`, rendering relevant categories and demo products on the server. No industry is preselected. Unknown or repeated industry parameters show an unselected state with an explanation.
- `/products?industry=<slug>` filters the existing catalog to the industry's editorial demo collection. `industry`, `category`, and `q` combine; the form retains all active selections. Empty results offer a return to that industry's examples, and Clear filters resets every field. Invalid industry IDs fall back to all industries with an explanation.

`src/features/industries/industries.ts` is the only industry definition. It references `ProductCategoryId` from the shared category model and product IDs from the M3 catalog. `getIndustryProducts` resolves references against `PRODUCTS`; there are no copied product records. `industryCatalogHref` builds consistent category-and-industry links. The collections intentionally differ, rather than displaying every catalog product for every industry.

| Industry | Slug | Category count | Demo product count |
| --- | --- | --- | --- |
| Construction | `construction` | 5 | 5 |
| Manufacturing | `manufacturing` | 4 | 6 |
| Logistics & Warehousing | `logistics-warehousing` | 3 | 5 |
| Electrical Work | `electrical-work` | 5 | 5 |
| Industrial Maintenance | `industrial-maintenance` | 5 | 5 |

`IndustryEquipment` reuses M3's `ProductCard`, `DemoNotice`, product grid, and Add to Quote. ProductCard accepts an optional heading level so nested equipment collections have a coherent heading hierarchy. The quote store, data model, storage key, and existing product records are unchanged. Industry selection itself is held only in the URL.

## Content boundaries

The collections are editorial starting points for catalog discovery. Selecting an industry does not establish legal requirements, task suitability, or complete protection. The shared note states that final equipment selection depends on workplace risk assessment and applicable safety requirements. It is visible on the index, details, guided discovery, and industry-filtered catalog views.

The Electrical Work collection additionally explains that the generic demos have no verified electrical or arc protection ratings and must not be used to select equipment for live electrical work. No certifications, ratings, or new products are introduced.

The general selection principles were checked against [EU-OSHA's PPE overview](https://oshwiki.osha.europa.eu/en/themes/ppe) and [HSE's PPE selection and use guidance](https://www.hse.gov.uk/ppe/selection-and-use.htm). These inform the editorial framing around assessment, fit, compatibility, and verified product information; they are not presented as a statement of Kosovo law. The note links to the EU-OSHA overview. The short industry considerations are prompts to review the workplace, not a task assessment or a complete safety procedure.

## Scope

All new pages and feature components are Server Components. Native forms and links support keyboard use and work without JavaScript; existing quote controls still require JavaScript. Existing focus and reduced-motion rules apply. No dependencies, new photography, backend services, or submission workflow are added. The homepage links to all five industries and guided discovery while retaining the approved hero photography and styles.

## Validation

`npm run typecheck`, `npm run lint`, and `npm run build` passed. The production build ran outside the sandbox to support Next.js's TypeScript child processes.

Chromium production-browser checks passed at 1440, 1024, 768, 390, and 375 pixels. They covered all five index/detail/guide collections, existing product identity and category links, unknown-industry 404, combined industry/category/keyword filters, retained form values, empty and invalid states, contextual reset, and clear-all behavior. Existing quote items survived discovery; repeated adds, product counts, quantity editing, removal, and reload persistence passed. Homepage and mobile navigation, keyboard selection/submit/focus, and reduced motion passed. Guided selection, category navigation, and catalog filtering also passed with page JavaScript disabled.

Desktop, tablet, and mobile screenshots were captured and inspected. No horizontal overflow or JavaScript exceptions were observed. Product records, quote feature files, dependency manifests, approved hero photography, and portrait styling are unchanged. Safari, Firefox, physical devices, and a manual screen-reader audit were not verified.
