import { SiteChrome } from "@/views/site-chrome";

export default function Layout({ children }: LayoutProps<"/en/industries">) {
  return <SiteChrome locale="en">{children}</SiteChrome>;
}
