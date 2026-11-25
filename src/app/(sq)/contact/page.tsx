import { ContactView, contactMetadata } from "@/views/contact";

export const metadata = contactMetadata("sq");

export default function Page() {
  return <ContactView locale="sq" />;
}
