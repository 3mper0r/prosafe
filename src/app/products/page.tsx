import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_IDS, isProductCategoryId } from "@/lib/product-categories";
import { PRODUCTS } from "@/features/catalog/products";
import { ProductCard } from "@/features/catalog/product-card";
import { DemoNotice } from "@/features/catalog/demo-notice";
import styles from "@/features/catalog/catalog.module.css";

export const metadata: Metadata = {
  title: "Equipment catalog",
  description: "Explore the PROSAFE demonstration equipment catalog by protection category and prepare a local quote selection.",
};

export default async function ProductsPage({ searchParams }: {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[] }>;
}) {
  const query = await searchParams;
  const search = (typeof query.q === "string" ? query.q : "").trim().slice(0, 200);
  const categoryInput = typeof query.category === "string" ? query.category : "";
  const category = isProductCategoryId(categoryInput) ? categoryInput : "";
  const terms = search.toLocaleLowerCase("en").split(/\s+/).filter(Boolean);
  const products = PRODUCTS.filter((product) => {
    const text = [product.name, product.summary, product.description, product.id, PRODUCT_CATEGORIES[product.categoryId].label, ...product.keywords].join(" ").toLocaleLowerCase("en");
    return (!category || product.categoryId === category) && terms.every((term) => text.includes(term));
  });
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>PROSAFE / EQUIPMENT CATALOG</p>
        <h1>EQUIPMENT.<br />WITH PURPOSE.</h1>
        <p>Explore protection from head to toe. Find an equipment type and build a selection for your team.</p>
      </header>
      <DemoNotice />
      <form action="/products" method="get" className={styles.filters} role="search" aria-label="Search and filter products">
        <label className={styles.field}>
          Search equipment
          <input type="search" name="q" defaultValue={search} placeholder="Product name or keyword" maxLength={200} />
        </label>
        <label className={styles.field}>
          Protection category
          <select name="category" defaultValue={category}>
            <option value="">All categories</option>
            {PRODUCT_CATEGORY_IDS.map((id) => <option key={id} value={id}>{PRODUCT_CATEGORIES[id].label}</option>)}
          </select>
        </label>
        <button type="submit" className="button button-primary">APPLY FILTERS</button>
      </form>
      {categoryInput && !category && <p className={styles.note}>Unknown category. Showing all categories instead.</p>}
      <div className={styles.resultsBar}>
        <p>{products.length} {products.length === 1 ? "example" : "examples"}{category ? ` / ${PRODUCT_CATEGORIES[category].label}` : " / All categories"}{search ? ` matching “${search}”` : ""}</p>
        {(search || categoryInput) && <Link href="/products" className={styles.textLink}>Clear filters</Link>}
      </div>
      {products.length ? (
        <ul className={styles.grid} aria-label="Demonstration products">{products.map((product) => <ProductCard key={product.id} product={product} />)}</ul>
      ) : (
        <section className={styles.empty} aria-labelledby="empty-heading">
          <p className={styles.eyebrow}>NO MATCHING EQUIPMENT</p>
          <h2 id="empty-heading">Let’s try another search.</h2>
          <p>Use a different keyword or clear the category and search filters.</p>
          <Link href="/products" className="button button-primary">VIEW ALL EXAMPLES</Link>
        </section>
      )}
      <div className={styles.bottomLink}><Link href="/protection-explorer" className={styles.textLink}>Find your category in the protection explorer →</Link></div>
    </main>
  );
}
