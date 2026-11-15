import { BloomExplorationView } from "@/components/bloom-exploration-view";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ body?: string; region?: string }>;
}) {
  const params = await searchParams;
  const initialBody = params.body === "Moon" ? "Moon" : "Mars";
  return <BloomExplorationView initialBody={initialBody} initialRegionId={params.region} />;
}

