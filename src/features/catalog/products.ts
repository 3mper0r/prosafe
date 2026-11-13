import type { ProductCategoryId } from "@/lib/product-categories";
import type { Product } from "./types";

type DemoEntry = {
  id: string;
  slug: string;
  name: string;
  categoryId: ProductCategoryId;
  summary: string;
  description: string;
  keywords: string[];
  construction: string;
  format: string;
  variants?: Product["variants"];
};

const entries: DemoEntry[] = [
  {
    id: "DEMO-HD-001", slug: "brimmed-safety-helmet", name: "Brimmed safety helmet", categoryId: "safety-helmets",
    summary: "A short-brim helmet format with an adjustable headband.",
    description: "An example of a conventional workplace helmet. This demonstration entry shows how shell construction and adjustment details will be presented when verified manufacturer information is available.",
    keywords: ["hard hat", "head", "construction", "helmet"], construction: "Moulded polymer shell concept", format: "Short brim; adjustable headband",
    variants: [{ label: "Example colors", options: ["Orange", "White"] }],
  },
  {
    id: "DEMO-HD-002", slug: "full-brim-work-helmet", name: "Full-brim work helmet", categoryId: "safety-helmets",
    summary: "A helmet concept with a brim extending around the shell.",
    description: "A full-brim headwear example for comparing equipment formats. No impact, electrical, or weather protection rating is asserted for this fictional entry.",
    keywords: ["hard hat", "head", "outdoor", "helmet"], construction: "Moulded polymer shell concept", format: "Full brim; rear adjustment dial",
    variants: [{ label: "Example colors", options: ["Orange", "Gray"] }],
  },
  {
    id: "DEMO-HD-003", slug: "chin-strap-work-helmet", name: "Chin-strap work helmet", categoryId: "safety-helmets",
    summary: "A compact helmet format with a chin-strap arrangement.",
    description: "An illustrative compact helmet with a strap-based fitting concept. Suitability for working at height or any specific task would require verified documentation for a real product.",
    keywords: ["head", "strap", "compact", "helmet"], construction: "Polymer shell and textile strap concept", format: "Compact shell; chin strap",
  },
  {
    id: "DEMO-EY-001", slug: "clear-safety-glasses", name: "Clear safety glasses", categoryId: "protective-eyewear",
    summary: "A clear-lens spectacle format with straight side arms.",
    description: "An example of everyday workplace eyewear styling. Lens material, optical properties, and intended applications must be confirmed against a real manufacturer's documentation.",
    keywords: ["eyes", "spectacles", "clear", "eyewear"], construction: "Clear polymer lens concept", format: "Spectacle frame; side arms",
    variants: [{ label: "Example frame colors", options: ["Black", "Gray"] }],
  },
  {
    id: "DEMO-EY-002", slug: "wraparound-work-glasses", name: "Wraparound work glasses", categoryId: "protective-eyewear",
    summary: "A curved eyewear concept with a continuous lens profile.",
    description: "A wraparound eyewear example for demonstrating catalog navigation. The lens tint is a visual option only and does not imply a UV rating or suitability for a particular task.",
    keywords: ["eyes", "spectacles", "wraparound", "eyewear"], construction: "Curved polymer lens concept", format: "Wraparound frame; fixed arms",
    variants: [{ label: "Example lens appearances", options: ["Clear", "Smoke"] }],
  },
  {
    id: "DEMO-EY-003", slug: "strap-fit-work-goggles", name: "Strap-fit work goggles", categoryId: "protective-eyewear",
    summary: "A goggle format with a broad frame and adjustable strap.",
    description: "An example of strap-fitted workplace eyewear. This demo makes no claims about sealing, splash protection, dust protection, or compatibility with other equipment.",
    keywords: ["eyes", "goggles", "strap", "eyewear"], construction: "Polymer frame and textile strap concept", format: "Single lens; adjustable strap",
  },
  {
    id: "DEMO-HN-001", slug: "knitted-work-gloves", name: "Knitted work gloves", categoryId: "protective-gloves",
    summary: "A knitted glove format with an elasticated wrist.",
    description: "An illustrative knitted glove entry for comparing handwear formats. No cut, abrasion, heat, or chemical protection level is specified.",
    keywords: ["hands", "knit", "handling", "gloves"], construction: "Knitted textile concept", format: "Elasticated cuff; supplied as a pair",
    variants: [{ label: "Example sizes", options: ["S", "M", "L", "XL"] }],
  },
  {
    id: "DEMO-HN-002", slug: "palm-coated-work-gloves", name: "Palm-coated work gloves", categoryId: "protective-gloves",
    summary: "A textile glove concept with a contrasting palm coating.",
    description: "A coated-palm example showing how hand protection can be organized in the catalog. Coating composition and task suitability are intentionally unspecified until manufacturer data is supplied.",
    keywords: ["hands", "coated", "handling", "gloves"], construction: "Textile liner with palm coating concept", format: "Knitted cuff; supplied as a pair",
    variants: [{ label: "Example sizes", options: ["M", "L", "XL"] }],
  },
  {
    id: "DEMO-HN-003", slug: "cuff-work-gloves", name: "Cuff work gloves", categoryId: "protective-gloves",
    summary: "A panelled work-glove format with an extended cuff.",
    description: "An example of a panelled glove with a longer cuff. Material selection and any protective performance would need to be verified for a real manufacturer product.",
    keywords: ["hands", "cuff", "panelled", "gloves"], construction: "Panelled material concept", format: "Extended cuff; supplied as a pair",
    variants: [{ label: "Example sizes", options: ["M", "L", "XL"] }],
  },
  {
    id: "DEMO-BD-001", slug: "panelled-work-jacket", name: "Panelled work jacket", categoryId: "protective-clothing",
    summary: "A zip-front workwear concept with chest and side pockets.",
    description: "A work jacket example with a simple panelled construction. This entry does not imply weather resistance, flame resistance, or high-visibility certification.",
    keywords: ["body", "workwear", "jacket", "clothing"], construction: "Woven textile concept", format: "Long sleeves; front zip; patch pockets",
    variants: [{ label: "Example sizes", options: ["S", "M", "L", "XL", "XXL"] }],
  },
  {
    id: "DEMO-BD-002", slug: "pocket-work-trousers", name: "Pocket work trousers", categoryId: "protective-clothing",
    summary: "A straight-leg trouser concept with utility pocket layouts.",
    description: "An example of workplace trousers with practical storage details. Sizes and construction are sample information and do not describe a stocked garment.",
    keywords: ["body", "workwear", "trousers", "pants", "clothing"], construction: "Woven textile concept", format: "Straight leg; belt loops; utility pockets",
    variants: [{ label: "Example sizes", options: ["S", "M", "L", "XL"] }],
  },
  {
    id: "DEMO-BD-003", slug: "zip-front-work-coverall", name: "Zip-front work coverall", categoryId: "protective-clothing",
    summary: "A one-piece workwear format with a front opening.",
    description: "A coverall example used to demonstrate one-piece clothing in the catalog. No chemical, flame, or other specialist protection claims are made.",
    keywords: ["body", "workwear", "coverall", "overall", "clothing"], construction: "Woven textile concept", format: "One-piece; long sleeves; front zip",
    variants: [{ label: "Example sizes", options: ["M", "L", "XL", "XXL"] }],
  },
  {
    id: "DEMO-FT-001", slug: "lace-up-work-boot", name: "Lace-up work boot", categoryId: "safety-footwear",
    summary: "An ankle-height footwear concept with a lace fastening.",
    description: "A work-boot format for demonstrating the footwear category. Toe protection, sole properties, and any safety classification remain unspecified pending verified real-product data.",
    keywords: ["feet", "foot", "boots", "lace", "footwear"], construction: "Panelled upper and moulded sole concept", format: "Ankle height; lace fastening; pair",
    variants: [{ label: "Example EU sizes", options: ["40", "41", "42", "43", "44", "45", "46"] }],
  },
  {
    id: "DEMO-FT-002", slug: "low-cut-work-shoe", name: "Low-cut work shoe", categoryId: "safety-footwear",
    summary: "A low-cut workplace shoe concept with a lace closure.",
    description: "An example of a low-cut footwear silhouette. This fictional entry makes no claims about slip resistance, electrical properties, or protective toe construction.",
    keywords: ["feet", "foot", "shoes", "low", "footwear"], construction: "Panelled upper and moulded sole concept", format: "Low cut; lace fastening; pair",
    variants: [{ label: "Example EU sizes", options: ["39", "40", "41", "42", "43", "44", "45"] }],
  },
  {
    id: "DEMO-FT-003", slug: "pull-on-work-boot", name: "Pull-on work boot", categoryId: "safety-footwear",
    summary: "A pull-on boot format with side panels and a rear loop.",
    description: "A pull-on footwear example for comparing closure types. Suitability for workplace hazards must be established from verified specifications when real products replace this demonstration.",
    keywords: ["feet", "foot", "boots", "pull-on", "footwear"], construction: "Panelled upper and moulded sole concept", format: "Pull-on; side panels; rear loop; pair",
    variants: [{ label: "Example EU sizes", options: ["40", "41", "42", "43", "44", "45"] }],
  },
];

/** Fictional catalog records. Replace with verified manufacturer data, preserving stable IDs. */
export const PRODUCTS: readonly Product[] = entries.map((entry) => ({
  id: entry.id,
  slug: entry.slug,
  name: entry.name,
  categoryId: entry.categoryId,
  status: "demonstration",
  summary: entry.summary,
  description: entry.description,
  keywords: entry.keywords,
  images: [{
    src: `/images/catalog/${entry.categoryId}.svg`,
    alt: "Generic category illustration. Demonstration visual, not a photograph of this product.",
  }],
  specifications: [
    { label: "Construction concept", value: entry.construction },
    { label: "Format", value: entry.format },
    { label: "Manufacturer", value: "Unassigned — demonstration entry" },
    { label: "Safety ratings", value: "Not specified or verified" },
  ],
  variants: entry.variants ?? [],
}));

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}
