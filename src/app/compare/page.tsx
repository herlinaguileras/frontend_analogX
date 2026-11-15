import type { Metadata } from "next";
import { Exploration } from "@/components/exploration";
import { studyRegions } from "@/lib/study-catalog";

export const metadata: Metadata = {
  title: "Comparador de Terreno",
  description: "Comparativa instrumental y topográfica de análogos terrestres y objetivos extraterrestres.",
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ region?: string; body?: string }> }) {
  const params = await searchParams;
  const region = studyRegions.find(item => item.id === params.region) ?? studyRegions[0]!;
  return <Exploration mode="compare" initialRegionId={region.id} initialBody={params.body === "Moon" ? "Moon" : "Mars"} />;
}
