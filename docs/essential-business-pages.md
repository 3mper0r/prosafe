# M6 — Essential business pages

## Implementation

- `/about`: workplace safety mission, official slogan “SAFETY WITHOUT COMPROMISE.”, B2B distribution focus, and Kosovo as the initial market.
- `/brands`: manufacturer partnership approach and an explicitly empty future verified-partner directory. No manufacturer names, logos, agreements, certifications, or availability claims are invented.
- `/contact`: business quotation guidance, general inquiry information, and manufacturer partnership information. Quotations link to the existing `/quote` workflow. Direct contact and partnership channels are explicitly pending.
- `/privacy`: visibly incomplete draft describing the current quotation data flow and browser storage, with business-specific processing information marked for completion.
- `/imprint`: visibly incomplete draft listing operator identity, registration, tax, and contact information to verify before publication.

`BusinessPage` shares the existing header, footer, skip link, catalog page sizing, and typography. A small CSS module adds responsive content sections using existing charcoal, orange, font, and border tokens. All five pages are Server Components with route-specific metadata. Legal drafts are `noindex, follow` until completed; this does not restrict access or constitute legal approval.

The header now links Brands, About, and Contact to their routes, including the existing mobile dialog. Current routes receive `aria-current`. The footer links all five pages and identifies legal drafts. Existing homepage anchors remain usable; About and Contact sections gain page links. The existing quotation form links the privacy draft outside its disabled fieldset, so it is reachable even when delivery is unavailable.

No dependencies, backend endpoints, infrastructure, CMS, authentication, or payments were added. The quote service and selection store are unchanged. Approved homepage photography and hero composition are unchanged. M7 is not started. No commit or push is part of this milestone.

## Missing information and launch blockers

| Area | Required before launch |
| --- | --- |
| Operator | Verified legal entity name, legal form, registered address, authorized representative and role. Kosovo is the initial market, not proof of registration or a business address. |
| Registration | Verified business number and register; tax/VAT identifier and licensing or supervisory details where applicable. Confirm applicability rather than inventing identifiers. |
| Public contact | Approved public business email, phone, correspondence address, and manufacturer partnership channel. No direct contact channel is currently published. |
| Privacy | Identify the responsible entity and privacy contact; approve purposes and legal bases, recipients and processors, hosting/log/storage inventory, processing locations and any transfer arrangements, retention/deletion schedules, applicable rights and request procedures, and complaint authority. Assign an effective date after review. |
| Legal review | Complete and approve the privacy and imprint drafts against the actual business and deployment; remove draft labels and reconsider `noindex` only when finalized. |
| Quote operations (existing M5) | Configure a real verified sender, controlled recipient and supported provider; verify live delivery. Finish business-specific privacy information and mailbox retention/access arrangements before collecting real inquiries. See [quotation operations](quotation-requests.md). |
| Manufacturers and catalog (existing) | Obtain and verify agreements, permission to publish names/logos, and approved real product records before replacing demonstration content. An empty brand directory does not imply partnerships. |

The draft pages intentionally contain completion instructions rather than legal claims. No jurisdiction-specific compliance or legal sufficiency is asserted.

## Validation

- `npm run typecheck`: passed.
- `npm run lint`: passed with zero warnings.
- `npm run test:quote`: passed, both existing test files (25 defined service/HTTP cases); no real email was sent.
- `npm run build`: passed with all five new routes statically generated. The sandbox initially prevented Next.js from reading its TypeScript subprocess output; running the same production build with approved execution outside the sandbox succeeded.
- `git diff --check`: passed. The diff contains no changes to approved photography, hero/portrait components, dependencies, quotation delivery logic, or selection storage.

Chromium checks against the production server passed at 1440, 1024, 768, 390, 375, and 320 pixels for every new page. All returned HTTP 200, had one main heading, route-specific title/description, all five footer destinations, and no horizontal overflow. Both legal pages emitted `noindex`. Existing home, products, industries, quote, protection explorer, and guided selector pages were also checked for overflow at 1440, 390, and 320 pixels: 48 route/viewport checks in total.

Ten axe-core scans (the five new pages at desktop and mobile widths) reported zero WCAG 2 A/AA and WCAG 2.1 AA violations. Keyboard checks covered the skip link, mobile dialog focus wrapping, Escape dismissal, and trigger focus restoration. Interaction checks covered all new mobile destinations and active states, footer destinations, the manufacturer partnership anchor, contact-to-quote navigation, disabled unconfigured delivery, the quotation privacy link, and product/quantity persistence across navigation. No JavaScript exceptions were recorded. The first Escape attempt used incomplete CDP keyboard input; correcting the test event allowed the interaction checks to pass without application changes.

Full-page desktop/mobile screenshots were captured in `/tmp/prosafe-m6-<page>-<width>.png`, with machine-readable results in `/tmp/prosafe-m6-qa-results.json`. Representative screenshots were visually inspected. The temporary browser harness uses the already-installed browser and axe-core; it adds no repository dependency.

Not verified: Safari/Firefox, physical devices, manual screen-reader behavior, real email delivery, or finalized legal/business information. Automated accessibility checks do not replace a manual accessibility audit.
