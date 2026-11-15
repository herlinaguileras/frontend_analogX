"use client";

import { useEffect, useMemo, useState } from "react";
import { getSpaceProfile, scienceDossierList } from "@/lib/analog-science-dossier";
import { useLanguage } from "@/context/language-context";
import { BloomHeroFilter } from "./bloom-hero-filter";
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

  // Single coherent operational mission filter (tailored to Moon or Mars)
  const [roleFilter, setRoleFilter] = useState<string>("landing");
  // Scroll is strictly locked until user clicks "Aplicar filtro"
  const [filtersApplied, setFiltersApplied] = useState<boolean>(Boolean(initialMatchedRegion));
  const [selectedAnalogId, setSelectedAnalogId] = useState<string | null>(
    initialMatchedRegion?.id ?? null
  );

  // Lock scrolling when filters haven't been applied
  useEffect(() => {
    if (!filtersApplied) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [filtersApplied]);

  // Filter analogs based on active planetary body and mission objective
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

        return true;
      })
      .sort((a, b) => b.fidelityScore - a.fidelityScore);
  }, [body, roleFilter]);

  // Active analog for comparison and technical dossier
  const activeAnalog = useMemo(() => {
    if (filteredAnalogs.length === 0) return null;
    if (selectedAnalogId) {
      const match = filteredAnalogs.find((item) => item.id === selectedAnalogId);
      if (match) return match;
    }
    return filteredAnalogs[0] ?? null;
  }, [filteredAnalogs, selectedAnalogId]);

  const avgScore = useMemo(() => {
    if (filteredAnalogs.length === 0) return 0;
    const sum = filteredAnalogs.reduce((acc, curr) => acc + curr.fidelityScore, 0);
    return Math.round(sum / filteredAnalogs.length);
  }, [filteredAnalogs]);

  const scrollToComparison = () => {
    setTimeout(() => {
      const el = document.getElementById("analisis-analogos");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  const handleApplyFilters = () => {
    setFiltersApplied(true);
    scrollToComparison();
  };

  return (
    <main
      className="bloom-exploration-page"
      style={{
        background: "#050609",
        color: "#fff",
        height: !filtersApplied ? "100vh" : "auto",
        overflow: !filtersApplied ? "hidden" : "visible",
      }}
    >
      {/* 1. Fullscreen Hero with 3D Rotating Globe, Active Mission Badge, Translator & Filter Modal */}
      <BloomHeroFilter
        body={body}
        roleFilter={roleFilter}
        onRoleFilterChange={(val) => {
          setRoleFilter(val);
          setSelectedAnalogId(null);
        }}
        matchCount={filteredAnalogs.length}
        avgScore={avgScore}
        onApplyFilters={handleApplyFilters}
        lang={lang}
        onToggleLang={toggleLang}
      />

      {/* 2. Content below is unlocked ONLY when user clicks "APLICAR FILTRO Y ANALIZAR ANÁLOGOS" */}
      {filtersApplied && (
        <>
          {/* Side-by-Side Geology & Climate Comparison (Filtered specifically to selected objective) */}
          <BloomGeologyComparison
            analogs={filteredAnalogs}
            activeAnalog={activeAnalog}
            onSelectAnalog={setSelectedAnalogId}
            body={body}
            roleFilter={roleFilter}
            lang={lang}
          />

          {/* Official Scientific Qualification Dossier (Exclusive to the selected/active analog) */}
          <BloomOfficialReport
            analogs={filteredAnalogs}
            activeAnalog={activeAnalog}
            onSelectAnalog={setSelectedAnalogId}
            body={body}
            roleFilter={roleFilter}
            lang={lang}
          />
        </>
      )}
    </main>
  );
}
