import { FindYourProtectionView, findYourProtectionMetadata } from "@/views/find-your-protection";

export const metadata = findYourProtectionMetadata("sq");

export default async function Page({ searchParams }: PageProps<"/find-your-protection">) {
  return <FindYourProtectionView locale="sq" searchParams={await searchParams} />;
}
