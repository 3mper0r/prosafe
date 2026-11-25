import type { ReactNode } from "react";
import { RootDocument, rootMetadata, rootViewport } from "../root-document";

export const metadata = rootMetadata("sq");
export const viewport = rootViewport;

export default function AlbanianRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RootDocument locale="sq">{children}</RootDocument>;
}
