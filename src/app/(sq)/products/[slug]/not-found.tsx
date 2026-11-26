import { ProductNotFoundView, productNotFoundMetadata } from "@/views/product-not-found";

export const metadata = productNotFoundMetadata("sq");

export default function NotFound() {
  return <ProductNotFoundView locale="sq" />;
}
