/**
 * English dictionary. Its shape defines the `Dictionary` type, so every other
 * language must provide exactly the same keys (checked at compile time).
 *
 * M9.0 spike: only the namespaces needed to validate the architecture
 * (`/about` and the localized 404) are present.
 */
export const en = {
  common: {
    skipToContent: "Skip to content",
    homeLabel: "PROSAFE home",
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
  meta: {
    defaultTitle: "PROSAFE — Safety Without Compromise.",
    description:
      "PROSAFE provides premium workplace safety equipment and complete protection solutions for businesses in Kosovo. Safety Without Compromise.",
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

/** Namespaces passed to client components through LocaleProvider. Keep this small. */
export type ClientMessages = Pick<Dictionary, "common" | "header" | "quoteLink">;
