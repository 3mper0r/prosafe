import { FindYourProtectionView, findYourProtectionMetadata } from "@/views/find-your-protection";

export const metadata = findYourProtectionMetadata("en");

export default async function Page({ searchParams }: PageProps<"/en/find-your-protection">) {
  return <FindYourProtectionView locale="en" searchParams={await searchParams} />;
}
