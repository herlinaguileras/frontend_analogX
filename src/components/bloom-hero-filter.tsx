"use client";

import Link from "next/link";
import { BloomCelestialGlobe } from "./bloom-celestial-globe";
import type { SupportedLang } from "@/lib/translations";

interface BloomHeroFilterProps {
  body: "Moon" | "Mars";
  roleFilter: string;
  onRoleFilterChange: (val: string) => void;
  matchCount: number;
  avgScore: number;
  onApplyFilters: () => void;
  lang: SupportedLang;
  onToggleLang: () => void;
}

export function BloomHeroFilter({
  body,
  roleFilter,
  onRoleFilterChange,
  matchCount,
  avgScore,
  onApplyFilters,
  lang,
  onToggleLang,
}: BloomHeroFilterProps) {
  const isMoon = body === "Moon";
  const isEn = lang === "en";

  return (
    <section className="bloom-explore-hero">
      {/* 3D Rotating NASA Celestial Body in Background */}
      <BloomCelestialGlobe body={body} />

      {/* Top Navigation */}
      <header className="bloom-hero-nav">
        {/* Left: Back to Home link (not "back to earth") */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/"
            className="bloom-nav-pill liquid-glass"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "9999px",
              fontSize: "0.8125rem",
              padding: "0.45rem 1rem",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
            }}
          >
            <span style={{ fontSize: "1rem" }}>←</span>
            <span>{isEn ? "Back to Home" : "Volver al Inicio"}</span>
          </Link>

          <div
            className="liquid-glass"
            style={{
              padding: "0.45rem 1rem",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {isEn ? "ANALOGX // PLANETARY FILTERING ENGINE" : "ANALOGX // MOTOR DE FILTRADO PLANETARIO"}
          </div>
        </div>

        {/* Center: Fixed Active Mission Badge (Non-switchable) */}
        <div
          className="liquid-glass"
          style={{
            padding: "0.45rem 1.25rem",
            borderRadius: "9999px",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            background: isMoon ? "rgba(65, 65, 252, 0.2)" : "rgba(239, 68, 68, 0.2)",
            border: isMoon ? "1px solid rgba(65, 65, 252, 0.45)" : "1px solid rgba(239, 68, 68, 0.45)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: isMoon ? "#8b8bfe" : "#fca5a5",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.05em",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isMoon ? "#8b8bfe" : "#f87171",
              boxShadow: isMoon ? "0 0 10px #8b8bfe" : "0 0 10px #f87171",
            }}
          />
          <span>
            {isMoon
              ? isEn
                ? "ACTIVE MISSION: THE MOON (ARTEMIS)"
                : "MISIÓN ACTIVA: LA LUNA (ARTEMIS)"
              : isEn
              ? "ACTIVE MISSION: PLANET MARS 2026"
              : "MISIÓN ACTIVA: PLANETA MARTE 2026"}
          </span>
        </div>

        {/* Right: Language Translator & NASA Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Bilingual Translator Button */}
          <button
            type="button"
            onClick={onToggleLang}
            className="bloom-nav-pill liquid-glass"
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              padding: "0.45rem 1rem",
              borderRadius: "9999px",
            }}
            title={isEn ? "Cambiar a Español" : "Translate to English"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                fontSize: "0.75rem",
                color: "#ffffff",
                letterSpacing: "0.05em",
              }}
            >
              {isEn ? "ESPAÑOL (ES)" : "ENGLISH (EN)"}
            </span>
          </button>

          <div
            className="liquid-glass"
            style={{
              padding: "0.45rem 0.85rem",
              fontSize: "0.6875rem",
              color: "#7fd579",
              letterSpacing: "0.06em",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            ● {isEn ? "OFFICIAL NASA CHALLENGE 2026" : "RETO OFICIAL NASA 2026"}
          </div>
        </div>
      </header>

      {/* Central Floating Filter Modal (Liquid Glass Strong) */}
      <div className="bloom-hero-content">
        <div className="bloom-filter-modal liquid-glass-strong">
          {/* Header */}
          <div className="bloom-filter-header">
            <span className="bloom-modal-badge">
              {isMoon
                ? isEn
                  ? "SCIENTIFIC TARGET: LUNAR SOUTH POLE & ARTEMIS BASES"
                  : "OBJETIVO CIENTÍFICO: POLO SUR LUNAR Y BASES ARTEMIS"
                : isEn
                ? "SCIENTIFIC TARGET: MARS SETTLEMENTS & ROVERS"
                : "OBJETIVO CIENTÍFICO: ASENTAMIENTOS Y ROVERS EN MARTE"}
            </span>
            <h1 className="bloom-modal-title">
              {isMoon
                ? isEn
                  ? "Discover Earth Analogs for the Moon"
                  : "Encuentra Análogos Terrestres para la Luna"
                : isEn
                ? "Discover Earth Analogs for Mars"
                : "Encuentra Análogos Terrestres para Marte"}
            </h1>
            <p className="bloom-modal-desc">
              {isMoon
                ? isEn
                  ? "Select your mission's operational objective on the Moon. AnalogX identifies and characterizes the optimal Earth analogs using audited satellite data."
                  : "Selecciona el objetivo operacional de tu misión en la Luna. AnalogX identificará y caracterizará los análogos terrestres óptimos mediante datos satelitales auditados."
                : isEn
                ? "Select your mission's operational objective on Mars. AnalogX identifies and characterizes the optimal Earth analogs using audited satellite data."
                : "Selecciona el objetivo operacional de tu misión en Marte. AnalogX identificará y caracterizará los análogos terrestres óptimos mediante datos satelitales auditados."}
            </p>
          </div>

          {/* Form Filter Field: Single, Coherent Operational Objective Dropdown */}
          <div className="bloom-filter-group">
            <div className="bloom-filter-field">
              <label className="bloom-field-label">
                {isEn
                  ? "01 · Operational Mission Objective"
                  : "01 · Objetivo de Misión & Uso Operativo"}
              </label>

              {isMoon ? (
                /* Moon Mission Objectives */
                <select
                  className="bloom-select"
                  value={roleFilter}
                  onChange={(e) => onRoleFilterChange(e.target.value)}
                >
                  <option value="all">
                    {isEn
                      ? "All lunar exploration objectives (Artemis)"
                      : "Todos los objetivos de exploración lunar (Artemis)"}
                  </option>
                  <option value="landing">
                    {isEn
                      ? "Safe Landing Sites & Altimeter Calibration (TRN / Laser Altimetry)"
                      : "Sitios de Aterrizaje y Calibración Altimétrica (TRN / Altimetría Láser)"}
                  </option>
                  <option value="base">
                    {isEn
                      ? "Permanent Lunar Base Siting & Cosmic Radiation Shielding"
                      : "Base Lunar Permanente y Blindaje contra Radiación Cósmica"}
                  </option>
                  <option value="isru">
                    {isEn
                      ? "Cryogenic Ice Traps & Volatiles Mining (Polar ISRU)"
                      : "Trampas de Hielo Criogénico y Minería de Volátiles (ISRU Polar)"}
                  </option>
                  <option value="caves">
                    {isEn
                      ? "Subterranean Exploration & Volcanic Skylights (Lava Tubes)"
                      : "Exploración Subterránea y Claraboyas Volcánicas (Tubos de Lava)"}
                  </option>
                  <option value="mobility">
                    {isEn
                      ? "Wheel Terradynamics & Lunar Rover Mobility"
                      : "Terradinámica de Ruedas y Movilidad de Rovers Lunares"}
                  </option>
                </select>
              ) : (
                /* Mars Mission Objectives */
                <select
                  className="bloom-select"
                  value={roleFilter}
                  onChange={(e) => onRoleFilterChange(e.target.value)}
                >
                  <option value="all">
                    {isEn
                      ? "All Martian exploration objectives"
                      : "Todos los objetivos de exploración marciana"}
                  </option>
                  <option value="landing">
                    {isEn
                      ? "Autonomous EDL Landing & Descent (Topography & Optical Navigation)"
                      : "Aterrizaje y Descenso Autónomo EDL (Topografía y Navegación Óptica)"}
                  </option>
                  <option value="astrobiology">
                    {isEn
                      ? "Astrobiology & Hydrothermal Silica (Biosignatures in Ancient Basins)"
                      : "Astrobiología y Sílice Hidrotermal (Biofirmas en Cuencas Antiguas)"}
                  </option>
                  <option value="isru">
                    {isEn
                      ? "Subsurface Ice Extraction & In-Situ Water Resources (ISRU)"
                      : "Hielo Subsuperficial y Recursos Hídricos ISRU"}
                  </option>
                  <option value="caves">
                    {isEn
                      ? "Subterranean Shelters & Martian Volcanic Cavities"
                      : "Refugios Subterráneos y Cavidades Volcánicas Marcianas"}
                  </option>
                  <option value="mobility">
                    {isEn
                      ? "Wheel Terradynamics in Aeolian Dunes & Soft Regolith"
                      : "Terradinámica en Dunas Eólicas y Suelos Blandos"}
                  </option>
                </select>
              )}
            </div>
          </div>

          {/* Dynamic Match Counter Banner */}
          <div className="bloom-counter-row">
            <div>
              <span className="bloom-counter-dot" />
              <strong>{matchCount}</strong>{" "}
              {matchCount === 1
                ? isEn
                  ? "Earth analog identified"
                  : "análogo terrestre descubierto"
                : isEn
                ? "Earth analogs identified"
                : "análogos terrestres descubiertos"}
            </div>
            <div style={{ fontFamily: "var(--font-mono, monospace)" }}>
              {isEn ? "Average fidelity:" : "Fidelidad promedio:"} <strong>{avgScore}%</strong>
            </div>
          </div>

          {/* Informational Context */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(255, 255, 255, 0.68)",
              margin: "0.2rem 0 0.75rem 0",
              lineHeight: "1.45",
              textAlign: "left",
            }}
          >
            {isMoon
              ? isEn
                ? "ℹ AnalogX correlates NASA LRO LOLA, Kaguya LALT, and Earth satellite data (ICESat, CryoSat-2, Sentinel) to pinpoint the matching Earth analog for your selected objective."
                : "ℹ AnalogX correlaciona datos de NASA LRO LOLA, Kaguya LALT y misiones satelitales terrestres (ICESat, CryoSat-2, Sentinel) para ubicar el análogo terrestre exacto según el objetivo seleccionado."
              : isEn
              ? "ℹ AnalogX correlates MRO HiRISE, CRISM, Mars Express, and Earth satellite data to pinpoint the matching Earth analog for your selected objective."
              : "ℹ AnalogX correlaciona datos de MRO HiRISE, CRISM, Mars Express y misiones satelitales terrestres para ubicar el análogo terrestre exacto según el objetivo seleccionado."}
          </p>

          {/* Strong Primary Action Button */}
          <button type="button" className="bloom-cta-btn" onClick={onApplyFilters}>
            <span>
              {isEn ? "APPLY FILTER & ANALYZE ANALOGS" : "APLICAR FILTRO Y ANALIZAR ANÁLOGOS"}
            </span>
            <span style={{ fontSize: "1.1rem" }}>↓</span>
          </button>
        </div>
      </div>

      {/* Hero Footer Quote */}
      <footer className="bloom-hero-footer">
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              letterSpacing: "0.1em",
              color: "#7fd579",
            }}
          >
            {isEn ? "NASA SPACE APPS CRITERION // SURPRISE US" : "CRITERIO NASA SPACE APPS // SURPRISE US"}
          </span>
          <span style={{ marginLeft: "1rem" }}>
            {isEn
              ? "Identifying the untapped potential of the Andean Altiplano and extreme Earth environments."
              : "Identificando el potencial inexplorado del Altiplano y regiones extremas terrestres."}
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-mono, monospace)" }}>
          ANALOGX SCIENTIFIC ENGINE v2.4
        </div>
      </footer>
    </section>
  );
}
