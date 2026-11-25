import type { Dictionary } from "./en";

/**
 * Albanian dictionary (default language).
 *
 * M9.0 spike: UNREVIEWED DRAFT translations for `/about` and the 404 page only.
 * Every Albanian string requires review and approval before production use.
 * "SAFETY WITHOUT COMPROMISE." is the official slogan and stays in English.
 */
export const sq = {
  meta: {
    defaultTitle: "PROSAFE — Safety Without Compromise.",
    description:
      "PROSAFE ofron pajisje premium për siguri në punë dhe zgjidhje të plota mbrojtjeje për bizneset në Kosovë. Safety Without Compromise.",
  },
  about: {
    metaTitle: "Rreth nesh",
    metaDescription:
      "Njihuni me PROSAFE: biznes distribuimi B2B për siguri në punë, i fokusuar në mbrojtjen e njerëzve në punë, me Kosovën si treg fillestar.",
    eyebrow: "RRETH NESH",
    intro:
      "PROSAFE sjell një qasje të fokusuar ndaj mbrojtjes në punë: njerëzit në radhë të parë, pajisje me qëllim dhe marrëdhënie biznesi të ndërtuara mbi qartësi.",
    facts: [
      { term: "Fokusi ynë", value: "Siguria në punë" },
      { term: "Modeli ynë", value: "Distribuim B2B" },
      { term: "Tregu fillestar", value: "Kosova" },
    ],
    missionHeading: "Përkushtim ndaj njerëzve që e kryejnë punën.",
    missionBody:
      "Misioni ynë është t’i ndihmojmë bizneset ta bëjnë mbrojtjen në punë pjesë të çdo dite pune. Nga kantieret e ndërtimit deri te linjat e prodhimit dhe magazinat, pika e nisjes është njeriu që e kryen detyrën.",
    sloganBody:
      "Ky është standardi që i vendosim qasjes sonë: ta kuptojmë punën, të komunikojmë qartë dhe të ndërtojmë një përzgjedhje të menduar pajisjesh sipas nevojave të vendit të punës.",
    distributionHeading: ["Ndërtuar për biznes.", "Duke filluar në Kosovë."],
    distributionBody: [
      "PROSAFE fokusohet në distribuimin biznes-me-biznes të pajisjeve për siguri në punë. Qasja jonë i lidh nevojat e prokurimit të bizneseve me informacionin e prodhuesve dhe me një proces të qartë ofertimi.",
      "Kosova është tregu ynë fillestar. Po zhvillojmë informacionin për produktet dhe marrëdhëniet me prodhuesit që nevojiten për t’i mbështetur bizneset në pajisjen e ekipeve të tyre.",
      "Katalogu aktual përmban produkte demonstruese të identifikuara qartë. Disponueshmëria, specifikimet dhe përshtatshmëria e produkteve duhet të konfirmohen para blerjes.",
    ],
    calloutHeading: "Gjeni një pikënisje për vendin tuaj të punës.",
    calloutBody: "Eksploroni pajisjet sipas industrisë ose mësoni si e qasemi bashkëpunimin me prodhuesit.",
    exploreIndustries: "EKSPLORONI INDUSTRITË",
    partnershipApproach: "QASJA JONË NDAJ PARTNERITETIT",
  },
  notFound: {
    metaTitle: "Faqja nuk u gjet",
    eyebrow: "FAQJA NUK U GJET",
    heading: "Kjo faqe nuk është e disponueshme.",
    body: "Kontrolloni adresën ose kthehuni në ballinë për të vazhduar eksplorimin.",
    home: "KTHEHU NË BALLINË",
  },
} as const satisfies Dictionary;
