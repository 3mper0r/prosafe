# M1.2 campaign photography integration

Both `design-reference.jpeg` and the user-supplied campaign photograph were inspected before implementation. The 1440px browser capture was then viewed directly alongside the reference.

## Focused changes

- Replaced the SVG worker placeholder and pending label with `WorkerPortrait`, a Server Component using Next.js Image.
- Retained the approved central-right worker slot and the original image proportions. `object-fit: cover` and a 75% horizontal focal position preserve the face, safety glasses, and full helmet.
- Kept the worker within the hero's charcoal backdrop, with subtle outer-edge feathering and near-black blending. No color filter, artificial lighting, or image-file editing was applied.
- Accounted for the landscape-to-portrait crop in responsive image sizing so the browser requests enough detail for the full cover rendering.
- Left navigation, sidebar, headline typography and wording, technical information, geometric accents, editorial mosaic, and lower sections unchanged.

## Browser verification

Screenshots were captured and inspected at 1440px, 768px, and 390px, with an additional 375px check. Tests confirmed the photograph decoded successfully, the placeholder was absent, the helmet and face remained inside the unfeathered crop, and the image used proportional cover sizing without a color filter. The heading and header geometry matched the M1.1 browser baseline at every tested width.

No horizontal document overflow was found. Existing keyboard menu behavior, focus return, anchor destinations, and reduced-motion preferences also passed. Verification used Chromium; Safari and Firefox were not tested.

Final validation executed successfully: `npm run typecheck`, `npm run lint`, and `npm run build`. The development homepage returned HTTP 200 during screenshot capture. The original campaign PNG's SHA-256 remained unchanged.

## Comparison and remaining visual differences

The supplied photograph restores the reference's central-right profile worker, orange helmet accent, dark industrial atmosphere, and separation from the headline and information panel. Initial captures exposed a faint top boundary and insufficient responsive-image resolution; edge blending and cover-aware image sizing were refined. The bottom fade now stays within the hero backdrop, avoiding a dark rectangular edge above the mosaic.

The custom photograph naturally differs from the reference in the worker's pose, visible safety glasses, and jacket detail. The approved three-line PROSAFE headline, category copy, and relevant equipment/material mosaic remain the M1.1 adaptation rather than reproducing the reference's unrelated products and claims. No further homepage redesign was performed.
