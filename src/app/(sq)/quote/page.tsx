import { QuoteView, quoteMetadata } from "@/views/quote";

export const metadata = quoteMetadata("sq");

export default function Page() {
  return <QuoteView locale="sq" />;
}
