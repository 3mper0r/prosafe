import { ProductDetailView, productDetailMetadata, productStaticParams } from "@/views/product-detail";

type Props = PageProps<"/en/products/[slug]">;

export function generateStaticParams() {
  return productStaticParams();
}

export async function generateMetadata({ params }: Props) {
  return productDetailMetadata((await params).slug);
}

export default async function Page({ params }: Props) {
  return <ProductDetailView locale="en" slug={(await params).slug} />;
}
