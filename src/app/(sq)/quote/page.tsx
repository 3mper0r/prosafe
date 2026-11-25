import { QuoteView, quoteMetadata } from "@/views/quote";

export const metadata = quoteMetadata;

export default function Page() {
  return <QuoteView locale="sq" />;
}
