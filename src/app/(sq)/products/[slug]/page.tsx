import { ProductDetailView, productDetailMetadata, productStaticParams } from "@/views/product-detail";

type Props = PageProps<"/products/[slug]">;

export function generateStaticParams() {
  return productStaticParams();
}

export async function generateMetadata({ params }: Props) {
  return productDetailMetadata("sq", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ProductDetailView locale="sq" slug={(await params).slug} />;
}
