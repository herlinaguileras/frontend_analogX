import { Exploration } from "@/components/exploration";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ body?: string; region?: string }>;
}) {
  const params = await searchParams;
  const initialBody = params.body === "Moon" ? "Moon" : "Mars";
  return <Exploration initialBody={initialBody} initialRegionId={params.region} />;
}
