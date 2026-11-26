import { PrivacyView, privacyMetadata } from "@/views/privacy";

export const metadata = privacyMetadata("sq");

export default function Page() {
  return <PrivacyView locale="sq" />;
}
