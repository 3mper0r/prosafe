# M5 quotation requests

## Architecture

`/quote` extends the existing product-and-quantity selection with company, contact, business email, optional phone/city/requirements, and required purpose-specific privacy consent. Contact details live only in the current form; localStorage continues to contain product IDs and quantities only.

`/api/quote` is a Next.js Route Handler. GET returns request-time delivery availability and a signed submission-session token with `Cache-Control: no-store`. POST checks the request boundary, then calls the submission service. Missing or invalid delivery configuration disables the form and returns unavailable server-side; nothing is silently discarded or recorded as successful.

The feature modules under `src/features/quote/request/` separate concerns:

- `limits.ts`, `types.ts`, and `validation.ts`: shared client/server limits, normalized input contract, and validation.
- `http.server.ts`: origin checks, session tokens, basic attempt limits, streaming body cap, and sanitized HTTP responses.
- `submission.server.ts`: server catalog resolution, payload-bound request identifiers, and delivery acceptance.
- `delivery.server.ts`: the small `QuoteDelivery` interface and optional Resend adapter using native fetch. The URL is fixed to `https://api.resend.com/emails`; configuration cannot create an arbitrary HTTP relay.

The server ignores client-supplied product names, descriptions, and specifications. It resolves IDs against the canonical catalog and constructs outgoing product information itself. Demo products remain explicitly labeled demonstrations in outgoing messages.

## Delivery configuration

No email account, destination, credentials, or external services are included. Configure these server-only environment variables to enable delivery:

| Variable | Purpose |
| --- | --- |
| `QUOTE_DELIVERY_PROVIDER` | Set to `resend`; other values leave submission unavailable. |
| `QUOTE_RESEND_API_KEY` | A valid, least-privilege Resend sending key. Never expose it with a `NEXT_PUBLIC_` prefix. |
| `QUOTE_FROM_EMAIL` | A single sender mailbox on a domain verified in the configured Resend account. |
| `QUOTE_TO_EMAIL` | The real operator-controlled mailbox that will receive quotation requests. |
| `QUOTE_PUBLIC_ORIGIN` | Exact public origin, such as the site's actual HTTPS scheme and hostname, with no path or trailing slash. Set this behind reverse proxies or when the public and internal origins differ. HTTP is accepted only for `localhost`/`127.0.0.1` development. |
| `QUOTE_FORM_SECRET` | Optional shared random secret of at least 32 characters. Set the same strong secret on every instance for stable token validation across restarts/replicas. Without it, one process uses an ephemeral random secret. |

Use `.env.local` for local configuration; it is ignored by Git. The tracked `.env.example` contains empty configuration fields, not credentials or invented PROSAFE addresses. Restart the process after changing its environment. Availability is evaluated at request time rather than embedded permanently in the production build.

The adapter uses a static subject, the configured sender/recipient, and the validated contact email as Reply-To. It sends plain text and HTML with user content escaped, aborts after ten seconds, rejects redirects, and requires a successful provider response containing an acknowledgement ID. Errors shown to customers are generic; provider diagnostics and personal details are not logged.

Success means the configured provider accepted the request for delivery. It does not guarantee inbox arrival, a business response, availability, or an order. Delivery failures and uncertain outcomes preserve the form and selection. Retry unchanged requests with the same request identifier to reduce duplicate delivery; changing the request creates a new identifier.

The integration was checked against Resend's official [Send Email API](https://resend.com/docs/api-reference/emails/send-email) and [Idempotency Keys](https://resend.com/docs/dashboard/emails/idempotency-keys) documentation. Resend supports the `Idempotency-Key` header and retains keys for 24 hours. No SDK dependency is added.

## Validation and limits

| Input | Limit |
| --- | --- |
| Company / contact | 120 / 100 characters; required |
| Business email | 254 characters; required, validated format |
| Phone / city | 40 / 160 characters; optional |
| Additional requirements | 3,000 characters; optional |
| Selected items | 1–20 distinct known product IDs |
| Quantity | Integer 1–999 for each item; at most 5,000 total units |
| JSON payload | 32,768 bytes, enforced while reading the body even without Content-Length |

The server normalizes text, rejects unsupported controls and multiline values in single-line fields, validates actual types, and rejects duplicates rather than silently merging them. Business email does not exclude ordinary valid free-mail domains used by small businesses. Consent must be the boolean `true`.

## Basic abuse and duplicate protection

- POST requires the expected Origin, rejects cross-site fetches, and accepts JSON only. Without a configured public origin, it compares the browser Origin with the request URL's scheme and actual Host header because Next.js may use an internal hostname in its URL. Forwarded host/protocol headers are not trusted. Pin `QUOTE_PUBLIC_ORIGIN` on public deployments and TLS-terminating proxies.
- Session tokens use HMAC-SHA256, expire after two hours, and require a two-second age before submission. The hidden honeypot must be empty.
- Each process allows five attempts per signed token and 50 attempts globally per ten-minute window. Limited responses include Retry-After. Token buckets are bounded and expired entries are removed.
- A UUID identifies a submission. The service stores a SHA-256 normalized-payload fingerprint, pending operation, and acceptance result in a bounded 1,000-entry process-local registry for up to 24 hours. Completed entries do not retain raw contact fields. Same-key changed payloads are rejected; concurrent matching submissions share one delivery attempt. Failed matching requests may retry.
- The same stable key is sent to Resend to complement process-local deduplication when a response is lost or an instance restarts. Accepted requests are never inferred merely from a local status message.

Consent describes using the supplied details to handle this enquiry. It is not marketing consent. An operator enabling real delivery must control the recipient mailbox, restrict access, and establish appropriate privacy information and retention practices for their business.

## Local testing

Use the project's Node.js version and run:

```sh
npm run test:quote
npm run typecheck
npm run lint
npm run build
```

The quote tests use the installed TypeScript compiler and Node's test runner, with temporary compiled output outside the repository. They inject recording/failing delivery adapters and mock native fetch; no real email or network destination is used. HTTP tests use a fake clock to exercise signed-token age/expiry and rate windows without delays. There is no environment variable that enables a fake successful production submission.

Tests cover valid/invalid fields, product and quantity manipulation, duplicates and limits, missing configuration, escaping, canonical product resolution, rejected/accepted delivery, unchanged retries, concurrent requests, changed-payload conflicts, origin/content-type checks, forged/expired tokens, streamed payload caps, and attempt limits. Browser verification is reported separately after execution.

M5 verification: typecheck, ESLint, and production build passed. All 25 individual service/HTTP tests passed (11 service and 14 HTTP). Chromium browser checks passed at 1440, 768, 390, and 375 pixels, with screenshots inspected and no horizontal overflow or JavaScript exceptions. Tests covered required/email/consent validation, disabled unconfigured delivery, empty selection, pending controls, failure retention, unchanged retries, confirmation focus, product clearing, keyboard/touch controls, and preservation of concurrent selection changes. A recording test adapter accepted fixture requests; an accepted request with a lost HTTP response was retried without another adapter delivery. The browser API was intercepted locally for these delivery scenarios; no real email was sent and no production fake-success mode exists. The unconfigured production endpoint was also tested directly and returned 503. Live Resend credentials, inbox delivery, Safari/Firefox, physical devices, and a manual screen-reader audit were not verified.

## Operational limits

There is no database, durable request archive, CRM integration, or cross-device request history. Process-local deduplication and throttling reset on restart and are not distributed guarantees; the provider's idempotency window is finite. The basic honeypot/timing/global limits do not replace operational abuse monitoring, and a shared global limit can temporarily affect legitimate customers during abuse. A shared form secret is necessary across replicas; rotating it invalidates existing sessions.

Without durable storage or delivery webhooks, the application cannot reconcile long-term delivery outcomes, guarantee exactly-once delivery indefinitely, or confirm recipient receipt. The configured provider and mailbox handle accepted request data under the operator's arrangements. Catalog data and illustrations remain demonstrations until approved manufacturer records replace them.
