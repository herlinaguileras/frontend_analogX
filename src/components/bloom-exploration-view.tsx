"use client";

import { useMemo, useState } from "react";
import { getSpaceProfile, scienceDossierList } from "@/lib/analog-science-dossier";
import { useLanguage } from "@/context/language-context";
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

  const initialMatchedRegion = initialRegionId
    ? scienceDossierList.find(
        (item) => item.id === initialRegionId && Boolean(getSpaceProfile(item, body))
      )
    : undefined;

  // Global synchronized language state
  const { lang, toggleLang } = useLanguage();

  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [environmentFilter, setEnvironmentFilter] = useState<string>("all");
  const [filtersApplied, setFiltersApplied] = useState<boolean>(Boolean(initialMatchedRegion));
  const [selectedAnalogId, setSelectedAnalogId] = useState<string | null>(
    initialMatchedRegion?.id ?? null
  );

  const hasActiveFilters =
    roleFilter !== "all" || conditionFilter !== "all" || environmentFilter !== "all";
  const showResults = filtersApplied || hasActiveFilters;

  const bodyAnalogsCount = useMemo(() => {
    return scienceDossierList.filter((item) => Boolean(getSpaceProfile(item, body))).length;
  }, [body]);

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

  // Show only one selected analog comparison at a time among filtered results
  const activeAnalog = useMemo(() => {
    if (!showResults || filteredAnalogs.length === 0) return null;
    if (selectedAnalogId) {
      const match = filteredAnalogs.find((item) => item.id === selectedAnalogId);
      if (match) return match;
    }
    return filteredAnalogs[0] ?? null;
  }, [showResults, filteredAnalogs, selectedAnalogId]);

  const avgScore = useMemo(() => {
    if (filteredAnalogs.length === 0) return 0;
    const sum = filteredAnalogs.reduce((acc, curr) => acc + curr.fidelityScore, 0);
    return Math.round(sum / filteredAnalogs.length);
  }, [filteredAnalogs]);

  const scrollToComparison = () => {
    const el = document.getElementById("analisis-analogos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleApplyFilters = () => {
    setFiltersApplied(true);
    scrollToComparison();
  };

  const handleQuickFilter = (role: string) => {
    setRoleFilter(role);
    setConditionFilter("all");
    setEnvironmentFilter("all");
    setSelectedAnalogId(null);
    setFiltersApplied(true);
  };

  const handleResetFilters = () => {
    setRoleFilter("all");
    setConditionFilter("all");
    setEnvironmentFilter("all");
    setFiltersApplied(false);
    setSelectedAnalogId(null);
  };

  return (
    <main className="bloom-exploration-page" style={{ background: "#050609", color: "#fff" }}>
      {/* 1. Fullscreen Hero with 3D Rotating Globe, Active Mission Badge, Translator & Liquid Glass Modal */}
      <BloomHeroFilter
        body={body}
        roleFilter={roleFilter}
        onRoleFilterChange={(val) => {
          setRoleFilter(val);
          setSelectedAnalogId(null);
        }}
        conditionFilter={conditionFilter}
        onConditionFilterChange={(val) => {
          setConditionFilter(val);
          setSelectedAnalogId(null);
        }}
        environmentFilter={environmentFilter}
        onEnvironmentFilterChange={(val) => {
          setEnvironmentFilter(val);
          setSelectedAnalogId(null);
        }}
        onQuickFilter={handleQuickFilter}
        matchCount={filteredAnalogs.length}
        avgScore={avgScore}
        onApplyFilters={handleApplyFilters}
        lang={lang}
        onToggleLang={toggleLang}
      />

      {/* 2. Interactive 1:1 Dual-World Terrain Comparator (Split Scrubber) */}
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 2rem" }}>
        <DualWorldComparator
          targetBody={body}
          initialPresetId={body === "Mars" ? "jezero-atacama" : "shackleton-mcmurdo"}
          lang={lang}
        />
      </div>

      {/* 3. Side-by-Side Geology & Climate Comparison (Filtered, One Analog at a Time) */}
      <BloomGeologyComparison
        analogs={filteredAnalogs}
        activeAnalog={activeAnalog}
        onSelectAnalog={setSelectedAnalogId}
        hasAppliedFilters={showResults}
        totalBodyCount={bodyAnalogsCount}
        onApplyFilters={handleApplyFilters}
        onQuickFilter={(role) => {
          handleQuickFilter(role);
          scrollToComparison();
        }}
        body={body}
        roleFilter={roleFilter}
        conditionFilter={conditionFilter}
        environmentFilter={environmentFilter}
        onResetFilters={handleResetFilters}
        lang={lang}
      />

      {/* 3. Official NASA Space Apps Qualification Dossier & Printable Report (Only shown after filtering) */}
      {showResults && filteredAnalogs.length > 0 && (
        <BloomOfficialReport
          analogs={filteredAnalogs}
          activeAnalogId={activeAnalog?.id ?? null}
          onSelectAnalog={(id) => {
            setSelectedAnalogId(id);
            scrollToComparison();
          }}
          body={body}
          lang={lang}
        />
      )}
    </main>
  );
}
