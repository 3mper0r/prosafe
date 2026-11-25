import { RootDocument, rootMetadata, rootViewport } from "../root-document";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function RootLayout({ children }: LayoutProps<"/en">) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
