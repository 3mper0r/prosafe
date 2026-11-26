import { SiteChrome } from "@/views/site-chrome";

export default function Layout({ children }: LayoutProps<"/products">) {
  return <SiteChrome locale="sq">{children}</SiteChrome>;
}
