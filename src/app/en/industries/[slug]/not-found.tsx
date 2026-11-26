import { IndustryNotFoundView, industryNotFoundMetadata } from "@/views/industry-not-found";

export const metadata = industryNotFoundMetadata("en");

export default function NotFound() {
  return <IndustryNotFoundView locale="en" />;
}
