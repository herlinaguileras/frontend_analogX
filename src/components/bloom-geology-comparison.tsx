"use client";

import { getSpaceProfile, type GeologyComparisonItem } from "@/lib/analog-science-dossier";
import { analogTranslationsEn, type SupportedLang } from "@/lib/translations";
import { getClimateComparison } from "@/lib/climate-science-engine";

interface BloomGeologyComparisonProps {
  analogs: GeologyComparisonItem[];
  activeAnalog: GeologyComparisonItem | null;
  onSelectAnalog: (id: string) => void;
  hasAppliedFilters: boolean;
  totalBodyCount: number;
  onApplyFilters: () => void;
  onQuickFilter: (role: string) => void;
  body: "Moon" | "Mars";
  roleFilter: string;
  conditionFilter: string;
  environmentFilter: string;
  onResetFilters: () => void;
  lang: SupportedLang;
}

const ROLE_LABELS: Record<string, { es: string; en: string }> = {
  landing: { es: "Aterrizaje Seguro", en: "Safe Landing" },
  base: { es: "Base Permanente", en: "Permanent Base" },
  isru: { es: "Extracción ISRU", en: "ISRU Mining" },
  caves: { es: "Tubos de Lava", en: "Lava Tubes" },
  mobility: { es: "Ruedas de Rover", en: "Rover Wheels" },
  astrobiology: { es: "Astrobiología", en: "Astrobiology" },
};

const CONDITION_LABELS: Record<string, { es: string; en: string }> = {
  regolith: { es: "Regolito / Suelo", en: "Regolith / Soil" },
  cryogenic: { es: "Frío Criogénico", en: "Cryogenic Cold" },
  hyperarid: { es: "Hiperaridez Extrema", en: "Extreme Hyperaridity" },
  radiation: { es: "Radiación UV", en: "UV Radiation" },
  sulfate: { es: "Química Ácida", en: "Acid Chemistry" },
};

const ENVIRONMENT_LABELS: Record<string, { es: string; en: string }> = {
  altiplano: { es: "Altiplano (>3,600m)", en: "Altiplano (>3,600m)" },
  hyperarid: { es: "Desierto Hiperárido", en: "Hyperarid Desert" },
  polar: { es: "Desierto Polar", en: "Polar Desert" },
  volcanic: { es: "Cavidades Volcánicas", en: "Volcanic Cavities" },
};

const QUICK_PRESET_ROLES = ["landing", "base", "isru", "caves", "mobility"] as const;

export function BloomGeologyComparison({
  analogs,
  activeAnalog,
  onSelectAnalog,
  hasAppliedFilters,
  totalBodyCount,
  onApplyFilters,
  onQuickFilter,
  body,
  roleFilter,
  conditionFilter,
  environmentFilter,
  onResetFilters,
  lang,
}: BloomGeologyComparisonProps) {
  const isMoon = body === "Moon";
  const isEn = lang === "en";

  const activeIndex = activeAnalog
    ? analogs.findIndex((item) => item.id === activeAnalog.id)
    : -1;

  const handleStepAnalog = (delta: -1 | 1) => {
    if (analogs.length <= 1 || activeIndex < 0) return;
    const nextIndex = (activeIndex + delta + analogs.length) % analogs.length;
    const nextAnalog = analogs[nextIndex];
    if (nextAnalog) {
      onSelectAnalog(nextAnalog.id);
    }
  };

  const scrollToTopFilter = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderActiveCard = (item: GeologyComparisonItem) => {
    const spaceProfile = getSpaceProfile(item, body);
    if (!spaceProfile) return null;

    const trans = isEn ? analogTranslationsEn[item.id] : null;
    // Avoid overriding dedicated Moon/Mars profile text with single-body legacy EN copy
    const useLegacySpaceTrans = Boolean(
      trans && (item.missionTarget !== "Both" || spaceProfile.body === item.spaceTargetBody)
    );

    const earthImgTitle = trans?.earthImageTitle ?? item.earthImageTitle;
    const earthImgSubtitle = trans?.earthImageSubtitle ?? item.earthImageSubtitle;
    const earthGeologySummary = trans?.earthGeologySummary ?? item.earthGeologySummary;
    const earthMineralogy = trans?.earthMineralogy ?? item.earthMineralogy;

    const spaceTargetName = spaceProfile.targetName;
    const spaceImage = spaceProfile.image;
    const spaceImgTitle = useLegacySpaceTrans
      ? (trans?.spaceImageTitle ?? spaceProfile.imageTitle)
      : spaceProfile.imageTitle;
    const spaceImgSubtitle = useLegacySpaceTrans
      ? (trans?.spaceImageSubtitle ?? spaceProfile.imageSubtitle)
      : spaceProfile.imageSubtitle;
    const spaceCoords = spaceProfile.coordinates;
    const spaceGeologySummary = useLegacySpaceTrans
      ? (trans?.spaceGeologySummary ?? spaceProfile.geologySummary)
      : spaceProfile.geologySummary;
    const spaceMineralogy = useLegacySpaceTrans
      ? (trans?.spaceMineralogy ?? spaceProfile.mineralogy)
      : spaceProfile.mineralogy;

    const execSummary = trans?.executiveSummary ?? item.executiveSummary;
    const solidAnalogy = trans?.solidAnalogy ?? item.solidAnalogy;
    const analogyLimits = trans?.analogyLimitations ?? item.analogyLimitations;
    const operationalVal = trans?.operationalValue ?? item.operationalValue;
    const metrics = trans?.metrics ?? item.metrics;
    const climateData = getClimateComparison(item.id, body);

    return (
      <article key={item.id} className="bloom-analog-card liquid-glass-strong">
        {/* Card Top Header */}
        <div className="bloom-card-top">
          <div className="bloom-card-title-group">
            <h3>{item.name}</h3>
            <div className="bloom-card-location">
              <span>
                {item.country} · {item.region}
              </span>
              <span style={{ margin: "0 0.5rem" }}>•</span>
              <span style={{ fontFamily: "var(--font-mono, monospace)", color: "#8b8bfe" }}>
                {item.elevation}
              </span>
            </div>
          </div>

          {/* Scientific Fidelity Badge */}
          <div className="bloom-fidelity-badge">
            <div className="bloom-fidelity-score">{item.fidelityScore}%</div>
            <div className="bloom-fidelity-bar">
              <div
                className="bloom-fidelity-fill"
                style={{ width: `${item.fidelityScore}%` }}
              />
            </div>
            <span
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono, monospace)",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              {isEn ? "NASA ANALYTICAL FIDELITY" : "FIDELIDAD ANALÍTICA NASA"}
            </span>
          </div>
        </div>

        {/* SIDE-BY-SIDE GEOLOGY IMAGE COMPARISON */}
        <div className="bloom-geology-comparison-grid">
          {/* Left Column: Earth Geology */}
          <div className="bloom-geology-column liquid-glass">
            <span className="bloom-geology-tag earth">
              {isEn ? "🌍 Earth Geology · " : "🌍 Geología Terrestre · "}
              {item.name}
            </span>

            <div className="bloom-geology-image-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.earthImage}
                alt={isEn ? `Earth geology of ${item.name}` : `Geología de ${item.name}`}
                loading="lazy"
              />
            </div>

            <div className="bloom-geology-info">
              <h4>{earthImgTitle}</h4>
              <div className="bloom-geology-subtitle">{earthImgSubtitle}</div>
              <p className="bloom-geology-text">{earthGeologySummary}</p>
            </div>

            <div className="bloom-mineral-box">
              <strong style={{ color: "#7fd579" }}>
                {isEn ? "Minerals & Substrate: " : "Minerales & Sustrato: "}
              </strong>
              {earthMineralogy}
            </div>
          </div>

          {/* Right Column: Space Target Geology (Moon or Mars) */}
          <div className="bloom-geology-column liquid-glass">
            <span className="bloom-geology-tag space">
              {isMoon
                ? isEn
                  ? "🌕 Lunar Geology · "
                  : "🌕 Geología Lunar · "
                : isEn
                ? "🪐 Martian Geology · "
                : "🪐 Geología Marciana · "}
              {spaceTargetName}
            </span>

            <div className="bloom-geology-image-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={spaceImage}
                alt={
                  isEn
                    ? `Planetary geology of ${spaceTargetName}`
                    : `Geología espacial de ${spaceTargetName}`
                }
                loading="lazy"
              />
            </div>

            <div className="bloom-geology-info">
              <h4>{spaceImgTitle}</h4>
              <div className="bloom-geology-subtitle">
                {spaceImgSubtitle} ({spaceCoords})
              </div>
              <p className="bloom-geology-text">{spaceGeologySummary}</p>
            </div>

            <div className="bloom-mineral-box">
              <strong style={{ color: "#8b8bfe" }}>
                {isEn ? "Space Minerals: " : "Minerales Espaciales: "}
              </strong>
              {spaceMineralogy}
            </div>
          </div>
        </div>

        {/* 02. MODULO DE EVALUACIÓN CLIMÁTICA, TÉRMICA Y AMBIENTE EXTREMO */}
        <div className="bloom-climate-panel liquid-glass">
          <div className="bloom-climate-header">
            <div className="bloom-climate-badge">
              <span>🌡️ {isEn ? "ATMOSPHERIC & CLIMATE ANALYSIS MATRIX" : "MATRIZ DE ANÁLISIS CLIMÁTICO Y ATMOSFÉRICO"}</span>
              <span className="fidelity-dot" />
              <span>{climateData.space.climateFidelityRating} {isEn ? "FIDELITY" : "COMPATIBILIDAD"}</span>
            </div>
            <h4 className="bloom-climate-title">
              {isEn
                ? "Extreme Climate Regimes & Planetary Atmosphere Contrast"
                : "Régimen Climático Extremo y Contraste Atmosférico Planetario"}
            </h4>
          </div>

          <div className="bloom-climate-quad-grid">
            {/* 1. Thermal Extremes */}
            <div className="climate-quad-box">
              <div className="quad-label">
                <span>🌡️</span>
                <strong>{isEn ? "Thermal Regimes & Diurnal Swing" : "Régimen Térmico y Amplitud Día/Noche"}</strong>
              </div>
              <div className="quad-body">
                <div className="quad-subrow earth">
                  <span className="quad-target">🌍 {item.name}:</span>
                  <strong>{climateData.earth.tempRange}</strong>
                  <small>{climateData.earth.tempDayNight}</small>
                </div>
                <div className={`quad-subrow space ${!isMoon ? "mars" : ""}`}>
                  <span className="quad-target">{isMoon ? "🌕 Luna" : "🪐 Marte"} ({climateData.space.targetName}):</span>
                  <strong>{climateData.space.tempRange}</strong>
                  <small>{climateData.space.tempDescription}</small>
                </div>
              </div>
            </div>

            {/* 2. Atmospheric Pressure */}
            <div className="climate-quad-box">
              <div className="quad-label">
                <span>💨</span>
                <strong>{isEn ? "Barometric Pressure & Gas Density" : "Presión Barométrica y Densidad de Gas"}</strong>
              </div>
              <div className="quad-body">
                <div className="quad-subrow earth">
                  <span className="quad-target">🌍 {item.name}:</span>
                  <strong>{climateData.earth.atmosphericPressure}</strong>
                  <small>{climateData.earth.atmosphericDensity}</small>
                </div>
                <div className={`quad-subrow space ${!isMoon ? "mars" : ""}`}>
                  <span className="quad-target">{isMoon ? "🌕 Luna" : "🪐 Marte"}:</span>
                  <strong>{climateData.space.atmosphericPressure}</strong>
                  <small>{climateData.space.pressureDescription}</small>
                </div>
              </div>
            </div>

            {/* 3. Solar UV & Radiation */}
            <div className="climate-quad-box">
              <div className="quad-label">
                <span>☀️</span>
                <strong>{isEn ? "Solar UV Irradiance & Radiation" : "Radiación Solar Ultravioleta & Cósmica"}</strong>
              </div>
              <div className="quad-body">
                <div className="quad-subrow earth">
                  <span className="quad-target">🌍 {item.name}:</span>
                  <strong>{climateData.earth.uvIndex}</strong>
                  <small>{climateData.earth.solarInsolation}</small>
                </div>
                <div className={`quad-subrow space ${!isMoon ? "mars" : ""}`}>
                  <span className="quad-target">{isMoon ? "🌕 Luna" : "🪐 Marte"}:</span>
                  <strong>{climateData.space.solarRadiationUv}</strong>
                  <small>{climateData.space.radiationDescription}</small>
                </div>
              </div>
            </div>

            {/* 4. Aridity & Eolian Dynamics */}
            <div className="climate-quad-box">
              <div className="quad-label">
                <span>🌪️</span>
                <strong>{isEn ? "Relative Humidity & Aeolian Dynamics" : "Humedad Relativa y Dinámica Eólica"}</strong>
              </div>
              <div className="quad-body">
                <div className="quad-subrow earth">
                  <span className="quad-target">🌍 {item.name}:</span>
                  <strong>{climateData.earth.windDesiccation}</strong>
                </div>
                <div className={`quad-subrow space ${!isMoon ? "mars" : ""}`}>
                  <span className="quad-target">{isMoon ? "🌕 Luna" : "🪐 Marte"}:</span>
                  <strong>{climateData.space.relativeHumidity}</strong>
                  <small>{climateData.space.windEolianDynamics}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Scientific Divergence & Mitigation */}
          <div className="climate-divergence-box">
            <div className="divergence-tag">
              <span>⚠️ {isEn ? "CRITICAL PHYSICAL LIMIT & MITIGATION PROTOCOL" : "LÍMITE FÍSICO CRÍTICO Y PROTOCOLO DE MITIGACIÓN"}</span>
            </div>
            <div className="divergence-text">
              <p><strong>{isEn ? "Thermal & Atmospheric Delta: " : "Delta Térmico y Atmosférico: "}</strong>{climateData.scientificDivergence.thermalDivergence}</p>
              <p><strong>{isEn ? "Operational Protocol: " : "Protocolo Operativo: "}</strong>{climateData.space.operationalAtmosphericNote}</p>
            </div>
          </div>
        </div>

        {/* DEEP DIVE SCIENTIFIC ANALYSIS (NASA CRITERIA) */}
        <div className="bloom-deep-dive-panel liquid-glass">
          <div>
            <h4 className="bloom-deep-dive-title">
              {isEn
                ? "Why is this site recommended for the mission?"
                : "¿Por qué se recomienda este lugar para la misión?"}
            </h4>
            <p
              style={{
                fontSize: "0.9375rem",
                lineHeight: "1.65",
                color: "rgba(255,255,255,0.88)",
                marginTop: "0.5rem",
                marginBottom: "0",
              }}
            >
              {execSummary}
            </p>
          </div>

          <div className="bloom-deep-dive-grid">
            {/* Dónde la analogía es SÓLIDA */}
            <div className="bloom-point-box solid">
              <h5>
                {isEn
                  ? "✓ Where the analogy is solid (Verifiable Processes)"
                  : "✓ Dónde la analogía es sólida (Procesos Verificables)"}
              </h5>
              <ul className="bloom-point-list">
                {solidAnalogy.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Dónde la analogía FALLA (Límites Epistémicos) */}
            <div className="bloom-point-box limits">
              <h5>
                {isEn
                  ? "⚠ Where the analogy fails (Scientific Limitations)"
                  : "⚠ Dónde falla la analogía (Límites Científicos)"}
              </h5>
              <ul className="bloom-point-list">
                {analogyLimits.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Valor Operacional para la Misión */}
          <div className="bloom-point-box operational">
            <h5>
              {isEn
                ? "🚀 Operational Value: How does it prepare real missions to Moon or Mars?"
                : "🚀 Valor Operacional: ¿Cómo prepara misiones reales a la Luna o Marte?"}
            </h5>
            <ul className="bloom-point-list">
              {operationalVal.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* PHYSICAL VARIABLES COMPARISON TABLE */}
        <div style={{ overflowX: "auto" }}>
          <table className="bloom-metrics-table">
            <thead>
              <tr>
                <th>{isEn ? "Geophysical / Environmental Variable" : "Variable Geofísica / Ambiental"}</th>
                <th>{isEn ? `Earth (${item.name})` : `Tierra (${item.name})`}</th>
                <th>{isEn ? "Extraterrestrial Target" : "Objetivo Extraterrestre"}</th>
                <th>{isEn ? "Compatibility" : "Compatibilidad"}</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{m.variable}</strong>
                  </td>
                  <td>{m.earthValue}</td>
                  <td>{m.spaceValue}</td>
                  <td>
                    <span className={`bloom-tag-compat ${m.compatibility}`}>
                      {m.compatibility}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SATELLITE DATASETS & CITATIONS */}
        <div className="bloom-footer-metadata">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6875rem",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {isEn ? "AUDITED DATASETS:" : "DATASETS AUDITADOS:"}
            </span>
            <div className="bloom-dataset-chips">
              {item.auditedDatasets.map((ds, idx) => (
                <span key={idx} className="bloom-dataset-chip">
                  {ds}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            <strong>{isEn ? "References: " : "Referencias: "}</strong>
            {item.officialCitations.join(" · ")}
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="analisis-analogos" className="bloom-results-section">
      {/* Section Header */}
      <div className="bloom-section-header">
        <span className="bloom-section-badge">
          {isEn
            ? "INTEGRAL MULTIDOMAIN EVALUATION · GEOLOGY, CLIMATE & ATMOSPHERE"
            : "EVALUACIÓN CIENTÍFICA INTEGRAL · GEOLOGÍA, CLIMA EXTREMO Y ENTORNO ATMOSFÉRICO"}
        </span>
        <h2 className="bloom-section-title">
          {isMoon
            ? isEn
              ? "Multidomain Modeling: Geology, Climate & Atmosphere for the Moon (Artemis)"
              : "Modelado Multidominio: Geología, Clima Extremo y Entorno Atmosférico para la Luna (Artemis)"
            : isEn
            ? "Multidomain Modeling: Geology, Climate & Atmosphere for Planet Mars"
            : "Modelado Multidominio: Geología, Clima Extremo y Entorno Atmosférico para el Planeta Marte"}
        </h2>
        <p className="bloom-section-desc">
          {isEn
            ? "Side-by-side instrumental, geological, and atmospheric contrast between Earth regions and candidate space targets. Results open strictly from your active filter criteria and display one comparison at a time."
            : "Contraste instrumental, geológico y meteorológico lado a lado entre regiones terrestres y objetivos espaciales candidatos. Los resultados se muestran únicamente según tus filtros activos y de uno en uno para mayor claridad."}
        </p>
      </div>

      {/* State 1: Waiting for user filter selection */}
      {!hasAppliedFilters && (
        <div className="bloom-awaiting-filter-card liquid-glass-strong">
          <span className="bloom-section-badge" style={{ marginBottom: "0.75rem" }}>
            {isEn
              ? "FILTER-DRIVEN COMPARISON · READY TO QUERY"
              : "COMPARATIVA POR FILTRACIÓN · LISTO PARA CONSULTAR"}
          </span>
          <h3>
            {isEn
              ? "Indicate mission criteria above to compare matching surfaces"
              : "Indica los criterios arriba para mostrar la comparativa de superficies"}
          </h3>
          <p>
            {isEn
              ? `Instead of rendering all ${totalBodyCount} geological dossiers at once, surface comparisons appear only for your filtered criteria and are inspected one analog at a time.`
              : `En lugar de mostrar los ${totalBodyCount} dossiers geológicos de golpe, la comparativa de superficies aparece exclusivamente según el filtro indicado y se analiza una analogía a la vez.`}
          </p>

          <div className="bloom-quick-tags" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
            {QUICK_PRESET_ROLES.map((roleKey) => (
              <button
                key={roleKey}
                type="button"
                className="bloom-quick-pill"
                onClick={() => onQuickFilter(roleKey)}
              >
                {ROLE_LABELS[roleKey]?.[lang] ?? roleKey}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={scrollToTopFilter}
              className="bloom-quick-pill"
              style={{ padding: "0.75rem 1.25rem", fontSize: "0.8125rem" }}
            >
              {isEn ? "↑ Choose filters in top panel" : "↑ Elegir filtros en el panel superior"}
            </button>
            <button
              type="button"
              onClick={onApplyFilters}
              className="bloom-cta-btn"
              style={{ width: "auto", padding: "0.75rem 1.5rem" }}
            >
              {isEn
                ? `Explore ${totalBodyCount} ${isMoon ? "Moon" : "Mars"} analogs (1 at a time)`
                : `Explorar ${totalBodyCount} análogos de ${isMoon ? "la Luna" : "Marte"} (1 a la vez)`}
            </button>
          </div>
        </div>
      )}

      {/* State 2: Filters applied */}
      {hasAppliedFilters && (
        <>
          {/* Active Filters Bar */}
          <div className="bloom-active-filters-bar liquid-glass">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                }}
              >
                {isEn ? "Applied filters:" : "Filtros aplicados:"}
              </span>
              <span className="bloom-quick-pill" style={{ background: "rgba(65,65,252,0.2)" }}>
                {isEn ? "Body: " : "Cuerpo: "}
                {isMoon
                  ? isEn
                    ? "The Moon (Artemis)"
                    : "Luna (Artemis)"
                  : isEn
                  ? "Planet Mars"
                  : "Planeta Marte"}
              </span>
              {roleFilter !== "all" && (
                <span className="bloom-quick-pill">
                  {isEn ? "Objective: " : "Objetivo: "}
                  {ROLE_LABELS[roleFilter]?.[lang] ?? roleFilter}
                </span>
              )}
              {conditionFilter !== "all" && (
                <span className="bloom-quick-pill">
                  {isEn ? "Condition: " : "Condición: "}
                  {CONDITION_LABELS[conditionFilter]?.[lang] ?? conditionFilter}
                </span>
              )}
              {environmentFilter !== "all" && (
                <span className="bloom-quick-pill">
                  {isEn ? "Scope: " : "Ámbito: "}
                  {ENVIRONMENT_LABELS[environmentFilter]?.[lang] ?? environmentFilter}
                </span>
              )}
              <span style={{ fontSize: "0.8125rem", color: "#7fd579", fontWeight: 600 }}>
                {analogs.length}{" "}
                {analogs.length === 1
                  ? isEn
                    ? "qualified analog"
                    : "análogo calificado"
                  : isEn
                  ? "qualified analogs"
                  : "análogos calificados"}
              </span>
            </div>

            <button
              type="button"
              onClick={onResetFilters}
              className="bloom-quick-pill"
              style={{ color: "#f87171", borderColor: "rgba(248,113,113,0.3)" }}
            >
              {isEn ? "✕ Clear all filters" : "✕ Limpiar todos los filtros"}
            </button>
          </div>

          {/* Empty state when intersection matches nothing */}
          {analogs.length === 0 && (
            <div
              className="liquid-glass-strong"
              style={{
                maxWidth: "700px",
                margin: "3rem auto",
                padding: "3rem 2rem",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "#fff", marginBottom: "0.75rem" }}>
                {isEn
                  ? "No analogs found with this strict filter intersection"
                  : "No se encontraron análogos con este cruce estricto de filtros"}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
                {isEn
                  ? "Try selecting a broader combination of geological criteria or clear filters to reset the query."
                  : "Prueba seleccionando una combinación más amplia de criterios geológicos o haz clic en limpiar filtros para reiniciar la consulta."}
              </p>
              <button
                type="button"
                onClick={onResetFilters}
                className="bloom-cta-btn"
                style={{ maxWidth: "260px", margin: "0 auto" }}
              >
                {isEn ? "Reset Filters" : "Restablecer Filtros"}
              </button>
            </div>
          )}

          {/* Single-Analog Selector & Single Card Comparison */}
          {analogs.length > 0 && activeAnalog && (
            <>
              <div className="bloom-analog-selector-bar liquid-glass">
                <div className="bloom-analog-selector-header">
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.7)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {isEn
                      ? `Showing ${activeIndex + 1} of ${analogs.length} filtered comparisons`
                      : `Mostrando ${activeIndex + 1} de ${analogs.length} comparativas filtradas`}
                  </span>

                  {analogs.length > 1 && (
                    <div className="bloom-analog-pager">
                      <button
                        type="button"
                        className="bloom-pager-btn"
                        onClick={() => handleStepAnalog(-1)}
                      >
                        {isEn ? "← Previous" : "← Anterior"}
                      </button>
                      <button
                        type="button"
                        className="bloom-pager-btn"
                        onClick={() => handleStepAnalog(1)}
                      >
                        {isEn ? "Next →" : "Siguiente →"}
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="bloom-analog-selector-tabs"
                  role="tablist"
                  aria-label={isEn ? "Filtered planetary analogs" : "Análogos filtrados"}
                >
                  {analogs.map((item, idx) => {
                    const isSelected = item.id === activeAnalog.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        className={`bloom-analog-tab ${isSelected ? "active" : ""}`}
                        onClick={() => onSelectAnalog(item.id)}
                      >
                        <span>
                          {idx + 1}. {item.name}
                        </span>
                        <span className="bloom-analog-tab-score">{item.fidelityScore}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {renderActiveCard(activeAnalog)}
            </>
          )}
        </>
      )}
    </section>
  );
}
