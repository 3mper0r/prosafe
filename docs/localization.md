# Localization (Albanian and English)

PROSAFE is bilingual. Albanian (`sq`) is the default language and is served without a URL prefix; English (`en`) lives under `/en`. Both languages have the same 28 pages, so every URL has exactly one equivalent in the other language:

| Albanian | English |
| --- | --- |
| `/` | `/en` |
| `/products?q=helmet` | `/en/products?q=helmet` |
| `/industries/construction` | `/en/industries/construction` |

URL segments stay in English in both languages (decision M9.0), so switching language only adds or removes `/en`.

Nothing redirects by language: no middleware, no `Accept-Language` detection, no cookie. The URL alone decides what is displayed.

## Routing

Two root layouts render the same views:

- `src/app/(sq)/…` serves the Albanian pages. The `(sq)` route group adds no URL segment.
- `src/app/en/…` serves the English pages.

Each route file is a thin wrapper: it passes its locale to a shared view in `src/views` and exports that view's metadata:

```tsx
// src/app/en/products/page.tsx
export const metadata = productsMetadata("en");
export default async function Page({ searchParams }: PageProps<"/en/products">) {
  return <ProductsView locale="en" searchParams={await searchParams} />;
}
```

A new page needs a view in `src/views` and one wrapper in each tree. Both root layouts use `src/app/root-document.tsx`, which sets `<html lang>`, the site-wide metadata and the client message provider.

Path helpers live in `src/i18n/paths.ts`:
- `localizePath(locale, path)` turns an unprefixed internal path (`/products`) into the path for a language (`/en/products`).
- `stripLocale` and `getPathLocale` go the other way.

Internal links always go through `localizePath`. The QA crawl checks that no English page links to an Albanian page outside the language switcher, and vice versa.

## Interface text

- `src/i18n/dictionaries/en.ts` defines the `Dictionary` type from the English text.
- `src/i18n/dictionaries/sq.ts` must satisfy it (`satisfies Dictionary`), so a missing or extra key fails the type check.
- Server components read text with `getDictionary(locale)`.
- Client components receive a smaller, serializable subset (`getClientMessages(locale)`) through `LocaleProvider` and read it with `useMessages()` (`src/i18n/locale-context.tsx`).
- Placeholders such as `{name}` or `{max}` are filled by `formatMessage` (`src/i18n/format.ts`). Translations must keep every placeholder.
- Multi-line headings are arrays of lines rendered by `Lines` (`src/i18n/lines.tsx`).

Kept in English in both languages: the slogan "SAFETY WITHOUT COMPROMISE.", the PROSAFE name, product codes, and the titles of English-only external sources, which Albanian pages mark "(në anglisht)".

## Catalog data

The catalog separates language-independent data from text:

| Data | Location |
| --- | --- |
| Product IDs, slugs, categories, variants, industry and zone relations | `src/features/catalog/products.ts`, `src/features/industries/industries.ts`, `src/lib/product-categories.ts`, `src/features/protection-explorer/zones.ts` |
| Names, descriptions, specifications text, keywords, industry guides, category labels, zone labels | `src/content/en.ts`, `src/content/sq.ts` (type `CatalogContent` in `src/content/types.ts`) |
| Merged catalog for one language | `getCatalog(locale)` in `src/content/catalog.ts` |

The content records are keyed by the core identifiers, so a product or industry without text in both languages is a type error.

### Adding a product

1. Add its record to `PRODUCT_RECORDS` in `src/features/catalog/products.ts`: ID, slug, category and variants. Slugs are English in both languages.
2. Add its text to `products` in **both** `src/content/en.ts` and `src/content/sq.ts`: name, summary, description, construction, format and keywords.
3. Link it from industries if needed, in `src/features/industries/industries.ts`.
4. Run `npm run typecheck` and `npm test`. The SEO tests derive the indexable pages and sitemap from the records, so the new product appears in both languages automatically.

### Adding an industry

1. Add its record to `INDUSTRY_RECORDS` in `src/features/industries/industries.ts`: slug, category IDs and product IDs.
2. Add its text to `industries` in both content files: name, description, introduction and considerations.
3. Run the checks as above.

New text should go through the same native-speaker review as the existing translation ([translation review](translation-review-sq.md)).

## Search

Catalog search (`src/features/catalog/search.ts`) ignores case and diacritics, so "kepuce" finds "Këpucë", and it needs every search word to match.

In Albanian, a product is also found by its English name, English keywords and English category label, plus the aliases PMP, PPE and "pajisje mbrojtëse personale". Visitors often search with English trade terms. English search only uses English text. The extra languages per locale are configured in `ALSO_SEARCH` in `src/content/catalog.ts`.

## Language switcher

`src/components/layout/language-switcher.tsx` renders "SQ / EN" in the desktop header and in the mobile menu.

- Each option is a real link to the equivalent page, preserving the query string and fragment. The current language is marked with `aria-current`.
- Each option carries `hreflang` and `lang`, and its accessible name includes the language name ("Shqip", "English").
- On a 404 page, the switcher links to the same path in the other language, which is also a 404.

### Preference persistence

Choosing a language with the switcher saves it in `localStorage` under `prosafe.locale.v1` (`src/i18n/preference.ts`). Nothing reads it to redirect or change what is displayed. It is kept for later features that need a separate decision. Blocked storage is ignored, and navigation never depends on it.

## Quotation

- The quotation page, form labels, status messages and all 16 validation messages are localized.
- Validation returns error codes. The browser turns them into text with the dictionary's `quote.form.validation` templates, and server errors arrive as the same codes. A test fails if a translated validation message has no rule that produces it.
- The selection (`prosafe.quote.v1`) stores only product IDs and quantities, so it survives a language switch.
- Requests include the visitor's language.
- The internal quotation email stays in English, with canonical product IDs and English names, and states the preferred language.

## SEO

Covered in [search configuration](cloudflare-deployment.md#search-configuration).

In summary, the eligible pages get:
- a self-referencing canonical URL
- `hreflang` alternates for `sq`, `en` and `x-default` (Albanian)
- Open Graph locales `sq_AL` / `en_US`
- a 56-URL sitemap

All of these appear only when configured, and indexing needs a separate explicit opt-in. The logic lives in `src/i18n/seo.ts` and `src/lib/site-url.ts`.

## Known limitations

- **Translation review:** the Albanian translation is pending native-speaker review ([review document](translation-review-sq.md)). The privacy notice and imprint are legal drafts in both languages.
- **No automatic language choice:** visitors on `/` always see Albanian until they use the switcher.
- **Generic image text:** demonstration illustrations keep English captions inside the images, and product images share one generic alt text per language.
- **vinext 404 metadata:**
  - The general 404 page shows the site's default title instead of "Faqja nuk u gjet / Page not found", because vinext does not apply root `not-found` metadata. Next.js does.
  - Product and industry 404s repeat the same `<title>` twice.
  - Both are framework behavior, with no effect on indexing (all 404s are `noindex` and return HTTP 404).
