# M3 catalog and quote preparation

## Routes and data

- `/products`: server-rendered product grid; standard GET form with `q` and `category` parameters. Search is case-insensitive across names, identifiers, descriptions, category labels, and keywords. Every search term must match; category and search combine. Invalid category IDs fall back to all categories with an explanation.
- `/products/[slug]`: statically generated product details with metadata, image list, identifier, description, illustrative specifications, optional example variants, and Add to Quote. Unknown slugs return a 404.
- `/quote`: review the browser's saved selection and the M5 B2B request form. Add from a card or detail page, edit quantities, or remove entries. Submission is available only with configured email delivery; see [quotation requests](quotation-requests.md).

`src/lib/product-categories.ts` remains the single category definition. Existing IDs are preserved. Catalog labels and the URL helper extend that shared model; the explorer receives its implemented links through the existing `catalogLinks` prop.

`src/features/catalog/types.ts` defines the product contract. `products.ts` holds 15 fictional demonstration entries, three per category. `status: "demonstration"` makes their provenance explicit. All pages include a demonstration notice, and each card includes a demo label. No pricing, inventory, manufacturers, endorsements, or certified safety performance is invented.

To introduce real products later, replace the records and category illustration paths with approved manufacturer data and images. Preserve stable product IDs for the same item, use new IDs for different items, and expand the status model deliberately when verified inventory becomes available. Variant examples are informational in M3; a quote item records only a product and quantity.

## Browser storage contract

Key: `prosafe.quote.v1`

```json
{
  "version": 1,
  "items": [
    { "productId": "DEMO-HD-001", "quantity": 2 }
  ]
}
```

The store validates unknown JSON at the boundary, accepts known product IDs and positive integer quantities, caps quantities at 999, and merges duplicate IDs. Unsupported versions and malformed payloads become an empty selection. No personal information is collected or stored.

`useSyncExternalStore` provides a stable empty server snapshot for hydration, then reads browser storage. Controls synchronize immediately within a tab, and the native storage event updates other open tabs. Repeated adds increment a product quantity; the header counts distinct selected products, while the review also shows total units. If storage access fails, the in-memory selection remains usable and a visible notice explains its limits. A selection is local to a browser and origin; it does not synchronize between devices.

## Interaction boundaries

Listing and detail content remain Server Components. Navigation, add controls, the quote counter, quote review, and the M5 request form use browser interactivity. M5 adds the quotation Route Handler and optional delivery adapter, with no new dependencies, authentication, payments, or checkout. Existing focus styling and reduced-motion preferences apply to the interactions.

M5 adds optional configured submission while preserving the M3 product-and-quantity storage contract. Contact details are not added to this browser storage record.

## Validation

`npm run typecheck`, `npm run lint`, and `npm run build` passed. The production build was run outside the filesystem/network sandbox because its TypeScript child-process output could not be captured correctly inside it.

Chromium checks against the production server passed at 1440, 1024, 768, 390, and 375 pixels. Coverage included all categories, keyword and combined search, empty/reset states, all 15 detail pages and images, unknown-product 404, card and explorer links, repeated adds, quantity input and buttons, focus retention, bounds, removal, reload persistence, native cross-tab synchronization, corrupt storage, obsolete IDs, and blocked storage fallback. Native phone search/category interactions and direct quantity editing were checked again against the final build. No JavaScript exceptions or horizontal overflow were observed.

Desktop, tablet, and phone screenshots were captured and inspected. The hero source hash is unchanged. No dependencies were added. Safari, Firefox, physical devices, and a manual screen-reader audit were not verified in this environment.
