import { IndustryDetailView, industryDetailMetadata, industryStaticParams } from "@/views/industry-detail";

type Props = PageProps<"/industries/[slug]">;

export function generateStaticParams() {
  return industryStaticParams();
}

export async function generateMetadata({ params }: Props) {
  return industryDetailMetadata("sq", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <IndustryDetailView locale="sq" slug={(await params).slug} />;
}
