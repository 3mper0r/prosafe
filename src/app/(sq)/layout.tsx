import { RootDocument, rootMetadata, rootViewport } from "../root-document";

export const metadata = rootMetadata("sq");
export const viewport = rootViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <RootDocument locale="sq">{children}</RootDocument>;
}
