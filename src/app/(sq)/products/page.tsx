import { ProductsView, productsMetadata } from "@/views/products";

export const metadata = productsMetadata;

export default async function Page({ searchParams }: PageProps<"/products">) {
  return <ProductsView locale="sq" searchParams={await searchParams} />;
}
