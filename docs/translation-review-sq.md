# Albanian translation review

Status: **pending native-speaker review.** Generated from the shipped source (`src/i18n/dictionaries/{en,sq}.ts` and `src/content/{en,sq}.ts`), so it matches the site exactly. Do not edit translations here: record decisions in the "Review note" column of a copy, or as comments, and apply them in the source files.

How to read it:
- Every interface and catalog string, English and Albanian side by side, grouped by page or purpose.
- "Review note" flags terminology chosen during M9.0 to M9.4 that no native speaker has confirmed, strings identical to English, and legal drafts.
- `{name}`, `{max}`, `{count}` and similar placeholders are filled in at runtime and must stay unchanged.
- Product descriptions and specifications describe **demonstration items**, not real stock.
- Kept in English on purpose (decisions M9.0 and M9.4): the slogan "SAFETY WITHOUT COMPROMISE.", the PROSAFE name, product codes, EU-OSHA source titles and image captions inside illustrations.
- The privacy notice and imprint are **legal drafts**. Linguistic review here does not finalize them: legal finalization stays on the commercial readiness roadmap.

Totals: 583 strings in 15 groups; 163 flagged for review; 7 identical to English; 0 placeholder mismatches; 0 Albanian-only keys.

## Terminology to confirm

| Term and decision |
| --- |
| "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| "Ndërtimtari" for Construction (decision M9.0) |
| "Këpucë mbrojtëse" for safety footwear (decision M9.0) |
| Abbreviation "PMP" (pajisje mbrojtëse personale) for PPE; confirm local usage |
| "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| "demo" / "demonstrues" for demonstration items |
| "Draft" kept as a loanword (M9.4) |
| "Lansim" for Launch (M9.4) |
| "email" loanword and its declension (email-i) |
| "Rruga e navigimit" for breadcrumb (M9.4) |
| "(në anglisht)" marker for English-only external sources (M9.4) |
| Consent wording: also needs legal review |
| "Të dhënat ligjore" for Imprint (M9.4) |

## Header and footer

17 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `common.skipToContent` | Skip to content | Kalo te përmbajtja |  |
| `header.navigation[0].label` | Products | Produktet |  |
| `header.navigation[1].label` | Industries | Industritë |  |
| `header.navigation[2].label` | Brands | Markat |  |
| `header.navigation[3].label` | About | Rreth nesh |  |
| `header.navigation[4].label` | Contact | Kontakti |  |
| `header.mainNavigation` | Main navigation | Navigimi kryesor |  |
| `header.mobileNavigation` | Mobile navigation | Navigimi mobil |  |
| `header.mobileMenuTitle` | PROSAFE / Navigation | PROSAFE / Navigimi |  |
| `header.openNavigation` | Open navigation | Hap navigimin |  |
| `header.closeNavigation` | Close navigation | Mbyll navigimin |  |
| `footer.links[0].label` | About | Rreth nesh |  |
| `footer.links[1].label` | Brands | Markat |  |
| `footer.links[2].label` | Contact | Kontakti |  |
| `footer.links[3].label` | Privacy (draft) | Privatësia (draft) |  |
| `footer.links[4].label` | Imprint (draft) | Të dhënat ligjore (draft) | "Të dhënat ligjore" for Imprint (M9.4) |
| `footer.photoCredit` | Material photography: Kindel Media & Nothing Ahead / Pexels | Fotografitë: Kindel Media & Nothing Ahead / Pexels |  |

## Homepage

43 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `home.hero.sidebarIndex` | PROSAFE / 01 | PROSAFE / 01 | Same as English (intentional: brand, slogan, code or source name) |
| `home.hero.purpose` | SAFETY · EQUIPMENT | PAJISJE · SIGURIE |  |
| `home.hero.purposeNote` | For the people · behind the work. | Për njerëzit · që e bëjnë punën. |  |
| `home.hero.eyebrow` | PROTECTION IS OUR PURPOSE. | MBROJTJA ËSHTË QËLLIMI YNË. |  |
| `home.hero.headline` | PROTECTION · IS NOT · OPTIONAL. | MBROJTJA · NUK ËSHTË · OPSIONALE. |  |
| `home.hero.primaryAction` | EXPLORE EQUIPMENT | EKSPLORO PAJISJET |  |
| `home.hero.secondaryAction` | FIND YOUR PROTECTION | GJEJ MBROJTJEN E DUHUR |  |
| `home.hero.panelIndex` | PERSONAL PROTECTION / 01 | MBROJTJA PERSONALE / 01 |  |
| `home.hero.panelHeading` | HEAD. · HANDS. · EVERYTHING · IN BETWEEN. | KOKA. · DUART. · DHE GJITHÇKA · MES TYRE. |  |
| `home.hero.panelCopy` | Professional safety equipment and workplace protection solutions for every industry. | Pajisje profesionale sigurie dhe zgjidhje për mbrojtjen në punë, për çdo industri. |  |
| `home.hero.panelLink` | Explore protection | Shfleto pajisjet mbrojtëse | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `home.hero.panelFootnote` | EQUIPMENT CATALOG · DEMONSTRATION COLLECTION | KATALOGU I PAJISJEVE · KOLEKSION DEMONSTRUES | "demo" / "demonstrues" for demonstration items |
| `home.hero.scrollIndicator` | EXPLORE EQUIPMENT | EKSPLORO PAJISJET |  |
| `home.equipment.index` | 01 / EQUIPMENT | 01 / PAJISJET |  |
| `home.equipment.heading` | EVERY LAYER · OF PROTECTION. | ÇDO SHTRESË · E MBROJTJES. |  |
| `home.equipment.intro` | From the first task to the last shift. Discover the essentials of workplace protection. | Nga detyra e parë deri te turni i fundit. Zbuloni bazat e mbrojtjes në punë. |  |
| `home.equipment.catalogLink` | EQUIPMENT CATALOG ↗ · EXPLORE DEMONSTRATION PRODUCTS | KATALOGU I PAJISJEVE ↗ · EKSPLORO PRODUKTET DEMONSTRUESE | "demo" / "demonstrues" for demonstration items |
| `home.equipment.items.head` | Head protection | Mbrojtja e kokës |  |
| `home.equipment.items.eyeFace` | Eye & face protection | Mbrojtja e syve dhe e fytyrës |  |
| `home.equipment.items.hearing` | Hearing protection | Mbrojtja e dëgjimit |  |
| `home.equipment.items.hand` | Hand protection | Mbrojtja e duarve |  |
| `home.equipment.items.workwear` | Protective workwear | Veshje pune mbrojtëse |  |
| `home.equipment.items.footwear` | Safety footwear | Këpucë mbrojtëse | "Këpucë mbrojtëse" for safety footwear (decision M9.0) |
| `home.approach.index` | 02 / A COMPLETE APPROACH | 02 / QASJE E PLOTË |  |
| `home.approach.heading` | THE WORK CHANGES. | PUNA NDRYSHON. |  |
| `home.approach.headingAccent` | OUR PURPOSE DOESN’T. | QËLLIMI YNË MBETET I NJËJTË. |  |
| `home.approach.intro` | Protection starts with understanding the work. PROSAFE brings equipment and workplace needs together, with the people doing the job at the center. | Mbrojtja fillon me të kuptuarit e punës. PROSAFE i bashkon pajisjet me nevojat e vendit të punës, duke i vënë në qendër njerëzit që e kryejnë punën. |  |
| `home.approach.explorerLink` | OPEN PROTECTION EXPLORER | EKSPLORO MBROJTJEN |  |
| `home.approach.industryLink` | FIND EQUIPMENT BY INDUSTRY | GJEJ PAJISJE SIPAS INDUSTRISË |  |
| `home.industries.index` | 03 / INDUSTRIES | 03 / INDUSTRITË |  |
| `home.industries.heading` | DIFFERENT ENVIRONMENTS. · ONE STANDARD OF CARE. | AMBIENTE TË NDRYSHME. · NJË STANDARD KUJDESI. |  |
| `home.industries.allIndustries` | EXPLORE ALL INDUSTRIES | EKSPLORO TË GJITHA INDUSTRITË |  |
| `home.about.index` | 04 / ABOUT PROSAFE | 04 / RRETH PROSAFE |  |
| `home.about.heading` | MORE THAN EQUIPMENT. · A COMMITMENT TO PEOPLE. | MË SHUMË SE PAJISJE. · NJË ANGAZHIM PËR NJERËZIT. |  |
| `home.about.intro` | PROSAFE is a workplace protection partner for businesses in Kosovo. Our purpose is simple: bring professional safety equipment and a complete approach to protection to every working day. | PROSAFE është partner për mbrojtjen në punë për bizneset në Kosovë. Qëllimi ynë është i thjeshtë: të sjellim pajisje profesionale sigurie dhe një qasje të plotë ndaj mbrojtjes në çdo ditë pune. |  |
| `home.about.link` | ABOUT PROSAFE | RRETH PROSAFE |  |
| `home.contact.index` | 05 / BUSINESS ENQUIRIES | 05 / KËRKESA BIZNESI |  |
| `home.contact.status` | BUSINESS QUOTATION ENQUIRIES | KËRKESA PËR OFERTA BIZNESI | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `home.contact.heading` | LET’S TALK · PROTECTION | LE TË FLASIM · PËR MBROJTJEN |  |
| `home.contact.intro` | Equipping a team starts with a conversation. Build an equipment selection and review the B2B quotation form. | Pajisja e një ekipi fillon me një bisedë. Krijoni një përzgjedhje pajisjesh dhe shqyrtoni formularin B2B për ofertë. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `home.contact.footnote` | Delivery availability is shown on the quotation page. | Mundësia e dërgimit të kërkesës tregohet në faqen e ofertës. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `home.contact.quoteLink` | PREPARE A QUOTATION | KËRKO OFERTË | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `home.contact.contactLink` | BUSINESS CONTACT INFORMATION | INFORMACIONI I KONTAKTIT PËR BIZNESE |  |

## About and Brands

34 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `businessPage.completionEyebrow` | DRAFT / COMPLETE BEFORE LAUNCH | DRAFT / PËR T’U PLOTËSUAR PARA LANSIMIT |  |
| `about.eyebrow` | ABOUT | RRETH NESH |  |
| `about.intro` | PROSAFE brings a focused approach to workplace protection: people first, equipment with a purpose, and business relationships built on clarity. | PROSAFE sjell një qasje të fokusuar ndaj mbrojtjes në punë: njerëzit në radhë të parë, pajisje me qëllim dhe marrëdhënie biznesi të ndërtuara mbi qartësi. |  |
| `about.facts[0].term` | Our focus | Fokusi ynë |  |
| `about.facts[0].value` | Workplace safety | Siguria në punë |  |
| `about.facts[1].term` | Our model | Modeli ynë |  |
| `about.facts[1].value` | B2B distribution | Distribuim B2B |  |
| `about.facts[2].term` | Initial market | Tregu fillestar |  |
| `about.facts[2].value` | Kosovo | Kosova |  |
| `about.missionHeading` | A commitment to the people doing the work. | Përkushtim ndaj njerëzve që e kryejnë punën. |  |
| `about.missionBody` | Our mission is to help businesses make workplace protection part of every working day. From construction sites to production floors and warehouses, the starting point is the person behind the task. | Misioni ynë është t’i ndihmojmë bizneset ta bëjnë mbrojtjen në punë pjesë të çdo dite pune. Nga kantieret e ndërtimit deri te linjat e prodhimit dhe magazinat, pika e nisjes është njeriu që e kryen detyrën. |  |
| `about.sloganBody` | This is the standard we set for our approach: understand the work, communicate clearly, and build a considered equipment selection around workplace needs. | Ky është standardi që i vendosim qasjes sonë: ta kuptojmë punën, të komunikojmë qartë dhe të ndërtojmë një përzgjedhje të menduar pajisjesh sipas nevojave të vendit të punës. |  |
| `about.distributionHeading` | Built for business. · Starting in Kosovo. | Ndërtuar për biznes. · Duke filluar në Kosovë. |  |
| `about.distributionBody` | PROSAFE is focused on business-to-business distribution of workplace safety equipment. Our approach connects business purchasing needs with manufacturer information and a clear quotation process. · Kosovo is our initial market. We are developing the product information and manufacturer relationships needed to support businesses equipping their teams. · The current catalog contains clearly identified demonstration products. Product availability, specifications, and suitability must be confirmed before purchasing. | PROSAFE fokusohet në distribuimin biznes-me-biznes të pajisjeve për siguri në punë. Qasja jonë i lidh nevojat e prokurimit të bizneseve me informacionin e prodhuesve dhe me një proces të qartë ofertimi. · Kosova është tregu ynë fillestar. Po zhvillojmë informacionin për produktet dhe marrëdhëniet me prodhuesit që nevojiten për t’i mbështetur bizneset në pajisjen e ekipeve të tyre. · Katalogu aktual përmban produkte demonstruese të identifikuara qartë. Disponueshmëria, specifikimet dhe përshtatshmëria e produkteve duhet të konfirmohen para blerjes. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); "demo" / "demonstrues" for demonstration items |
| `about.calloutHeading` | Find a starting point for your workplace. | Gjeni një pikënisje për vendin tuaj të punës. |  |
| `about.calloutBody` | Explore equipment by industry or learn how we approach manufacturer partnerships. | Eksploroni pajisjet sipas industrisë ose mësoni si u qasemi partneriteteve me prodhuesit. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `about.exploreIndustries` | EXPLORE INDUSTRIES | EKSPLORO INDUSTRITË |  |
| `about.partnershipApproach` | OUR PARTNERSHIP APPROACH | QASJA JONË NDAJ PARTNERITETEVE |  |
| `brands.eyebrow` | BRANDS & PARTNERSHIPS | MARKAT DHE PARTNERITETET |  |
| `brands.title` | STRONG RELATIONSHIPS. · CLEAR STANDARDS. | MARRËDHËNIE TË FORTA. · STANDARDE TË QARTA. |  |
| `brands.intro` | Our manufacturer partnership approach starts with a shared focus on workplace protection and clear information for business customers in Kosovo. | Qasja jonë ndaj partneriteteve me prodhuesit nis nga një fokus i përbashkët në mbrojtjen në punë dhe në informacion të qartë për klientët biznesorë në Kosovë. |  |
| `brands.partnershipHeading` | A considered approach to distribution. | Një qasje e menduar ndaj distribuimit. |  |
| `brands.partnershipBody` | We aim to develop manufacturer relationships that support informed equipment selection and dependable business communication. | Synojmë të ndërtojmë marrëdhënie me prodhuesit që mbështesin përzgjedhjen e informuar të pajisjeve dhe komunikim të besueshëm biznesor. |  |
| `brands.principles[0].term` | Verified identity and authorization. | Identitet dhe autorizim i verifikuar. |  |
| `brands.principles[0].text` | Confirm the manufacturer and the scope of any distribution relationship before publishing a partnership. | Konfirmimi i prodhuesit dhe i fushëveprimit të çdo marrëdhënieje distribuimi para publikimit të një partneriteti. |  |
| `brands.principles[1].term` | Documented product information. | Informacion i dokumentuar për produktet. |  |
| `brands.principles[1].text` | Review specifications, intended uses, and supporting documentation before adding real products. | Shqyrtimi i specifikimeve, përdorimeve të synuara dhe dokumentacionit mbështetës para shtimit të produkteve reale. |  |
| `brands.principles[2].term` | Practical business support. | Mbështetje praktike për biznesin. |  |
| `brands.principles[2].text` | Establish clear contacts for quotations, availability, and product questions. | Caktimi i kontakteve të qarta për oferta, disponueshmëri dhe pyetje rreth produkteve. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `brands.partnersHeading` | No manufacturer partners published yet. | Ende nuk janë publikuar partnerë prodhues. |  |
| `brands.partnersBody` | This space is reserved for future verified partners. Manufacturer names, logos, and relationship details will be added only after verification and permission to publish. · Demonstration products in the catalog do not represent manufacturer partnerships or authorized distribution agreements. | Kjo hapësirë është e rezervuar për partnerë të verifikuar në të ardhmen. Emrat, logot dhe detajet e marrëdhënies me prodhuesit do të shtohen vetëm pas verifikimit dhe lejes për publikim. · Produktet demonstruese në katalog nuk përfaqësojnë partneritete me prodhues ose marrëveshje të autorizuara distribuimi. | "demo" / "demonstrues" for demonstration items |
| `brands.manufacturerHeading` | For manufacturers. | Për prodhuesit. |  |
| `brands.manufacturerBody` | Interested in PROSAFE’s B2B distribution focus in Kosovo? Review the partnership inquiry information on our contact page. A verified direct contact channel is still pending. | Ju intereson fokusi i PROSAFE në distribuimin B2B në Kosovë? Shqyrtoni informacionin për kërkesat e partneritetit në faqen tonë të kontaktit. Një kanal i verifikuar për kontakt të drejtpërdrejtë është ende në pritje. |  |
| `brands.partnershipInquiries` | PARTNERSHIP INQUIRIES | KËRKESA PËR PARTNERITET |  |

## Contact

19 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `contact.eyebrow` | CONTACT | KONTAKTI |  |
| `contact.title` | LET’S TALK · PROTECTION. | LE TË FLASIM · PËR MBROJTJEN. |  |
| `contact.intro` | For businesses equipping their teams and manufacturers exploring a distribution relationship. Our initial market is Kosovo. | Për bizneset që pajisin ekipet e tyre dhe për prodhuesit që eksplorojnë një marrëdhënie distribuimi. Tregu ynë fillestar është Kosova. |  |
| `contact.quotationHeading` | Business quotations. | Oferta për biznese. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `contact.quotationBody` | Build a selection from the demonstration catalog, then review quantities and business requirements in the existing quotation workflow. Submission availability is shown on the quotation page; delivery requires configuration. | Krijoni një përzgjedhje nga katalogu demonstrues, pastaj shqyrtoni sasitë dhe kërkesat e biznesit në procesin ekzistues të ofertës. Mundësia e dërgimit tregohet në faqen e ofertës; dërgimi kërkon konfigurim. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); "demo" / "demonstrues" for demonstration items |
| `contact.prepareQuotation` | PREPARE A QUOTATION | KËRKO OFERTË | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `contact.browseEquipment` | BROWSE DEMO EQUIPMENT | SHFLETO PAJISJET DEMONSTRUESE | "demo" / "demonstrues" for demonstration items |
| `contact.businessHeading` | General business inquiries. | Kërkesa të përgjithshme biznesi. |  |
| `contact.businessBody` | For an equipment inquiry, include your company, working environment, approximate team size, and any sizing or delivery requirements in the quotation form. A product selection is required to submit a quotation request. | Për një kërkesë për pajisje, në formularin e ofertës shënoni kompaninë, mjedisin e punës, madhësinë e përafërt të ekipit dhe çdo kërkesë për masa ose dërgesë. Për të dërguar kërkesën për ofertë, duhet të përzgjidhni të paktën një produkt. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `contact.businessPending.strong` | Direct contact details are not yet published. | Të dhënat e drejtpërdrejta të kontaktit ende nuk janë publikuar. |  |
| `contact.businessPending.text` | A verified business email, phone number, and business address must be supplied before launch. A channel for inquiries unrelated to equipment quotations is still pending. | Para lansimit duhet të sigurohen email, numër telefoni dhe adresë biznesi të verifikuara. Një kanal për kërkesa që nuk lidhen me ofertat për pajisje është ende në pritje. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); "email" loanword and its declension (email-i) |
| `contact.manufacturerHeading` | Manufacturer partnerships. | Partneritete me prodhues. |  |
| `contact.manufacturerBody` | For a future partnership discussion, prepare a company introduction, product categories, relevant product documentation, and your proposed distribution scope for Kosovo. | Për një diskutim të ardhshëm partneriteti, përgatitni një prezantim të kompanisë, kategoritë e produkteve, dokumentacionin përkatës të produkteve dhe fushëveprimin e propozuar të distribuimit për Kosovën. |  |
| `contact.manufacturerPending.strong` | Partnership inquiries are not yet open. | Kërkesat për partneritet ende nuk janë të hapura. |  |
| `contact.manufacturerPending.text` | A verified partnership contact will be published here before launch. | Një kontakt i verifikuar për partneritete do të publikohet këtu para lansimit. |  |
| `contact.brandsLink` | Read our manufacturer partnership approach | Lexoni qasjen tonë ndaj partneriteteve me prodhuesit |  |
| `contact.privacyHeading` | Your inquiry information. | Informacioni i kërkesës suaj. |  |
| `contact.privacyBody` | Use the quotation form for business requirements and avoid sensitive personal information. Contact details are not saved in browser storage. | Përdorni formularin e ofertës për kërkesat e biznesit dhe shmangni informacionin personal të ndjeshëm. Të dhënat e kontaktit nuk ruhen në hapësirën ruajtëse të shfletuesit. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `contact.privacyLink` | Read the privacy information and pending launch details | Lexoni informacionin për privatësinë dhe detajet në pritje para lansimit |  |

## Product catalog

42 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `demoNotice.title` | Demonstration catalog | Katalog demonstrues | "demo" / "demonstrues" for demonstration items |
| `demoNotice.body` | Fictional examples for exploring the catalog and quote selection. Not real inventory. Illustrations, specifications, and variants are illustrative; no manufacturer or certified safety performance is represented. | Shembuj fiktivë për të eksploruar katalogun dhe përzgjedhjen për ofertë. Nuk janë stok real. Ilustrimet, specifikimet dhe variantet janë ilustruese; nuk përfaqësohet asnjë prodhues apo performancë e certifikuar sigurie. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `productCard.badge` | DEMO / CATEGORY ILLUSTRATION | DEMO / ILUSTRIM I KATEGORISË | "demo" / "demonstrues" for demonstration items |
| `productCard.identifier` | {id} / DEMONSTRATION PRODUCT | {id} / PRODUKT DEMONSTRUES | "demo" / "demonstrues" for demonstration items |
| `catalog.eyebrow` | PROSAFE / EQUIPMENT CATALOG | PROSAFE / KATALOGU I PAJISJEVE |  |
| `catalog.title` | EQUIPMENT. · WITH PURPOSE. | PAJISJE. · ME QËLLIM. |  |
| `catalog.intro` | Explore protection from head to toe. Find an equipment type and build a selection for your team. | Eksploroni mbrojtjen nga koka te këmbët. Gjeni një lloj pajisjeje dhe krijoni një përzgjedhje për ekipin tuaj. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `catalog.industryGuide` | Industry guide / {industry} → | Udhëzuesi i industrisë / {industry} → |  |
| `catalog.searchPlaceholder` | Product name or keyword | Emri i produktit ose fjalë kyçe |  |
| `catalog.allCategories` | All categories | Të gjitha kategoritë |  |
| `catalog.allIndustries` | All industries | Të gjitha industritë |  |
| `catalog.applyFilters` | APPLY FILTERS | ZBATO FILTRAT |  |
| `catalog.unknownCategory` | Unknown category. Showing all categories instead. | Kategori e panjohur. Po shfaqen të gjitha kategoritë. |  |
| `catalog.unknownIndustry` | Unknown industry. Showing all industries instead. | Industri e panjohur. Po shfaqen të gjitha industritë. |  |
| `catalog.resultSummary.one` | {count} example{filters}{searchMatch} | {count} shembull{searchMatch}{filters} |  |
| `catalog.resultSummary.other` | {count} examples{filters}{searchMatch} | {count} shembuj{searchMatch}{filters} |  |
| `catalog.resultFilterIndustry` |  / {industry} |  / {industry} | Same as English: confirm |
| `catalog.resultFilterCategory` |  / {category} |  / {category} | Same as English: confirm |
| `catalog.resultFilterAllCategories` |  / All categories |  / Të gjitha kategoritë |  |
| `catalog.resultSearch.one` |  matching “{search}” |  që përputhet me “{search}” |  |
| `catalog.resultSearch.other` |  matching “{search}” |  që përputhen me “{search}” |  |
| `catalog.clearFilters` | Clear filters | Pastro filtrat |  |
| `catalog.emptyEyebrow` | NO MATCHING EQUIPMENT | NUK U GJETËN PAJISJE |  |
| `catalog.emptyHeading` | Let’s try another search. | Provoni një kërkim tjetër. |  |
| `catalog.emptyBody` | Use a different keyword or clear the category and search filters. | Përdorni një fjalë kyçe tjetër ose pastroni filtrat e kategorisë dhe të kërkimit. |  |
| `catalog.viewIndustryExamples` | VIEW INDUSTRY EXAMPLES | SHIKO SHEMBUJT E INDUSTRISË |  |
| `catalog.viewAllExamples` | VIEW ALL EXAMPLES | SHIKO TË GJITHË SHEMBUJT |  |
| `catalog.explorerLink` | Find your category in the protection explorer → | Gjeni kategorinë tuaj te Eksploro mbrojtjen → | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `productDetail.notFoundTitle` | Product not found | Produkti nuk u gjet |  |
| `productDetail.breadcrumb` | Breadcrumb | Rruga e navigimit | "Rruga e navigimit" for breadcrumb (M9.4) |
| `productDetail.allEquipment` | All equipment | Të gjitha pajisjet |  |
| `productDetail.imageCaption` | Generic category illustration. Approved product photography will accompany real manufacturer data. | Ilustrim i përgjithshëm i kategorisë. Fotografitë e miratuara të produkteve do të shoqërojnë të dhënat reale të prodhuesve. |  |
| `productDetail.eyebrow` | {category} / DEMONSTRATION | {category} / DEMONSTRIM |  |
| `productDetail.identifier` | PRODUCT IDENTIFIER / {id} | IDENTIFIKUESI I PRODUKTIT / {id} |  |
| `productDetail.viewQuote` | View quote selection → | Shiko përzgjedhjen për ofertë → | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `productDetail.quoteNote` | Save a product and quantity locally, then review the quotation form. Submission availability is shown there. | Ruani lokalisht produktin dhe sasinë, pastaj shqyrtoni formularin e ofertës. Mundësia e dërgimit tregohet aty. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `productDetail.specificationsHeading` | Technical specifications | Specifikimet teknike |  |
| `productDetail.specificationsNote` | Illustrative fields only. These are not verified product specifications. | Vetëm fusha ilustruese. Këto nuk janë specifikime të verifikuara të produktit. |  |
| `productNotFound.eyebrow` | PRODUCT NOT FOUND | PRODUKTI NUK U GJET |  |
| `productNotFound.heading` | This equipment entry is unavailable. | Ky produkt nuk është i disponueshëm. |  |
| `productNotFound.body` | Return to the catalog to explore the demonstration products. | Kthehuni te katalogu për të eksploruar produktet demonstruese. | "demo" / "demonstrues" for demonstration items |
| `productNotFound.action` | BACK TO EQUIPMENT | KTHEHU TE PAJISJET |  |

## Product descriptions and specifications

108 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `catalog:products.DEMO-HD-001.name` | Brimmed safety helmet | Helmetë mbrojtëse me strehë |  |
| `catalog:products.DEMO-HD-001.summary` | A short-brim helmet format with an adjustable headband. | Helmetë me strehë të shkurtër dhe rrip koke të rregullueshëm. |  |
| `catalog:products.DEMO-HD-001.description` | An example of a conventional workplace helmet. This demonstration entry shows how shell construction and adjustment details will be presented when verified manufacturer information is available. | Shembull i një helmete konvencionale pune. Ky produkt demonstrues tregon si do të paraqiten detajet e guaskës dhe të rregullimit kur të ketë informacion të verifikuar nga prodhuesi. | "demo" / "demonstrues" for demonstration items |
| `catalog:products.DEMO-HD-001.construction` | Moulded polymer shell concept | Koncept guaske prej polimeri të derdhur |  |
| `catalog:products.DEMO-HD-001.format` | Short brim; adjustable headband | Strehë e shkurtër; rrip koke i rregullueshëm |  |
| `catalog:products.DEMO-HD-002.name` | Full-brim work helmet | Helmetë pune me strehë rrethore |  |
| `catalog:products.DEMO-HD-002.summary` | A helmet concept with a brim extending around the shell. | Koncept helmete me strehë që shtrihet rreth gjithë guaskës. |  |
| `catalog:products.DEMO-HD-002.description` | A full-brim headwear example for comparing equipment formats. No impact, electrical, or weather protection rating is asserted for this fictional entry. | Shembull helmete me strehë rrethore për krahasimin e formateve të pajisjeve. Për këtë produkt fiktiv nuk deklarohet asnjë klasifikim mbrojtjeje ndaj goditjeve, elektricitetit apo kushteve të motit. |  |
| `catalog:products.DEMO-HD-002.construction` | Moulded polymer shell concept | Koncept guaske prej polimeri të derdhur |  |
| `catalog:products.DEMO-HD-002.format` | Full brim; rear adjustment dial | Strehë rrethore; rregullues rrotullues në pjesën e pasme |  |
| `catalog:products.DEMO-HD-003.name` | Chin-strap work helmet | Helmetë pune me rrip nënmjekre |  |
| `catalog:products.DEMO-HD-003.summary` | A compact helmet format with a chin-strap arrangement. | Helmetë kompakte me rrip nënmjekre. |  |
| `catalog:products.DEMO-HD-003.description` | An illustrative compact helmet with a strap-based fitting concept. Suitability for working at height or any specific task would require verified documentation for a real product. | Helmetë kompakte ilustruese me koncept fiksimi me rrip. Përshtatshmëria për punë në lartësi ose për ndonjë detyrë specifike do të kërkonte dokumentacion të verifikuar për një produkt real. |  |
| `catalog:products.DEMO-HD-003.construction` | Polymer shell and textile strap concept | Koncept guaske polimeri dhe rripi tekstili |  |
| `catalog:products.DEMO-HD-003.format` | Compact shell; chin strap | Guaskë kompakte; rrip nënmjekre |  |
| `catalog:products.DEMO-EY-001.name` | Clear safety glasses | Syze mbrojtëse transparente |  |
| `catalog:products.DEMO-EY-001.summary` | A clear-lens spectacle format with straight side arms. | Syze me thjerrëza transparente dhe bishta të drejtë. |  |
| `catalog:products.DEMO-EY-001.description` | An example of everyday workplace eyewear styling. Lens material, optical properties, and intended applications must be confirmed against a real manufacturer's documentation. | Shembull i syzeve të zakonshme për vendin e punës. Materiali i thjerrëzave, vetitë optike dhe përdorimet e synuara duhet të konfirmohen me dokumentacionin e një prodhuesi real. |  |
| `catalog:products.DEMO-EY-001.construction` | Clear polymer lens concept | Koncept thjerrëze transparente prej polimeri |  |
| `catalog:products.DEMO-EY-001.format` | Spectacle frame; side arms | Kornizë syzesh; bishta anësorë |  |
| `catalog:products.DEMO-EY-002.name` | Wraparound work glasses | Syze pune mbështjellëse |  |
| `catalog:products.DEMO-EY-002.summary` | A curved eyewear concept with a continuous lens profile. | Koncept syzesh të lakuara me profil të vazhdueshëm të thjerrëzës. |  |
| `catalog:products.DEMO-EY-002.description` | A wraparound eyewear example for demonstrating catalog navigation. The lens tint is a visual option only and does not imply a UV rating or suitability for a particular task. | Shembull syzesh mbështjellëse për demonstrimin e navigimit në katalog. Ngjyra e thjerrëzës është vetëm opsion pamor dhe nuk nënkupton mbrojtje UV ose përshtatshmëri për një detyrë të caktuar. |  |
| `catalog:products.DEMO-EY-002.construction` | Curved polymer lens concept | Koncept thjerrëze të lakuar prej polimeri |  |
| `catalog:products.DEMO-EY-002.format` | Wraparound frame; fixed arms | Kornizë mbështjellëse; bishta fiks |  |
| `catalog:products.DEMO-EY-003.name` | Strap-fit work goggles | Syze pune të mbyllura me rrip |  |
| `catalog:products.DEMO-EY-003.summary` | A goggle format with a broad frame and adjustable strap. | Syze të mbyllura me kornizë të gjerë dhe rrip të rregullueshëm. |  |
| `catalog:products.DEMO-EY-003.description` | An example of strap-fitted workplace eyewear. This demo makes no claims about sealing, splash protection, dust protection, or compatibility with other equipment. | Shembull syzesh pune që fiksohen me rrip. Ky produkt demonstrues nuk pretendon asgjë për izolimin, mbrojtjen nga spërkatjet, mbrojtjen nga pluhuri apo përputhshmërinë me pajisje të tjera. | "demo" / "demonstrues" for demonstration items |
| `catalog:products.DEMO-EY-003.construction` | Polymer frame and textile strap concept | Koncept kornize polimeri dhe rripi tekstili |  |
| `catalog:products.DEMO-EY-003.format` | Single lens; adjustable strap | Thjerrëz e vetme; rrip i rregullueshëm |  |
| `catalog:products.DEMO-HN-001.name` | Knitted work gloves | Doreza pune të thurura |  |
| `catalog:products.DEMO-HN-001.summary` | A knitted glove format with an elasticated wrist. | Doreza të thurura me kyç elastik. |  |
| `catalog:products.DEMO-HN-001.description` | An illustrative knitted glove entry for comparing handwear formats. No cut, abrasion, heat, or chemical protection level is specified. | Shembull ilustrues dorezash të thurura për krahasimin e formateve. Nuk specifikohet asnjë nivel mbrojtjeje ndaj prerjeve, gërryerjes, nxehtësisë apo kimikateve. |  |
| `catalog:products.DEMO-HN-001.construction` | Knitted textile concept | Koncept tekstili të thurur |  |
| `catalog:products.DEMO-HN-001.format` | Elasticated cuff; supplied as a pair | Kyç elastik; furnizohen në palë |  |
| `catalog:products.DEMO-HN-002.name` | Palm-coated work gloves | Doreza pune me shuplakë të veshur |  |
| `catalog:products.DEMO-HN-002.summary` | A textile glove concept with a contrasting palm coating. | Koncept dorezash tekstili me veshje kontrastuese në shuplakë. |  |
| `catalog:products.DEMO-HN-002.description` | A coated-palm example showing how hand protection can be organized in the catalog. Coating composition and task suitability are intentionally unspecified until manufacturer data is supplied. | Shembull me shuplakë të veshur që tregon si mund të organizohet mbrojtja e duarve në katalog. Përbërja e veshjes dhe përshtatshmëria për detyra lihen qëllimisht të papërcaktuara derisa të ofrohen të dhëna nga prodhuesi. |  |
| `catalog:products.DEMO-HN-002.construction` | Textile liner with palm coating concept | Koncept me astar tekstili dhe veshje në shuplakë |  |
| `catalog:products.DEMO-HN-002.format` | Knitted cuff; supplied as a pair | Kyç i thurur; furnizohen në palë |  |
| `catalog:products.DEMO-HN-003.name` | Cuff work gloves | Doreza pune me manshetë |  |
| `catalog:products.DEMO-HN-003.summary` | A panelled work-glove format with an extended cuff. | Doreza pune me panele dhe manshetë të zgjatur. |  |
| `catalog:products.DEMO-HN-003.description` | An example of a panelled glove with a longer cuff. Material selection and any protective performance would need to be verified for a real manufacturer product. | Shembull dorezash me panele dhe manshetë më të gjatë. Zgjedhja e materialit dhe çdo performancë mbrojtëse do të duhej të verifikoheshin për një produkt real të prodhuesit. |  |
| `catalog:products.DEMO-HN-003.construction` | Panelled material concept | Koncept materiali me panele |  |
| `catalog:products.DEMO-HN-003.format` | Extended cuff; supplied as a pair | Manshetë e zgjatur; furnizohen në palë |  |
| `catalog:products.DEMO-BD-001.name` | Panelled work jacket | Xhaketë pune me panele |  |
| `catalog:products.DEMO-BD-001.summary` | A zip-front workwear concept with chest and side pockets. | Koncept veshjeje pune me zinxhir përpara dhe xhepa në gjoks dhe anash. |  |
| `catalog:products.DEMO-BD-001.description` | A work jacket example with a simple panelled construction. This entry does not imply weather resistance, flame resistance, or high-visibility certification. | Shembull xhakete pune me ndërtim të thjeshtë me panele. Ky produkt nuk nënkupton rezistencë ndaj motit, rezistencë ndaj zjarrit apo certifikim për dukshmëri të lartë. |  |
| `catalog:products.DEMO-BD-001.construction` | Woven textile concept | Koncept tekstili të endur |  |
| `catalog:products.DEMO-BD-001.format` | Long sleeves; front zip; patch pockets | Mëngë të gjata; zinxhir përpara; xhepa të jashtëm |  |
| `catalog:products.DEMO-BD-002.name` | Pocket work trousers | Pantallona pune me xhepa |  |
| `catalog:products.DEMO-BD-002.summary` | A straight-leg trouser concept with utility pocket layouts. | Koncept pantallonash me këmbë të drejta dhe xhepa praktikë. |  |
| `catalog:products.DEMO-BD-002.description` | An example of workplace trousers with practical storage details. Sizes and construction are sample information and do not describe a stocked garment. | Shembull pantallonash pune me detaje praktike për mbajtjen e sendeve. Masat dhe ndërtimi janë informacion shembull dhe nuk përshkruajnë një veshje në stok. |  |
| `catalog:products.DEMO-BD-002.construction` | Woven textile concept | Koncept tekstili të endur |  |
| `catalog:products.DEMO-BD-002.format` | Straight leg; belt loops; utility pockets | Këmbë të drejta; vende për rrip; xhepa praktikë |  |
| `catalog:products.DEMO-BD-003.name` | Zip-front work coverall | Kombinezon pune me zinxhir përpara |  |
| `catalog:products.DEMO-BD-003.summary` | A one-piece workwear format with a front opening. | Veshje pune njëpjesëshe me hapje përpara. |  |
| `catalog:products.DEMO-BD-003.description` | A coverall example used to demonstrate one-piece clothing in the catalog. No chemical, flame, or other specialist protection claims are made. | Shembull kombinezoni që demonstron veshjet njëpjesëshe në katalog. Nuk bëhen pretendime për mbrojtje kimike, mbrojtje nga zjarri apo mbrojtje tjetër të specializuar. |  |
| `catalog:products.DEMO-BD-003.construction` | Woven textile concept | Koncept tekstili të endur |  |
| `catalog:products.DEMO-BD-003.format` | One-piece; long sleeves; front zip | Njëpjesësh; mëngë të gjata; zinxhir përpara |  |
| `catalog:products.DEMO-FT-001.name` | Lace-up work boot | Çizme pune me lidhëse |  |
| `catalog:products.DEMO-FT-001.summary` | An ankle-height footwear concept with a lace fastening. | Koncept këpucësh të larta deri në kyç, me lidhëse. |  |
| `catalog:products.DEMO-FT-001.description` | A work-boot format for demonstrating the footwear category. Toe protection, sole properties, and any safety classification remain unspecified pending verified real-product data. | Format çizmesh pune për demonstrimin e kategorisë së këpucëve. Mbrojtja e gishtave, vetitë e shollës dhe çdo klasifikim sigurie mbeten të paspecifikuara derisa të ketë të dhëna të verifikuara për produkte reale. |  |
| `catalog:products.DEMO-FT-001.construction` | Panelled upper and moulded sole concept | Koncept me pjesë të sipërme me panele dhe shollë të derdhur |  |
| `catalog:products.DEMO-FT-001.format` | Ankle height; lace fastening; pair | Deri në kyç; me lidhëse; palë |  |
| `catalog:products.DEMO-FT-002.name` | Low-cut work shoe | Këpucë pune e ulët |  |
| `catalog:products.DEMO-FT-002.summary` | A low-cut workplace shoe concept with a lace closure. | Koncept këpuce të ulët pune me lidhëse. |  |
| `catalog:products.DEMO-FT-002.description` | An example of a low-cut footwear silhouette. This fictional entry makes no claims about slip resistance, electrical properties, or protective toe construction. | Shembull i një modeli këpuce të ulët. Ky produkt fiktiv nuk pretendon asgjë për rezistencën ndaj rrëshqitjes, vetitë elektrike apo ndërtimin mbrojtës të gishtave. |  |
| `catalog:products.DEMO-FT-002.construction` | Panelled upper and moulded sole concept | Koncept me pjesë të sipërme me panele dhe shollë të derdhur |  |
| `catalog:products.DEMO-FT-002.format` | Low cut; lace fastening; pair | E ulët; me lidhëse; palë |  |
| `catalog:products.DEMO-FT-003.name` | Pull-on work boot | Çizme pune pa lidhëse |  |
| `catalog:products.DEMO-FT-003.summary` | A pull-on boot format with side panels and a rear loop. | Çizme që vishen lehtë, me panele anësore dhe lak në pjesën e pasme. |  |
| `catalog:products.DEMO-FT-003.description` | A pull-on footwear example for comparing closure types. Suitability for workplace hazards must be established from verified specifications when real products replace this demonstration. | Shembull këpucësh pa lidhëse për krahasimin e mënyrave të mbylljes. Përshtatshmëria për rreziqet në vendin e punës duhet të përcaktohet nga specifikime të verifikuara kur produktet reale ta zëvendësojnë këtë demonstrim. |  |
| `catalog:products.DEMO-FT-003.construction` | Panelled upper and moulded sole concept | Koncept me pjesë të sipërme me panele dhe shollë të derdhur |  |
| `catalog:products.DEMO-FT-003.format` | Pull-on; side panels; rear loop; pair | Pa lidhëse; panele anësore; lak i pasmë; palë |  |
| `catalog:categories.safety-helmets.label` | Head protection | Mbrojtja e kokës |  |
| `catalog:categories.safety-helmets.name` | Safety helmets | Helmeta mbrojtëse |  |
| `catalog:categories.safety-helmets.description` | Protective headwear for workplace tasks. Explore helmets suited to the work and environment. | Pajisje mbrojtëse për kokën në detyrat e punës. Eksploroni helmeta të përshtatshme për punën dhe mjedisin. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `catalog:categories.protective-eyewear.label` | Eye protection | Mbrojtja e syve |  |
| `catalog:categories.protective-eyewear.name` | Protective eyewear | Syze mbrojtëse |  |
| `catalog:categories.protective-eyewear.description` | Workplace eye protection, including safety glasses and goggles for different working environments. | Mbrojtje e syve në punë, përfshirë syze mbrojtëse dhe syze të mbyllura për mjedise të ndryshme pune. |  |
| `catalog:categories.protective-gloves.label` | Hand protection | Mbrojtja e duarve |  |
| `catalog:categories.protective-gloves.name` | Protective gloves | Doreza mbrojtëse |  |
| `catalog:categories.protective-gloves.description` | Hand protection for a range of workplace tasks, with glove types selected around the work being done. | Mbrojtje e duarve për një gamë detyrash pune, me lloje dorezash të përzgjedhura sipas punës që kryhet. |  |
| `catalog:categories.protective-clothing.label` | Body protection | Mbrojtja e trupit |  |
| `catalog:categories.protective-clothing.name` | Protective clothing | Veshje mbrojtëse |  |
| `catalog:categories.protective-clothing.description` | Workplace clothing and body coverage, including jackets, trousers, and coveralls for different working environments. | Veshje pune dhe mbulim i trupit, përfshirë xhaketa, pantallona dhe kombinezone për mjedise të ndryshme pune. |  |
| `catalog:categories.safety-footwear.label` | Foot protection | Mbrojtja e këmbëve |  |
| `catalog:categories.safety-footwear.name` | Safety footwear | Këpucë mbrojtëse | "Këpucë mbrojtëse" for safety footwear (decision M9.0) |
| `catalog:categories.safety-footwear.description` | Workplace foot protection, including safety shoes and boots selected around the task and working environment. | Mbrojtje e këmbëve në punë, përfshirë këpucë dhe çizme sigurie të përzgjedhura sipas detyrës dhe mjedisit të punës. |  |
| `catalog:imageAlt` | Generic category illustration. Demonstration visual, not a photograph of this product. | Ilustrim i përgjithshëm i kategorisë. Pamje demonstruese, jo fotografi e këtij produkti. | "demo" / "demonstrues" for demonstration items |
| `catalog:specifications.labels.construction` | Construction concept | Koncepti i ndërtimit |  |
| `catalog:specifications.labels.format` | Format | Formati |  |
| `catalog:specifications.labels.manufacturer` | Manufacturer | Prodhuesi |  |
| `catalog:specifications.labels.safetyRatings` | Safety ratings | Klasifikimet e sigurisë |  |
| `catalog:specifications.manufacturer` | Unassigned — demonstration entry | I pacaktuar — produkt demonstrues | "demo" / "demonstrues" for demonstration items |
| `catalog:specifications.safetyRatings` | Not specified or verified | Të paspecifikuara ose të paverifikuara |  |
| `catalog:variants.labels.colors` | Example colors | Shembuj ngjyrash |  |
| `catalog:variants.labels.frameColors` | Example frame colors | Shembuj ngjyrash të kornizës |  |
| `catalog:variants.labels.lensAppearances` | Example lens appearances | Shembuj të pamjes së thjerrëzave |  |
| `catalog:variants.labels.sizes` | Example sizes | Shembuj masash |  |
| `catalog:variants.labels.euSizes` | Example EU sizes | Shembuj masash EU |  |
| `catalog:variants.colors.orange` | Orange | Portokalli |  |
| `catalog:variants.colors.white` | White | E bardhë |  |
| `catalog:variants.colors.gray` | Gray | Gri |  |
| `catalog:variants.colors.black` | Black | E zezë |  |
| `catalog:variants.colors.clear` | Clear | Transparente |  |
| `catalog:variants.colors.smoke` | Smoke | Ngjyrë tymi |  |

## Industry pages

75 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `industries.eyebrow` | PROSAFE / INDUSTRIES | PROSAFE / INDUSTRITË |  |
| `industries.title` | DIFFERENT WORK. · ONE PURPOSE. | PUNË TË NDRYSHME. · NJË QËLLIM. |  |
| `industries.intro` | Start with your working environment. Explore protection categories and demonstration equipment for your industry. | Filloni nga mjedisi juaj i punës. Eksploroni kategoritë e mbrojtjes dhe pajisjet demonstruese për industrinë tuaj. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4); "demo" / "demonstrues" for demonstration items |
| `industries.findProtection` | FIND YOUR PROTECTION | GJEJ MBROJTJEN E DUHUR |  |
| `industries.findProtectionNote` | Choose your industry in one step to see a starting collection of equipment examples. | Zgjidhni industrinë tuaj në një hap për të parë një koleksion fillestar me shembuj pajisjesh. |  |
| `industries.cardEyebrow` | {number} / INDUSTRY | {number} / INDUSTRIA |  |
| `industries.exploreIndustry` | Explore industry | Eksploro industrinë | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `industries.browseProducts` | Browse demo products | Shfleto produktet demo | "Eksploro" / "Shfleto" call-to-action verbs (M9.4); "demo" / "demonstrues" for demonstration items |
| `industryDetail.notFoundTitle` | Industry not found | Industria nuk u gjet |  |
| `industryDetail.breadcrumb` | Breadcrumb | Rruga e navigimit | "Rruga e navigimit" for breadcrumb (M9.4) |
| `industryDetail.allIndustries` | All industries | Të gjitha industritë |  |
| `industryDetail.eyebrow` | PROSAFE / INDUSTRY DISCOVERY | PROSAFE / ZBULIMI SIPAS INDUSTRISË |  |
| `industryDetail.considerationsEyebrow` | THE WORKPLACE / BEFORE THE EQUIPMENT | VENDI I PUNËS / PARA PAJISJEVE |  |
| `industryDetail.considerationsHeading` | Common protection considerations | Aspekte të zakonshme të mbrojtjes |  |
| `industryDetail.chooseAnother` | Choose another industry in Find Your Protection → | Zgjidhni një industri tjetër te Gjej mbrojtjen e duhur → |  |
| `industryNotFound.eyebrow` | INDUSTRY NOT FOUND | INDUSTRIA NUK U GJET |  |
| `industryNotFound.heading` | This industry guide is unavailable. | Ky udhëzues industrie nuk është i disponueshëm. |  |
| `industryNotFound.body` | Choose one of the five industries to explore equipment examples. | Zgjidhni një nga pesë industritë për të eksploruar shembuj pajisjesh. |  |
| `industryNotFound.action` | VIEW INDUSTRIES | SHIKO INDUSTRITË |  |
| `industryEquipment.categoriesEyebrow` | 01 / EQUIPMENT CATEGORIES | 01 / KATEGORITË E PAJISJEVE |  |
| `industryEquipment.categoriesHeading` | Relevant categories to explore | Kategori të rëndësishme për t’u eksploruar |  |
| `industryEquipment.categoriesIntro` | A browsing starting point, not a complete equipment list for every task. | Një pikënisje për shfletim, jo një listë e plotë pajisjesh për çdo detyrë. |  |
| `industryEquipment.examplesEyebrow` | 02 / DEMONSTRATION EQUIPMENT | 02 / PAJISJE DEMONSTRUESE | "demo" / "demonstrues" for demonstration items |
| `industryEquipment.examplesHeading` | Examples for {industryLower} | {industry}: shembuj pajisjesh | Different placeholder, intentional: {industry} and {industryLower} are both supplied; Albanian puts the industry first, capitalized |
| `industryEquipment.filterInCatalog` | Filter in the catalog | Filtro në katalog |  |
| `industryEquipment.quotePromptEyebrow` | YOUR TEAM / YOUR SELECTION | EKIPI JUAJ / PËRZGJEDHJA JUAJ |  |
| `industryEquipment.quotePromptHeading` | Bring your equipment list together. | Bashkoni listën tuaj të pajisjeve. |  |
| `industryEquipment.quotePromptBody` | Add examples to your selection and adjust quantities, then review the quotation form and submission availability. | Shtoni shembuj në përzgjedhjen tuaj dhe rregulloni sasitë, pastaj shqyrtoni formularin e ofertës dhe mundësinë e dërgimit. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `industryEquipment.quotePromptAction` | PREPARE A QUOTE | KËRKO OFERTË | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `catalog:industries.construction.name` | Construction | Ndërtimtari | "Ndërtimtari" for Construction (decision M9.0) |
| `catalog:industries.construction.description` | Equipment discovery for changing sites, material handling, and site teams. | Zbulimi i pajisjeve për kantiere që ndryshojnë, trajtimin e materialeve dhe ekipet në terren. |  |
| `catalog:industries.construction.introduction` | Work on a construction site changes with the project, the trade, and the day. Start by exploring equipment formats for the people handling materials, working around structures, and moving between work areas. | Puna në një kantier ndërtimi ndryshon me projektin, zanatin dhe ditën. Filloni duke eksploruar formatet e pajisjeve për njerëzit që trajtojnë materiale, punojnë rreth strukturave dhe lëvizin ndërmjet zonave të punës. |  |
| `catalog:industries.construction.considerations[0].title` | The task and work area | Detyra dhe zona e punës |  |
| `catalog:industries.construction.considerations[0].description` | Identify the work being done, nearby activities, and potential contact with objects or debris. Revisit the assessment as the site changes. | Identifikoni punën që kryhet, aktivitetet përreth dhe kontaktin e mundshëm me objekte ose mbeturina. Rishikojeni vlerësimin ndërsa kantieri ndryshon. |  |
| `catalog:industries.construction.considerations[1].title` | Handling and movement | Trajtimi dhe lëvizja |  |
| `catalog:industries.construction.considerations[1].description` | Review the materials, tools, access routes, and surfaces involved in each task. A single equipment list will not describe every trade or work area. | Shqyrtoni materialet, veglat, rrugët e qasjes dhe sipërfaqet e përfshira në çdo detyrë. Një listë e vetme pajisjesh nuk i përshkruan të gjitha zanatet ose zonat e punës. |  |
| `catalog:industries.construction.considerations[2].title` | Fit across the team | Përshtatja për të gjithë ekipin |  |
| `catalog:industries.construction.considerations[2].description` | Consider wearer fit, working conditions, and compatibility between equipment items. Verify the documentation for the actual products selected. | Merrni parasysh përshtatjen për përdoruesin, kushtet e punës dhe përputhshmërinë ndërmjet pajisjeve. Verifikoni dokumentacionin për produktet reale të përzgjedhura. |  |
| `catalog:industries.manufacturing.name` | Manufacturing | Prodhimi |  |
| `catalog:industries.manufacturing.description` | Explore equipment formats around production, assembly, and material processing. | Eksploroni formatet e pajisjeve për prodhimin, montimin dhe përpunimin e materialeve. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `catalog:industries.manufacturing.introduction` | Production environments bring different processes and people together. Use this collection as a starting point for exploring equipment types, then assess the specific process, exposure, and workstation. | Mjediset e prodhimit bashkojnë procese dhe njerëz të ndryshëm. Përdoreni këtë koleksion si pikënisje për të eksploruar llojet e pajisjeve, pastaj vlerësoni procesin, ekspozimin dhe vendin konkret të punës. |  |
| `catalog:industries.manufacturing.considerations[0].title` | Process-specific exposure | Ekspozimi sipas procesit |  |
| `catalog:industries.manufacturing.considerations[0].description` | Review the materials and operations at each workstation, including where particles, substances, or contact with equipment may occur. | Shqyrtoni materialet dhe operacionet në çdo vend pune, përfshirë ku mund të ketë grimca, substanca ose kontakt me pajisje. |  |
| `catalog:industries.manufacturing.considerations[1].title` | Equipment and moving parts | Makineritë dhe pjesët lëvizëse |  |
| `catalog:industries.manufacturing.considerations[1].description` | Assess how clothing and handwear interact with machinery and tools. Product format alone does not establish suitability around moving equipment. | Vlerësoni si ndërveprojnë veshjet dhe dorezat me makineritë dhe veglat. Vetëm formati i produktit nuk e përcakton përshtatshmërinë pranë pajisjeve në lëvizje. |  |
| `catalog:industries.manufacturing.considerations[2].title` | Fit and daily use | Përshtatja dhe përdorimi i përditshëm |  |
| `catalog:industries.manufacturing.considerations[2].description` | Consider fit, task movement, and compatibility of items worn together. Check actual manufacturer instructions and the workplace assessment. | Merrni parasysh përshtatjen, lëvizjet gjatë detyrës dhe përputhshmërinë e pajisjeve që vishen së bashku. Kontrolloni udhëzimet reale të prodhuesit dhe vlerësimin e vendit të punës. |  |
| `catalog:industries.logistics-warehousing.name` | Logistics & Warehousing | Logjistika dhe magazinimi |  |
| `catalog:industries.logistics-warehousing.description` | A starting point for receiving, handling, storage, and dispatch teams. | Pikënisje për ekipet e pranimit, trajtimit, ruajtjes dhe dërgimit të mallrave. |  |
| `catalog:industries.logistics-warehousing.introduction` | From receiving goods to preparing dispatch, warehouse tasks vary across routes, loads, and work areas. Explore handling, clothing, and footwear formats while keeping the actual workplace assessment at the center. | Nga pranimi i mallrave deri te përgatitja e dërgesave, detyrat në magazinë ndryshojnë sipas rrugëve, ngarkesave dhe zonave të punës. Eksploroni formatet për trajtim, veshje dhe këpucë, duke e mbajtur vlerësimin real të vendit të punës në qendër. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `catalog:industries.logistics-warehousing.considerations[0].title` | Loads and handling tasks | Ngarkesat dhe detyrat e trajtimit |  |
| `catalog:industries.logistics-warehousing.considerations[0].description` | Consider the packaging, contact surfaces, and handling methods used by the team, rather than selecting solely from an industry label. | Merrni parasysh paketimin, sipërfaqet e kontaktit dhe metodat e trajtimit që përdor ekipi, në vend që të zgjidhni vetëm sipas emërtimit të industrisë. |  |
| `catalog:industries.logistics-warehousing.considerations[1].title` | Routes and shared spaces | Rrugët dhe hapësirat e përbashkëta |  |
| `catalog:industries.logistics-warehousing.considerations[1].description` | Review floor conditions, access routes, and interactions between people and material-handling equipment in each area. | Shqyrtoni gjendjen e dyshemesë, rrugët e qasjes dhe ndërveprimin ndërmjet njerëzve dhe pajisjeve për trajtimin e materialeve në çdo zonë. |  |
| `catalog:industries.logistics-warehousing.considerations[2].title` | Different working environments | Mjedise të ndryshme pune |  |
| `catalog:industries.logistics-warehousing.considerations[2].description` | Account for indoor and outdoor work, wearer fit, and changes between tasks. Visibility and other specialist requirements need separate assessment. | Merrni parasysh punën brenda dhe jashtë, përshtatjen për përdoruesin dhe ndryshimet ndërmjet detyrave. Dukshmëria dhe kërkesat e tjera të specializuara duhet të vlerësohen veçmas. |  |
| `catalog:industries.electrical-work.name` | Electrical Work | Punët elektrike |  |
| `catalog:industries.electrical-work.description` | Explore equipment categories while keeping electrical suitability a separate assessment. | Eksploroni kategoritë e pajisjeve, duke e mbajtur përshtatshmërinë elektrike si vlerësim të veçantë. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `catalog:industries.electrical-work.introduction` | Electrical work needs task-specific planning and verified equipment information. These generic catalog formats are provided for browsing only; they do not establish protection against electrical hazards. | Punët elektrike kërkojnë planifikim specifik për detyrën dhe informacion të verifikuar për pajisjet. Këto formate të përgjithshme të katalogut ofrohen vetëm për shfletim; ato nuk përcaktojnë mbrojtje ndaj rreziqeve elektrike. |  |
| `catalog:industries.electrical-work.considerations[0].title` | Work planning and hazards | Planifikimi i punës dhe rreziqet |  |
| `catalog:industries.electrical-work.considerations[0].description` | Have a competent person assess the actual task and electrical hazards. An industry selection cannot determine the controls or equipment needed. | Një person kompetent duhet të vlerësojë detyrën konkrete dhe rreziqet elektrike. Përzgjedhja e industrisë nuk mund të përcaktojë masat e kontrollit ose pajisjet e nevojshme. |  |
| `catalog:industries.electrical-work.considerations[1].title` | Verified product properties | Vetitë e verifikuara të produktit |  |
| `catalog:industries.electrical-work.considerations[1].description` | Confirm relevant electrical and arc-related properties from actual manufacturer documentation. None of the demonstration products has verified electrical or arc protection ratings. | Konfirmoni vetitë përkatëse elektrike dhe ato ndaj harkut elektrik nga dokumentacioni real i prodhuesit. Asnjë nga produktet demonstruese nuk ka klasifikime të verifikuara për mbrojtje elektrike ose nga harku elektrik. | "demo" / "demonstrues" for demonstration items |
| `catalog:industries.electrical-work.considerations[2].title` | The surrounding workplace | Vendi i punës përreth |  |
| `catalog:industries.electrical-work.considerations[2].description` | Review access, nearby activities, tools, fit, and equipment compatibility alongside the task-specific assessment. | Shqyrtoni qasjen, aktivitetet përreth, veglat, përshtatjen dhe përputhshmërinë e pajisjeve së bashku me vlerësimin specifik të detyrës. |  |
| `catalog:industries.electrical-work.equipmentNote` | These generic demos have no verified electrical or arc protection ratings and must not be used to select equipment for live electrical work. | Këto produkte demonstruese të përgjithshme nuk kanë klasifikime të verifikuara për mbrojtje elektrike ose nga harku elektrik dhe nuk duhet të përdoren për të përzgjedhur pajisje për punë në instalime nën tension. | "demo" / "demonstrues" for demonstration items |
| `catalog:industries.industrial-maintenance.name` | Industrial Maintenance | Mirëmbajtja industriale |  |
| `catalog:industries.industrial-maintenance.description` | Equipment discovery across inspection, servicing, and changing maintenance tasks. | Zbulimi i pajisjeve për inspektim, servisim dhe detyra mirëmbajtjeje që ndryshojnë. |  |
| `catalog:industries.industrial-maintenance.introduction` | Maintenance can move between machines, materials, and work areas within one shift. Browse these equipment formats, then base the final selection on the specific maintenance task and assessed exposure. | Mirëmbajtja mund të kalojë ndërmjet makinerive, materialeve dhe zonave të punës brenda një turni. Shfletoni këto formate pajisjesh, pastaj bazojeni përzgjedhjen përfundimtare në detyrën konkrete të mirëmbajtjes dhe në ekspozimin e vlerësuar. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `catalog:industries.industrial-maintenance.considerations[0].title` | The equipment being serviced | Pajisja që servisohet |  |
| `catalog:industries.industrial-maintenance.considerations[0].description` | Review the machine, process, and planned maintenance activity before considering individual equipment types. Conditions may differ from normal production work. | Shqyrtoni makinën, procesin dhe aktivitetin e planifikuar të mirëmbajtjes para se të merrni parasysh llojet individuale të pajisjeve. Kushtet mund të ndryshojnë nga puna e zakonshme e prodhimit. |  |
| `catalog:industries.industrial-maintenance.considerations[1].title` | Materials and contact | Materialet dhe kontakti |  |
| `catalog:industries.industrial-maintenance.considerations[1].description` | Identify the materials, substances, and surfaces involved. Generic glove or clothing formats do not establish protection for a particular exposure. | Identifikoni materialet, substancat dhe sipërfaqet e përfshira. Formatet e përgjithshme të dorezave ose veshjeve nuk përcaktojnë mbrojtje për një ekspozim të caktuar. |  |
| `catalog:industries.industrial-maintenance.considerations[2].title` | Changing tasks | Detyrat që ndryshojnë |  |
| `catalog:industries.industrial-maintenance.considerations[2].description` | Recheck the assessment when moving between tasks or work areas. Consider wearer fit, equipment compatibility, and actual manufacturer instructions. | Rishikoni vlerësimin kur kaloni ndërmjet detyrave ose zonave të punës. Merrni parasysh përshtatjen, përputhshmërinë e pajisjeve dhe udhëzimet reale të prodhuesit. |  |

## Protection Explorer

16 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `explorer.backLink` | Back to PROSAFE | Kthehu te PROSAFE |  |
| `explorer.eyebrow` | PROSAFE / INTERACTIVE PROTECTION EXPLORER | PROSAFE / EKSPLORO MBROJTJEN |  |
| `explorer.title` | PROTECTION. · FROM HEAD TO TOE. | MBROJTJE. · NGA KOKA TE KËMBËT. |  |
| `explorer.intro` | Choose a zone to explore the equipment category. Hover or click on desktop, tap on mobile, or use Tab and the arrow keys in the zone selector. | Zgjidhni një zonë për të eksploruar kategorinë e pajisjeve. Në kompjuter kaloni miun ose klikoni, në celular prekni, ose përdorni tastin Tab dhe shigjetat te përzgjedhësi i zonave. |  |
| `explorer.widget.zoneLegend` | Select a protection zone | Zgjidhni një zonë mbrojtjeje |  |
| `explorer.widget.viewCategory` | View {categoryLower} | Shiko {categoryLower} |  |
| `explorer.widget.figcaption` | Temporary full-body illustration. · Final worker photography will replace this visual. | Ilustrim i përkohshëm i trupit të plotë. · Fotografia përfundimtare e punëtorit do ta zëvendësojë këtë pamje. |  |
| `explorer.widget.selectedEyebrow` | SELECTED PROTECTION / {zone} | MBROJTJA E ZGJEDHUR / {zone} |  |
| `explorer.widget.browseCategory` | Browse {categoryLower} | Shfleto {categoryLower} | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `explorer.widget.catalogComingSoon` | Catalog coming soon. This category will become available when the product catalog launches. | Katalogu vjen së shpejti. Kjo kategori do të jetë e disponueshme kur të lansohet katalogu i produkteve. |  |
| `explorer.widget.selectionNote` | Explore another zone using the worker markers or zone selector. Your selection stays visible until you choose another zone. | Eksploroni një zonë tjetër përmes shenjave në figurë ose përzgjedhësit të zonave. Përzgjedhja juaj mbetet e dukshme derisa të zgjidhni një zonë tjetër. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `catalog:zones.head` | HEAD | KOKA |  |
| `catalog:zones.eyes` | EYES | SYTË |  |
| `catalog:zones.hands` | HANDS | DUART |  |
| `catalog:zones.body` | BODY | TRUPI |  |
| `catalog:zones.feet` | FEET | KËMBËT |  |

## Find Your Protection

13 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `riskNote.body` | Final equipment selection depends on a workplace risk assessment and applicable safety requirements. Industry browsing does not determine which PPE is required or suitable for a specific workplace. | Përzgjedhja përfundimtare e pajisjeve varet nga vlerësimi i rrezikut në vendin e punës dhe nga kërkesat përkatëse të sigurisë. Shfletimi sipas industrisë nuk përcakton se cilat pajisje mbrojtëse personale janë të nevojshme ose të përshtatshme për një vend pune të caktuar. |  |
| `riskNote.link` | PPE selection principles / EU-OSHA ↗ | Parimet e përzgjedhjes së PMP / EU-OSHA (në anglisht) ↗ | Abbreviation "PMP" (pajisje mbrojtëse personale) for PPE; confirm local usage; "(në anglisht)" marker for English-only external sources (M9.4) |
| `findYourProtection.eyebrow` | PROSAFE / FIND YOUR PROTECTION | PROSAFE / GJEJ MBROJTJEN E DUHUR |  |
| `findYourProtection.title` | START WITH · YOUR INDUSTRY. | FILLONI ME · INDUSTRINË TUAJ. |  |
| `findYourProtection.intro` | Choose your working environment. Explore a starting collection of equipment categories and demonstration products, then add examples to your quote selection. | Zgjidhni mjedisin tuaj të punës. Eksploroni një koleksion fillestar me kategori pajisjesh dhe produkte demonstruese, pastaj shtoni shembuj në përzgjedhjen tuaj për ofertë. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); "Eksploro" / "Shfleto" call-to-action verbs (M9.4); "demo" / "demonstrues" for demonstration items |
| `findYourProtection.industryPlaceholder` | Choose your industry | Zgjidhni industrinë tuaj |  |
| `findYourProtection.submit` | SHOW EQUIPMENT | SHFAQ PAJISJET |  |
| `findYourProtection.help` | One industry selection. You can change it at any time. | Një përzgjedhje industrie. Mund ta ndryshoni në çdo kohë. |  |
| `findYourProtection.resultEyebrow` | YOUR INDUSTRY / EQUIPMENT STARTING POINT | INDUSTRIA JUAJ / PIKËNISJA PËR PAJISJET |  |
| `findYourProtection.industryGuide` | Read the industry guide | Lexo udhëzuesin e industrisë |  |
| `findYourProtection.invalidIndustry` | That industry is unavailable. Choose one of the five industries above to continue. | Kjo industri nuk është e disponueshme. Zgjidhni një nga pesë industritë më lart për të vazhduar. |  |
| `findYourProtection.chooseIndustry` | Choose your industry above to see equipment categories and examples. | Zgjidhni industrinë tuaj më lart për të parë kategoritë dhe shembujt e pajisjeve. |  |
| `findYourProtection.browseGuides` | Or browse all industry guides → | Ose shfletoni të gjithë udhëzuesit e industrive → |  |

## Quotation page and form

64 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `addToQuote.add` | ADD TO QUOTE | SHTO NË OFERTË | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `addToQuote.limitReached` | QUANTITY LIMIT REACHED | U ARRIT KUFIRI I SASISË |  |
| `addToQuote.added` | {name} added. {quantity} in your selection. | {name} u shtua. {quantity} në përzgjedhjen tuaj. |  |
| `addToQuote.storageUnavailable` |  Browser storage is unavailable; this selection may be lost when you leave or reload. |  Hapësira ruajtëse e shfletuesit nuk është e disponueshme; kjo përzgjedhje mund të humbasë kur të largoheni ose ta rifreskoni faqen. |  |
| `quote.eyebrow` | PROSAFE / QUOTE PREPARATION | PROSAFE / PËRGATITJA E OFERTËS | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.title` | YOUR TEAM. · YOUR SELECTION. | EKIPI JUAJ. · PËRZGJEDHJA JUAJ. |  |
| `quote.intro` | Review products and quantities for your workplace, then provide your business contact details. Your equipment selection is saved in this browser; contact details are not. | Shqyrtoni produktet dhe sasitë për vendin tuaj të punës, pastaj jepni të dhënat e kontaktit të biznesit. Përzgjedhja juaj e pajisjeve ruhet në këtë shfletues; të dhënat e kontaktit jo. |  |
| `quote.noscript` | JavaScript is needed to load your saved selection and submit a quotation request. | Nevojitet JavaScript për të ngarkuar përzgjedhjen e ruajtur dhe për të dërguar kërkesën për ofertë. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.selection.loading` | Loading your quote selection… | Po ngarkohet përzgjedhja juaj për ofertë… | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.selection.storageUnavailable` | Browser storage is unavailable. Changes will remain in this tab but may be lost after leaving or reloading. | Hapësira ruajtëse e shfletuesit nuk është e disponueshme. Ndryshimet do të mbeten në këtë skedë, por mund të humbasin pasi të largoheni ose ta rifreskoni faqen. |  |
| `quote.selection.acceptedEyebrow` | REQUEST ACCEPTED | KËRKESA U PRANUA |  |
| `quote.selection.acceptedHeading` | Your quotation request has been accepted. | Kërkesa juaj për ofertë u pranua. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.selection.acceptedBody` | The configured email provider accepted your request for delivery. This confirms receipt by the provider, not a price, order, or delivery commitment. | Ofruesi i konfiguruar i email-it e pranoi kërkesën tuaj për dërgim. Kjo konfirmon marrjen nga ofruesi, jo një çmim, porosi apo zotim për dërgesë. | "email" loanword and its declension (email-i) |
| `quote.selection.reference` | Reference: {reference} | Referenca: {reference} |  |
| `quote.selection.acceptedRemoved` | Submitted products were removed from your selection. Any items changed elsewhere while sending have been preserved. | Produktet e dërguara u hoqën nga përzgjedhja juaj. Artikujt që u ndryshuan diku tjetër gjatë dërgimit janë ruajtur. |  |
| `quote.selection.exploreEquipment` | EXPLORE EQUIPMENT | EKSPLORO PAJISJET |  |
| `quote.selection.viewRemaining` | VIEW REMAINING SELECTION | SHIKO PËRZGJEDHJEN E MBETUR |  |
| `quote.selection.itemsLegend` | Selected products and quantities | Produktet e përzgjedhura dhe sasitë |  |
| `quote.selection.viewProduct` | View {name} | Shiko {name} |  |
| `quote.selection.categoryDemo` | {category} / DEMO | {category} / DEMO | Same as English: confirm; "demo" / "demonstrues" for demonstration items |
| `quote.selection.decrease` | Decrease quantity for {name} | Zvogëlo sasinë për {name} |  |
| `quote.selection.quantity` | Quantity for {name} | Sasia për {name} |  |
| `quote.selection.increase` | Increase quantity for {name} | Rrit sasinë për {name} |  |
| `quote.selection.remove` | Remove | Hiq |  |
| `quote.selection.removed` | {name} removed from your quote selection. | {name} u hoq nga përzgjedhja juaj për ofertë. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.selection.overviewEyebrow` | YOUR SELECTION | PËRZGJEDHJA JUAJ |  |
| `quote.selection.selectedProducts.one` | selected product | produkt i përzgjedhur |  |
| `quote.selection.selectedProducts.other` | selected products | produkte të përzgjedhura |  |
| `quote.selection.totalUnits.one` | {count} total unit | {count} njësi gjithsej |  |
| `quote.selection.totalUnits.other` | {count} total units | {count} njësi gjithsej |  |
| `quote.selection.savedLocally` | Saved in this browser. You can return and adjust your selection. | E ruajtur në këtë shfletues. Mund të ktheheni dhe ta rregulloni përzgjedhjen. |  |
| `quote.selection.availableNote` | Review your selection and complete the business enquiry form below. | Shqyrtoni përzgjedhjen dhe plotësoni formularin e kërkesës së biznesit më poshtë. |  |
| `quote.selection.unavailableNote` | Submission is unavailable until a delivery destination is configured. Your selection has not been sent. | Dërgimi nuk është i disponueshëm derisa të konfigurohet një destinacion dërgimi. Përzgjedhja juaj nuk është dërguar. |  |
| `quote.selection.continueExploring` | CONTINUE EXPLORING | VAZHDO EKSPLORIMIN |  |
| `quote.selection.emptyEyebrow` | YOUR SELECTION / 0 PRODUCTS | PËRZGJEDHJA JUAJ / 0 PRODUKTE |  |
| `quote.selection.emptyHeading` | Start with the equipment. | Filloni me pajisjet. |  |
| `quote.selection.emptyBody` | Add demonstration products from the catalog, then adjust quantities here. | Shtoni produkte demonstruese nga katalogu, pastaj rregulloni sasitë këtu. | "demo" / "demonstrues" for demonstration items |
| `quote.form.eyebrow` | BUSINESS ENQUIRIES / REQUEST A QUOTATION | KËRKESA BIZNESI / KËRKO OFERTË | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.form.heading` | Tell us about your team. | Na tregoni për ekipin tuaj. |  |
| `quote.form.intro` | The products and quantities above will accompany your request. Contact details stay in this form and are not saved in browser storage. | Produktet dhe sasitë më lart do ta shoqërojnë kërkesën tuaj. Të dhënat e kontaktit mbeten në këtë formular dhe nuk ruhen në hapësirën ruajtëse të shfletuesit. |  |
| `quote.form.privacyLink` | Privacy information (draft; business details pending) | Informacion për privatësinë (draft; të dhënat e biznesit në pritje) |  |
| `quote.form.limits` | Up to {maxItems} products, {maxQuantity} units per product, and {maxTotalQuantity} units in total. | Deri në {maxItems} produkte, {maxQuantity} njësi për produkt dhe {maxTotalQuantity} njësi gjithsej. |  |
| `quote.form.unavailable` | Submission is unavailable in the current demo environment because delivery is not configured. Your selection has not been sent. | Dërgimi nuk është i disponueshëm në mjedisin aktual demonstrues, sepse dërgimi i kërkesave nuk është konfiguruar. Përzgjedhja juaj nuk është dërguar. | "demo" / "demonstrues" for demonstration items |
| `quote.form.sessionError` | We could not prepare the submission session. | Nuk mundëm ta përgatisim sesionin e dërgimit. |  |
| `quote.form.retryConnection` | Retry connection | Provo përsëri lidhjen |  |
| `quote.form.fieldsLegend` | Business contact and quotation requirements | Kontakti i biznesit dhe kërkesat për ofertë | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.form.fields.company` | Company name | Emri i kompanisë |  |
| `quote.form.fields.contact` | Contact person | Personi i kontaktit |  |
| `quote.form.fields.email` | Business email | Email-i i biznesit | "email" loanword and its declension (email-i) |
| `quote.form.fields.phone` | Phone number | Numri i telefonit |  |
| `quote.form.fields.city` | Delivery location / city | Vendi i dërgesës / qyteti |  |
| `quote.form.optional` | (optional) | (opsionale) |  |
| `quote.form.requirementsHelp` | Up to {max} characters. Include any sizing or delivery requirements; avoid sensitive personal information. | Deri në {max} karaktere. Shënoni çdo kërkesë për masa ose dërgesë; shmangni informacionin personal të ndjeshëm. |  |
| `quote.form.consent` | I agree that PROSAFE may use my contact details and request information to respond to this quotation enquiry. | Pajtohem që PROSAFE të përdorë të dhënat e mia të kontaktit dhe informacionin e kërkesës për t’iu përgjigjur kësaj kërkese për ofertë. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.form.privacyPurpose` | If submission is enabled, your details and selection are sent to the configured PROSAFE quotation recipient through its email provider. They are used to handle this enquiry. | Nëse dërgimi është i aktivizuar, të dhënat dhe përzgjedhja juaj i dërgohen marrësit të konfiguruar të ofertave të PROSAFE përmes ofruesit të tij të email-it. Ato përdoren për trajtimin e kësaj kërkese. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); "email" loanword and its declension (email-i) |
| `quote.form.submit` | SEND QUOTATION REQUEST | DËRGO KËRKESËN PËR OFERTË | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.form.sending` | SENDING REQUEST… | PO DËRGOHET KËRKESA… |  |
| `quote.form.sendingStatus` | Sending your request. Please wait for confirmation. | Kërkesa juaj po dërgohet. Ju lutemi prisni konfirmimin. |  |
| `quote.form.reviewFields` | Please review the highlighted fields. | Ju lutemi kontrolloni fushat e theksuara. |  |
| `quote.form.notConfirmed` | We could not confirm delivery. Your form and selection are preserved. Retry the same request to avoid duplicates. | Nuk mundëm ta konfirmojmë dërgimin. Formulari dhe përzgjedhja juaj janë ruajtur. Provoni përsëri të njëjtën kërkesë për të shmangur dyfishimet. |  |
| `quote.form.sessionRefreshed` | The submission session was refreshed. Please wait a moment and retry; your details are preserved. | Sesioni i dërgimit u rifreskua. Ju lutemi prisni një çast dhe provoni përsëri; të dhënat tuaja janë ruajtur. |  |
| `quote.form.submissionUnavailable` | Submission is unavailable. Your request has not been sent and your selection is preserved. | Dërgimi nuk është i disponueshëm. Kërkesa juaj nuk është dërguar dhe përzgjedhja juaj është ruajtur. |  |
| `quote.form.rateLimited` | Too many attempts. Please wait ten minutes before retrying. | Shumë tentativa. Ju lutemi prisni dhjetë minuta para se të provoni përsëri. |  |
| `quote.form.networkError` | We could not confirm delivery. Your details and selection are preserved. Please retry the same request. | Nuk mundëm ta konfirmojmë dërgimin. Të dhënat dhe përzgjedhja juaj janë ruajtur. Ju lutemi provoni përsëri të njëjtën kërkesë. |  |

## Validation messages

16 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `quote.form.validation.invalid_text` | Enter a valid text value. | Shënoni një vlerë tekstuale të vlefshme. |  |
| `quote.form.validation.too_long` | Use {max} characters or fewer. | Përdorni {max} karaktere ose më pak. |  |
| `quote.form.validation.control_characters` | Remove unsupported control characters. | Hiqni karakteret e kontrollit që nuk mbështeten. |  |
| `quote.form.validation.single_line` | Use a single line. | Përdorni vetëm një rresht. |  |
| `quote.form.validation.required` | This field is required. | Kjo fushë është e detyrueshme. |  |
| `quote.form.validation.invalid_email` | Enter a valid business email address. | Shënoni një adresë të vlefshme email-i biznesi. | "email" loanword and its declension (email-i) |
| `quote.form.validation.consent_required` | Your privacy consent is required to submit this request. | Pëlqimi juaj për privatësinë është i nevojshëm për ta dërguar këtë kërkesë. | Consent wording: also needs legal review |
| `quote.form.validation.rejected` | Unable to submit this request. Please try again. | Kjo kërkesë nuk mund të dërgohet. Ju lutemi provoni përsëri. |  |
| `quote.form.validation.items_required` | Select at least one product before requesting a quote. | Përzgjidhni të paktën një produkt para se të kërkoni ofertë. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.form.validation.items_too_many` | Select no more than {max} products. | Përzgjidhni jo më shumë se {max} produkte. |  |
| `quote.form.validation.items_invalid` | Your product selection is invalid. Review the selected items. | Përzgjedhja juaj e produkteve nuk është e vlefshme. Kontrolloni artikujt e përzgjedhur. |  |
| `quote.form.validation.item_unavailable` | A selected product is unavailable. Review your selection. | Një produkt i përzgjedhur nuk është i disponueshëm. Kontrolloni përzgjedhjen tuaj. |  |
| `quote.form.validation.item_duplicate` | Each product may appear only once. Adjust its quantity instead. | Çdo produkt mund të shfaqet vetëm një herë. Rregulloni sasinë e tij. |  |
| `quote.form.validation.item_quantity` | Each quantity must be a whole number from 1 to {max}. | Çdo sasi duhet të jetë numër i plotë nga 1 deri në {max}. |  |
| `quote.form.validation.items_total` | The selection cannot exceed {max} total units. | Përzgjedhja nuk mund të kalojë {max} njësi gjithsej. |  |
| `quote.form.validation.invalid_locale` | Select a supported language. | Zgjidhni një gjuhë të mbështetur. |  |

## Privacy and imprint drafts

56 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `privacy.eyebrow` | PRIVACY / DRAFT | PRIVATËSIA / DRAFT | Legal draft: legal review required before publication |
| `privacy.title` | PRIVACY · INFORMATION. | INFORMACION · PËR PRIVATËSINË. | Legal draft: legal review required before publication |
| `privacy.intro` | This draft describes the current website’s quotation workflow. Business-specific privacy information remains incomplete. | Ky draft përshkruan procesin aktual të ofertës në këtë uebfaqe. Informacioni specifik i biznesit për privatësinë mbetet i paplotësuar. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); Legal draft: legal review required before publication |
| `privacy.notice` | This is not a finalized privacy notice. The operator must complete and approve the identified information before launch and before collecting real business inquiries. No effective date has been assigned. | Ky nuk është një njoftim përfundimtar për privatësinë. Operatori duhet ta plotësojë dhe ta miratojë informacionin e identifikuar para lansimit dhe para mbledhjes së kërkesave reale nga bizneset. Nuk është caktuar data e hyrjes në fuqi. | Legal draft: legal review required before publication |
| `privacy.completeBeforeLaunch` | Complete before launch: | Për t’u plotësuar para lansimit: | Legal draft: legal review required before publication |
| `privacy.operator.heading` | 01 / Responsible business. | 01 / Biznesi përgjegjës. | Legal draft: legal review required before publication |
| `privacy.operator.body` | PROSAFE is the brand used on this website. The legal entity responsible for personal information has not yet been provided. | PROSAFE është marka që përdoret në këtë uebfaqe. Subjekti juridik përgjegjës për të dhënat personale ende nuk është dhënë. | Legal draft: legal review required before publication |
| `privacy.operator.pending` | legal entity name, registered address, privacy contact email, and any applicable representative or data protection contact. | emri i subjektit juridik, adresa e regjistruar, email-i i kontaktit për privatësinë dhe çdo përfaqësues ose kontakt përkatës për mbrojtjen e të dhënave. | "email" loanword and its declension (email-i); Legal draft: legal review required before publication |
| `privacy.operator.link` | See the draft company information | Shikoni draftin e të dhënave ligjore të kompanisë | Legal draft: legal review required before publication |
| `privacy.inquiryData.heading` | 02 / Quotation information. | 02 / Informacioni i ofertës. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); Legal draft: legal review required before publication |
| `privacy.inquiryData.body` | The quotation form asks for company name, contact person, business email, product selections and quantities, and agreement to use the information to respond to the inquiry. Phone number, delivery city, and additional requirements are optional. · Contact details stay in the current form and are not written to browser storage. When submission is enabled and you submit, the website validates the request and sends the details and selection to the configured quotation recipient through its email delivery provider. · The stated purpose is to handle the quotation inquiry. The form does not request marketing permission. The application has no database or durable quotation archive. | Formulari i ofertës kërkon emrin e kompanisë, personin e kontaktit, email-in e biznesit, produktet e përzgjedhura dhe sasitë, si dhe pëlqimin për përdorimin e informacionit për t’iu përgjigjur kërkesës. Numri i telefonit, qyteti i dërgesës dhe kërkesat shtesë janë opsionale. · Të dhënat e kontaktit mbeten në formularin aktual dhe nuk shkruhen në hapësirën ruajtëse të shfletuesit. Kur dërgimi është i aktivizuar dhe ju e dërgoni kërkesën, uebfaqja e verifikon kërkesën dhe ia dërgon të dhënat dhe përzgjedhjen marrësit të konfiguruar të ofertave përmes ofruesit të saj të shërbimit të email-it. · Qëllimi i deklaruar është trajtimi i kërkesës për ofertë. Formulari nuk kërkon leje për marketing. Aplikacioni nuk ka bazë të dhënash ose arkiv të përhershëm të ofertave. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); "email" loanword and its declension (email-i); Consent wording: also needs legal review; Legal draft: legal review required before publication |
| `privacy.inquiryData.pending` | confirm the purposes and applicable legal basis for each processing activity, the responsible recipients, and how privacy requests will be handled. | konfirmimi i qëllimeve dhe i bazës ligjore përkatëse për çdo aktivitet përpunimi, i marrësve përgjegjës dhe i mënyrës së trajtimit të kërkesave për privatësi. | Legal draft: legal review required before publication |
| `privacy.storage.heading` | 03 / Browser storage & technical processing. | 03 / Ruajtja në shfletues dhe përpunimi teknik. | Legal draft: legal review required before publication |
| `privacy.storage.selectionBeforeKey` | The quotation selection uses browser local storage under | Përzgjedhja për ofertë përdor hapësirën ruajtëse lokale të shfletuesit nën çelësin | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); Legal draft: legal review required before publication |
| `privacy.storage.selectionAfterKey` | to remember product identifiers and quantities across visits. It has no automatic expiry. You can remove items on the quotation page or clear this website’s storage in your browser. Accepted submissions remove the submitted selection, while preserving concurrent changes. | për të mbajtur mend identifikuesit e produkteve dhe sasitë ndërmjet vizitave. Ajo nuk skadon automatikisht. Mund t’i hiqni artikujt në faqen e ofertës ose ta pastroni hapësirën ruajtëse të kësaj uebfaqeje në shfletuesin tuaj. Kërkesat e pranuara e heqin përzgjedhjen e dërguar, duke ruajtur ndryshimet e bëra njëkohësisht. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); Legal draft: legal review required before publication |
| `privacy.storage.service` | The quotation service uses temporary session tokens, request identifiers, request fingerprints, and attempt counters to validate submissions, limit abuse, and reduce duplicate delivery. The in-memory request registry retains entries for up to 24 hours, subject to cleanup and process restarts; it does not keep raw contact fields in completed entries. | Shërbimi i ofertave përdor tokena të përkohshëm sesioni, identifikues kërkesash, shenja identifikuese të kërkesave dhe numërues tentativash për të verifikuar dërgesat, për të kufizuar abuzimin dhe për të shmangur dërgimin e dyfishtë. Regjistri i kërkesave në memorie i ruan të dhënat deri në 24 orë, varësisht nga pastrimi dhe rinisja e procesit; ai nuk ruan fushat e papërpunuara të kontaktit në regjistrimet e përfunduara. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); Legal draft: legal review required before publication |
| `privacy.storage.pending` | review the deployed hosting logs, network metadata, cookies, and storage inventory; identify the hosting provider and any additional tools. Confirm retention and any consent requirements for the final deployment. | shqyrtimi i regjistrave të hostimit në versionin e publikuar, i të dhënave meta të rrjetit, i cookies dhe i inventarit të ruajtjes; identifikimi i ofruesit të hostimit dhe i çdo mjeti shtesë. Konfirmimi i afateve të ruajtjes dhe i çdo kërkese për pëlqim për versionin përfundimtar. | Consent wording: also needs legal review; Legal draft: legal review required before publication |
| `privacy.recipients.heading` | 04 / Providers, recipients & retention. | 04 / Ofruesit, marrësit dhe ruajtja e të dhënave. | Legal draft: legal review required before publication |
| `privacy.recipients.body` | The existing optional email adapter supports Resend. This describes supported software, rather than confirmation of a contracted provider. Delivery remains unavailable until valid configuration is supplied. The configured provider and recipient mailbox handle accepted inquiry information. | Përshtatësi opsional ekzistues i email-it mbështet Resend. Kjo përshkruan softuerin e mbështetur, jo konfirmimin e një ofruesi të kontraktuar. Dërgimi mbetet i padisponueshëm derisa të vendoset konfigurim i vlefshëm. Ofruesi i konfiguruar dhe kutia postare e marrësit trajtojnë informacionin e kërkesave të pranuara. | "email" loanword and its declension (email-i); Legal draft: legal review required before publication |
| `privacy.recipients.pending` | identify the actual provider and mailbox recipients; document processing arrangements, processing locations, any international transfers and safeguards, and retention and deletion periods for inquiry emails, provider records, and logs. | identifikimi i ofruesit real dhe i marrësve të kutisë postare; dokumentimi i marrëveshjeve të përpunimit, i vendeve të përpunimit, i çdo transferimi ndërkombëtar dhe i masave mbrojtëse, si dhe i afateve të ruajtjes dhe fshirjes për email-et e kërkesave, të dhënat e ofruesit dhe regjistrat teknikë. | "email" loanword and its declension (email-i); Legal draft: legal review required before publication |
| `privacy.rights.heading` | 05 / Privacy requests & updates. | 05 / Kërkesat për privatësi dhe përditësimet. | Legal draft: legal review required before publication |
| `privacy.rights.pending` | explain applicable rights, how to exercise them, any consent withdrawal process, and the relevant supervisory authority and complaint channel. Publish a verified privacy contact and an effective or last-updated date after review. | shpjegimi i të drejtave përkatëse, i mënyrës së ushtrimit të tyre, i çdo procesi për tërheqjen e pëlqimit, si dhe i autoritetit mbikëqyrës përkatës dhe i kanalit të ankesave. Publikimi i një kontakti të verifikuar për privatësinë dhe i një date të hyrjes në fuqi ose të përditësimit të fundit pas shqyrtimit. | Consent wording: also needs legal review; Legal draft: legal review required before publication |
| `privacy.rights.body` | A privacy request channel has not yet been published. This draft must be reviewed against the actual business, deployment, and applicable requirements. | Ende nuk është publikuar një kanal për kërkesat për privatësi. Ky draft duhet të shqyrtohet në raport me biznesin real, versionin e publikuar dhe kërkesat përkatëse. | Legal draft: legal review required before publication |
| `privacy.rights.link` | View the contact information status | Shikoni statusin e informacionit të kontaktit | Legal draft: legal review required before publication |
| `imprint.eyebrow` | IMPRINT / DRAFT | TË DHËNAT LIGJORE / DRAFT | Legal draft: legal review required before publication |
| `imprint.title` | COMPANY · INFORMATION. | INFORMACIONI · PËR KOMPANINË. | Legal draft: legal review required before publication |
| `imprint.intro` | PROSAFE is focused on B2B workplace safety distribution, with Kosovo as its initial market. Verified legal and operator details are still required. | PROSAFE fokusohet në distribuimin B2B të pajisjeve për siguri në punë, me Kosovën si treg fillestar. Të dhënat e verifikuara juridike dhe të operatorit ende nevojiten. | Legal draft: legal review required before publication |
| `imprint.notice` | This imprint is an incomplete draft. PROSAFE is a brand name here, not a verified legal entity name. All fields below must be completed or confirmed as not applicable and reviewed before launch. | Ky dokument për të dhënat ligjore është një draft i paplotësuar. PROSAFE këtu është emër marke, jo emër i verifikuar i subjektit juridik. Të gjitha fushat më poshtë duhet të plotësohen ose të konfirmohen si të pazbatueshme dhe të shqyrtohen para lansimit. | Legal draft: legal review required before publication |
| `imprint.identity.heading` | 01 / Website operator. | 01 / Operatori i uebfaqes. | Legal draft: legal review required before publication |
| `imprint.identity.items[0].term` | Legal entity name: | Emri i subjektit juridik: | Legal draft: legal review required before publication |
| `imprint.identity.items[0].text` | to be provided and verified. | për t’u dhënë dhe verifikuar. | Legal draft: legal review required before publication |
| `imprint.identity.items[1].term` | Legal form: | Forma juridike: | Legal draft: legal review required before publication |
| `imprint.identity.items[1].text` | to be provided and verified. | për t’u dhënë dhe verifikuar. | Legal draft: legal review required before publication |
| `imprint.identity.items[2].term` | Registered business address: | Adresa e regjistruar e biznesit: | Legal draft: legal review required before publication |
| `imprint.identity.items[2].text` | to be provided and verified. | për t’u dhënë dhe verifikuar. | Legal draft: legal review required before publication |
| `imprint.identity.items[3].term` | Authorized representative: | Përfaqësuesi i autorizuar: | Legal draft: legal review required before publication |
| `imprint.identity.items[3].text` | name and role to be provided and verified. | emri dhe roli për t’u dhënë dhe verifikuar. | Legal draft: legal review required before publication |
| `imprint.identity.note` | Kosovo is the initial market; this does not establish the operator’s place of registration or registered address. | Kosova është tregu fillestar; kjo nuk përcakton vendin e regjistrimit ose adresën e regjistruar të operatorit. | Legal draft: legal review required before publication |
| `imprint.registration.heading` | 02 / Registration & tax details. | 02 / Regjistrimi dhe të dhënat tatimore. | Legal draft: legal review required before publication |
| `imprint.registration.items[0].term` | Business registration number and register: | Numri i regjistrimit të biznesit dhe regjistri: | Legal draft: legal review required before publication |
| `imprint.registration.items[0].text` | to be provided and verified. | për t’u dhënë dhe verifikuar. | Legal draft: legal review required before publication |
| `imprint.registration.items[1].term` | Tax / VAT identification: | Numri fiskal / numri i TVSH-së: | Legal draft: legal review required before publication |
| `imprint.registration.items[1].text` | to be provided and verified, where applicable. | për t’u dhënë dhe verifikuar, kur zbatohet. | Legal draft: legal review required before publication |
| `imprint.registration.items[2].term` | Relevant licensing or supervisory details: | Të dhënat përkatëse për licencim ose mbikëqyrje: | Legal draft: legal review required before publication |
| `imprint.registration.items[2].text` | applicability to be confirmed. | zbatueshmëria për t’u konfirmuar. | Legal draft: legal review required before publication |
| `imprint.contact.heading` | 03 / Business contact. | 03 / Kontakti i biznesit. | Legal draft: legal review required before publication |
| `imprint.contact.items[0].term` | Business email: | Email-i i biznesit: | "email" loanword and its declension (email-i); Legal draft: legal review required before publication |
| `imprint.contact.items[0].text` | verified public address pending. | adresa publike e verifikuar në pritje. | Legal draft: legal review required before publication |
| `imprint.contact.items[1].term` | Business phone: | Telefoni i biznesit: | Legal draft: legal review required before publication |
| `imprint.contact.items[1].text` | verified public number pending. | numri publik i verifikuar në pritje. | Legal draft: legal review required before publication |
| `imprint.contact.items[2].term` | Correspondence address: | Adresa për korrespondencë: | Legal draft: legal review required before publication |
| `imprint.contact.items[2].text` | to be confirmed with the operator. | për t’u konfirmuar me operatorin. | Legal draft: legal review required before publication |
| `imprint.contact.link` | Business inquiry and quotation information | Informacion për kërkesat e biznesit dhe ofertat | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); Legal draft: legal review required before publication |
| `imprint.publication.heading` | 04 / Publication review. | 04 / Shqyrtimi para publikimit. | Legal draft: legal review required before publication |
| `imprint.publication.pending` | confirm the applicable disclosure requirements, any additional responsible-person information, and a publication or review date. Replace the pending fields with approved business details. | konfirmimi i kërkesave përkatëse për publikimin e informacionit, i çdo informacioni shtesë për personat përgjegjës dhe i një date publikimi ose shqyrtimi. Zëvendësimi i fushave në pritje me të dhëna të miratuara të biznesit. | Legal draft: legal review required before publication |
| `imprint.publication.link` | Read the draft privacy information | Lexoni draftin e informacionit për privatësinë | Legal draft: legal review required before publication |

## Error pages (404)

4 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `notFound.eyebrow` | PAGE NOT FOUND | FAQJA NUK U GJET |  |
| `notFound.heading` | This page is unavailable. | Kjo faqe nuk është e disponueshme. |  |
| `notFound.body` | Check the address or return to the homepage to continue exploring. | Kontrolloni adresën ose kthehuni në ballinë për të vazhduar eksplorimin. |  |
| `notFound.home` | BACK TO HOME | KTHEHU NË BALLINË |  |

## Metadata and accessibility labels

60 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `common.homeLabel` | PROSAFE home | PROSAFE – Ballina |  |
| `meta.defaultTitle` | PROSAFE — Safety Without Compromise. | PROSAFE — Safety Without Compromise. | Same as English (intentional: brand, slogan, code or source name) |
| `meta.description` | PROSAFE provides premium workplace safety equipment and complete protection solutions for businesses in Kosovo. Safety Without Compromise. | PROSAFE ofron pajisje premium për siguri në punë dhe zgjidhje të plota mbrojtjeje për bizneset në Kosovë. Safety Without Compromise. |  |
| `header.languageLabel` | Language | Gjuha |  |
| `footer.navigationLabel` | Company and legal navigation | Navigimi i kompanisë dhe informacioni ligjor |  |
| `quoteLink.label` | Quote | Oferta | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quoteLink.ariaLabel.one` | Quote selection, {count} selected product | Përzgjedhja për ofertë, {count} produkt i përzgjedhur | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quoteLink.ariaLabel.other` | Quote selection, {count} selected products | Përzgjedhja për ofertë, {count} produkte të përzgjedhura | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `home.hero.sidebarLabel` | PROSAFE workplace protection | Mbrojtja në punë nga PROSAFE |  |
| `home.hero.workerAlt` | Industrial worker in side profile wearing an orange safety helmet, clear protective glasses, and dark workwear. | Punëtor industrial në profil, me helmetë mbrojtëse portokalli, syze mbrojtëse transparente dhe veshje pune të errët. |  |
| `businessPage.completionLabel` | Before launch | Para lansimit |  |
| `about.metaTitle` | About | Rreth nesh |  |
| `about.metaDescription` | Meet PROSAFE: a B2B workplace safety distribution business focused on protecting people at work, with Kosovo as its initial market. | Njihuni me PROSAFE: biznes distribuimi B2B për siguri në punë, i fokusuar në mbrojtjen e njerëzve në punë, me Kosovën si treg fillestar. |  |
| `brands.metaTitle` | Brands & Manufacturer Partnerships | Markat dhe partneritetet me prodhuesit |  |
| `brands.metaDescription` | Learn about PROSAFE’s approach to manufacturer partnerships and verified product information for B2B safety equipment distribution in Kosovo. | Mësoni për qasjen e PROSAFE ndaj partneriteteve me prodhuesit dhe informacionit të verifikuar për produktet në distribuimin B2B të pajisjeve të sigurisë në Kosovë. |  |
| `brands.partnersLabel` | VERIFIED PARTNERS / FUTURE DIRECTORY | PARTNERË TË VERIFIKUAR / LISTË E ARDHSHME |  |
| `contact.metaTitle` | Contact & Business Inquiries | Kontakti dhe kërkesat e bizneseve |  |
| `contact.metaDescription` | Prepare a PROSAFE business quotation and find information for general business and manufacturer partnership inquiries. Initial market: Kosovo. | Përgatitni një kërkesë për ofertë biznesi te PROSAFE dhe gjeni informacion për kërkesa të përgjithshme biznesi dhe për partneritete me prodhues. Tregu fillestar: Kosova. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `privacy.metaTitle` | Privacy — Draft | Privatësia — Draft | "Draft" kept as a loanword (M9.4); Legal draft: legal review required before publication |
| `privacy.metaDescription` | Draft PROSAFE privacy information describing the current quotation workflow and the business information that must be completed before launch. | Draft i informacionit për privatësinë në PROSAFE, që përshkruan procesin aktual të ofertës dhe informacionin e biznesit që duhet plotësuar para lansimit. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); "Draft" kept as a loanword (M9.4); Legal draft: legal review required before publication |
| `imprint.metaTitle` | Imprint — Draft | Të dhënat ligjore — Draft | "Draft" kept as a loanword (M9.4); "Të dhënat ligjore" for Imprint (M9.4); Legal draft: legal review required before publication |
| `imprint.metaDescription` | Draft PROSAFE company and website operator information, with legal identity, registration, and contact details pending verification before launch. | Draft i të dhënave të kompanisë PROSAFE dhe të operatorit të uebfaqes; identiteti juridik, regjistrimi dhe të dhënat e kontaktit presin verifikim para lansimit. | "Draft" kept as a loanword (M9.4); Legal draft: legal review required before publication |
| `imprint.publication.pendingLabel` | Complete before launch: | Për t’u plotësuar para lansimit: | Legal draft: legal review required before publication |
| `riskNote.label` | Equipment selection note | Shënim për përzgjedhjen e pajisjeve |  |
| `demoNotice.label` | Demonstration catalog notice | Njoftim për katalogun demonstrues | "demo" / "demonstrues" for demonstration items |
| `catalog.metaTitle` | Equipment catalog | Katalogu i pajisjeve |  |
| `catalog.metaDescription` | Explore the PROSAFE demonstration equipment catalog by protection category and prepare a local quote selection. | Eksploroni katalogun demonstrues të pajisjeve PROSAFE sipas kategorisë së mbrojtjes dhe përgatitni një përzgjedhje lokale për ofertë. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register); "Eksploro" / "Shfleto" call-to-action verbs (M9.4); "demo" / "demonstrues" for demonstration items |
| `catalog.filtersLabel` | Search and filter products | Kërko dhe filtro produktet |  |
| `catalog.searchLabel` | Search equipment | Kërko pajisje |  |
| `catalog.categoryLabel` | Protection category | Kategoria e mbrojtjes |  |
| `catalog.industryLabel` | Industry | Industria |  |
| `catalog.resultsLabel` | Demonstration products | Produkte demonstruese | "demo" / "demonstrues" for demonstration items |
| `productDetail.metaTitle` | {name} — Demo | {name} — Demo | Same as English: confirm; "demo" / "demonstrues" for demonstration items |
| `productDetail.metaDescription` | {summary} Demonstration entry, not real inventory. | {summary} Produkt demonstrues, jo stok real. | "demo" / "demonstrues" for demonstration items |
| `productDetail.variantsHeading` | Example variants | Shembuj variantesh |  |
| `productDetail.variantsNote` | Shown for reference. Variants are not selectable or recorded in this product-and-quantity quote selection. | Shfaqen vetëm si referencë. Variantet nuk mund të zgjidhen dhe nuk regjistrohen në këtë përzgjedhje për ofertë me produkt dhe sasi. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `industries.metaTitle` | Industries | Industritë |  |
| `industries.metaDescription` | Explore PROSAFE demonstration equipment by industry, from construction and manufacturing to logistics, electrical work, and industrial maintenance. | Eksploroni pajisjet demonstruese të PROSAFE sipas industrisë, nga ndërtimtaria dhe prodhimi te logjistika, punët elektrike dhe mirëmbajtja industriale. | "Eksploro" / "Shfleto" call-to-action verbs (M9.4); "demo" / "demonstrues" for demonstration items |
| `industries.listLabel` | Industries | Industritë |  |
| `industries.categoriesLabel` | {industry} protection categories | Kategoritë e mbrojtjes për {industry} |  |
| `industryEquipment.productsLabel` | Industry demonstration products | Produkte demonstruese për industrinë | "demo" / "demonstrues" for demonstration items |
| `industryEquipment.quotePromptLabel` | Prepare a quote selection | Përgatit një përzgjedhje për ofertë | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `findYourProtection.metaTitle` | Find Your Protection | Gjej mbrojtjen e duhur |  |
| `findYourProtection.metaDescription` | Choose an industry to explore relevant protection categories and demonstration equipment from the PROSAFE catalog. | Zgjidhni një industri për të eksploruar kategoritë përkatëse të mbrojtjes dhe pajisjet demonstruese nga katalogu i PROSAFE. | "demo" / "demonstrues" for demonstration items |
| `findYourProtection.formLabel` | Find equipment by industry | Gjej pajisje sipas industrisë |  |
| `findYourProtection.industryLabel` | Your industry | Industria juaj |  |
| `findYourProtection.statusLabel` | Industry selection status | Statusi i përzgjedhjes së industrisë |  |
| `explorer.metaTitle` | Protection Explorer | Eksploro mbrojtjen | "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `explorer.metaDescription` | Explore workplace protection from head to toe: safety helmets, protective eyewear, gloves, clothing, and footwear. | Eksploroni mbrojtjen në punë nga koka te këmbët: helmeta mbrojtëse, syze mbrojtëse, doreza, veshje dhe këpucë mbrojtëse. | "Këpucë mbrojtëse" for safety footwear (decision M9.0); "Eksploro" / "Shfleto" call-to-action verbs (M9.4) |
| `explorer.widget.hotspotsLabel` | Full-body worker protection hotspots | Pikat e mbrojtjes në figurën e punëtorit |  |
| `explorer.widget.hotspotLabel` | {zone} — {category} | {zone} — {category} | Same as English: confirm |
| `addToQuote.ariaLabel` | Add {name} to quote | Shto {name} në ofertë | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.metaTitle` | Request a quotation | Kërko ofertë | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.metaDescription` | Review your equipment selection and prepare a business quotation enquiry with PROSAFE. | Shqyrtoni përzgjedhjen tuaj të pajisjeve dhe përgatitni një kërkesë biznesi për ofertë te PROSAFE. | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.selection.itemsLabel` | Selected quote products | Produktet e përzgjedhura për ofertë | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.selection.removeLabel` | Remove {name} from quote | Hiq {name} nga oferta | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.selection.overviewLabel` | Quote selection overview | Përmbledhja e përzgjedhjes për ofertë | "Oferta / ofertë" for quote/quotation (approved M9.4; confirm B2B register) |
| `quote.form.requirementsLabel` | Additional requirements | Kërkesa shtesë |  |
| `quote.form.honeypotLabel` | Leave this field empty | Lëreni këtë fushë bosh |  |
| `notFound.metaTitle` | Page not found | Faqja nuk u gjet |  |

## Search keywords

16 strings.

| Key | English | Albanian | Review note |
| --- | --- | --- | --- |
| `catalog:products.DEMO-HD-001.keywords` | hard hat · head · construction · helmet | kaskë · helmetë · kokë · ndërtim |  |
| `catalog:products.DEMO-HD-002.keywords` | hard hat · head · outdoor · helmet | kaskë · helmetë · kokë · ambient i jashtëm |  |
| `catalog:products.DEMO-HD-003.keywords` | head · strap · compact · helmet | kaskë · helmetë · kokë · rrip · kompakte |  |
| `catalog:products.DEMO-EY-001.keywords` | eyes · spectacles · clear · eyewear | sy · syze · transparente · syze sigurie |  |
| `catalog:products.DEMO-EY-002.keywords` | eyes · spectacles · wraparound · eyewear | sy · syze · mbështjellëse · të lakuara |  |
| `catalog:products.DEMO-EY-003.keywords` | eyes · goggles · strap · eyewear | sy · syze të mbyllura · gogla · rrip |  |
| `catalog:products.DEMO-HN-001.keywords` | hands · knit · handling · gloves | duar · doreza · të thurura · trajtim materialesh |  |
| `catalog:products.DEMO-HN-002.keywords` | hands · coated · handling · gloves | duar · doreza · të veshura · trajtim materialesh |  |
| `catalog:products.DEMO-HN-003.keywords` | hands · cuff · panelled · gloves | duar · doreza · manshetë · me panele |  |
| `catalog:products.DEMO-BD-001.keywords` | body · workwear · jacket · clothing | trup · veshje pune · xhaketë · veshje |  |
| `catalog:products.DEMO-BD-002.keywords` | body · workwear · trousers · pants · clothing | trup · veshje pune · pantallona · veshje |  |
| `catalog:products.DEMO-BD-003.keywords` | body · workwear · coverall · overall · clothing | trup · veshje pune · kombinezon · tutë pune · veshje |  |
| `catalog:products.DEMO-FT-001.keywords` | feet · foot · boots · lace · footwear | këmbë · çizme · lidhëse · këpucë |  |
| `catalog:products.DEMO-FT-002.keywords` | feet · foot · shoes · low · footwear | këmbë · këpucë · të ulëta · këpucë pune |  |
| `catalog:products.DEMO-FT-003.keywords` | feet · foot · boots · pull-on · footwear | këmbë · çizme · pa lidhëse · këpucë |  |
| `catalog:searchAliases` |  | PMP · PPE · pajisje mbrojtëse personale | Abbreviation "PMP" (pajisje mbrojtëse personale) for PPE; confirm local usage |

