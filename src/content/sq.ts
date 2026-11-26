import type { CatalogContent } from "./types";

/**
 * Albanian catalog content (default language). M9.4 Batch 2 translation,
 * pending native-language review.
 *
 * Product IDs, slugs, sizes and technical identifiers are never translated.
 * Glossary: "Këpucë mbrojtëse" (Safety footwear), "Ndërtimtari" (Construction),
 * "Helmeta mbrojtëse", "Syze mbrojtëse", "Doreza mbrojtëse", "Veshje mbrojtëse",
 * "Mbrojtja e kokës / syve / duarve / trupit / këmbëve".
 */
export const sq = {
  products: {
    "DEMO-HD-001": {
      name: "Helmetë mbrojtëse me strehë",
      summary: "Helmetë me strehë të shkurtër dhe rrip koke të rregullueshëm.",
      description: "Shembull i një helmete konvencionale pune. Ky produkt demonstrues tregon si do të paraqiten detajet e guaskës dhe të rregullimit kur të ketë informacion të verifikuar nga prodhuesi.",
      keywords: ["kaskë", "helmetë", "kokë", "ndërtim"],
      construction: "Koncept guaske prej polimeri të derdhur",
      format: "Strehë e shkurtër; rrip koke i rregullueshëm",
    },
    "DEMO-HD-002": {
      name: "Helmetë pune me strehë rrethore",
      summary: "Koncept helmete me strehë që shtrihet rreth gjithë guaskës.",
      description: "Shembull helmete me strehë rrethore për krahasimin e formateve të pajisjeve. Për këtë produkt fiktiv nuk deklarohet asnjë klasifikim mbrojtjeje ndaj goditjeve, elektricitetit apo kushteve të motit.",
      keywords: ["kaskë", "helmetë", "kokë", "ambient i jashtëm"],
      construction: "Koncept guaske prej polimeri të derdhur",
      format: "Strehë rrethore; rregullues rrotullues në pjesën e pasme",
    },
    "DEMO-HD-003": {
      name: "Helmetë pune me rrip nënmjekre",
      summary: "Helmetë kompakte me rrip nënmjekre.",
      description: "Helmetë kompakte ilustruese me koncept fiksimi me rrip. Përshtatshmëria për punë në lartësi ose për ndonjë detyrë specifike do të kërkonte dokumentacion të verifikuar për një produkt real.",
      keywords: ["kaskë", "helmetë", "kokë", "rrip", "kompakte"],
      construction: "Koncept guaske polimeri dhe rripi tekstili",
      format: "Guaskë kompakte; rrip nënmjekre",
    },
    "DEMO-EY-001": {
      name: "Syze mbrojtëse transparente",
      summary: "Syze me thjerrëza transparente dhe bishta të drejtë.",
      description: "Shembull i syzeve të zakonshme për vendin e punës. Materiali i thjerrëzave, vetitë optike dhe përdorimet e synuara duhet të konfirmohen me dokumentacionin e një prodhuesi real.",
      keywords: ["sy", "syze", "transparente", "syze sigurie"],
      construction: "Koncept thjerrëze transparente prej polimeri",
      format: "Kornizë syzesh; bishta anësorë",
    },
    "DEMO-EY-002": {
      name: "Syze pune mbështjellëse",
      summary: "Koncept syzesh të lakuara me profil të vazhdueshëm të thjerrëzës.",
      description: "Shembull syzesh mbështjellëse për demonstrimin e navigimit në katalog. Ngjyra e thjerrëzës është vetëm opsion pamor dhe nuk nënkupton mbrojtje UV ose përshtatshmëri për një detyrë të caktuar.",
      keywords: ["sy", "syze", "mbështjellëse", "të lakuara"],
      construction: "Koncept thjerrëze të lakuar prej polimeri",
      format: "Kornizë mbështjellëse; bishta fiks",
    },
    "DEMO-EY-003": {
      name: "Syze pune të mbyllura me rrip",
      summary: "Syze të mbyllura me kornizë të gjerë dhe rrip të rregullueshëm.",
      description: "Shembull syzesh pune që fiksohen me rrip. Ky produkt demonstrues nuk pretendon asgjë për izolimin, mbrojtjen nga spërkatjet, mbrojtjen nga pluhuri apo përputhshmërinë me pajisje të tjera.",
      keywords: ["sy", "syze të mbyllura", "gogla", "rrip"],
      construction: "Koncept kornize polimeri dhe rripi tekstili",
      format: "Thjerrëz e vetme; rrip i rregullueshëm",
    },
    "DEMO-HN-001": {
      name: "Doreza pune të thurura",
      summary: "Doreza të thurura me kyç elastik.",
      description: "Shembull ilustrues dorezash të thurura për krahasimin e formateve. Nuk specifikohet asnjë nivel mbrojtjeje ndaj prerjeve, gërryerjes, nxehtësisë apo kimikateve.",
      keywords: ["duar", "doreza", "të thurura", "trajtim materialesh"],
      construction: "Koncept tekstili të thurur",
      format: "Kyç elastik; furnizohen në palë",
    },
    "DEMO-HN-002": {
      name: "Doreza pune me shuplakë të veshur",
      summary: "Koncept dorezash tekstili me veshje kontrastuese në shuplakë.",
      description: "Shembull me shuplakë të veshur që tregon si mund të organizohet mbrojtja e duarve në katalog. Përbërja e veshjes dhe përshtatshmëria për detyra lihen qëllimisht të papërcaktuara derisa të ofrohen të dhëna nga prodhuesi.",
      keywords: ["duar", "doreza", "të veshura", "trajtim materialesh"],
      construction: "Koncept me astar tekstili dhe veshje në shuplakë",
      format: "Kyç i thurur; furnizohen në palë",
    },
    "DEMO-HN-003": {
      name: "Doreza pune me manshetë",
      summary: "Doreza pune me panele dhe manshetë të zgjatur.",
      description: "Shembull dorezash me panele dhe manshetë më të gjatë. Zgjedhja e materialit dhe çdo performancë mbrojtëse do të duhej të verifikoheshin për një produkt real të prodhuesit.",
      keywords: ["duar", "doreza", "manshetë", "me panele"],
      construction: "Koncept materiali me panele",
      format: "Manshetë e zgjatur; furnizohen në palë",
    },
    "DEMO-BD-001": {
      name: "Xhaketë pune me panele",
      summary: "Koncept veshjeje pune me zinxhir përpara dhe xhepa në gjoks dhe anash.",
      description: "Shembull xhakete pune me ndërtim të thjeshtë me panele. Ky produkt nuk nënkupton rezistencë ndaj motit, rezistencë ndaj zjarrit apo certifikim për dukshmëri të lartë.",
      keywords: ["trup", "veshje pune", "xhaketë", "veshje"],
      construction: "Koncept tekstili të endur",
      format: "Mëngë të gjata; zinxhir përpara; xhepa të jashtëm",
    },
    "DEMO-BD-002": {
      name: "Pantallona pune me xhepa",
      summary: "Koncept pantallonash me këmbë të drejta dhe xhepa praktikë.",
      description: "Shembull pantallonash pune me detaje praktike për mbajtjen e sendeve. Masat dhe ndërtimi janë informacion shembull dhe nuk përshkruajnë një veshje në stok.",
      keywords: ["trup", "veshje pune", "pantallona", "veshje"],
      construction: "Koncept tekstili të endur",
      format: "Këmbë të drejta; vende për rrip; xhepa praktikë",
    },
    "DEMO-BD-003": {
      name: "Kombinezon pune me zinxhir përpara",
      summary: "Veshje pune njëpjesëshe me hapje përpara.",
      description: "Shembull kombinezoni që demonstron veshjet njëpjesëshe në katalog. Nuk bëhen pretendime për mbrojtje kimike, mbrojtje nga zjarri apo mbrojtje tjetër të specializuar.",
      keywords: ["trup", "veshje pune", "kombinezon", "tutë pune", "veshje"],
      construction: "Koncept tekstili të endur",
      format: "Njëpjesësh; mëngë të gjata; zinxhir përpara",
    },
    "DEMO-FT-001": {
      name: "Çizme pune me lidhëse",
      summary: "Koncept këpucësh të larta deri në kyç, me lidhëse.",
      description: "Format çizmesh pune për demonstrimin e kategorisë së këpucëve. Mbrojtja e gishtave, vetitë e shollës dhe çdo klasifikim sigurie mbeten të paspecifikuara derisa të ketë të dhëna të verifikuara për produkte reale.",
      keywords: ["këmbë", "çizme", "lidhëse", "këpucë"],
      construction: "Koncept me pjesë të sipërme me panele dhe shollë të derdhur",
      format: "Deri në kyç; me lidhëse; palë",
    },
    "DEMO-FT-002": {
      name: "Këpucë pune e ulët",
      summary: "Koncept këpuce të ulët pune me lidhëse.",
      description: "Shembull i një modeli këpuce të ulët. Ky produkt fiktiv nuk pretendon asgjë për rezistencën ndaj rrëshqitjes, vetitë elektrike apo ndërtimin mbrojtës të gishtave.",
      keywords: ["këmbë", "këpucë", "të ulëta", "këpucë pune"],
      construction: "Koncept me pjesë të sipërme me panele dhe shollë të derdhur",
      format: "E ulët; me lidhëse; palë",
    },
    "DEMO-FT-003": {
      name: "Çizme pune pa lidhëse",
      summary: "Çizme që vishen lehtë, me panele anësore dhe lak në pjesën e pasme.",
      description: "Shembull këpucësh pa lidhëse për krahasimin e mënyrave të mbylljes. Përshtatshmëria për rreziqet në vendin e punës duhet të përcaktohet nga specifikime të verifikuara kur produktet reale ta zëvendësojnë këtë demonstrim.",
      keywords: ["këmbë", "çizme", "pa lidhëse", "këpucë"],
      construction: "Koncept me pjesë të sipërme me panele dhe shollë të derdhur",
      format: "Pa lidhëse; panele anësore; lak i pasmë; palë",
    },
  },
  industries: {
    construction: {
      name: "Ndërtimtari",
      description: "Zbulimi i pajisjeve për kantiere që ndryshojnë, trajtimin e materialeve dhe ekipet në terren.",
      introduction: "Puna në një kantier ndërtimi ndryshon me projektin, zanatin dhe ditën. Filloni duke eksploruar formatet e pajisjeve për njerëzit që trajtojnë materiale, punojnë rreth strukturave dhe lëvizin ndërmjet zonave të punës.",
      considerations: [
        { title: "Detyra dhe zona e punës", description: "Identifikoni punën që kryhet, aktivitetet përreth dhe kontaktin e mundshëm me objekte ose mbeturina. Rishikojeni vlerësimin ndërsa kantieri ndryshon." },
        { title: "Trajtimi dhe lëvizja", description: "Shqyrtoni materialet, veglat, rrugët e qasjes dhe sipërfaqet e përfshira në çdo detyrë. Një listë e vetme pajisjesh nuk i përshkruan të gjitha zanatet ose zonat e punës." },
        { title: "Përshtatja për të gjithë ekipin", description: "Merrni parasysh përshtatjen për përdoruesin, kushtet e punës dhe përputhshmërinë ndërmjet pajisjeve. Verifikoni dokumentacionin për produktet reale të përzgjedhura." },
      ],
    },
    manufacturing: {
      name: "Prodhimi",
      description: "Eksploroni formatet e pajisjeve për prodhimin, montimin dhe përpunimin e materialeve.",
      introduction: "Mjediset e prodhimit bashkojnë procese dhe njerëz të ndryshëm. Përdoreni këtë koleksion si pikënisje për të eksploruar llojet e pajisjeve, pastaj vlerësoni procesin, ekspozimin dhe vendin konkret të punës.",
      considerations: [
        { title: "Ekspozimi sipas procesit", description: "Shqyrtoni materialet dhe operacionet në çdo vend pune, përfshirë ku mund të ketë grimca, substanca ose kontakt me pajisje." },
        { title: "Makineritë dhe pjesët lëvizëse", description: "Vlerësoni si ndërveprojnë veshjet dhe dorezat me makineritë dhe veglat. Vetëm formati i produktit nuk e përcakton përshtatshmërinë pranë pajisjeve në lëvizje." },
        { title: "Përshtatja dhe përdorimi i përditshëm", description: "Merrni parasysh përshtatjen, lëvizjet gjatë detyrës dhe përputhshmërinë e pajisjeve që vishen së bashku. Kontrolloni udhëzimet reale të prodhuesit dhe vlerësimin e vendit të punës." },
      ],
    },
    "logistics-warehousing": {
      name: "Logjistika dhe magazinimi",
      description: "Pikënisje për ekipet e pranimit, trajtimit, ruajtjes dhe dërgimit të mallrave.",
      introduction: "Nga pranimi i mallrave deri te përgatitja e dërgesave, detyrat në magazinë ndryshojnë sipas rrugëve, ngarkesave dhe zonave të punës. Eksploroni formatet për trajtim, veshje dhe këpucë, duke e mbajtur vlerësimin real të vendit të punës në qendër.",
      considerations: [
        { title: "Ngarkesat dhe detyrat e trajtimit", description: "Merrni parasysh paketimin, sipërfaqet e kontaktit dhe metodat e trajtimit që përdor ekipi, në vend që të zgjidhni vetëm sipas emërtimit të industrisë." },
        { title: "Rrugët dhe hapësirat e përbashkëta", description: "Shqyrtoni gjendjen e dyshemesë, rrugët e qasjes dhe ndërveprimin ndërmjet njerëzve dhe pajisjeve për trajtimin e materialeve në çdo zonë." },
        { title: "Mjedise të ndryshme pune", description: "Merrni parasysh punën brenda dhe jashtë, përshtatjen për përdoruesin dhe ndryshimet ndërmjet detyrave. Dukshmëria dhe kërkesat e tjera të specializuara duhet të vlerësohen veçmas." },
      ],
    },
    "electrical-work": {
      name: "Punët elektrike",
      description: "Eksploroni kategoritë e pajisjeve, duke e mbajtur përshtatshmërinë elektrike si vlerësim të veçantë.",
      introduction: "Punët elektrike kërkojnë planifikim specifik për detyrën dhe informacion të verifikuar për pajisjet. Këto formate të përgjithshme të katalogut ofrohen vetëm për shfletim; ato nuk përcaktojnë mbrojtje ndaj rreziqeve elektrike.",
      considerations: [
        { title: "Planifikimi i punës dhe rreziqet", description: "Një person kompetent duhet të vlerësojë detyrën konkrete dhe rreziqet elektrike. Përzgjedhja e industrisë nuk mund të përcaktojë masat e kontrollit ose pajisjet e nevojshme." },
        { title: "Vetitë e verifikuara të produktit", description: "Konfirmoni vetitë përkatëse elektrike dhe ato ndaj harkut elektrik nga dokumentacioni real i prodhuesit. Asnjë nga produktet demonstruese nuk ka klasifikime të verifikuara për mbrojtje elektrike ose nga harku elektrik." },
        { title: "Vendi i punës përreth", description: "Shqyrtoni qasjen, aktivitetet përreth, veglat, përshtatjen dhe përputhshmërinë e pajisjeve së bashku me vlerësimin specifik të detyrës." },
      ],
      equipmentNote: "Këto produkte demonstruese të përgjithshme nuk kanë klasifikime të verifikuara për mbrojtje elektrike ose nga harku elektrik dhe nuk duhet të përdoren për të përzgjedhur pajisje për punë në instalime nën tension.",
    },
    "industrial-maintenance": {
      name: "Mirëmbajtja industriale",
      description: "Zbulimi i pajisjeve për inspektim, servisim dhe detyra mirëmbajtjeje që ndryshojnë.",
      introduction: "Mirëmbajtja mund të kalojë ndërmjet makinerive, materialeve dhe zonave të punës brenda një turni. Shfletoni këto formate pajisjesh, pastaj bazojeni përzgjedhjen përfundimtare në detyrën konkrete të mirëmbajtjes dhe në ekspozimin e vlerësuar.",
      considerations: [
        { title: "Pajisja që servisohet", description: "Shqyrtoni makinën, procesin dhe aktivitetin e planifikuar të mirëmbajtjes para se të merrni parasysh llojet individuale të pajisjeve. Kushtet mund të ndryshojnë nga puna e zakonshme e prodhimit." },
        { title: "Materialet dhe kontakti", description: "Identifikoni materialet, substancat dhe sipërfaqet e përfshira. Formatet e përgjithshme të dorezave ose veshjeve nuk përcaktojnë mbrojtje për një ekspozim të caktuar." },
        { title: "Detyrat që ndryshojnë", description: "Rishikoni vlerësimin kur kaloni ndërmjet detyrave ose zonave të punës. Merrni parasysh përshtatjen, përputhshmërinë e pajisjeve dhe udhëzimet reale të prodhuesit." },
      ],
    },
  },
  categories: {
    "safety-helmets": {
      label: "Mbrojtja e kokës",
      name: "Helmeta mbrojtëse",
      description: "Pajisje mbrojtëse për kokën në detyrat e punës. Eksploroni helmeta të përshtatshme për punën dhe mjedisin.",
    },
    "protective-eyewear": {
      label: "Mbrojtja e syve",
      name: "Syze mbrojtëse",
      description: "Mbrojtje e syve në punë, përfshirë syze mbrojtëse dhe syze të mbyllura për mjedise të ndryshme pune.",
    },
    "protective-gloves": {
      label: "Mbrojtja e duarve",
      name: "Doreza mbrojtëse",
      description: "Mbrojtje e duarve për një gamë detyrash pune, me lloje dorezash të përzgjedhura sipas punës që kryhet.",
    },
    "protective-clothing": {
      label: "Mbrojtja e trupit",
      name: "Veshje mbrojtëse",
      description: "Veshje pune dhe mbulim i trupit, përfshirë xhaketa, pantallona dhe kombinezone për mjedise të ndryshme pune.",
    },
    "safety-footwear": {
      label: "Mbrojtja e këmbëve",
      name: "Këpucë mbrojtëse",
      description: "Mbrojtje e këmbëve në punë, përfshirë këpucë dhe çizme sigurie të përzgjedhura sipas detyrës dhe mjedisit të punës.",
    },
  },
  zones: {
    head: "KOKA",
    eyes: "SYTË",
    hands: "DUART",
    body: "TRUPI",
    feet: "KËMBËT",
  },
  imageAlt: "Ilustrim i përgjithshëm i kategorisë. Pamje demonstruese, jo fotografi e këtij produkti.",
  specifications: {
    labels: {
      construction: "Koncepti i ndërtimit",
      format: "Formati",
      manufacturer: "Prodhuesi",
      safetyRatings: "Klasifikimet e sigurisë",
    },
    manufacturer: "I pacaktuar — produkt demonstrues",
    safetyRatings: "Të paspecifikuara ose të paverifikuara",
  },
  variants: {
    labels: {
      colors: "Shembuj ngjyrash",
      frameColors: "Shembuj ngjyrash të kornizës",
      lensAppearances: "Shembuj të pamjes së thjerrëzave",
      sizes: "Shembuj masash",
      euSizes: "Shembuj masash EU",
    },
    colors: {
      orange: "Portokalli",
      white: "E bardhë",
      gray: "Gri",
      black: "E zezë",
      clear: "Transparente",
      smoke: "Ngjyrë tymi",
    },
  },
  /** Extra search terms matched on every product (Albanian site only). */
  searchAliases: ["PMP", "PPE", "pajisje mbrojtëse personale"],
} as const satisfies CatalogContent;
