import { notFound } from "next/navigation";

/** Unmatched URLs in this language tree render the localized not-found page with HTTP 404. */
export default function MissingPage() {
  notFound();
}
