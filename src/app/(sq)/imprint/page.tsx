import { ImprintView, imprintMetadata } from "@/views/imprint";

export const metadata = imprintMetadata("sq");

export default function Page() {
  return <ImprintView locale="sq" />;
}
