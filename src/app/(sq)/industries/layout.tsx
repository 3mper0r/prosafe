import { SiteChrome } from "@/views/site-chrome";

export default function Layout({ children }: LayoutProps<"/industries">) {
  return <SiteChrome locale="sq">{children}</SiteChrome>;
}
