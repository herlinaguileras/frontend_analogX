"use client";

import { getSpaceProfile, type GeologyComparisonItem } from "@/lib/analog-science-dossier";
import { analogTranslationsEn, type SupportedLang } from "@/lib/translations";
import { getClimateComparison } from "@/lib/climate-science-engine";

interface BloomGeologyComparisonProps {
  analogs: GeologyComparisonItem[];
  activeAnalog: GeologyComparisonItem | null;
  onSelectAnalog: (id: string) => void;
  body: "Moon" | "Mars";
  roleFilter: string;
  lang: SupportedLang;
}

export function BloomGeologyComparison({
  analogs,
  activeAnalog,
  onSelectAnalog,
  body,
  roleFilter,
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
              {isEn ? "Earth Geology · " : "Geología Terrestre · "}
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
                  ? "Lunar Geology · "
                  : "Geología Lunar · "
                : isEn
                ? "Martian Geology · "
                : "Geología Marciana · "}
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
              <span>{isEn ? "ATMOSPHERIC & CLIMATE ANALYSIS MATRIX" : "MATRIZ DE ANÁLISIS CLIMÁTICO Y ATMOSFÉRICO"}</span>
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
                <strong>{isEn ? "Thermal Regimes & Diurnal Swing" : "Régimen Térmico y Amplitud Día/Noche"}</strong>
              </div>
              <div className="quad-body">
                <div className="quad-subrow earth">
                  <span className="quad-target">{item.name}:</span>
                  <strong>{climateData.earth.tempRange}</strong>
                  <small>{climateData.earth.tempDayNight}</small>
                </div>
                <div className={`quad-subrow space ${!isMoon ? "mars" : ""}`}>
                  <span className="quad-target">{isMoon ? (isEn ? "Moon" : "Luna") : (isEn ? "Mars" : "Marte")} ({climateData.space.targetName}):</span>
                  <strong>{climateData.space.tempRange}</strong>
                  <small>{climateData.space.tempDescription}</small>
                </div>
              </div>
            </div>

            {/* 2. Atmospheric Pressure */}
            <div className="climate-quad-box">
              <div className="quad-label">
                <strong>{isEn ? "Barometric Pressure & Gas Density" : "Presión Barométrica y Densidad de Gas"}</strong>
              </div>
              <div className="quad-body">
                <div className="quad-subrow earth">
                  <span className="quad-target">{item.name}:</span>
                  <strong>{climateData.earth.atmosphericPressure}</strong>
                  <small>{climateData.earth.atmosphericDensity}</small>
                </div>
                <div className={`quad-subrow space ${!isMoon ? "mars" : ""}`}>
                  <span className="quad-target">{isMoon ? (isEn ? "Moon" : "Luna") : (isEn ? "Mars" : "Marte")}:</span>
                  <strong>{climateData.space.atmosphericPressure}</strong>
                  <small>{climateData.space.pressureDescription}</small>
                </div>
              </div>
            </div>

            {/* 3. Solar UV & Radiation */}
            <div className="climate-quad-box">
              <div className="quad-label">
                <strong>{isEn ? "Solar UV Irradiance & Radiation" : "Radiación Solar Ultravioleta & Cósmica"}</strong>
              </div>
              <div className="quad-body">
                <div className="quad-subrow earth">
                  <span className="quad-target">{item.name}:</span>
                  <strong>{climateData.earth.uvIndex}</strong>
                  <small>{climateData.earth.solarInsolation}</small>
                </div>
                <div className={`quad-subrow space ${!isMoon ? "mars" : ""}`}>
                  <span className="quad-target">{isMoon ? (isEn ? "Moon" : "Luna") : (isEn ? "Mars" : "Marte")}:</span>
                  <strong>{climateData.space.solarRadiationUv}</strong>
                  <small>{climateData.space.radiationDescription}</small>
                </div>
              </div>
            </div>

            {/* 4. Aridity & Eolian Dynamics */}
            <div className="climate-quad-box">
              <div className="quad-label">
                <strong>{isEn ? "Relative Humidity & Aeolian Dynamics" : "Humedad Relativa y Dinámica Eólica"}</strong>
              </div>
              <div className="quad-body">
                <div className="quad-subrow earth">
                  <span className="quad-target">{item.name}:</span>
                  <strong>{climateData.earth.windDesiccation}</strong>
                </div>
                <div className={`quad-subrow space ${!isMoon ? "mars" : ""}`}>
                  <span className="quad-target">{isMoon ? (isEn ? "Moon" : "Luna") : (isEn ? "Mars" : "Marte")}:</span>
                  <strong>{climateData.space.relativeHumidity}</strong>
                  <small>{climateData.space.windEolianDynamics}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Scientific Divergence & Mitigation */}
          <div className="climate-divergence-box">
            <div className="divergence-tag">
              <span>{isEn ? "CRITICAL PHYSICAL LIMIT & MITIGATION PROTOCOL" : "LÍMITE FÍSICO CRÍTICO Y PROTOCOLO DE MITIGACIÓN"}</span>
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
                  ? "Where the analogy is solid (Verifiable Processes)"
                  : "Dónde la analogía es sólida (Procesos Verificables)"}
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
                  ? "Where the analogy fails (Scientific Limitations)"
                  : "Dónde falla la analogía (Límites Científicos)"}
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
                ? "Operational Value: How does it prepare real missions to Moon or Mars?"
                : "Valor Operacional: ¿Cómo prepara misiones reales a la Luna o Marte?"}
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

      {/* Render Active Analog Comparison Card */}
      {analogs.length > 0 && activeAnalog && (
        <>
          {analogs.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "1200px",
                margin: "0 auto 1.5rem",
                padding: "0 0.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {isEn
                  ? `Showing analog ${activeIndex + 1} of ${analogs.length}`
                  : `Mostrando análogo ${activeIndex + 1} de ${analogs.length}`}
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="bloom-pager-btn"
                  onClick={() => handleStepAnalog(-1)}
                >
                  {isEn ? "← Previous Analog" : "← Análogo Anterior"}
                </button>
                <button
                  type="button"
                  className="bloom-pager-btn"
                  onClick={() => handleStepAnalog(1)}
                >
                  {isEn ? "Next Analog →" : "Siguiente Análogo →"}
                </button>
              </div>
            </div>
          )}

          {renderActiveCard(activeAnalog)}
        </>
      )}

      {/* Empty State */}
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
              ? "No analogs found for this specific objective"
              : "No se encontraron análogos para este objetivo específico"}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>
            {isEn
              ? "Select another mission objective in the top panel to explore matching Earth sites."
              : "Selecciona otro objetivo de misión en el panel superior para explorar los sitios terrestres correspondientes."}
          </p>
        </div>
      )}
    </section>
  );
}
