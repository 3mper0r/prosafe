import type { Dictionary } from "./en";

/**
 * Albanian dictionary (default language). Fully translated in M9.4:
 * Batches 1 and 2 approved; Batch 3 (quotation and legal drafts) awaits review.
 * Further linguistic refinement is planned for M9.7.
 *
 * Intentionally unchanged: "SAFETY WITHOUT COMPROMISE." (official slogan),
 * PROSAFE, B2B, product IDs and URL paths. Legal pages stay drafts.
 *
 * Conventions: buttons use the singular imperative ("Kërko ofertë",
 * "Shto në ofertë"); running text addresses the visitor formally
 * ("Zbuloni", "Krijoni"). Glossary terms are used verbatim.
 */
export const sq = {
  // Batch 2 — catalog and product discovery (approved).
  riskNote: {
    label: "Shënim për përzgjedhjen e pajisjeve",
    body: "Përzgjedhja përfundimtare e pajisjeve varet nga vlerësimi i rrezikut në vendin e punës dhe nga kërkesat përkatëse të sigurisë. Shfletimi sipas industrisë nuk përcakton se cilat pajisje mbrojtëse personale janë të nevojshme ose të përshtatshme për një vend pune të caktuar.",
    link: "Parimet e përzgjedhjes së PMP / EU-OSHA (në anglisht) ↗",
  },
  demoNotice: {
    label: "Njoftim për katalogun demonstrues",
    title: "Katalog demonstrues",
    body: "Shembuj fiktivë për të eksploruar katalogun dhe përzgjedhjen për ofertë. Nuk janë stok real. Ilustrimet, specifikimet dhe variantet janë ilustruese; nuk përfaqësohet asnjë prodhues apo performancë e certifikuar sigurie.",
  },
  productCard: {
    badge: "DEMO / ILUSTRIM I KATEGORISË",
    identifier: "{id} / PRODUKT DEMONSTRUES",
  },
  catalog: {
    metaTitle: "Katalogu i pajisjeve",
    metaDescription:
      "Eksploroni katalogun demonstrues të pajisjeve PROSAFE sipas kategorisë së mbrojtjes dhe përgatitni një përzgjedhje lokale për ofertë.",
    eyebrow: "PROSAFE / KATALOGU I PAJISJEVE",
    title: ["PAJISJE.", "ME QËLLIM."],
    intro: "Eksploroni mbrojtjen nga koka te këmbët. Gjeni një lloj pajisjeje dhe krijoni një përzgjedhje për ekipin tuaj.",
    industryGuide: "Udhëzuesi i industrisë / {industry} →",
    filtersLabel: "Kërko dhe filtro produktet",
    searchLabel: "Kërko pajisje",
    searchPlaceholder: "Emri i produktit ose fjalë kyçe",
    categoryLabel: "Kategoria e mbrojtjes",
    allCategories: "Të gjitha kategoritë",
    industryLabel: "Industria",
    allIndustries: "Të gjitha industritë",
    applyFilters: "ZBATO FILTRAT",
    unknownCategory: "Kategori e panjohur. Po shfaqen të gjitha kategoritë.",
    unknownIndustry: "Industri e panjohur. Po shfaqen të gjitha industritë.",
    // Albanian places the search phrase before the filters: "3 shembuj që përputhen me “x” / Ndërtimtari".
    resultSummary: { one: "{count} shembull{searchMatch}{filters}", other: "{count} shembuj{searchMatch}{filters}" },
    resultFilterIndustry: " / {industry}",
    resultFilterCategory: " / {category}",
    resultFilterAllCategories: " / Të gjitha kategoritë",
    resultSearch: { one: " që përputhet me “{search}”", other: " që përputhen me “{search}”" },
    clearFilters: "Pastro filtrat",
    resultsLabel: "Produkte demonstruese",
    emptyEyebrow: "NUK U GJETËN PAJISJE",
    emptyHeading: "Provoni një kërkim tjetër.",
    emptyBody: "Përdorni një fjalë kyçe tjetër ose pastroni filtrat e kategorisë dhe të kërkimit.",
    viewIndustryExamples: "SHIKO SHEMBUJT E INDUSTRISË",
    viewAllExamples: "SHIKO TË GJITHË SHEMBUJT",
    explorerLink: "Gjeni kategorinë tuaj te Eksploro mbrojtjen →",
  },
  productDetail: {
    metaTitle: "{name} — Demo",
    metaDescription: "{summary} Produkt demonstrues, jo stok real.",
    notFoundTitle: "Produkti nuk u gjet",
    breadcrumb: "Rruga e navigimit",
    allEquipment: "Të gjitha pajisjet",
    imageCaption: "Ilustrim i përgjithshëm i kategorisë. Fotografitë e miratuara të produkteve do të shoqërojnë të dhënat reale të prodhuesve.",
    eyebrow: "{category} / DEMONSTRIM",
    identifier: "IDENTIFIKUESI I PRODUKTIT / {id}",
    viewQuote: "Shiko përzgjedhjen për ofertë →",
    quoteNote: "Ruani lokalisht produktin dhe sasinë, pastaj shqyrtoni formularin e ofertës. Mundësia e dërgimit tregohet aty.",
    specificationsHeading: "Specifikimet teknike",
    specificationsNote: "Vetëm fusha ilustruese. Këto nuk janë specifikime të verifikuara të produktit.",
    variantsHeading: "Shembuj variantesh",
    variantsNote: "Shfaqen vetëm si referencë. Variantet nuk mund të zgjidhen dhe nuk regjistrohen në këtë përzgjedhje për ofertë me produkt dhe sasi.",
  },
  productNotFound: {
    eyebrow: "PRODUKTI NUK U GJET",
    heading: "Ky produkt nuk është i disponueshëm.",
    body: "Kthehuni te katalogu për të eksploruar produktet demonstruese.",
    action: "KTHEHU TE PAJISJET",
  },
  industries: {
    metaTitle: "Industritë",
    metaDescription:
      "Eksploroni pajisjet demonstruese të PROSAFE sipas industrisë, nga ndërtimtaria dhe prodhimi te logjistika, punët elektrike dhe mirëmbajtja industriale.",
    eyebrow: "PROSAFE / INDUSTRITË",
    title: ["PUNË TË NDRYSHME.", "NJË QËLLIM."],
    intro: "Filloni nga mjedisi juaj i punës. Eksploroni kategoritë e mbrojtjes dhe pajisjet demonstruese për industrinë tuaj.",
    findProtection: "GJEJ MBROJTJEN E DUHUR",
    findProtectionNote: "Zgjidhni industrinë tuaj në një hap për të parë një koleksion fillestar me shembuj pajisjesh.",
    listLabel: "Industritë",
    cardEyebrow: "{number} / INDUSTRIA",
    categoriesLabel: "Kategoritë e mbrojtjes për {industry}",
    exploreIndustry: "Eksploro industrinë",
    browseProducts: "Shfleto produktet demo",
  },
  industryDetail: {
    notFoundTitle: "Industria nuk u gjet",
    breadcrumb: "Rruga e navigimit",
    allIndustries: "Të gjitha industritë",
    eyebrow: "PROSAFE / ZBULIMI SIPAS INDUSTRISË",
    considerationsEyebrow: "VENDI I PUNËS / PARA PAJISJEVE",
    considerationsHeading: "Aspekte të zakonshme të mbrojtjes",
    chooseAnother: "Zgjidhni një industri tjetër te Gjej mbrojtjen e duhur →",
  },
  industryNotFound: {
    eyebrow: "INDUSTRIA NUK U GJET",
    heading: "Ky udhëzues industrie nuk është i disponueshëm.",
    body: "Zgjidhni një nga pesë industritë për të eksploruar shembuj pajisjesh.",
    action: "SHIKO INDUSTRITË",
  },
  industryEquipment: {
    categoriesEyebrow: "01 / KATEGORITË E PAJISJEVE",
    categoriesHeading: "Kategori të rëndësishme për t’u eksploruar",
    categoriesIntro: "Një pikënisje për shfletim, jo një listë e plotë pajisjesh për çdo detyrë.",
    examplesEyebrow: "02 / PAJISJE DEMONSTRUESE",
    // Uses the name as written: "Shembuj për {industry}" would need the accusative case.
    examplesHeading: "{industry}: shembuj pajisjesh",
    filterInCatalog: "Filtro në katalog",
    productsLabel: "Produkte demonstruese për industrinë",
    quotePromptLabel: "Përgatit një përzgjedhje për ofertë",
    quotePromptEyebrow: "EKIPI JUAJ / PËRZGJEDHJA JUAJ",
    quotePromptHeading: "Bashkoni listën tuaj të pajisjeve.",
    quotePromptBody: "Shtoni shembuj në përzgjedhjen tuaj dhe rregulloni sasitë, pastaj shqyrtoni formularin e ofertës dhe mundësinë e dërgimit.",
    quotePromptAction: "KËRKO OFERTË",
  },
  findYourProtection: {
    metaTitle: "Gjej mbrojtjen e duhur",
    metaDescription:
      "Zgjidhni një industri për të eksploruar kategoritë përkatëse të mbrojtjes dhe pajisjet demonstruese nga katalogu i PROSAFE.",
    eyebrow: "PROSAFE / GJEJ MBROJTJEN E DUHUR",
    title: ["FILLONI ME", "INDUSTRINË TUAJ."],
    intro:
      "Zgjidhni mjedisin tuaj të punës. Eksploroni një koleksion fillestar me kategori pajisjesh dhe produkte demonstruese, pastaj shtoni shembuj në përzgjedhjen tuaj për ofertë.",
    formLabel: "Gjej pajisje sipas industrisë",
    industryLabel: "Industria juaj",
    industryPlaceholder: "Zgjidhni industrinë tuaj",
    submit: "SHFAQ PAJISJET",
    help: "Një përzgjedhje industrie. Mund ta ndryshoni në çdo kohë.",
    resultEyebrow: "INDUSTRIA JUAJ / PIKËNISJA PËR PAJISJET",
    industryGuide: "Lexo udhëzuesin e industrisë",
    statusLabel: "Statusi i përzgjedhjes së industrisë",
    invalidIndustry: "Kjo industri nuk është e disponueshme. Zgjidhni një nga pesë industritë më lart për të vazhduar.",
    chooseIndustry: "Zgjidhni industrinë tuaj më lart për të parë kategoritë dhe shembujt e pajisjeve.",
    browseGuides: "Ose shfletoni të gjithë udhëzuesit e industrive →",
  },
  explorer: {
    metaTitle: "Eksploro mbrojtjen",
    metaDescription:
      "Eksploroni mbrojtjen në punë nga koka te këmbët: helmeta mbrojtëse, syze mbrojtëse, doreza, veshje dhe këpucë mbrojtëse.",
    backLink: "Kthehu te PROSAFE",
    eyebrow: "PROSAFE / EKSPLORO MBROJTJEN",
    title: ["MBROJTJE.", "NGA KOKA TE KËMBËT."],
    intro:
      "Zgjidhni një zonë për të eksploruar kategorinë e pajisjeve. Në kompjuter kaloni miun ose klikoni, në celular prekni, ose përdorni tastin Tab dhe shigjetat te përzgjedhësi i zonave.",
    widget: {
      zoneLegend: "Zgjidhni një zonë mbrojtjeje",
      viewCategory: "Shiko {categoryLower}",
      hotspotsLabel: "Pikat e mbrojtjes në figurën e punëtorit",
      hotspotLabel: "{zone} — {category}",
      figcaption: ["Ilustrim i përkohshëm i trupit të plotë.", "Fotografia përfundimtare e punëtorit do ta zëvendësojë këtë pamje."],
      selectedEyebrow: "MBROJTJA E ZGJEDHUR / {zone}",
      browseCategory: "Shfleto {categoryLower}",
      catalogComingSoon: "Katalogu vjen së shpejti. Kjo kategori do të jetë e disponueshme kur të lansohet katalogu i produkteve.",
      selectionNote:
        "Eksploroni një zonë tjetër përmes shenjave në figurë ose përzgjedhësit të zonave. Përzgjedhja juaj mbetet e dukshme derisa të zgjidhni një zonë tjetër.",
    },
  },
  addToQuote: {
    ariaLabel: "Shto {name} në ofertë",
    add: "SHTO NË OFERTË",
    limitReached: "U ARRIT KUFIRI I SASISË",
    added: "{name} u shtua. {quantity} në përzgjedhjen tuaj.",
    storageUnavailable: " Hapësira ruajtëse e shfletuesit nuk është e disponueshme; kjo përzgjedhje mund të humbasë kur të largoheni ose ta rifreskoni faqen.",
  },
  // Batch 3 — quotation and legal content (translated, pending review).
  // Legal texts remain DRAFTS: they describe the current website and open items only.
  businessPage: {
    completionLabel: "Para lansimit",
    completionEyebrow: "DRAFT / PËR T’U PLOTËSUAR PARA LANSIMIT",
  },
  privacy: {
    metaTitle: "Privatësia — Draft",
    metaDescription:
      "Draft i informacionit për privatësinë në PROSAFE, që përshkruan procesin aktual të ofertës dhe informacionin e biznesit që duhet plotësuar para lansimit.",
    eyebrow: "PRIVATËSIA / DRAFT",
    title: ["INFORMACION", "PËR PRIVATËSINË."],
    intro: "Ky draft përshkruan procesin aktual të ofertës në këtë uebfaqe. Informacioni specifik i biznesit për privatësinë mbetet i paplotësuar.",
    notice:
      "Ky nuk është një njoftim përfundimtar për privatësinë. Operatori duhet ta plotësojë dhe ta miratojë informacionin e identifikuar para lansimit dhe para mbledhjes së kërkesave reale nga bizneset. Nuk është caktuar data e hyrjes në fuqi.",
    completeBeforeLaunch: "Për t’u plotësuar para lansimit:",
    operator: {
      heading: "01 / Biznesi përgjegjës.",
      body: "PROSAFE është marka që përdoret në këtë uebfaqe. Subjekti juridik përgjegjës për të dhënat personale ende nuk është dhënë.",
      pending: "emri i subjektit juridik, adresa e regjistruar, email-i i kontaktit për privatësinë dhe çdo përfaqësues ose kontakt përkatës për mbrojtjen e të dhënave.",
      link: "Shikoni draftin e të dhënave ligjore të kompanisë",
    },
    inquiryData: {
      heading: "02 / Informacioni i ofertës.",
      body: [
        "Formulari i ofertës kërkon emrin e kompanisë, personin e kontaktit, email-in e biznesit, produktet e përzgjedhura dhe sasitë, si dhe pëlqimin për përdorimin e informacionit për t’iu përgjigjur kërkesës. Numri i telefonit, qyteti i dërgesës dhe kërkesat shtesë janë opsionale.",
        "Të dhënat e kontaktit mbeten në formularin aktual dhe nuk shkruhen në hapësirën ruajtëse të shfletuesit. Kur dërgimi është i aktivizuar dhe ju e dërgoni kërkesën, uebfaqja e verifikon kërkesën dhe ia dërgon të dhënat dhe përzgjedhjen marrësit të konfiguruar të ofertave përmes ofruesit të saj të shërbimit të email-it.",
        "Qëllimi i deklaruar është trajtimi i kërkesës për ofertë. Formulari nuk kërkon leje për marketing. Aplikacioni nuk ka bazë të dhënash ose arkiv të përhershëm të ofertave.",
      ],
      pending: "konfirmimi i qëllimeve dhe i bazës ligjore përkatëse për çdo aktivitet përpunimi, i marrësve përgjegjës dhe i mënyrës së trajtimit të kërkesave për privatësi.",
    },
    storage: {
      heading: "03 / Ruajtja në shfletues dhe përpunimi teknik.",
      selectionBeforeKey: "Përzgjedhja për ofertë përdor hapësirën ruajtëse lokale të shfletuesit nën çelësin",
      selectionAfterKey:
        "për të mbajtur mend identifikuesit e produkteve dhe sasitë ndërmjet vizitave. Ajo nuk skadon automatikisht. Mund t’i hiqni artikujt në faqen e ofertës ose ta pastroni hapësirën ruajtëse të kësaj uebfaqeje në shfletuesin tuaj. Kërkesat e pranuara e heqin përzgjedhjen e dërguar, duke ruajtur ndryshimet e bëra njëkohësisht.",
      service:
        "Shërbimi i ofertave përdor tokena të përkohshëm sesioni, identifikues kërkesash, shenja identifikuese të kërkesave dhe numërues tentativash për të verifikuar dërgesat, për të kufizuar abuzimin dhe për të shmangur dërgimin e dyfishtë. Regjistri i kërkesave në memorie i ruan të dhënat deri në 24 orë, varësisht nga pastrimi dhe rinisja e procesit; ai nuk ruan fushat e papërpunuara të kontaktit në regjistrimet e përfunduara.",
      pending:
        "shqyrtimi i regjistrave të hostimit në versionin e publikuar, i të dhënave meta të rrjetit, i cookies dhe i inventarit të ruajtjes; identifikimi i ofruesit të hostimit dhe i çdo mjeti shtesë. Konfirmimi i afateve të ruajtjes dhe i çdo kërkese për pëlqim për versionin përfundimtar.",
    },
    recipients: {
      heading: "04 / Ofruesit, marrësit dhe ruajtja e të dhënave.",
      body: "Përshtatësi opsional ekzistues i email-it mbështet Resend. Kjo përshkruan softuerin e mbështetur, jo konfirmimin e një ofruesi të kontraktuar. Dërgimi mbetet i padisponueshëm derisa të vendoset konfigurim i vlefshëm. Ofruesi i konfiguruar dhe kutia postare e marrësit trajtojnë informacionin e kërkesave të pranuara.",
      pending:
        "identifikimi i ofruesit real dhe i marrësve të kutisë postare; dokumentimi i marrëveshjeve të përpunimit, i vendeve të përpunimit, i çdo transferimi ndërkombëtar dhe i masave mbrojtëse, si dhe i afateve të ruajtjes dhe fshirjes për email-et e kërkesave, të dhënat e ofruesit dhe regjistrat teknikë.",
    },
    rights: {
      heading: "05 / Kërkesat për privatësi dhe përditësimet.",
      pending:
        "shpjegimi i të drejtave përkatëse, i mënyrës së ushtrimit të tyre, i çdo procesi për tërheqjen e pëlqimit, si dhe i autoritetit mbikëqyrës përkatës dhe i kanalit të ankesave. Publikimi i një kontakti të verifikuar për privatësinë dhe i një date të hyrjes në fuqi ose të përditësimit të fundit pas shqyrtimit.",
      body: "Ende nuk është publikuar një kanal për kërkesat për privatësi. Ky draft duhet të shqyrtohet në raport me biznesin real, versionin e publikuar dhe kërkesat përkatëse.",
      link: "Shikoni statusin e informacionit të kontaktit",
    },
  },
  imprint: {
    metaTitle: "Të dhënat ligjore — Draft",
    metaDescription:
      "Draft i të dhënave të kompanisë PROSAFE dhe të operatorit të uebfaqes; identiteti juridik, regjistrimi dhe të dhënat e kontaktit presin verifikim para lansimit.",
    eyebrow: "TË DHËNAT LIGJORE / DRAFT",
    title: ["INFORMACIONI", "PËR KOMPANINË."],
    intro:
      "PROSAFE fokusohet në distribuimin B2B të pajisjeve për siguri në punë, me Kosovën si treg fillestar. Të dhënat e verifikuara juridike dhe të operatorit ende nevojiten.",
    notice:
      "Ky dokument për të dhënat ligjore është një draft i paplotësuar. PROSAFE këtu është emër marke, jo emër i verifikuar i subjektit juridik. Të gjitha fushat më poshtë duhet të plotësohen ose të konfirmohen si të pazbatueshme dhe të shqyrtohen para lansimit.",
    identity: {
      heading: "01 / Operatori i uebfaqes.",
      items: [
        { term: "Emri i subjektit juridik:", text: "për t’u dhënë dhe verifikuar." },
        { term: "Forma juridike:", text: "për t’u dhënë dhe verifikuar." },
        { term: "Adresa e regjistruar e biznesit:", text: "për t’u dhënë dhe verifikuar." },
        { term: "Përfaqësuesi i autorizuar:", text: "emri dhe roli për t’u dhënë dhe verifikuar." },
      ],
      note: "Kosova është tregu fillestar; kjo nuk përcakton vendin e regjistrimit ose adresën e regjistruar të operatorit.",
    },
    registration: {
      heading: "02 / Regjistrimi dhe të dhënat tatimore.",
      items: [
        { term: "Numri i regjistrimit të biznesit dhe regjistri:", text: "për t’u dhënë dhe verifikuar." },
        { term: "Numri fiskal / numri i TVSH-së:", text: "për t’u dhënë dhe verifikuar, kur zbatohet." },
        { term: "Të dhënat përkatëse për licencim ose mbikëqyrje:", text: "zbatueshmëria për t’u konfirmuar." },
      ],
    },
    contact: {
      heading: "03 / Kontakti i biznesit.",
      items: [
        { term: "Email-i i biznesit:", text: "adresa publike e verifikuar në pritje." },
        { term: "Telefoni i biznesit:", text: "numri publik i verifikuar në pritje." },
        { term: "Adresa për korrespondencë:", text: "për t’u konfirmuar me operatorin." },
      ],
      link: "Informacion për kërkesat e biznesit dhe ofertat",
    },
    publication: {
      heading: "04 / Shqyrtimi para publikimit.",
      pendingLabel: "Për t’u plotësuar para lansimit:",
      pending:
        "konfirmimi i kërkesave përkatëse për publikimin e informacionit, i çdo informacioni shtesë për personat përgjegjës dhe i një date publikimi ose shqyrtimi. Zëvendësimi i fushave në pritje me të dhëna të miratuara të biznesit.",
      link: "Lexoni draftin e informacionit për privatësinë",
    },
  },
  quote: {
    metaTitle: "Kërko ofertë",
    metaDescription: "Shqyrtoni përzgjedhjen tuaj të pajisjeve dhe përgatitni një kërkesë biznesi për ofertë te PROSAFE.",
    eyebrow: "PROSAFE / PËRGATITJA E OFERTËS",
    title: ["EKIPI JUAJ.", "PËRZGJEDHJA JUAJ."],
    intro:
      "Shqyrtoni produktet dhe sasitë për vendin tuaj të punës, pastaj jepni të dhënat e kontaktit të biznesit. Përzgjedhja juaj e pajisjeve ruhet në këtë shfletues; të dhënat e kontaktit jo.",
    noscript: "Nevojitet JavaScript për të ngarkuar përzgjedhjen e ruajtur dhe për të dërguar kërkesën për ofertë.",
    selection: {
      loading: "Po ngarkohet përzgjedhja juaj për ofertë…",
      storageUnavailable: "Hapësira ruajtëse e shfletuesit nuk është e disponueshme. Ndryshimet do të mbeten në këtë skedë, por mund të humbasin pasi të largoheni ose ta rifreskoni faqen.",
      acceptedEyebrow: "KËRKESA U PRANUA",
      acceptedHeading: "Kërkesa juaj për ofertë u pranua.",
      acceptedBody:
        "Ofruesi i konfiguruar i email-it e pranoi kërkesën tuaj për dërgim. Kjo konfirmon marrjen nga ofruesi, jo një çmim, porosi apo zotim për dërgesë.",
      reference: "Referenca: {reference}",
      acceptedRemoved: "Produktet e dërguara u hoqën nga përzgjedhja juaj. Artikujt që u ndryshuan diku tjetër gjatë dërgimit janë ruajtur.",
      exploreEquipment: "EKSPLORO PAJISJET",
      viewRemaining: "SHIKO PËRZGJEDHJEN E MBETUR",
      itemsLegend: "Produktet e përzgjedhura dhe sasitë",
      itemsLabel: "Produktet e përzgjedhura për ofertë",
      viewProduct: "Shiko {name}",
      categoryDemo: "{category} / DEMO",
      decrease: "Zvogëlo sasinë për {name}",
      quantity: "Sasia për {name}",
      increase: "Rrit sasinë për {name}",
      removeLabel: "Hiq {name} nga oferta",
      remove: "Hiq",
      removed: "{name} u hoq nga përzgjedhja juaj për ofertë.",
      overviewLabel: "Përmbledhja e përzgjedhjes për ofertë",
      overviewEyebrow: "PËRZGJEDHJA JUAJ",
      selectedProducts: { one: "produkt i përzgjedhur", other: "produkte të përzgjedhura" },
      // "njësi" has the same singular and plural form.
      totalUnits: { one: "{count} njësi gjithsej", other: "{count} njësi gjithsej" },
      savedLocally: "E ruajtur në këtë shfletues. Mund të ktheheni dhe ta rregulloni përzgjedhjen.",
      availableNote: "Shqyrtoni përzgjedhjen dhe plotësoni formularin e kërkesës së biznesit më poshtë.",
      unavailableNote: "Dërgimi nuk është i disponueshëm derisa të konfigurohet një destinacion dërgimi. Përzgjedhja juaj nuk është dërguar.",
      continueExploring: "VAZHDO EKSPLORIMIN",
      emptyEyebrow: "PËRZGJEDHJA JUAJ / 0 PRODUKTE",
      emptyHeading: "Filloni me pajisjet.",
      emptyBody: "Shtoni produkte demonstruese nga katalogu, pastaj rregulloni sasitë këtu.",
    },
    form: {
      eyebrow: "KËRKESA BIZNESI / KËRKO OFERTË",
      heading: "Na tregoni për ekipin tuaj.",
      intro: "Produktet dhe sasitë më lart do ta shoqërojnë kërkesën tuaj. Të dhënat e kontaktit mbeten në këtë formular dhe nuk ruhen në hapësirën ruajtëse të shfletuesit.",
      privacyLink: "Informacion për privatësinë (draft; të dhënat e biznesit në pritje)",
      limits: "Deri në {maxItems} produkte, {maxQuantity} njësi për produkt dhe {maxTotalQuantity} njësi gjithsej.",
      unavailable:
        "Dërgimi nuk është i disponueshëm në mjedisin aktual demonstrues, sepse dërgimi i kërkesave nuk është konfiguruar. Përzgjedhja juaj nuk është dërguar.",
      sessionError: "Nuk mundëm ta përgatisim sesionin e dërgimit.",
      retryConnection: "Provo përsëri lidhjen",
      fieldsLegend: "Kontakti i biznesit dhe kërkesat për ofertë",
      fields: {
        company: "Emri i kompanisë",
        contact: "Personi i kontaktit",
        email: "Email-i i biznesit",
        phone: "Numri i telefonit",
        city: "Vendi i dërgesës / qyteti",
      },
      optional: "(opsionale)",
      requirementsLabel: "Kërkesa shtesë",
      requirementsHelp: "Deri në {max} karaktere. Shënoni çdo kërkesë për masa ose dërgesë; shmangni informacionin personal të ndjeshëm.",
      honeypotLabel: "Lëreni këtë fushë bosh",
      consent: "Pajtohem që PROSAFE të përdorë të dhënat e mia të kontaktit dhe informacionin e kërkesës për t’iu përgjigjur kësaj kërkese për ofertë.",
      privacyPurpose:
        "Nëse dërgimi është i aktivizuar, të dhënat dhe përzgjedhja juaj i dërgohen marrësit të konfiguruar të ofertave të PROSAFE përmes ofruesit të tij të email-it. Ato përdoren për trajtimin e kësaj kërkese.",
      submit: "DËRGO KËRKESËN PËR OFERTË",
      sending: "PO DËRGOHET KËRKESA…",
      sendingStatus: "Kërkesa juaj po dërgohet. Ju lutemi prisni konfirmimin.",
      reviewFields: "Ju lutemi kontrolloni fushat e theksuara.",
      notConfirmed: "Nuk mundëm ta konfirmojmë dërgimin. Formulari dhe përzgjedhja juaj janë ruajtur. Provoni përsëri të njëjtën kërkesë për të shmangur dyfishimet.",
      sessionRefreshed: "Sesioni i dërgimit u rifreskua. Ju lutemi prisni një çast dhe provoni përsëri; të dhënat tuaja janë ruajtur.",
      submissionUnavailable: "Dërgimi nuk është i disponueshëm. Kërkesa juaj nuk është dërguar dhe përzgjedhja juaj është ruajtur.",
      rateLimited: "Shumë tentativa. Ju lutemi prisni dhjetë minuta para se të provoni përsëri.",
      networkError: "Nuk mundëm ta konfirmojmë dërgimin. Të dhënat dhe përzgjedhja juaj janë ruajtur. Ju lutemi provoni përsëri të njëjtën kërkesë.",
      validation: {
        invalid_text: "Shënoni një vlerë tekstuale të vlefshme.",
        too_long: "Përdorni {max} karaktere ose më pak.",
        control_characters: "Hiqni karakteret e kontrollit që nuk mbështeten.",
        single_line: "Përdorni vetëm një rresht.",
        required: "Kjo fushë është e detyrueshme.",
        invalid_email: "Shënoni një adresë të vlefshme email-i biznesi.",
        consent_required: "Pëlqimi juaj për privatësinë është i nevojshëm për ta dërguar këtë kërkesë.",
        rejected: "Kjo kërkesë nuk mund të dërgohet. Ju lutemi provoni përsëri.",
        items_required: "Përzgjidhni të paktën një produkt para se të kërkoni ofertë.",
        items_too_many: "Përzgjidhni jo më shumë se {max} produkte.",
        items_invalid: "Përzgjedhja juaj e produkteve nuk është e vlefshme. Kontrolloni artikujt e përzgjedhur.",
        item_unavailable: "Një produkt i përzgjedhur nuk është i disponueshëm. Kontrolloni përzgjedhjen tuaj.",
        item_duplicate: "Çdo produkt mund të shfaqet vetëm një herë. Rregulloni sasinë e tij.",
        item_quantity: "Çdo sasi duhet të jetë numër i plotë nga 1 deri në {max}.",
        items_total: "Përzgjedhja nuk mund të kalojë {max} njësi gjithsej.",
        invalid_locale: "Zgjidhni një gjuhë të mbështetur.",
      },
    },
  },

  // Batch 1 — brand and shared interface (approved).
  common: {
    skipToContent: "Kalo te përmbajtja",
    homeLabel: "PROSAFE – Ballina",
  },
  meta: {
    defaultTitle: "PROSAFE — Safety Without Compromise.",
    description:
      "PROSAFE ofron pajisje premium për siguri në punë dhe zgjidhje të plota mbrojtjeje për bizneset në Kosovë. Safety Without Compromise.",
  },
  header: {
    navigation: [
      { label: "Produktet", href: "/products" },
      { label: "Industritë", href: "/industries" },
      { label: "Markat", href: "/brands" },
      { label: "Rreth nesh", href: "/about" },
      { label: "Kontakti", href: "/contact" },
    ],
    mainNavigation: "Navigimi kryesor",
    mobileNavigation: "Navigimi mobil",
    mobileMenuTitle: "PROSAFE / Navigimi",
    openNavigation: "Hap navigimin",
    closeNavigation: "Mbyll navigimin",
  },
  footer: {
    navigationLabel: "Navigimi i kompanisë dhe informacioni ligjor",
    links: [
      { href: "/about", label: "Rreth nesh" },
      { href: "/brands", label: "Markat" },
      { href: "/contact", label: "Kontakti" },
      { href: "/privacy", label: "Privatësia (draft)" },
      { href: "/imprint", label: "Të dhënat ligjore (draft)" },
    ],
    photoCredit: "Fotografitë: Kindel Media & Nothing Ahead / Pexels",
  },
  quoteLink: {
    label: "Oferta",
    ariaLabel: {
      one: "Përzgjedhja për ofertë, {count} produkt i përzgjedhur",
      other: "Përzgjedhja për ofertë, {count} produkte të përzgjedhura",
    },
  },
  home: {
    hero: {
      sidebarLabel: "Mbrojtja në punë nga PROSAFE",
      sidebarIndex: "PROSAFE / 01",
      purpose: ["PAJISJE", "SIGURIE"],
      purposeNote: ["Për njerëzit", "që e bëjnë punën."],
      eyebrow: "MBROJTJA ËSHTË QËLLIMI YNË.",
      headline: ["MBROJTJA", "NUK ËSHTË", "OPSIONALE."],
      primaryAction: "EKSPLORO PAJISJET",
      secondaryAction: "GJEJ MBROJTJEN E DUHUR",
      panelIndex: "MBROJTJA PERSONALE / 01",
      panelHeading: ["KOKA.", "DUART.", "DHE GJITHÇKA", "MES TYRE."],
      panelCopy: "Pajisje profesionale sigurie dhe zgjidhje për mbrojtjen në punë, për çdo industri.",
      panelLink: "Shfleto pajisjet mbrojtëse",
      panelFootnote: ["KATALOGU I PAJISJEVE", "KOLEKSION DEMONSTRUES"],
      scrollIndicator: "EKSPLORO PAJISJET",
      workerAlt:
        "Punëtor industrial në profil, me helmetë mbrojtëse portokalli, syze mbrojtëse transparente dhe veshje pune të errët.",
    },
    equipment: {
      index: "01 / PAJISJET",
      heading: ["ÇDO SHTRESË", "E MBROJTJES."],
      intro: "Nga detyra e parë deri te turni i fundit. Zbuloni bazat e mbrojtjes në punë.",
      catalogLink: ["KATALOGU I PAJISJEVE ↗", "EKSPLORO PRODUKTET DEMONSTRUESE"],
      items: {
        head: "Mbrojtja e kokës",
        eyeFace: "Mbrojtja e syve dhe e fytyrës",
        hearing: "Mbrojtja e dëgjimit",
        hand: "Mbrojtja e duarve",
        workwear: "Veshje pune mbrojtëse",
        footwear: "Këpucë mbrojtëse",
      },
    },
    approach: {
      index: "02 / QASJE E PLOTË",
      heading: "PUNA NDRYSHON.",
      headingAccent: "QËLLIMI YNË MBETET I NJËJTË.",
      intro:
        "Mbrojtja fillon me të kuptuarit e punës. PROSAFE i bashkon pajisjet me nevojat e vendit të punës, duke i vënë në qendër njerëzit që e kryejnë punën.",
      explorerLink: "EKSPLORO MBROJTJEN",
      industryLink: "GJEJ PAJISJE SIPAS INDUSTRISË",
    },
    industries: {
      index: "03 / INDUSTRITË",
      heading: ["AMBIENTE TË NDRYSHME.", "NJË STANDARD KUJDESI."],
      allIndustries: "EKSPLORO TË GJITHA INDUSTRITË",
    },
    about: {
      index: "04 / RRETH PROSAFE",
      heading: ["MË SHUMË SE PAJISJE.", "NJË ANGAZHIM PËR NJERËZIT."],
      intro:
        "PROSAFE është partner për mbrojtjen në punë për bizneset në Kosovë. Qëllimi ynë është i thjeshtë: të sjellim pajisje profesionale sigurie dhe një qasje të plotë ndaj mbrojtjes në çdo ditë pune.",
      link: "RRETH PROSAFE",
    },
    contact: {
      index: "05 / KËRKESA BIZNESI",
      status: "KËRKESA PËR OFERTA BIZNESI",
      heading: ["LE TË FLASIM", "PËR MBROJTJEN"],
      intro: "Pajisja e një ekipi fillon me një bisedë. Krijoni një përzgjedhje pajisjesh dhe shqyrtoni formularin B2B për ofertë.",
      footnote: "Mundësia e dërgimit të kërkesës tregohet në faqen e ofertës.",
      quoteLink: "KËRKO OFERTË",
      contactLink: "INFORMACIONI I KONTAKTIT PËR BIZNESE",
    },
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
    calloutBody: "Eksploroni pajisjet sipas industrisë ose mësoni si u qasemi partneriteteve me prodhuesit.",
    exploreIndustries: "EKSPLORO INDUSTRITË",
    partnershipApproach: "QASJA JONË NDAJ PARTNERITETEVE",
  },
  brands: {
    metaTitle: "Markat dhe partneritetet me prodhuesit",
    metaDescription:
      "Mësoni për qasjen e PROSAFE ndaj partneriteteve me prodhuesit dhe informacionit të verifikuar për produktet në distribuimin B2B të pajisjeve të sigurisë në Kosovë.",
    eyebrow: "MARKAT DHE PARTNERITETET",
    title: ["MARRËDHËNIE TË FORTA.", "STANDARDE TË QARTA."],
    intro:
      "Qasja jonë ndaj partneriteteve me prodhuesit nis nga një fokus i përbashkët në mbrojtjen në punë dhe në informacion të qartë për klientët biznesorë në Kosovë.",
    partnershipHeading: "Një qasje e menduar ndaj distribuimit.",
    partnershipBody:
      "Synojmë të ndërtojmë marrëdhënie me prodhuesit që mbështesin përzgjedhjen e informuar të pajisjeve dhe komunikim të besueshëm biznesor.",
    principles: [
      {
        term: "Identitet dhe autorizim i verifikuar.",
        text: "Konfirmimi i prodhuesit dhe i fushëveprimit të çdo marrëdhënieje distribuimi para publikimit të një partneriteti.",
      },
      {
        term: "Informacion i dokumentuar për produktet.",
        text: "Shqyrtimi i specifikimeve, përdorimeve të synuara dhe dokumentacionit mbështetës para shtimit të produkteve reale.",
      },
      {
        term: "Mbështetje praktike për biznesin.",
        text: "Caktimi i kontakteve të qarta për oferta, disponueshmëri dhe pyetje rreth produkteve.",
      },
    ],
    partnersLabel: "PARTNERË TË VERIFIKUAR / LISTË E ARDHSHME",
    partnersHeading: "Ende nuk janë publikuar partnerë prodhues.",
    partnersBody: [
      "Kjo hapësirë është e rezervuar për partnerë të verifikuar në të ardhmen. Emrat, logot dhe detajet e marrëdhënies me prodhuesit do të shtohen vetëm pas verifikimit dhe lejes për publikim.",
      "Produktet demonstruese në katalog nuk përfaqësojnë partneritete me prodhues ose marrëveshje të autorizuara distribuimi.",
    ],
    manufacturerHeading: "Për prodhuesit.",
    manufacturerBody:
      "Ju intereson fokusi i PROSAFE në distribuimin B2B në Kosovë? Shqyrtoni informacionin për kërkesat e partneritetit në faqen tonë të kontaktit. Një kanal i verifikuar për kontakt të drejtpërdrejtë është ende në pritje.",
    partnershipInquiries: "KËRKESA PËR PARTNERITET",
  },
  contact: {
    metaTitle: "Kontakti dhe kërkesat e bizneseve",
    metaDescription:
      "Përgatitni një kërkesë për ofertë biznesi te PROSAFE dhe gjeni informacion për kërkesa të përgjithshme biznesi dhe për partneritete me prodhues. Tregu fillestar: Kosova.",
    eyebrow: "KONTAKTI",
    title: ["LE TË FLASIM", "PËR MBROJTJEN."],
    intro: "Për bizneset që pajisin ekipet e tyre dhe për prodhuesit që eksplorojnë një marrëdhënie distribuimi. Tregu ynë fillestar është Kosova.",
    quotationHeading: "Oferta për biznese.",
    quotationBody:
      "Krijoni një përzgjedhje nga katalogu demonstrues, pastaj shqyrtoni sasitë dhe kërkesat e biznesit në procesin ekzistues të ofertës. Mundësia e dërgimit tregohet në faqen e ofertës; dërgimi kërkon konfigurim.",
    prepareQuotation: "KËRKO OFERTË",
    browseEquipment: "SHFLETO PAJISJET DEMONSTRUESE",
    businessHeading: "Kërkesa të përgjithshme biznesi.",
    businessBody:
      "Për një kërkesë për pajisje, në formularin e ofertës shënoni kompaninë, mjedisin e punës, madhësinë e përafërt të ekipit dhe çdo kërkesë për masa ose dërgesë. Për të dërguar kërkesën për ofertë, duhet të përzgjidhni të paktën një produkt.",
    businessPending: {
      strong: "Të dhënat e drejtpërdrejta të kontaktit ende nuk janë publikuar.",
      text: "Para lansimit duhet të sigurohen email, numër telefoni dhe adresë biznesi të verifikuara. Një kanal për kërkesa që nuk lidhen me ofertat për pajisje është ende në pritje.",
    },
    manufacturerHeading: "Partneritete me prodhues.",
    manufacturerBody:
      "Për një diskutim të ardhshëm partneriteti, përgatitni një prezantim të kompanisë, kategoritë e produkteve, dokumentacionin përkatës të produkteve dhe fushëveprimin e propozuar të distribuimit për Kosovën.",
    manufacturerPending: {
      strong: "Kërkesat për partneritet ende nuk janë të hapura.",
      text: "Një kontakt i verifikuar për partneritete do të publikohet këtu para lansimit.",
    },
    brandsLink: "Lexoni qasjen tonë ndaj partneriteteve me prodhuesit",
    privacyHeading: "Informacioni i kërkesës suaj.",
    privacyBody:
      "Përdorni formularin e ofertës për kërkesat e biznesit dhe shmangni informacionin personal të ndjeshëm. Të dhënat e kontaktit nuk ruhen në hapësirën ruajtëse të shfletuesit.",
    privacyLink: "Lexoni informacionin për privatësinë dhe detajet në pritje para lansimit",
  },
  notFound: {
    metaTitle: "Faqja nuk u gjet",
    eyebrow: "FAQJA NUK U GJET",
    heading: "Kjo faqe nuk është e disponueshme.",
    body: "Kontrolloni adresën ose kthehuni në ballinë për të vazhduar eksplorimin.",
    home: "KTHEHU NË BALLINË",
  },
} as const satisfies Dictionary;
