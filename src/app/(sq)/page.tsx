import { HomeView, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("sq");

export default function Page() {
  return <HomeView locale="sq" />;
}
