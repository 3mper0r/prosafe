import { SiteChrome } from "@/views/site-chrome";

export default function Layout({ children }: LayoutProps<"/en/products">) {
  return <SiteChrome locale="en">{children}</SiteChrome>;
}
