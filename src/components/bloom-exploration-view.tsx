"use client";

import { useMemo, useState } from "react";
import { getSpaceProfile, scienceDossierList } from "@/lib/analog-science-dossier";
import type { SupportedLang } from "@/lib/translations";
import { BloomHeroFilter } from "./bloom-hero-filter";
import { DualWorldComparator } from "./dual-world-comparator";
import { BloomGeologyComparison } from "./bloom-geology-comparison";
import { BloomOfficialReport } from "./bloom-official-report";

interface BloomExplorationViewProps {
  initialBody?: "Moon" | "Mars" | undefined;
  initialRegionId?: string | undefined;
}

export function BloomExplorationView({
  initialBody = "Moon",
  initialRegionId,
}: BloomExplorationViewProps) {
  // Body is strictly fixed to initialBody (to switch, user must return to home)
  const body: "Moon" | "Mars" = initialBody;

  // Language state (default Spanish, switchable to English with one click)
  const [lang, setLang] = useState<SupportedLang>("es");

  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");

  // Filter analogs based on selections
  const filteredAnalogs = useMemo(() => {
    return scienceDossierList
      .filter((item) => {
        // Target body match: must have a specific profile for this body (Moon or Mars)
        const profile = getSpaceProfile(item, body);
        if (!profile) return false;

        // Operational role filter
        if (roleFilter !== "all" && !item.operationalRoles.includes(roleFilter)) {
          return false;
        }

        // Physical condition filter
        if (conditionFilter !== "all" && !item.physicalConditions.includes(conditionFilter)) {
          return false;
        }

        // Environment type filter
        if (environmentFilter !== "all" && item.environmentType !== environmentFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.fidelityScore - a.fidelityScore);
  }, [body, roleFilter, conditionFilter, environmentFilter]);

  const avgScore = useMemo(() => {
    if (filteredAnalogs.length === 0) return 0;
    const sum = filteredAnalogs.reduce((acc, curr) => acc + curr.fidelityScore, 0);
    return Math.round(sum / filteredAnalogs.length);
  }, [filteredAnalogs]);

  const handleApplyFilters = () => {
    const el = document.getElementById("analisis-analogos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setRoleFilter("all");
    setConditionFilter("all");
    setEnvironmentFilter("all");
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <main className="bloom-exploration-page" style={{ background: "#050609", color: "#fff" }}>
      {/* 1. Fullscreen Hero with 3D Rotating Globe, Active Mission Badge, Translator & Liquid Glass Modal */}
      <BloomHeroFilter
        body={body}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        conditionFilter={conditionFilter}
        onConditionFilterChange={setConditionFilter}
        environmentFilter={environmentFilter}
        onEnvironmentFilterChange={setEnvironmentFilter}
        matchCount={filteredAnalogs.length}
        avgScore={avgScore}
        onApplyFilters={handleApplyFilters}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* 2. Interactive 1:1 Dual-World Terrain Comparator (Split Scrubber) */}
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 2rem" }}>
        <DualWorldComparator
          targetBody={body}
          initialPresetId={body === "Mars" ? "jezero-atacama" : "shackleton-mcmurdo"}
          lang={lang}
        />
      </div>

      {/* 3. Side-by-Side Geology Comparison & Deep Dive Scientific Analysis */}
      <BloomGeologyComparison
        analogs={filteredAnalogs}
        body={body}
        roleFilter={roleFilter}
        conditionFilter={conditionFilter}
        environmentFilter={environmentFilter}
        onResetFilters={handleResetFilters}
        lang={lang}
      />

      {/* 3. Official NASA Space Apps Qualification Dossier & Printable Report */}
      <BloomOfficialReport analogs={filteredAnalogs} body={body} lang={lang} />
    </main>
  );
}
