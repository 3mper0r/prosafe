import { IndustriesView, industriesMetadata } from "@/views/industries";

export const metadata = industriesMetadata("en");

export default function Page() {
  return <IndustriesView locale="en" />;
}
