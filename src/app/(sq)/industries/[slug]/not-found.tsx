import { IndustryNotFoundView, industryNotFoundMetadata } from "@/views/industry-not-found";

export const metadata = industryNotFoundMetadata("sq");

export default function NotFound() {
  return <IndustryNotFoundView locale="sq" />;
}
