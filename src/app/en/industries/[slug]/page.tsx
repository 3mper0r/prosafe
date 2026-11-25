import { IndustryDetailView, industryDetailMetadata, industryStaticParams } from "@/views/industry-detail";

type Props = PageProps<"/en/industries/[slug]">;

export function generateStaticParams() {
  return industryStaticParams();
}

export async function generateMetadata({ params }: Props) {
  return industryDetailMetadata((await params).slug);
}

export default async function Page({ params }: Props) {
  return <IndustryDetailView locale="en" slug={(await params).slug} />;
}
