import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/product-categories";
import { AddToQuote } from "@/features/quote/add-to-quote";
import type { Product } from "./types";
import styles from "./catalog.module.css";
import type { Locale } from "@/i18n/config";
import { formatMessage } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizePath } from "@/i18n/paths";

export function ProductCard({ locale, product, headingLevel = 2 }: { locale: Locale; product: Product; headingLevel?: 2 | 3 }) {
  const image = product.images[0];
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const t = getDictionary(locale).productCard;
  return (
    <li className={styles.card} data-product-id={product.id}>
      <Link href={localizePath(locale, `/products/${product.slug}`)} className={styles.cardLink}>
        <div className={styles.visual}>
          {image && <Image src={image.src} alt={image.alt} width={640} height={480} />}
          <span className={styles.badge}>{t.badge}</span>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.category}>{PRODUCT_CATEGORIES[product.categoryId].label}</p>
          <Heading>{product.name} <ArrowUpRight size={17} aria-hidden="true" /></Heading>
          <p>{product.summary}</p>
        </div>
      </Link>
      <div className={styles.cardFooter}>
        <span className={styles.identifier}>{formatMessage(t.identifier, { id: product.id })}</span>
        <AddToQuote productId={product.id} productName={product.name} />
      </div>
    </li>
  );
}
