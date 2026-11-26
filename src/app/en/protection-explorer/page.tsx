import { ProtectionExplorerView, protectionExplorerMetadata } from "@/views/protection-explorer";

export const metadata = protectionExplorerMetadata("en");

export default function Page() {
  return <ProtectionExplorerView locale="en" />;
}
