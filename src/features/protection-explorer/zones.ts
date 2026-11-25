import type { ProductCategoryId } from "@/lib/product-categories";

/** Language-independent zones; labels live in `src/content/<locale>.ts`. */
type ProtectionZone = {
  id: string;
  categoryId: ProductCategoryId;
  position: { x: number; y: number };
};

/** Positions are percentages of the full-body illustration's fixed coordinate space. */
export const PROTECTION_ZONES = [
  {
    id: "head",
    categoryId: "safety-helmets",
    position: { x: 48, y: 8 },
  },
  {
    id: "eyes",
    categoryId: "protective-eyewear",
    position: { x: 57, y: 19 },
  },
  {
    id: "hands",
    categoryId: "protective-gloves",
    position: { x: 24, y: 49 },
  },
  {
    id: "body",
    categoryId: "protective-clothing",
    position: { x: 50, y: 36 },
  },
  {
    id: "feet",
    categoryId: "safety-footwear",
    position: { x: 56, y: 89 },
  },
] as const satisfies readonly ProtectionZone[];

export type ProtectionZoneId = (typeof PROTECTION_ZONES)[number]["id"];
