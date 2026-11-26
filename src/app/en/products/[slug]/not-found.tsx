import { ProductNotFoundView, productNotFoundMetadata } from "@/views/product-not-found";

export const metadata = productNotFoundMetadata("en");

export default function NotFound() {
  return <ProductNotFoundView locale="en" />;
}
