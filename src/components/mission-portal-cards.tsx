"use client";

import { useState } from "react";
import Link from "next/link";
import { CelestialSphere } from "./celestial-sphere";

export function MissionPortalCards() {
  const [hoveredPortal, setHoveredPortal] = useState<"moon" | "mars" | null>(null);

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
            PROGRAMA ARTEMIS
          </span>
          <span className="card-code">MOON-TRK // POLO SUR</span>
        </div>

        <div className="card-header-clean">
          <h3 className="portal-title">La Luna</h3>
          <span className="portal-subtitle">Base Lunar Permanente &amp; Trampas Frías</span>
        </div>

        {/* Esfera 3D interactiva de la Luna */}
        <div className="celestial-display-area">
          <CelestialSphere body="moon" size={230} isHovered={hoveredPortal === "moon"} />
        </div>

        {/* Chips de características científicas clave */}
        <div className="portal-tags-row">
          <span className="portal-tag">Trampas de Hielo PSR</span>
          <span className="portal-tag">Tubos de Lava Marius</span>
          <span className="portal-tag">ISRU Ilmenita</span>
        </div>

        <div className="card-actions-row">
          <Link href="/explore?body=Moon" className="portal-launch-btn moon-launch">
            <span>ABRIR EXPLORADOR LUNAR</span>
            <span className="launch-arrow">→</span>
          </Link>
          <span className="hint-text">Análogos: Lípez · Licancabur · McMurdo · Lanzarote</span>
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
            MISIÓN MARTE 2026
          </span>
          <span className="card-code">MARS-TRK // ERIDANIA</span>
        </div>

        <div className="card-header-clean">
          <h3 className="portal-title">Planeta Marte</h3>
          <span className="portal-subtitle">Paleocuencas &amp; Terradinámica de Rovers</span>
        </div>

        {/* Esfera 3D interactiva de Marte */}
        <div className="celestial-display-area">
          <CelestialSphere body="mars" size={230} isHovered={hoveredPortal === "mars"} />
        </div>

        {/* Chips de características científicas clave */}
        <div className="portal-tags-row">
          <span className="portal-tag">Deltas Lacustres Jezero</span>
          <span className="portal-tag">Tracción en Sulfatos</span>
          <span className="portal-tag">Extracción Hídrica</span>
        </div>

        <div className="card-actions-row">
          <Link href="/explore?body=Mars" className="portal-launch-btn mars-launch">
            <span>ABRIR EXPLORADOR MARCIANO</span>
            <span className="launch-arrow">→</span>
          </Link>
          <span className="hint-text">Análogos: Uyuni · Sol de Mañana · Atacama · Haughton</span>
        </div>
      </div>
    </div>
  );
}

