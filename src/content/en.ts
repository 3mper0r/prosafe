import type { CatalogContent } from "./types";

/**
 * English catalog content (demonstration products). Generated verbatim from the
 * pre-M9.3 data modules (commit a5df654); edit freely from now on.
 */
export const en = {
  products: {
    "DEMO-HD-001": {
      name: "Brimmed safety helmet",
      summary: "A short-brim helmet format with an adjustable headband.",
      description: "An example of a conventional workplace helmet. This demonstration entry shows how shell construction and adjustment details will be presented when verified manufacturer information is available.",
      keywords: ["hard hat", "head", "construction", "helmet"],
      construction: "Moulded polymer shell concept",
      format: "Short brim; adjustable headband"
    },
    "DEMO-HD-002": {
      name: "Full-brim work helmet",
      summary: "A helmet concept with a brim extending around the shell.",
      description: "A full-brim headwear example for comparing equipment formats. No impact, electrical, or weather protection rating is asserted for this fictional entry.",
      keywords: ["hard hat", "head", "outdoor", "helmet"],
      construction: "Moulded polymer shell concept",
      format: "Full brim; rear adjustment dial"
    },
    "DEMO-HD-003": {
      name: "Chin-strap work helmet",
      summary: "A compact helmet format with a chin-strap arrangement.",
      description: "An illustrative compact helmet with a strap-based fitting concept. Suitability for working at height or any specific task would require verified documentation for a real product.",
      keywords: ["head", "strap", "compact", "helmet"],
      construction: "Polymer shell and textile strap concept",
      format: "Compact shell; chin strap"
    },
    "DEMO-EY-001": {
      name: "Clear safety glasses",
      summary: "A clear-lens spectacle format with straight side arms.",
      description: "An example of everyday workplace eyewear styling. Lens material, optical properties, and intended applications must be confirmed against a real manufacturer's documentation.",
      keywords: ["eyes", "spectacles", "clear", "eyewear"],
      construction: "Clear polymer lens concept",
      format: "Spectacle frame; side arms"
    },
    "DEMO-EY-002": {
      name: "Wraparound work glasses",
      summary: "A curved eyewear concept with a continuous lens profile.",
      description: "A wraparound eyewear example for demonstrating catalog navigation. The lens tint is a visual option only and does not imply a UV rating or suitability for a particular task.",
      keywords: ["eyes", "spectacles", "wraparound", "eyewear"],
      construction: "Curved polymer lens concept",
      format: "Wraparound frame; fixed arms"
    },
    "DEMO-EY-003": {
      name: "Strap-fit work goggles",
      summary: "A goggle format with a broad frame and adjustable strap.",
      description: "An example of strap-fitted workplace eyewear. This demo makes no claims about sealing, splash protection, dust protection, or compatibility with other equipment.",
      keywords: ["eyes", "goggles", "strap", "eyewear"],
      construction: "Polymer frame and textile strap concept",
      format: "Single lens; adjustable strap"
    },
    "DEMO-HN-001": {
      name: "Knitted work gloves",
      summary: "A knitted glove format with an elasticated wrist.",
      description: "An illustrative knitted glove entry for comparing handwear formats. No cut, abrasion, heat, or chemical protection level is specified.",
      keywords: ["hands", "knit", "handling", "gloves"],
      construction: "Knitted textile concept",
      format: "Elasticated cuff; supplied as a pair"
    },
    "DEMO-HN-002": {
      name: "Palm-coated work gloves",
      summary: "A textile glove concept with a contrasting palm coating.",
      description: "A coated-palm example showing how hand protection can be organized in the catalog. Coating composition and task suitability are intentionally unspecified until manufacturer data is supplied.",
      keywords: ["hands", "coated", "handling", "gloves"],
      construction: "Textile liner with palm coating concept",
      format: "Knitted cuff; supplied as a pair"
    },
    "DEMO-HN-003": {
      name: "Cuff work gloves",
      summary: "A panelled work-glove format with an extended cuff.",
      description: "An example of a panelled glove with a longer cuff. Material selection and any protective performance would need to be verified for a real manufacturer product.",
      keywords: ["hands", "cuff", "panelled", "gloves"],
      construction: "Panelled material concept",
      format: "Extended cuff; supplied as a pair"
    },
    "DEMO-BD-001": {
      name: "Panelled work jacket",
      summary: "A zip-front workwear concept with chest and side pockets.",
      description: "A work jacket example with a simple panelled construction. This entry does not imply weather resistance, flame resistance, or high-visibility certification.",
      keywords: ["body", "workwear", "jacket", "clothing"],
      construction: "Woven textile concept",
      format: "Long sleeves; front zip; patch pockets"
    },
    "DEMO-BD-002": {
      name: "Pocket work trousers",
      summary: "A straight-leg trouser concept with utility pocket layouts.",
      description: "An example of workplace trousers with practical storage details. Sizes and construction are sample information and do not describe a stocked garment.",
      keywords: ["body", "workwear", "trousers", "pants", "clothing"],
      construction: "Woven textile concept",
      format: "Straight leg; belt loops; utility pockets"
    },
    "DEMO-BD-003": {
      name: "Zip-front work coverall",
      summary: "A one-piece workwear format with a front opening.",
      description: "A coverall example used to demonstrate one-piece clothing in the catalog. No chemical, flame, or other specialist protection claims are made.",
      keywords: ["body", "workwear", "coverall", "overall", "clothing"],
      construction: "Woven textile concept",
      format: "One-piece; long sleeves; front zip"
    },
    "DEMO-FT-001": {
      name: "Lace-up work boot",
      summary: "An ankle-height footwear concept with a lace fastening.",
      description: "A work-boot format for demonstrating the footwear category. Toe protection, sole properties, and any safety classification remain unspecified pending verified real-product data.",
      keywords: ["feet", "foot", "boots", "lace", "footwear"],
      construction: "Panelled upper and moulded sole concept",
      format: "Ankle height; lace fastening; pair"
    },
    "DEMO-FT-002": {
      name: "Low-cut work shoe",
      summary: "A low-cut workplace shoe concept with a lace closure.",
      description: "An example of a low-cut footwear silhouette. This fictional entry makes no claims about slip resistance, electrical properties, or protective toe construction.",
      keywords: ["feet", "foot", "shoes", "low", "footwear"],
      construction: "Panelled upper and moulded sole concept",
      format: "Low cut; lace fastening; pair"
    },
    "DEMO-FT-003": {
      name: "Pull-on work boot",
      summary: "A pull-on boot format with side panels and a rear loop.",
      description: "A pull-on footwear example for comparing closure types. Suitability for workplace hazards must be established from verified specifications when real products replace this demonstration.",
      keywords: ["feet", "foot", "boots", "pull-on", "footwear"],
      construction: "Panelled upper and moulded sole concept",
      format: "Pull-on; side panels; rear loop; pair"
    }
  },
  industries: {
    construction: {
      name: "Construction",
      description: "Equipment discovery for changing sites, material handling, and site teams.",
      introduction: "Work on a construction site changes with the project, the trade, and the day. Start by exploring equipment formats for the people handling materials, working around structures, and moving between work areas.",
      considerations: [
        {
          title: "The task and work area",
          description: "Identify the work being done, nearby activities, and potential contact with objects or debris. Revisit the assessment as the site changes."
        },
        {
          title: "Handling and movement",
          description: "Review the materials, tools, access routes, and surfaces involved in each task. A single equipment list will not describe every trade or work area."
        },
        {
          title: "Fit across the team",
          description: "Consider wearer fit, working conditions, and compatibility between equipment items. Verify the documentation for the actual products selected."
        }
      ]
    },
    manufacturing: {
      name: "Manufacturing",
      description: "Explore equipment formats around production, assembly, and material processing.",
      introduction: "Production environments bring different processes and people together. Use this collection as a starting point for exploring equipment types, then assess the specific process, exposure, and workstation.",
      considerations: [
        {
          title: "Process-specific exposure",
          description: "Review the materials and operations at each workstation, including where particles, substances, or contact with equipment may occur."
        },
        {
          title: "Equipment and moving parts",
          description: "Assess how clothing and handwear interact with machinery and tools. Product format alone does not establish suitability around moving equipment."
        },
        {
          title: "Fit and daily use",
          description: "Consider fit, task movement, and compatibility of items worn together. Check actual manufacturer instructions and the workplace assessment."
        }
      ]
    },
    "logistics-warehousing": {
      name: "Logistics & Warehousing",
      description: "A starting point for receiving, handling, storage, and dispatch teams.",
      introduction: "From receiving goods to preparing dispatch, warehouse tasks vary across routes, loads, and work areas. Explore handling, clothing, and footwear formats while keeping the actual workplace assessment at the center.",
      considerations: [
        {
          title: "Loads and handling tasks",
          description: "Consider the packaging, contact surfaces, and handling methods used by the team, rather than selecting solely from an industry label."
        },
        {
          title: "Routes and shared spaces",
          description: "Review floor conditions, access routes, and interactions between people and material-handling equipment in each area."
        },
        {
          title: "Different working environments",
          description: "Account for indoor and outdoor work, wearer fit, and changes between tasks. Visibility and other specialist requirements need separate assessment."
        }
      ]
    },
    "electrical-work": {
      name: "Electrical Work",
      description: "Explore equipment categories while keeping electrical suitability a separate assessment.",
      introduction: "Electrical work needs task-specific planning and verified equipment information. These generic catalog formats are provided for browsing only; they do not establish protection against electrical hazards.",
      considerations: [
        {
          title: "Work planning and hazards",
          description: "Have a competent person assess the actual task and electrical hazards. An industry selection cannot determine the controls or equipment needed."
        },
        {
          title: "Verified product properties",
          description: "Confirm relevant electrical and arc-related properties from actual manufacturer documentation. None of the demonstration products has verified electrical or arc protection ratings."
        },
        {
          title: "The surrounding workplace",
          description: "Review access, nearby activities, tools, fit, and equipment compatibility alongside the task-specific assessment."
        }
      ],
      equipmentNote: "These generic demos have no verified electrical or arc protection ratings and must not be used to select equipment for live electrical work."
    },
    "industrial-maintenance": {
      name: "Industrial Maintenance",
      description: "Equipment discovery across inspection, servicing, and changing maintenance tasks.",
      introduction: "Maintenance can move between machines, materials, and work areas within one shift. Browse these equipment formats, then base the final selection on the specific maintenance task and assessed exposure.",
      considerations: [
        {
          title: "The equipment being serviced",
          description: "Review the machine, process, and planned maintenance activity before considering individual equipment types. Conditions may differ from normal production work."
        },
        {
          title: "Materials and contact",
          description: "Identify the materials, substances, and surfaces involved. Generic glove or clothing formats do not establish protection for a particular exposure."
        },
        {
          title: "Changing tasks",
          description: "Recheck the assessment when moving between tasks or work areas. Consider wearer fit, equipment compatibility, and actual manufacturer instructions."
        }
      ]
    }
  },
  categories: {
    "safety-helmets": {
      label: "Head protection",
      name: "Safety helmets",
      description: "Protective headwear for workplace tasks. Explore helmets suited to the work and environment."
    },
    "protective-eyewear": {
      label: "Eye protection",
      name: "Protective eyewear",
      description: "Workplace eye protection, including safety glasses and goggles for different working environments."
    },
    "protective-gloves": {
      label: "Hand protection",
      name: "Protective gloves",
      description: "Hand protection for a range of workplace tasks, with glove types selected around the work being done."
    },
    "protective-clothing": {
      label: "Body protection",
      name: "Protective clothing",
      description: "Workplace clothing and body coverage, including jackets, trousers, and coveralls for different working environments."
    },
    "safety-footwear": {
      label: "Foot protection",
      name: "Safety footwear",
      description: "Workplace foot protection, including safety shoes and boots selected around the task and working environment."
    }
  },
  zones: {
    head: "HEAD",
    eyes: "EYES",
    hands: "HANDS",
    body: "BODY",
    feet: "FEET"
  },
  imageAlt: "Generic category illustration. Demonstration visual, not a photograph of this product.",
  specifications: {
    labels: {
      construction: "Construction concept",
      format: "Format",
      manufacturer: "Manufacturer",
      safetyRatings: "Safety ratings"
    },
    manufacturer: "Unassigned — demonstration entry",
    safetyRatings: "Not specified or verified"
  },
  variants: {
    labels: {
      colors: "Example colors",
      frameColors: "Example frame colors",
      lensAppearances: "Example lens appearances",
      sizes: "Example sizes",
      euSizes: "Example EU sizes"
    },
    colors: {
      orange: "Orange",
      white: "White",
      gray: "Gray",
      black: "Black",
      clear: "Clear",
      smoke: "Smoke"
    }
  }
} as const satisfies CatalogContent;
