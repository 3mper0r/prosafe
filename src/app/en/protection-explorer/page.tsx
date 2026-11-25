import { ProtectionExplorerView, protectionExplorerMetadata } from "@/views/protection-explorer";

export const metadata = protectionExplorerMetadata;

export default function Page() {
  return <ProtectionExplorerView locale="en" />;
}
