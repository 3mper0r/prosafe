import { BrandsView, brandsMetadata } from "@/views/brands";

export const metadata = brandsMetadata("en");

export default function Page() {
  return <BrandsView locale="en" />;
}
