# M2 protection explorer

The repository contained only a homepage “coming soon” note before M2. The implemented feature lives at `/protection-explorer`, reached through the existing homepage protection section. Returning to PROSAFE restores `/#protection`.

## Module boundaries

- `src/app/protection-explorer/page.tsx`: Server Component route, metadata, introduction, and home link.
- `src/features/protection-explorer/protection-explorer.tsx`: isolated Client Component with local selection state; no persistence, backend, or external services.
- `zones.ts`: typed zone-to-category mapping and percentage-based hotspot positions.
- `worker-illustration.tsx`: original full-body placeholder, clearly labeled in the UI. Final full-body photography is still needed. The approved homepage campaign photograph is unchanged.
- `protection-explorer.module.css`: responsive layout, visible selection/focus, and restrained reduced-motion-aware transitions.
- `src/lib/product-categories.ts`: shared category names, descriptions, and stable identifiers. Future catalog code can import this module without depending on the explorer.

## Stable catalog contract

| Zone  | Category            | Stable identifier     |
| ----- | ------------------- | --------------------- |
| HEAD  | Safety helmets      | `safety-helmets`      |
| EYES  | Protective eyewear  | `protective-eyewear`  |
| HANDS | Protective gloves   | `protective-gloves`   |
| BODY  | Protective clothing | `protective-clothing` |
| FEET  | Safety footwear     | `safety-footwear`     |

Import `ProductCategoryId` for the identifier union and `PRODUCT_CATEGORIES` for metadata. Treat identifiers as a public contract when adding catalog data.

Use `<ProtectionExplorer />` to render the feature. Its optional `catalogLinks: CatalogCategoryLinks` prop accepts implemented internal destinations keyed by the shared category IDs. Missing entries render a disabled category-specific browse button and a visible “Catalog coming soon” explanation. M3 supplies all five destinations using `catalogCategoryHref(id)`, opening `/products?category=<stable-id>`. The reusable component's selection behavior is unchanged.

## Interaction and accessibility

- HEAD is selected initially. Hover with a mouse, click, tap, or focus a worker hotspot to select its category. Pointer exit does not clear selection.
- A native radio fieldset offers the same five choices with standard Tab, Space, and arrow-key behavior. Radio inputs and hotspot buttons stay synchronized.
- Hotspots have descriptive accessible names, a 44px minimum target, `aria-pressed`, and `aria-controls` pointing to a unique details region.
- Category name and description update in a polite live region. `useId` isolates radio names and region IDs across reusable instances.
- On phones, the selector stays available while scrolling and a “View [category]” anchor brings the details into view without hiding the heading behind the selector.
- CSS respects the site's reduced-motion baseline. No animation dependency was added.

## Verification

Run `npm run typecheck`, `npm run lint`, and `npm run build`. Browser interaction checks cover all five categories at 1440px, 768px, 390px, and 375px, including mouse hover/click, touch hotspots/radio labels, native radio arrow wrapping, hotspot focus/Enter, disabled catalog actions, mobile selection navigation, route entry/return, overflow, target spacing, and reduced motion. Screenshots use the production build to verify the shipped client behavior.

M2 results: all three validation commands passed, and the listed browser checks passed with no JavaScript exceptions. Hash checks confirmed the approved hero, campaign photograph, navigation, application shell, global styles, and dependency manifests were preserved. The homepage overview changed only to expose the explorer entry link.

M3 connects every category to a working filtered catalog view. Final full-body photography is still pending. Safari/Firefox and a manual assistive-technology audit are outside the Chromium browser verification performed here.
