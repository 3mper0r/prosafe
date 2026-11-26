import { IndustriesView, industriesMetadata } from "@/views/industries";

export const metadata = industriesMetadata("sq");

export default function Page() {
  return <IndustriesView locale="sq" />;
}
