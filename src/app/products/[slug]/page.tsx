import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/features/catalog/products";
import { PRODUCT_CATEGORIES, catalogCategoryHref } from "@/lib/product-categories";
import { DemoNotice } from "@/features/catalog/demo-notice";
import { AddToQuote } from "@/features/quote/add-to-quote";
import styles from "@/features/catalog/catalog.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  return product ? { title: `${product.name} — Demo`, description: `${product.summary} Demonstration entry, not real inventory.` } : { title: "Product not found" };
}

export default async function ProductPage({ params }: Props) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();
  const category = PRODUCT_CATEGORIES[product.categoryId];
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/products" className={styles.textLink}>All equipment</Link>
        <span aria-hidden="true">/</span>
        <Link href={catalogCategoryHref(product.categoryId)} className={styles.textLink}>{category.label}</Link>
      </nav>
      <DemoNotice />
      <article className={styles.detail}>
        <div className={styles.gallery}>
          {product.images.map((image) => (
            <figure key={image.src}>
              <div className={styles.visual}>
                <Image src={image.src} alt={image.alt} width={640} height={480} />
                <span className={styles.badge}>DEMO / CATEGORY ILLUSTRATION</span>
              </div>
              <figcaption>Generic category illustration. Approved product photography will accompany real manufacturer data.</figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.detailInfo}>
          <p className={styles.eyebrow}>{category.label} / DEMONSTRATION</p>
          <h1 className={styles.detailHeading}>{product.name}</h1>
          <p className={styles.identifier}>PRODUCT IDENTIFIER / {product.id}</p>
          <p className={styles.description}>{product.description}</p>
          <AddToQuote productId={product.id} productName={product.name} />
          <Link href="/quote" className={`${styles.textLink} ml-5`}>View quote selection →</Link>
          <p className={styles.note}>Save a product and quantity locally. Quote submission is not yet available.</p>
          <h2>Technical specifications</h2>
          <p className={styles.note}>Illustrative fields only. These are not verified product specifications.</p>
          <dl className={styles.specs}>{product.specifications.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
          {product.variants.length > 0 && <>
            <h2>Example variants</h2>
            <dl className={styles.variants}>{product.variants.map((variant) => <div key={variant.label}><dt>{variant.label}</dt><dd>{variant.options.map((option) => <span key={option}>{option}</span>)}</dd></div>)}</dl>
            <p className={styles.note}>Shown for reference. Variants are not selectable or recorded in this product-and-quantity quote selection.</p>
          </>}
        </div>
      </article>
    </main>
  );
}
