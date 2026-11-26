import { NotFoundView, notFoundMetadata } from "@/views/not-found";

export const metadata = notFoundMetadata("sq");

export default function NotFound() {
  return <NotFoundView locale="sq" />;
}
