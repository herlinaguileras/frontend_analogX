"use client";

import { useState } from "react";
import Link from "next/link";
import { CelestialSphere } from "./celestial-sphere";
import { useLanguage } from "@/context/language-context";

export function MissionPortalCards() {
  const [hoveredPortal, setHoveredPortal] = useState<"moon" | "mars" | null>(null);
  const { isEn, t, lang } = (() => {
    const ctx = useLanguage();
    return { ...ctx, isEn: ctx.lang === "en" };
  })();

  return (
    <div className="landing-portals-grid">
      {/* =========================================================================
          TARJETA 1: LA LUNA (PROGRAMA ARTEMIS)
          ========================================================================= */}
      <div
        className={`landing-portal-card moon-theme ${hoveredPortal === "moon" ? "card-hovered" : ""}`}
        onMouseEnter={() => setHoveredPortal("moon")}
        onMouseLeave={() => setHoveredPortal(null)}
      >
        <div className="card-topline">
          <span className="mission-badge moon-badge">
            <span className="badge-dot" />
            {t("portals.moon_badge", "PROGRAMA ARTEMIS")}
          </span>
          <span className="card-code">MOON-TRK // POLO SUR</span>
        </div>

        <div className="card-header-clean">
          <h3 className="portal-title">{t("portals.moon_title", "La Luna")}</h3>
          <span className="portal-subtitle">{t("portals.moon_sub", "Base Lunar Permanente & Trampas Frías")}</span>
        </div>

        {/* Esfera 3D interactiva de la Luna */}
        <div className="celestial-display-area">
          <CelestialSphere body="moon" size={230} isHovered={hoveredPortal === "moon"} />
        </div>

        {/* Chips de características científicas clave */}
        <div className="portal-tags-row">
          <span className="portal-tag">{isEn ? "PSR Ice Traps" : "Trampas de Hielo PSR"}</span>
          <span className="portal-tag">{isEn ? "Marius Lava Tubes" : "Tubos de Lava Marius"}</span>
          <span className="portal-tag">{isEn ? "Ilmenite ISRU" : "ISRU Ilmenita"}</span>
        </div>

        <div className="card-actions-row">
          <Link href="/explore?body=Moon" className="portal-launch-btn moon-launch">
            <span>{t("portals.moon_btn", "ABRIR EXPLORADOR LUNAR")}</span>
            <span className="launch-arrow">→</span>
          </Link>
          <span className="hint-text">{t("portals.moon_analogs", "Análogos: Lípez · Licancabur · McMurdo · Lanzarote")}</span>
        </div>
      </div>

      {/* =========================================================================
          TARJETA 2: MARTE (MISIÓN PLANETARIA)
          ========================================================================= */}
      <div
        className={`landing-portal-card mars-theme ${hoveredPortal === "mars" ? "card-hovered" : ""}`}
        onMouseEnter={() => setHoveredPortal("mars")}
        onMouseLeave={() => setHoveredPortal(null)}
      >
        <div className="card-topline">
          <span className="mission-badge mars-badge">
            <span className="badge-dot" />
            {t("portals.mars_badge", "EXPLORACIÓN PLANETARIA")}
          </span>
          <span className="card-code">MARS-TRK // ERIDANIA</span>
        </div>

        <div className="card-header-clean">
          <h3 className="portal-title">{t("portals.mars_title", "Planeta Marte")}</h3>
          <span className="portal-subtitle">{t("portals.mars_sub", "Paleocuencas & Terradinámica de Rovers")}</span>
        </div>

        {/* Esfera 3D interactiva de Marte */}
        <div className="celestial-display-area">
          <CelestialSphere body="mars" size={230} isHovered={hoveredPortal === "mars"} />
        </div>

        {/* Chips de características científicas clave */}
        <div className="portal-tags-row">
          <span className="portal-tag">{isEn ? "Jezero Lake Deltas" : "Deltas Lacustres Jezero"}</span>
          <span className="portal-tag">{isEn ? "Sulfate Traction" : "Tracción en Sulfatos"}</span>
          <span className="portal-tag">{isEn ? "Hydric Extraction" : "Extracción Hídrica"}</span>
        </div>

        <div className="card-actions-row">
          <Link href="/explore?body=Mars" className="portal-launch-btn mars-launch">
            <span>{t("portals.mars_btn", "ABRIR EXPLORADOR MARCIANO")}</span>
            <span className="launch-arrow">→</span>
          </Link>
          <span className="hint-text">{t("portals.mars_analogs", "Análogos: Uyuni · Sol de Mañana · Atacama · Haughton")}</span>
        </div>
      </div>
    </div>
  );
}

