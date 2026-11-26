import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProtectionExplorer } from "@/features/protection-explorer/protection-explorer";
import { PRODUCT_CATEGORY_IDS, catalogCategoryHref, type ProductCategoryId } from "@/lib/product-categories";
import styles from "@/features/protection-explorer/protection-explorer.module.css";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getCatalog } from "@/content/catalog";
import type { CategoryContent } from "@/content/types";
import { Lines } from "@/i18n/lines";
import { localizePath } from "@/i18n/paths";
import { indexableMetadata } from "@/i18n/seo";

export function protectionExplorerMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).explorer;
  return indexableMetadata(locale, "/protection-explorer", { title: t.metaTitle, description: t.metaDescription });
}

export function ProtectionExplorerView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).explorer;
  const catalog = getCatalog(locale);
  // Send only what the widget renders: zone labels plus category names and descriptions.
  const categories = Object.fromEntries(PRODUCT_CATEGORY_IDS.map((id) => [id, { name: catalog.categories[id].name, description: catalog.categories[id].description }])) as Record<ProductCategoryId, Pick<CategoryContent, "name" | "description">>;
  return (
    <main className={styles.page}>
      <Link href={localizePath(locale, "/#protection")} className={styles.backLink}>
        <ArrowLeft size={17} aria-hidden="true" /> {t.backLink}
      </Link>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>
          {t.eyebrow}
        </p>
        <h1>
          <Lines lines={t.title} />
        </h1>
        <p>
          {t.intro}
        </p>
      </header>
      <ProtectionExplorer
        messages={t.widget}
        zones={catalog.zones}
        categories={categories}
        catalogLinks={Object.fromEntries(PRODUCT_CATEGORY_IDS.map((id) => [id, localizePath(locale, catalogCategoryHref(id))]))}
      />
    </main>
  );
}
