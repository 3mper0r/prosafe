import { BrandsView, brandsMetadata } from "@/views/brands";

export const metadata = brandsMetadata("sq");

export default function Page() {
  return <BrandsView locale="sq" />;
}
