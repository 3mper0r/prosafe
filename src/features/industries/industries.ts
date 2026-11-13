import type { ProductCategoryId } from "@/lib/product-categories";
import { PRODUCTS } from "@/features/catalog/products";
import type { Product } from "@/features/catalog/types";

export type Industry = {
  slug: string;
  name: string;
  description: string;
  introduction: string;
  considerations: readonly { title: string; description: string }[];
  categoryIds: readonly ProductCategoryId[];
  productIds: readonly Product["id"][];
  equipmentNote?: string;
};

/** Editorial browsing suggestions, not task-specific PPE or compliance determinations. */
export const INDUSTRIES: readonly Industry[] = [
  {
    slug: "construction",
    name: "Construction",
    description: "Equipment discovery for changing sites, material handling, and site teams.",
    introduction: "Work on a construction site changes with the project, the trade, and the day. Start by exploring equipment formats for the people handling materials, working around structures, and moving between work areas.",
    considerations: [
      { title: "The task and work area", description: "Identify the work being done, nearby activities, and potential contact with objects or debris. Revisit the assessment as the site changes." },
      { title: "Handling and movement", description: "Review the materials, tools, access routes, and surfaces involved in each task. A single equipment list will not describe every trade or work area." },
      { title: "Fit across the team", description: "Consider wearer fit, working conditions, and compatibility between equipment items. Verify the documentation for the actual products selected." },
    ],
    categoryIds: ["safety-helmets", "protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-HD-001", "DEMO-EY-001", "DEMO-HN-002", "DEMO-BD-001", "DEMO-FT-001"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description: "Explore equipment formats around production, assembly, and material processing.",
    introduction: "Production environments bring different processes and people together. Use this collection as a starting point for exploring equipment types, then assess the specific process, exposure, and workstation.",
    considerations: [
      { title: "Process-specific exposure", description: "Review the materials and operations at each workstation, including where particles, substances, or contact with equipment may occur." },
      { title: "Equipment and moving parts", description: "Assess how clothing and handwear interact with machinery and tools. Product format alone does not establish suitability around moving equipment." },
      { title: "Fit and daily use", description: "Consider fit, task movement, and compatibility of items worn together. Check actual manufacturer instructions and the workplace assessment." },
    ],
    categoryIds: ["protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-EY-002", "DEMO-EY-003", "DEMO-HN-001", "DEMO-HN-002", "DEMO-BD-002", "DEMO-FT-002"],
  },
  {
    slug: "logistics-warehousing",
    name: "Logistics & Warehousing",
    description: "A starting point for receiving, handling, storage, and dispatch teams.",
    introduction: "From receiving goods to preparing dispatch, warehouse tasks vary across routes, loads, and work areas. Explore handling, clothing, and footwear formats while keeping the actual workplace assessment at the center.",
    considerations: [
      { title: "Loads and handling tasks", description: "Consider the packaging, contact surfaces, and handling methods used by the team, rather than selecting solely from an industry label." },
      { title: "Routes and shared spaces", description: "Review floor conditions, access routes, and interactions between people and material-handling equipment in each area." },
      { title: "Different working environments", description: "Account for indoor and outdoor work, wearer fit, and changes between tasks. Visibility and other specialist requirements need separate assessment." },
    ],
    categoryIds: ["protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-HN-001", "DEMO-HN-002", "DEMO-BD-002", "DEMO-FT-002", "DEMO-FT-003"],
  },
  {
    slug: "electrical-work",
    name: "Electrical Work",
    description: "Explore equipment categories while keeping electrical suitability a separate assessment.",
    introduction: "Electrical work needs task-specific planning and verified equipment information. These generic catalog formats are provided for browsing only; they do not establish protection against electrical hazards.",
    considerations: [
      { title: "Work planning and hazards", description: "Have a competent person assess the actual task and electrical hazards. An industry selection cannot determine the controls or equipment needed." },
      { title: "Verified product properties", description: "Confirm relevant electrical and arc-related properties from actual manufacturer documentation. None of the demonstration products has verified electrical or arc protection ratings." },
      { title: "The surrounding workplace", description: "Review access, nearby activities, tools, fit, and equipment compatibility alongside the task-specific assessment." },
    ],
    categoryIds: ["safety-helmets", "protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-HD-003", "DEMO-EY-001", "DEMO-HN-001", "DEMO-BD-001", "DEMO-FT-001"],
    equipmentNote: "These generic demos have no verified electrical or arc protection ratings and must not be used to select equipment for live electrical work.",
  },
  {
    slug: "industrial-maintenance",
    name: "Industrial Maintenance",
    description: "Equipment discovery across inspection, servicing, and changing maintenance tasks.",
    introduction: "Maintenance can move between machines, materials, and work areas within one shift. Browse these equipment formats, then base the final selection on the specific maintenance task and assessed exposure.",
    considerations: [
      { title: "The equipment being serviced", description: "Review the machine, process, and planned maintenance activity before considering individual equipment types. Conditions may differ from normal production work." },
      { title: "Materials and contact", description: "Identify the materials, substances, and surfaces involved. Generic glove or clothing formats do not establish protection for a particular exposure." },
      { title: "Changing tasks", description: "Recheck the assessment when moving between tasks or work areas. Consider wearer fit, equipment compatibility, and actual manufacturer instructions." },
    ],
    categoryIds: ["safety-helmets", "protective-eyewear", "protective-gloves", "protective-clothing", "safety-footwear"],
    productIds: ["DEMO-HD-003", "DEMO-EY-003", "DEMO-HN-003", "DEMO-BD-003", "DEMO-FT-003"],
  },
];

export function getIndustryBySlug(slug: string) {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getIndustryProducts(industry: Industry) {
  return PRODUCTS.filter((product) => industry.productIds.includes(product.id));
}

export function industryCatalogHref(industry: Industry, categoryId?: ProductCategoryId) {
  const params = new URLSearchParams({ industry: industry.slug });
  if (categoryId) params.set("category", categoryId);
  return `/products?${params.toString()}` as const;
}
