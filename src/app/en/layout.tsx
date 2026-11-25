import type { ReactNode } from "react";
import { RootDocument, rootMetadata, rootViewport } from "../root-document";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnglishRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
