import type { ProductCategoryId } from "@/lib/product-categories";

type ProtectionZone = {
  id: string;
  label: string;
  categoryId: ProductCategoryId;
  position: { x: number; y: number };
};

/** Positions are percentages of the full-body illustration's fixed coordinate space. */
export const PROTECTION_ZONES = [
  {
    id: "head",
    label: "HEAD",
    categoryId: "safety-helmets",
    position: { x: 48, y: 8 },
  },
  {
    id: "eyes",
    label: "EYES",
    categoryId: "protective-eyewear",
    position: { x: 57, y: 19 },
  },
  {
    id: "hands",
    label: "HANDS",
    categoryId: "protective-gloves",
    position: { x: 24, y: 49 },
  },
  {
    id: "body",
    label: "BODY",
    categoryId: "protective-clothing",
    position: { x: 50, y: 36 },
  },
  {
    id: "feet",
    label: "FEET",
    categoryId: "safety-footwear",
    position: { x: 56, y: 89 },
  },
] as const satisfies readonly ProtectionZone[];

export type ProtectionZoneId = (typeof PROTECTION_ZONES)[number]["id"];
