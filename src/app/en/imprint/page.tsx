import { ImprintView, imprintMetadata } from "@/views/imprint";

export const metadata = imprintMetadata("en");

export default function Page() {
  return <ImprintView locale="en" />;
}
