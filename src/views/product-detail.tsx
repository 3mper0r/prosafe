import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCT_RECORDS } from "@/features/catalog/products";
import { catalogCategoryHref } from "@/lib/product-categories";
import { getCatalog } from "@/content/catalog";
import { DemoNotice } from "@/features/catalog/demo-notice";
import { AddToQuote } from "@/features/quote/add-to-quote";
import styles from "@/features/catalog/catalog.module.css";
import type { Locale } from "@/i18n/config";
import { formatMessage } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";
import { indexableMetadata, NOINDEX } from "@/i18n/seo";

export function productStaticParams() {
  return PRODUCT_RECORDS.map(({ slug }) => ({ slug }));
}

export function productDetailMetadata(locale: Locale, slug: string): Metadata {
  const t = getDictionary(locale).productDetail;
  const product = getCatalog(locale).getProductBySlug(slug);
  // Unknown slugs render the 404 and get no canonical or alternates.
  return product
    ? indexableMetadata(locale, `/products/${product.slug}`, { title: formatMessage(t.metaTitle, { name: product.name }), description: formatMessage(t.metaDescription, { summary: product.summary }) })
    : { title: t.notFoundTitle, robots: NOINDEX };
}

export function ProductDetailView({ locale, slug }: { locale: Locale; slug: string }) {
  const catalog = getCatalog(locale);
  const product = catalog.getProductBySlug(slug);
  if (!product) notFound();
  const category = catalog.categories[product.categoryId];
  const t = getDictionary(locale).productDetail;
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <nav aria-label={t.breadcrumb} className={styles.breadcrumb}>
        <Link href={localizePath(locale, "/products")} className={styles.textLink}>{t.allEquipment}</Link>
        <span aria-hidden="true">/</span>
        <Link href={localizePath(locale, catalogCategoryHref(product.categoryId))} className={styles.textLink}>{category.label}</Link>
      </nav>
      <DemoNotice locale={locale} />
      <article className={styles.detail}>
        <div className={styles.gallery}>
          {product.images.map((image) => (
            <figure key={image.src}>
              <div className={styles.visual}>
                <Image src={image.src} alt={image.alt} width={640} height={480} />
                <span className={styles.badge}>{getDictionary(locale).productCard.badge}</span>
              </div>
              <figcaption>{t.imageCaption}</figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.detailInfo}>
          <p className={styles.eyebrow}>{formatMessage(t.eyebrow, { category: category.label })}</p>
          <h1 className={styles.detailHeading}>{product.name}</h1>
          <p className={styles.identifier}>{formatMessage(t.identifier, { id: product.id })}</p>
          <p className={styles.description}>{product.description}</p>
          <AddToQuote productId={product.id} productName={product.name} />
          <Link href={localizePath(locale, "/quote")} className={`${styles.textLink} ml-5`}>{t.viewQuote}</Link>
          <p className={styles.note}>{t.quoteNote}</p>
          <h2>{t.specificationsHeading}</h2>
          <p className={styles.note}>{t.specificationsNote}</p>
          <dl className={styles.specs}>{product.specifications.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
          {product.variants.length > 0 && <>
            <h2>{t.variantsHeading}</h2>
            <dl className={styles.variants}>{product.variants.map((variant) => <div key={variant.label}><dt>{variant.label}</dt><dd>{variant.options.map((option) => <span key={option}>{option}</span>)}</dd></div>)}</dl>
            <p className={styles.note}>{t.variantsNote}</p>
          </>}
        </div>
      </article>
    </main>
  );
}
