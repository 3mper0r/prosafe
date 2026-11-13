import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { AddToQuote } from "@/features/quote/add-to-quote";
import type { Product } from "./types";
import styles from "./catalog.module.css";

export function ProductCard({ product, headingLevel = 2 }: { product: Product; headingLevel?: 2 | 3 }) {
  const image = product.images[0];
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <li className={styles.card} data-product-id={product.id}>
      <Link href={`/products/${product.slug}`} className={styles.cardLink}>
        <div className={styles.visual}>
          {image && <Image src={image.src} alt={image.alt} width={640} height={480} />}
          <span className={styles.badge}>DEMO / CATEGORY ILLUSTRATION</span>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.category}>{PRODUCT_CATEGORIES[product.categoryId].label}</p>
          <Heading>{product.name} <ArrowUpRight size={17} aria-hidden="true" /></Heading>
          <p>{product.summary}</p>
        </div>
      </Link>
      <div className={styles.cardFooter}>
        <span className={styles.identifier}>{product.id} / DEMONSTRATION PRODUCT</span>
        <AddToQuote productId={product.id} productName={product.name} />
      </div>
    </li>
  );
}
