# M1.1 visual review

Historical review: the missing campaign photograph described below was supplied and integrated in M1.2. See [the current review](m12-visual-review.md).

The supplied `design-reference.jpeg` was inspected before implementation and viewed directly alongside the first 1440px browser capture. The screenshot is not included in the rendered site.

## Composition changes

- Spacious framed header with its brand compartment aligned to the desktop sidebar divider.
- Orange quarter-circle geometry at the grid intersection, retaining the existing PROSAFE shield and wordmark.
- Lightweight Manrope 200 headline on the left; an independent profile-worker asset slot in the center-right; technical category information in the right column.
- An inset PPE study, a lower metal-texture tile, a broad information panel, and a raised orange material-pattern tile form the asymmetric lower mosaic.
- Mobile rearranges the sidebar into a compact identity strip, moves technical copy below the headline, keeps the portrait slot beside that copy, and staggers the mosaic into a smaller grid.

## Issues found and corrected during comparison

1. The header brand divider initially missed the sidebar divider by approximately 5px. Corrected the header's grid calculation and verified alignment in the browser.
2. The mosaic initially obscured the desktop placeholder caption. Moved the explicit asset-status label above the worker drawing.
3. A tablet line-break override joined two technical headings. Removed it to preserve clear separation.
4. The information panel needed more vertical room for its link. Increased mosaic row heights and added a browser assertion that the link stays inside the panel.

## Remaining differences

- The campaign photograph is missing. A labeled schematic placeholder occupies its intended space; it cannot reproduce the reference's photographic lighting, material detail, or cinematic realism. A matching licensed photograph is required before final visual approval.
- The required three-line PROSAFE headline differs in word length and line count from the reference's four-line headline, so the letter scale and vertical rhythm are adapted rather than copied.
- The mosaic uses relevant licensed PPE and tread-plate photography plus an original grip-pattern illustration, rather than the reference's proprietary product imagery, watch, or sustainability claims.
- Lower M1 homepage sections retain their previous visual treatment and functionality.

Browser captures and automated layout/keyboard results are produced at 1440px, 768px, 390px, and an additional 375px width. Verification uses Chromium; Safari and Firefox are not verified. Passing technical checks does not resolve the missing photography or constitute final visual approval.
