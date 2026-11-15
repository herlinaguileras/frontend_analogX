"use client";

import { getSpaceProfile, type GeologyComparisonItem } from "@/lib/analog-science-dossier";
import { analogTranslationsEn, type SupportedLang } from "@/lib/translations";
import { getClimateComparison } from "@/lib/climate-science-engine";

interface BloomGeologyComparisonProps {
  analogs: GeologyComparisonItem[];
  body: "Moon" | "Mars";
  roleFilter: string;
  conditionFilter: string;
  environmentFilter: string;
  onResetFilters: () => void;
  lang: SupportedLang;
}

export function BloomGeologyComparison({
  analogs,
  body,
  roleFilter,
  conditionFilter,
  environmentFilter,
  onResetFilters,
  lang,
}: BloomGeologyComparisonProps) {
  const isMoon = body === "Moon";
  const isEn = lang === "en";

  const hasActiveFilters =
    roleFilter !== "all" || conditionFilter !== "all" || environmentFilter !== "all";

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
            ? "Side-by-side instrumental, geological, and atmospheric contrast between Earth regions and candidate space targets. Simultaneously models surface geomorphology, day/night thermal extremes, barometric pressure, solar UV irradiance, and volatile stability."
            : "Contraste instrumental, geológico y meteorológico lado a lado entre regiones terrestres y objetivos espaciales candidatos. Modela simultáneamente geomorfología de superficie, extremos térmicos día/noche, presión barométrica, radiación solar UV y estabilidad de volátiles."}
        </p>
      </div>

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
              {roleFilter}
            </span>
          )}
          {conditionFilter !== "all" && (
            <span className="bloom-quick-pill">
              {isEn ? "Condition: " : "Condición: "}
              {conditionFilter}
            </span>
          )}
          {environmentFilter !== "all" && (
            <span className="bloom-quick-pill">
              {isEn ? "Scope: " : "Ámbito: "}
              {environmentFilter}
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

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="bloom-quick-pill"
            style={{ color: "#f87171", borderColor: "rgba(248,113,113,0.3)" }}
          >
            {isEn ? "✕ Clear all filters" : "✕ Limpiar todos los filtros"}
          </button>
        )}
      </div>

      {/* If No Match */}
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
              ? "Try selecting a broader combination of geological criteria or clear filters to browse the entire catalog."
              : "Prueba seleccionando una combinación más amplia de criterios geológicos o haz clic en limpiar filtros para explorar todo el catálogo."}
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

      {/* List of Analog Dossiers */}
      {analogs.map((item) => {
        const spaceProfile = getSpaceProfile(item, body);
        if (!spaceProfile) return null;

        const trans = isEn ? analogTranslationsEn[item.id] : null;

        const earthImgTitle = trans?.earthImageTitle ?? item.earthImageTitle;
        const earthImgSubtitle = trans?.earthImageSubtitle ?? item.earthImageSubtitle;
        const earthGeologySummary = trans?.earthGeologySummary ?? item.earthGeologySummary;
        const earthMineralogy = trans?.earthMineralogy ?? item.earthMineralogy;

        const spaceTargetName = spaceProfile.targetName;
        const spaceImage = spaceProfile.image;
        const spaceImgTitle = trans?.spaceImageTitle ?? spaceProfile.imageTitle;
        const spaceImgSubtitle = trans?.spaceImageSubtitle ?? spaceProfile.imageSubtitle;
        const spaceCoords = spaceProfile.coordinates;
        const spaceGeologySummary = trans?.spaceGeologySummary ?? spaceProfile.geologySummary;
        const spaceMineralogy = trans?.spaceMineralogy ?? spaceProfile.mineralogy;

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
                    alt={`Geología de ${item.name}`}
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
                    alt={`Geología espacial de ${spaceTargetName}`}
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
      })}
    </section>
  );
}
