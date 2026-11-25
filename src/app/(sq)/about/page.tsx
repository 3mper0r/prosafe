import { AboutView, aboutMetadata } from "@/views/about";

export const metadata = aboutMetadata("sq");

export default function Page() {
  return <AboutView locale="sq" />;
}
