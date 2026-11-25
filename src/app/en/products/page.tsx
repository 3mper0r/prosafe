import { ProductsView, productsMetadata } from "@/views/products";

export const metadata = productsMetadata("en");

export default async function Page({ searchParams }: PageProps<"/en/products">) {
  return <ProductsView locale="en" searchParams={await searchParams} />;
}
