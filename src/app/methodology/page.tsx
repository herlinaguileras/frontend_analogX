import type { Metadata } from "next";
import { MethodologyContent } from "./methodology-content";

export const metadata: Metadata = {
  title: "Metodología Científica",
  description: "El método AnalogX: evidencia científica antes que la semejanza visual.",
};

export default function MethodologyPage() {
  return <MethodologyContent />;
}
