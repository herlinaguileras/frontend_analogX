import type { Metadata } from "next";
import { BloomExplorationView } from "@/components/bloom-exploration-view";

export const metadata: Metadata = {
  title: "Explorador Científico",
  description: "Explora la correlación geológica, mineralógica y ambiental entre análogos terrestres y objetivos lunares o marcianos.",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ body?: string; region?: string }>;
}) {
  const params = await searchParams;
  const initialBody = params.body === "Moon" ? "Moon" : "Mars";
  return <BloomExplorationView initialBody={initialBody} initialRegionId={params.region} />;
}

