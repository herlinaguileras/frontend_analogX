"use client";

import { BloomCelestialGlobe } from "./bloom-celestial-globe";
import type { SupportedLang } from "@/lib/translations";

interface BloomHeroFilterProps {
  body: "Moon" | "Mars";
  roleFilter: string;
  onRoleFilterChange: (val: string) => void;
  conditionFilter: string;
  onConditionFilterChange: (val: string) => void;
  environmentFilter: string;
  onEnvironmentFilterChange: (val: string) => void;
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
  conditionFilter,
  onConditionFilterChange,
  environmentFilter,
  onEnvironmentFilterChange,
  matchCount,
  avgScore,
  onApplyFilters,
  lang,
  onToggleLang,
}: BloomHeroFilterProps) {
  const isMoon = body === "Moon";
  const isEn = lang === "en";

  const handleQuickTag = (role: string, condition?: string) => {
    onRoleFilterChange(role);
    if (condition) onConditionFilterChange(condition);
  };

  return (
    <section className="bloom-explore-hero">
      {/* 3D Rotating NASA Celestial Body in Background */}
      <BloomCelestialGlobe body={body} />

      {/* Top Navigation */}
      <header className="bloom-hero-nav">
        {/* Left: Technical System Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
            <span style={{ fontSize: "1rem" }}>🌐</span>
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
              {isEn
                ? "Apply mission, terrain geology, and extreme environment filters to discover Earth regions with maximum analytical fidelity."
                : "Aplica los filtros de misión, geología del terreno y entorno extremo para descubrir regiones de la Tierra con máxima fidelidad analítica."}
            </p>
          </div>

          {/* Form Filter Fields */}
          <div className="bloom-filter-group">
            {/* Filter 1: Operational Mission Role */}
            <div className="bloom-filter-field">
              <label className="bloom-field-label">
                {isEn ? "01 · Mission Objective & Operational Use" : "01 · Objetivo de Misión & Uso Operativo"}
              </label>
              <select
                className="bloom-select"
                value={roleFilter}
                onChange={(e) => onRoleFilterChange(e.target.value)}
              >
                <option value="all">
                  {isEn ? "All operational objectives" : "Todos los objetivos operacionales"}
                </option>
                <option value="landing">
                  {isEn
                    ? "Safe Landing Sites & Terrain Relative Navigation (TRN)"
                    : "Sitios de Aterrizaje y Navegación Óptica Guiada (TRN)"}
                </option>
                <option value="base">
                  {isEn
                    ? "Permanent Base Siting & Human Habitats"
                    : "Emplazamiento de Base Permanente y Hábitats Humanos"}
                </option>
                <option value="isru">
                  {isEn
                    ? "In-Situ Resource Utilization (ISRU: Water Ice, Minerals, Oxygen)"
                    : "Extracción de Recursos In-Situ (ISRU: Hielo, Minerales, Oxígeno)"}
                </option>
                <option value="caves">
                  {isEn
                    ? "Lava Tube Shelters & Cosmic Radiation Shielding"
                    : "Refugio en Tubos de Lava y Blindaje contra Radiación Cósmica"}
                </option>
                <option value="mobility">
                  {isEn
                    ? "Wheel Terradynamics & Rover Mobility"
                    : "Terradinámica de Ruedas y Movilidad de Rovers"}
                </option>
                <option value="astrobiology">
                  {isEn
                    ? "Astrobiology & Extremophile Habitability Limits"
                    : "Astrobiología y Límite de Habitabilidad en Extremofilia"}
                </option>
              </select>
            </div>

            {/* Filter 2: Physical / Environmental Condition */}
            <div className="bloom-filter-field">
              <label className="bloom-field-label">
                {isEn
                  ? "02 · Physical-Environmental & Geological Condition"
                  : "02 · Condición Físico-Ambiental & Geológica"}
              </label>
              <select
                className="bloom-select"
                value={conditionFilter}
                onChange={(e) => onConditionFilterChange(e.target.value)}
              >
                <option value="all">
                  {isEn ? "All geological conditions" : "Todas las condiciones geológicas"}
                </option>
                <option value="regolith">
                  {isEn
                    ? "Basaltic Regolith, Salt Crusts & Rocky Terrain"
                    : "Regolito Basáltico, Costras Salinas y Terreno Rocoso"}
                </option>
                <option value="cryogenic">
                  {isEn
                    ? "Extreme Cryogenic Cold & Fossil Ice Traps"
                    : "Frío Criogénico Extremo y Trampas de Hielo Fósil"}
                </option>
                <option value="hyperarid">
                  {isEn
                    ? "Hyperaridity, Aeolian Dust & Severe Desiccation"
                    : "Hiperaridez, Polvo Eólico y Desecación Severa"}
                </option>
                <option value="radiation">
                  {isEn
                    ? "Sterilizing UV Radiation & Cosmic Rays (GCR/SPE)"
                    : "Radiación UV Esterilizante y Rayos Cósmicos (GCR/SPE)"}
                </option>
                <option value="sulfate">
                  {isEn
                    ? "Saline Paleolakes, Sulfates & Hydrothermal Alteration"
                    : "Paleocuencas Salinas, Sulfatos y Alteración Hidrotermal"}
                </option>
              </select>
            </div>

            {/* Filter 3: Earth Realm */}
            <div className="bloom-filter-field">
              <label className="bloom-field-label">
                {isEn ? "03 · Geographic Scope or Earth Realm" : "03 · Ámbito o Entorno Terrestre"}
              </label>
              <select
                className="bloom-select"
                value={environmentFilter}
                onChange={(e) => onEnvironmentFilterChange(e.target.value)}
              >
                <option value="all">
                  {isEn ? "Global (All audited analogs)" : "Global (Todos los análogos auditados)"}
                </option>
                <option value="altiplano">
                  {isEn
                    ? "High-Altitude Andean Altiplano (Bolivia / Chile >3,600 m)"
                    : "Altiplano Andino de Gran Altitud (Bolivia / Chile >3,600 msnm)"}
                </option>
                <option value="hyperarid">
                  {isEn
                    ? "Hyperarid Deserts (Atacama Yungay)"
                    : "Desiertos Hiperáridos (Atacama Yungay)"}
                </option>
                <option value="polar">
                  {isEn
                    ? "Polar & Cryogenic Regions (Antarctica McMurdo / Arctic)"
                    : "Regiones Polares y Criogénicas (Antártida McMurdo / Ártico)"}
                </option>
                <option value="volcanic">
                  {isEn
                    ? "Volcanic Fields & Basaltic Tubes (Lanzarote / Lípez)"
                    : "Campos Volcánicos y Tubos Basálticos (Lanzarote / Lípez)"}
                </option>
              </select>
            </div>
          </div>

          {/* Quick Filter Recommendation Pills */}
          <div className="bloom-quick-tags">
            <span
              style={{
                fontSize: "0.6875rem",
                color: "rgba(255,255,255,0.45)",
                alignSelf: "center",
                marginRight: "0.25rem",
              }}
            >
              {isEn ? "Quick filter:" : "Filtro rápido:"}
            </span>
            <button
              type="button"
              className={`bloom-quick-pill ${roleFilter === "landing" ? "active" : ""}`}
              onClick={() => handleQuickTag("landing")}
            >
              {isEn ? "Safe Landing" : "Aterrizaje Seguro"}
            </button>
            <button
              type="button"
              className={`bloom-quick-pill ${roleFilter === "base" ? "active" : ""}`}
              onClick={() => handleQuickTag("base", "regolith")}
            >
              {isEn ? "Permanent Base" : "Base Permanente"}
            </button>
            <button
              type="button"
              className={`bloom-quick-pill ${roleFilter === "isru" ? "active" : ""}`}
              onClick={() => handleQuickTag("isru", "cryogenic")}
            >
              {isEn ? "ISRU Mining" : "Extracción ISRU"}
            </button>
            <button
              type="button"
              className={`bloom-quick-pill ${roleFilter === "caves" ? "active" : ""}`}
              onClick={() => handleQuickTag("caves", "radiation")}
            >
              {isEn ? "Lava Tubes" : "Tubos de Lava"}
            </button>
            <button
              type="button"
              className={`bloom-quick-pill ${roleFilter === "mobility" ? "active" : ""}`}
              onClick={() => handleQuickTag("mobility", "regolith")}
            >
              {isEn ? "Rover Wheels" : "Ruedas de Rover"}
            </button>
          </div>

          {/* Counter Banner */}
          <div className="bloom-counter-row">
            <div>
              <span className="bloom-counter-dot" />
              <strong>{matchCount}</strong>{" "}
              {matchCount === 1
                ? isEn
                  ? "compatible analog found"
                  : "análogo compatible encontrado"
                : isEn
                ? "compatible analogs found"
                : "análogos compatibles encontrados"}
            </div>
            <div style={{ fontFamily: "var(--font-mono, monospace)" }}>
              {isEn ? "Average fidelity:" : "Fidelidad promedio:"} <strong>{avgScore}%</strong>
            </div>
          </div>

          {/* Strong Primary Action Button */}
          <button type="button" className="bloom-cta-btn" onClick={onApplyFilters}>
            <span>
              {isEn ? "APPLY FILTERS & ANALYZE ANALOGS" : "APLICAR FILTROS Y ANALIZAR ANÁLOGOS"}
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
              ? "Identifying the untapped potential of the Altiplano and extreme Earth environments."
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
