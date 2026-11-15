import type { Metadata } from "next";
import { fetchFindings } from "@/lib/api";
import { FindingsContent } from "./findings-content";

export const metadata: Metadata = {
  title: "Hallazgos y Evidencias",
  description: "Bitácora científica y evidencias consolidadas de auditoría científica.",
};

export default async function FindingsPage() {
  const findings = await fetchFindings();
  return <FindingsContent findings={findings} />;
}
