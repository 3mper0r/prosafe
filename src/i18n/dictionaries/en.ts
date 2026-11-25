/**
 * English dictionary. Its shape defines the `Dictionary` type, so every other
 * language must provide exactly the same keys (checked at compile time).
 *
 * Conventions:
 * - Keys are grouped by functional area (one namespace per page or feature).
 * - Multi-line headings are arrays of lines; the view inserts the <br />.
 * - Interpolated values use `{name}` templates (see `@/i18n/format`), so
 *   messages stay plain serializable strings for client components.
 * - "SAFETY WITHOUT COMPROMISE." is the official slogan and is not translated;
 *   it stays in the components rather than in the dictionaries.
 * - Product, industry, category and protection-zone content is data, not UI
 *   copy; it lives in `src/content/<locale>.ts`.
 */
import type { QuoteErrorCode } from "@/features/quote/request/types";

export const en = {
  common: {
    skipToContent: "Skip to content",
    homeLabel: "PROSAFE home",
  },
  meta: {
    defaultTitle: "PROSAFE — Safety Without Compromise.",
    description:
      "PROSAFE provides premium workplace safety equipment and complete protection solutions for businesses in Kosovo. Safety Without Compromise.",
  },
  header: {
    navigation: [
      { label: "Products", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "Brands", href: "/brands" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    mobileMenuTitle: "PROSAFE / Navigation",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
  },
  footer: {
    navigationLabel: "Company and legal navigation",
    links: [
      { href: "/about", label: "About" },
      { href: "/brands", label: "Brands" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy (draft)" },
      { href: "/imprint", label: "Imprint (draft)" },
    ],
    photoCredit: "Material photography: Kindel Media & Nothing Ahead / Pexels",
  },
  quoteLink: {
    label: "Quote",
    ariaLabel: {
      one: "Quote selection, {count} selected product",
      other: "Quote selection, {count} selected products",
    },
  },
  home: {
    hero: {
      sidebarLabel: "PROSAFE workplace protection",
      sidebarIndex: "PROSAFE / 01",
      purpose: ["SAFETY", "EQUIPMENT"],
      purposeNote: ["For the people", "behind the work."],
      eyebrow: "PROTECTION IS OUR PURPOSE.",
      headline: ["PROTECTION", "IS NOT", "OPTIONAL."],
      primaryAction: "EXPLORE EQUIPMENT",
      secondaryAction: "FIND YOUR PROTECTION",
      panelIndex: "PERSONAL PROTECTION / 01",
      panelHeading: ["HEAD.", "HANDS.", "EVERYTHING", "IN BETWEEN."],
      panelCopy: "Professional safety equipment and workplace protection solutions for every industry.",
      panelLink: "Explore protection",
      panelFootnote: ["EQUIPMENT CATALOG", "DEMONSTRATION COLLECTION"],
      scrollIndicator: "EXPLORE EQUIPMENT",
      workerAlt:
        "Industrial worker in side profile wearing an orange safety helmet, clear protective glasses, and dark workwear.",
    },
    equipment: {
      index: "01 / EQUIPMENT",
      heading: ["EVERY LAYER", "OF PROTECTION."],
      intro: "From the first task to the last shift. Discover the essentials of workplace protection.",
      catalogLink: ["EQUIPMENT CATALOG ↗", "EXPLORE DEMONSTRATION PRODUCTS"],
      items: {
        head: "Head protection",
        eyeFace: "Eye & face protection",
        hearing: "Hearing protection",
        hand: "Hand protection",
        workwear: "Protective workwear",
        footwear: "Safety footwear",
      },
    },
    approach: {
      index: "02 / A COMPLETE APPROACH",
      heading: "THE WORK CHANGES.",
      headingAccent: "OUR PURPOSE DOESN’T.",
      intro:
        "Protection starts with understanding the work. PROSAFE brings equipment and workplace needs together, with the people doing the job at the center.",
      explorerLink: "OPEN PROTECTION EXPLORER",
      industryLink: "FIND EQUIPMENT BY INDUSTRY",
    },
    industries: {
      index: "03 / INDUSTRIES",
      heading: ["DIFFERENT ENVIRONMENTS.", "ONE STANDARD OF CARE."],
      allIndustries: "EXPLORE ALL INDUSTRIES",
    },
    about: {
      index: "04 / ABOUT PROSAFE",
      heading: ["MORE THAN EQUIPMENT.", "A COMMITMENT TO PEOPLE."],
      intro:
        "PROSAFE is a workplace protection partner for businesses in Kosovo. Our purpose is simple: bring professional safety equipment and a complete approach to protection to every working day.",
      link: "ABOUT PROSAFE",
    },
    contact: {
      index: "05 / BUSINESS ENQUIRIES",
      status: "BUSINESS QUOTATION ENQUIRIES",
      heading: ["LET’S TALK", "PROTECTION"],
      intro: "Equipping a team starts with a conversation. Build an equipment selection and review the B2B quotation form.",
      footnote: "Delivery availability is shown on the quotation page.",
      quoteLink: "PREPARE A QUOTATION",
      contactLink: "BUSINESS CONTACT INFORMATION",
    },
  },
  businessPage: {
    completionLabel: "Before launch",
    completionEyebrow: "DRAFT / COMPLETE BEFORE LAUNCH",
  },
  about: {
    metaTitle: "About",
    metaDescription:
      "Meet PROSAFE: a B2B workplace safety distribution business focused on protecting people at work, with Kosovo as its initial market.",
    eyebrow: "ABOUT",
    intro:
      "PROSAFE brings a focused approach to workplace protection: people first, equipment with a purpose, and business relationships built on clarity.",
    facts: [
      { term: "Our focus", value: "Workplace safety" },
      { term: "Our model", value: "B2B distribution" },
      { term: "Initial market", value: "Kosovo" },
    ],
    missionHeading: "A commitment to the people doing the work.",
    missionBody:
      "Our mission is to help businesses make workplace protection part of every working day. From construction sites to production floors and warehouses, the starting point is the person behind the task.",
    sloganBody:
      "This is the standard we set for our approach: understand the work, communicate clearly, and build a considered equipment selection around workplace needs.",
    distributionHeading: ["Built for business.", "Starting in Kosovo."],
    distributionBody: [
      "PROSAFE is focused on business-to-business distribution of workplace safety equipment. Our approach connects business purchasing needs with manufacturer information and a clear quotation process.",
      "Kosovo is our initial market. We are developing the product information and manufacturer relationships needed to support businesses equipping their teams.",
      "The current catalog contains clearly identified demonstration products. Product availability, specifications, and suitability must be confirmed before purchasing.",
    ],
    calloutHeading: "Find a starting point for your workplace.",
    calloutBody: "Explore equipment by industry or learn how we approach manufacturer partnerships.",
    exploreIndustries: "EXPLORE INDUSTRIES",
    partnershipApproach: "OUR PARTNERSHIP APPROACH",
  },
  brands: {
    metaTitle: "Brands & Manufacturer Partnerships",
    metaDescription:
      "Learn about PROSAFE’s approach to manufacturer partnerships and verified product information for B2B safety equipment distribution in Kosovo.",
    eyebrow: "BRANDS & PARTNERSHIPS",
    title: ["STRONG RELATIONSHIPS.", "CLEAR STANDARDS."],
    intro:
      "Our manufacturer partnership approach starts with a shared focus on workplace protection and clear information for business customers in Kosovo.",
    partnershipHeading: "A considered approach to distribution.",
    partnershipBody:
      "We aim to develop manufacturer relationships that support informed equipment selection and dependable business communication.",
    principles: [
      {
        term: "Verified identity and authorization.",
        text: "Confirm the manufacturer and the scope of any distribution relationship before publishing a partnership.",
      },
      {
        term: "Documented product information.",
        text: "Review specifications, intended uses, and supporting documentation before adding real products.",
      },
      {
        term: "Practical business support.",
        text: "Establish clear contacts for quotations, availability, and product questions.",
      },
    ],
    partnersLabel: "VERIFIED PARTNERS / FUTURE DIRECTORY",
    partnersHeading: "No manufacturer partners published yet.",
    partnersBody: [
      "This space is reserved for future verified partners. Manufacturer names, logos, and relationship details will be added only after verification and permission to publish.",
      "Demonstration products in the catalog do not represent manufacturer partnerships or authorized distribution agreements.",
    ],
    manufacturerHeading: "For manufacturers.",
    manufacturerBody:
      "Interested in PROSAFE’s B2B distribution focus in Kosovo? Review the partnership inquiry information on our contact page. A verified direct contact channel is still pending.",
    partnershipInquiries: "PARTNERSHIP INQUIRIES",
  },
  contact: {
    metaTitle: "Contact & Business Inquiries",
    metaDescription:
      "Prepare a PROSAFE business quotation and find information for general business and manufacturer partnership inquiries. Initial market: Kosovo.",
    eyebrow: "CONTACT",
    title: ["LET’S TALK", "PROTECTION."],
    intro: "For businesses equipping their teams and manufacturers exploring a distribution relationship. Our initial market is Kosovo.",
    quotationHeading: "Business quotations.",
    quotationBody:
      "Build a selection from the demonstration catalog, then review quantities and business requirements in the existing quotation workflow. Submission availability is shown on the quotation page; delivery requires configuration.",
    prepareQuotation: "PREPARE A QUOTATION",
    browseEquipment: "BROWSE DEMO EQUIPMENT",
    businessHeading: "General business inquiries.",
    businessBody:
      "For an equipment inquiry, include your company, working environment, approximate team size, and any sizing or delivery requirements in the quotation form. A product selection is required to submit a quotation request.",
    businessPending: {
      strong: "Direct contact details are not yet published.",
      text: "A verified business email, phone number, and business address must be supplied before launch. A channel for inquiries unrelated to equipment quotations is still pending.",
    },
    manufacturerHeading: "Manufacturer partnerships.",
    manufacturerBody:
      "For a future partnership discussion, prepare a company introduction, product categories, relevant product documentation, and your proposed distribution scope for Kosovo.",
    manufacturerPending: {
      strong: "Partnership inquiries are not yet open.",
      text: "A verified partnership contact will be published here before launch.",
    },
    brandsLink: "Read our manufacturer partnership approach",
    privacyHeading: "Your inquiry information.",
    privacyBody:
      "Use the quotation form for business requirements and avoid sensitive personal information. Contact details are not saved in browser storage.",
    privacyLink: "Read the privacy information and pending launch details",
  },
  privacy: {
    metaTitle: "Privacy — Draft",
    metaDescription:
      "Draft PROSAFE privacy information describing the current quotation workflow and the business information that must be completed before launch.",
    eyebrow: "PRIVACY / DRAFT",
    title: ["PRIVACY", "INFORMATION."],
    intro: "This draft describes the current website’s quotation workflow. Business-specific privacy information remains incomplete.",
    notice:
      "This is not a finalized privacy notice. The operator must complete and approve the identified information before launch and before collecting real business inquiries. No effective date has been assigned.",
    completeBeforeLaunch: "Complete before launch:",
    operator: {
      heading: "01 / Responsible business.",
      body: "PROSAFE is the brand used on this website. The legal entity responsible for personal information has not yet been provided.",
      pending: "legal entity name, registered address, privacy contact email, and any applicable representative or data protection contact.",
      link: "See the draft company information",
    },
    inquiryData: {
      heading: "02 / Quotation information.",
      body: [
        "The quotation form asks for company name, contact person, business email, product selections and quantities, and agreement to use the information to respond to the inquiry. Phone number, delivery city, and additional requirements are optional.",
        "Contact details stay in the current form and are not written to browser storage. When submission is enabled and you submit, the website validates the request and sends the details and selection to the configured quotation recipient through its email delivery provider.",
        "The stated purpose is to handle the quotation inquiry. The form does not request marketing permission. The application has no database or durable quotation archive.",
      ],
      pending: "confirm the purposes and applicable legal basis for each processing activity, the responsible recipients, and how privacy requests will be handled.",
    },
    storage: {
      heading: "03 / Browser storage & technical processing.",
      selectionBeforeKey: "The quotation selection uses browser local storage under",
      selectionAfterKey:
        "to remember product identifiers and quantities across visits. It has no automatic expiry. You can remove items on the quotation page or clear this website’s storage in your browser. Accepted submissions remove the submitted selection, while preserving concurrent changes.",
      service:
        "The quotation service uses temporary session tokens, request identifiers, request fingerprints, and attempt counters to validate submissions, limit abuse, and reduce duplicate delivery. The in-memory request registry retains entries for up to 24 hours, subject to cleanup and process restarts; it does not keep raw contact fields in completed entries.",
      pending:
        "review the deployed hosting logs, network metadata, cookies, and storage inventory; identify the hosting provider and any additional tools. Confirm retention and any consent requirements for the final deployment.",
    },
    recipients: {
      heading: "04 / Providers, recipients & retention.",
      body: "The existing optional email adapter supports Resend. This describes supported software, rather than confirmation of a contracted provider. Delivery remains unavailable until valid configuration is supplied. The configured provider and recipient mailbox handle accepted inquiry information.",
      pending:
        "identify the actual provider and mailbox recipients; document processing arrangements, processing locations, any international transfers and safeguards, and retention and deletion periods for inquiry emails, provider records, and logs.",
    },
    rights: {
      heading: "05 / Privacy requests & updates.",
      pending:
        "explain applicable rights, how to exercise them, any consent withdrawal process, and the relevant supervisory authority and complaint channel. Publish a verified privacy contact and an effective or last-updated date after review.",
      body: "A privacy request channel has not yet been published. This draft must be reviewed against the actual business, deployment, and applicable requirements.",
      link: "View the contact information status",
    },
  },
  imprint: {
    metaTitle: "Imprint — Draft",
    metaDescription:
      "Draft PROSAFE company and website operator information, with legal identity, registration, and contact details pending verification before launch.",
    eyebrow: "IMPRINT / DRAFT",
    title: ["COMPANY", "INFORMATION."],
    intro:
      "PROSAFE is focused on B2B workplace safety distribution, with Kosovo as its initial market. Verified legal and operator details are still required.",
    notice:
      "This imprint is an incomplete draft. PROSAFE is a brand name here, not a verified legal entity name. All fields below must be completed or confirmed as not applicable and reviewed before launch.",
    identity: {
      heading: "01 / Website operator.",
      items: [
        { term: "Legal entity name:", text: "to be provided and verified." },
        { term: "Legal form:", text: "to be provided and verified." },
        { term: "Registered business address:", text: "to be provided and verified." },
        { term: "Authorized representative:", text: "name and role to be provided and verified." },
      ],
      note: "Kosovo is the initial market; this does not establish the operator’s place of registration or registered address.",
    },
    registration: {
      heading: "02 / Registration & tax details.",
      items: [
        { term: "Business registration number and register:", text: "to be provided and verified." },
        { term: "Tax / VAT identification:", text: "to be provided and verified, where applicable." },
        { term: "Relevant licensing or supervisory details:", text: "applicability to be confirmed." },
      ],
    },
    contact: {
      heading: "03 / Business contact.",
      items: [
        { term: "Business email:", text: "verified public address pending." },
        { term: "Business phone:", text: "verified public number pending." },
        { term: "Correspondence address:", text: "to be confirmed with the operator." },
      ],
      link: "Business inquiry and quotation information",
    },
    publication: {
      heading: "04 / Publication review.",
      pendingLabel: "Complete before launch:",
      pending:
        "confirm the applicable disclosure requirements, any additional responsible-person information, and a publication or review date. Replace the pending fields with approved business details.",
      link: "Read the draft privacy information",
    },
  },
  riskNote: {
    label: "Equipment selection note",
    body: "Final equipment selection depends on a workplace risk assessment and applicable safety requirements. Industry browsing does not determine which PPE is required or suitable for a specific workplace.",
    link: "PPE selection principles / EU-OSHA ↗",
  },
  demoNotice: {
    label: "Demonstration catalog notice",
    title: "Demonstration catalog",
    body: "Fictional examples for exploring the catalog and quote selection. Not real inventory. Illustrations, specifications, and variants are illustrative; no manufacturer or certified safety performance is represented.",
  },
  productCard: {
    badge: "DEMO / CATEGORY ILLUSTRATION",
    identifier: "{id} / DEMONSTRATION PRODUCT",
  },
  catalog: {
    metaTitle: "Equipment catalog",
    metaDescription:
      "Explore the PROSAFE demonstration equipment catalog by protection category and prepare a local quote selection.",
    eyebrow: "PROSAFE / EQUIPMENT CATALOG",
    title: ["EQUIPMENT.", "WITH PURPOSE."],
    intro: "Explore protection from head to toe. Find an equipment type and build a selection for your team.",
    industryGuide: "Industry guide / {industry} →",
    filtersLabel: "Search and filter products",
    searchLabel: "Search equipment",
    searchPlaceholder: "Product name or keyword",
    categoryLabel: "Protection category",
    allCategories: "All categories",
    industryLabel: "Industry",
    allIndustries: "All industries",
    applyFilters: "APPLY FILTERS",
    unknownCategory: "Unknown category. Showing all categories instead.",
    unknownIndustry: "Unknown industry. Showing all industries instead.",
    resultCount: { one: "{count} example", other: "{count} examples" },
    resultIndustry: " / {industry}",
    resultCategory: " / {category}",
    resultAllCategories: " / All categories",
    resultSearch: " matching “{search}”",
    clearFilters: "Clear filters",
    resultsLabel: "Demonstration products",
    emptyEyebrow: "NO MATCHING EQUIPMENT",
    emptyHeading: "Let’s try another search.",
    emptyBody: "Use a different keyword or clear the category and search filters.",
    viewIndustryExamples: "VIEW INDUSTRY EXAMPLES",
    viewAllExamples: "VIEW ALL EXAMPLES",
    explorerLink: "Find your category in the protection explorer →",
  },
  productDetail: {
    metaTitle: "{name} — Demo",
    metaDescription: "{summary} Demonstration entry, not real inventory.",
    notFoundTitle: "Product not found",
    breadcrumb: "Breadcrumb",
    allEquipment: "All equipment",
    imageCaption: "Generic category illustration. Approved product photography will accompany real manufacturer data.",
    eyebrow: "{category} / DEMONSTRATION",
    identifier: "PRODUCT IDENTIFIER / {id}",
    viewQuote: "View quote selection →",
    quoteNote: "Save a product and quantity locally, then review the quotation form. Submission availability is shown there.",
    specificationsHeading: "Technical specifications",
    specificationsNote: "Illustrative fields only. These are not verified product specifications.",
    variantsHeading: "Example variants",
    variantsNote: "Shown for reference. Variants are not selectable or recorded in this product-and-quantity quote selection.",
  },
  productNotFound: {
    eyebrow: "PRODUCT NOT FOUND",
    heading: "This equipment entry is unavailable.",
    body: "Return to the catalog to explore the demonstration products.",
    action: "BACK TO EQUIPMENT",
  },
  industries: {
    metaTitle: "Industries",
    metaDescription:
      "Explore PROSAFE demonstration equipment by industry, from construction and manufacturing to logistics, electrical work, and industrial maintenance.",
    eyebrow: "PROSAFE / INDUSTRIES",
    title: ["DIFFERENT WORK.", "ONE PURPOSE."],
    intro: "Start with your working environment. Explore protection categories and demonstration equipment for your industry.",
    findProtection: "FIND YOUR PROTECTION",
    findProtectionNote: "Choose your industry in one step to see a starting collection of equipment examples.",
    listLabel: "Industries",
    cardEyebrow: "{number} / INDUSTRY",
    categoriesLabel: "{industry} protection categories",
    exploreIndustry: "Explore industry",
    browseProducts: "Browse demo products",
  },
  industryDetail: {
    notFoundTitle: "Industry not found",
    breadcrumb: "Breadcrumb",
    allIndustries: "All industries",
    eyebrow: "PROSAFE / INDUSTRY DISCOVERY",
    considerationsEyebrow: "THE WORKPLACE / BEFORE THE EQUIPMENT",
    considerationsHeading: "Common protection considerations",
    chooseAnother: "Choose another industry in Find Your Protection →",
  },
  industryNotFound: {
    eyebrow: "INDUSTRY NOT FOUND",
    heading: "This industry guide is unavailable.",
    body: "Choose one of the five industries to explore equipment examples.",
    action: "VIEW INDUSTRIES",
  },
  industryEquipment: {
    categoriesEyebrow: "01 / EQUIPMENT CATEGORIES",
    categoriesHeading: "Relevant categories to explore",
    categoriesIntro: "A browsing starting point, not a complete equipment list for every task.",
    examplesEyebrow: "02 / DEMONSTRATION EQUIPMENT",
    examplesHeading: "Examples for {industry}",
    filterInCatalog: "Filter in the catalog",
    productsLabel: "Industry demonstration products",
    quotePromptLabel: "Prepare a quote selection",
    quotePromptEyebrow: "YOUR TEAM / YOUR SELECTION",
    quotePromptHeading: "Bring your equipment list together.",
    quotePromptBody: "Add examples to your selection and adjust quantities, then review the quotation form and submission availability.",
    quotePromptAction: "PREPARE A QUOTE",
  },
  findYourProtection: {
    metaTitle: "Find Your Protection",
    metaDescription:
      "Choose an industry to explore relevant protection categories and demonstration equipment from the PROSAFE catalog.",
    eyebrow: "PROSAFE / FIND YOUR PROTECTION",
    title: ["START WITH", "YOUR INDUSTRY."],
    intro:
      "Choose your working environment. Explore a starting collection of equipment categories and demonstration products, then add examples to your quote selection.",
    formLabel: "Find equipment by industry",
    industryLabel: "Your industry",
    industryPlaceholder: "Choose your industry",
    submit: "SHOW EQUIPMENT",
    help: "One industry selection. You can change it at any time.",
    resultEyebrow: "YOUR INDUSTRY / EQUIPMENT STARTING POINT",
    industryGuide: "Read the industry guide",
    statusLabel: "Industry selection status",
    invalidIndustry: "That industry is unavailable. Choose one of the five industries above to continue.",
    chooseIndustry: "Choose your industry above to see equipment categories and examples.",
    browseGuides: "Or browse all industry guides →",
  },
  explorer: {
    metaTitle: "Protection Explorer",
    metaDescription:
      "Explore workplace protection from head to toe: safety helmets, protective eyewear, gloves, clothing, and footwear.",
    backLink: "Back to PROSAFE",
    eyebrow: "PROSAFE / INTERACTIVE PROTECTION EXPLORER",
    title: ["PROTECTION.", "FROM HEAD TO TOE."],
    intro:
      "Choose a zone to explore the equipment category. Hover or click on desktop, tap on mobile, or use Tab and the arrow keys in the zone selector.",
    /** Passed to the client ProtectionExplorer component as props. */
    widget: {
      zoneLegend: "Select a protection zone",
      viewCategory: "View {category}",
      hotspotsLabel: "Full-body worker protection hotspots",
      hotspotLabel: "{zone} — {category}",
      figcaption: ["Temporary full-body illustration.", "Final worker photography will replace this visual."],
      selectedEyebrow: "SELECTED PROTECTION / {zone}",
      browseCategory: "Browse {category}",
      catalogComingSoon: "Catalog coming soon. This category will become available when the product catalog launches.",
      selectionNote:
        "Explore another zone using the worker markers or zone selector. Your selection stays visible until you choose another zone.",
    },
  },
  /** Client: used by every AddToQuote button (passed through LocaleProvider). */
  addToQuote: {
    ariaLabel: "Add {name} to quote",
    add: "ADD TO QUOTE",
    limitReached: "QUANTITY LIMIT REACHED",
    added: "{name} added. {quantity} in your selection.",
    storageUnavailable: " Browser storage is unavailable; this selection may be lost when you leave or reload.",
  },
  quote: {
    metaTitle: "Request a quotation",
    metaDescription: "Review your equipment selection and prepare a business quotation enquiry with PROSAFE.",
    eyebrow: "PROSAFE / QUOTE PREPARATION",
    title: ["YOUR TEAM.", "YOUR SELECTION."],
    intro:
      "Review products and quantities for your workplace, then provide your business contact details. Your equipment selection is saved in this browser; contact details are not.",
    noscript: "JavaScript is needed to load your saved selection and submit a quotation request.",
    /** Client: passed to QuoteSelection as props (quotation page only). */
    selection: {
      loading: "Loading your quote selection…",
      storageUnavailable: "Browser storage is unavailable. Changes will remain in this tab but may be lost after leaving or reloading.",
      acceptedEyebrow: "REQUEST ACCEPTED",
      acceptedHeading: "Your quotation request has been accepted.",
      acceptedBody:
        "The configured email provider accepted your request for delivery. This confirms receipt by the provider, not a price, order, or delivery commitment.",
      reference: "Reference: {reference}",
      acceptedRemoved: "Submitted products were removed from your selection. Any items changed elsewhere while sending have been preserved.",
      exploreEquipment: "EXPLORE EQUIPMENT",
      viewRemaining: "VIEW REMAINING SELECTION",
      itemsLegend: "Selected products and quantities",
      itemsLabel: "Selected quote products",
      viewProduct: "View {name}",
      categoryDemo: "{category} / DEMO",
      decrease: "Decrease quantity for {name}",
      quantity: "Quantity for {name}",
      increase: "Increase quantity for {name}",
      removeLabel: "Remove {name} from quote",
      remove: "Remove",
      removed: "{name} removed from your quote selection.",
      overviewLabel: "Quote selection overview",
      overviewEyebrow: "YOUR SELECTION",
      selectedProducts: { one: "selected product", other: "selected products" },
      totalUnits: { one: "{count} total unit", other: "{count} total units" },
      savedLocally: "Saved in this browser. You can return and adjust your selection.",
      availableNote: "Review your selection and complete the business enquiry form below.",
      unavailableNote: "Submission is unavailable until a delivery destination is configured. Your selection has not been sent.",
      continueExploring: "CONTINUE EXPLORING",
      emptyEyebrow: "YOUR SELECTION / 0 PRODUCTS",
      emptyHeading: "Start with the equipment.",
      emptyBody: "Add demonstration products from the catalog, then adjust quantities here.",
    },
    /** Client: passed to QuoteRequestForm as props (quotation page only). */
    form: {
      eyebrow: "BUSINESS ENQUIRIES / REQUEST A QUOTATION",
      heading: "Tell us about your team.",
      intro: "The products and quantities above will accompany your request. Contact details stay in this form and are not saved in browser storage.",
      privacyLink: "Privacy information (draft; business details pending)",
      limits: "Up to {maxItems} products, {maxQuantity} units per product, and {maxTotalQuantity} units in total.",
      unavailable:
        "Submission is unavailable in the current demo environment because delivery is not configured. Your selection has not been sent.",
      sessionError: "We could not prepare the submission session.",
      retryConnection: "Retry connection",
      fieldsLegend: "Business contact and quotation requirements",
      fields: {
        company: "Company name",
        contact: "Contact person",
        email: "Business email",
        phone: "Phone number",
        city: "Delivery location / city",
      },
      optional: "(optional)",
      requirementsLabel: "Additional requirements",
      requirementsHelp: "Up to {max} characters. Include any sizing or delivery requirements; avoid sensitive personal information.",
      honeypotLabel: "Leave this field empty",
      consent: "I agree that PROSAFE may use my contact details and request information to respond to this quotation enquiry.",
      privacyPurpose:
        "If submission is enabled, your details and selection are sent to the configured PROSAFE quotation recipient through its email provider. They are used to handle this enquiry.",
      submit: "SEND QUOTATION REQUEST",
      sending: "SENDING REQUEST…",
      sendingStatus: "Sending your request. Please wait for confirmation.",
      reviewFields: "Please review the highlighted fields.",
      notConfirmed: "We could not confirm delivery. Your form and selection are preserved. Retry the same request to avoid duplicates.",
      sessionRefreshed: "The submission session was refreshed. Please wait a moment and retry; your details are preserved.",
      submissionUnavailable: "Submission is unavailable. Your request has not been sent and your selection is preserved.",
      rateLimited: "Too many attempts. Please wait ten minutes before retrying.",
      networkError: "We could not confirm delivery. Your details and selection are preserved. Please retry the same request.",
      /** Field errors returned by validation (client and API) as language-independent codes. */
      validation: {
        invalid_text: "Enter a valid text value.",
        too_long: "Use {max} characters or fewer.",
        control_characters: "Remove unsupported control characters.",
        single_line: "Use a single line.",
        required: "This field is required.",
        invalid_email: "Enter a valid business email address.",
        consent_required: "Your privacy consent is required to submit this request.",
        rejected: "Unable to submit this request. Please try again.",
        items_required: "Select at least one product before requesting a quote.",
        items_too_many: "Select no more than {max} products.",
        items_invalid: "Your product selection is invalid. Review the selected items.",
        item_unavailable: "A selected product is unavailable. Review your selection.",
        item_duplicate: "Each product may appear only once. Adjust its quantity instead.",
        item_quantity: "Each quantity must be a whole number from 1 to {max}.",
        items_total: "The selection cannot exceed {max} total units.",
        invalid_locale: "Select a supported language.",
      } satisfies Record<QuoteErrorCode, string>,
    },
  },
  notFound: {
    metaTitle: "Page not found",
    eyebrow: "PAGE NOT FOUND",
    heading: "This page is unavailable.",
    body: "Check the address or return to the homepage to continue exploring.",
    home: "BACK TO HOME",
  },
} as const;

type Widen<T> = T extends `/${string}`
  ? `/${string}`
  : T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly Widen<Item>[]
    : { readonly [Key in keyof T]: Widen<T[Key]> };

export type Dictionary = Widen<typeof en>;

/** Namespaces passed to client components through LocaleProvider on every page. Keep this small. */
export type ClientMessages = Pick<Dictionary, "common" | "header" | "quoteLink" | "addToQuote">;
