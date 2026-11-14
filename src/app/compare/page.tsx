import { Exploration } from "@/components/exploration";
import { studyRegions } from "@/lib/study-catalog";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ region?: string; body?: string }> }) {
  const params = await searchParams;
  const region = studyRegions.find(item => item.id === params.region) ?? studyRegions[0]!;
  return <Exploration mode="compare" initialRegionId={region.id} initialBody={params.body === "Moon" ? "Moon" : "Mars"} />;
}
