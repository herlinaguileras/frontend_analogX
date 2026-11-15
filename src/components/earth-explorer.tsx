"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  allDetailedRegionsList,
  detailedEarthRegions,
  processFilters,
  type DetailedEarthRegionInfo,
  type EarthProcessCategory,
} from "@/lib/earth-catalog";
import { regionPreviewUrl } from "@/lib/map-config";
import { useLanguage } from "@/context/language-context";
import { Icon } from "./icon";
import { CountryCombobox } from "./country-combobox";

// Importación dinámica de MapLibre 3D Globe para Next.js
const EarthMap = dynamic(() => import("./earth-map"), {
  ssr: false,
  loading: () => (
    <div className="earth-map-placeholder">
      <span className="loading-spinner" />
      <span>Iniciando proyección 3D esférica del planeta Tierra…</span>
    </div>
  ),
});

export function EarthExplorer() {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [selectedId, setSelectedId] = useState<string>("salar-de-uyuni");
  const [activeProcess, setActiveProcess] = useState<EarthProcessCategory>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  const getProcessLabel = (pId: string, short = false) => {
    if (!isEn) {
      const p = processFilters.find((item) => item.id === pId);
      return short ? p?.shortLabel : p?.label;
    }
    switch (pId) {
      case "all":
        return short ? "All" : "All Global Variables";
      case "radiation":
        return short ? "UV Radiation" : "Extreme UV Radiation & High Altitude";
      case "cryo_ice":
        return short ? "Cryogenic Ice" : "Cryogenic, Relict Ice & Polar Cold";
      case "hyper_arid":
        return short ? "Hyperaridity" : "Hyperaridity & Evaporite Crusts";
      case "volcanic_tubes":
        return short ? "Lava Tubes" : "Volcanism & Underground Lava Tubes";
      case "altimetry_rover":
        return short ? "Altimetry & Rovers" : "Altimetry Calibration & Rover Traction";
      default:
        return pId;
    }
  };

  // Filtrado de regiones según País y Variable Ambiental
  const visibleRegions = useMemo(() => {
    return allDetailedRegionsList.filter((detail) => {
      // 1. Filtro por país estricto
      if (countryFilter !== "all" && detail.country !== countryFilter) {
        return false;
      }

      // 2. Filtro por variable ambiental activa
      if (activeProcess !== "all" && !detail.processCategories.includes(activeProcess)) {
        return false;
      }

      return true;
    });
  }, [countryFilter, activeProcess]);

  // Si la región seleccionada no está dentro del filtro, seleccionar automáticamente la primera disponible
  const activeRegion: DetailedEarthRegionInfo = useMemo(() => {
    const found = visibleRegions.find((r) => r.id === selectedId);
    if (found) return found;
    return visibleRegions[0] ?? detailedEarthRegions["salar-de-uyuni"]!;
  }, [visibleRegions, selectedId]);

  const activeProcessMeta = processFilters.find((p) => p.id === activeProcess) ?? processFilters[0]!;
  const satellitePreview = regionPreviewUrl(activeRegion.id);

  // Cantidad de sitios del país activo
  const countrySiteCount = useMemo(() => {
    if (countryFilter === "all") return allDetailedRegionsList.length;
    return allDetailedRegionsList.filter((r) => r.country === countryFilter).length;
  }, [countryFilter]);

  return (
    <main className="earth-explorer-page">
      {/* =========================================================================
          BARRA DE CONTROL SUPERIOR: PAÍS / ÁMBITO + VARIABLES AMBIENTALES
          (Sin buscador innecesario, opciones limpias sin emojis)
          ========================================================================= */}
      <section className="earth-control-panel">
        <div className="earth-panel-header">
          <div className="earth-title-group">
            <span className="earth-badge">
              <span className="pulse-dot" style={{ backgroundColor: activeProcessMeta.color }} />
              {isEn ? "EARTH VIEW · 3D SATELLITE GLOBE" : "VISTA DE LA TIERRA · GLOBO SATELITAL 3D"}
            </span>
            <h1>{isEn ? "Earth Analogs Catalog" : "Catálogo de Análogos Terrestres"}</h1>
            <p className="earth-subtitle">
              {isEn
                ? "Explore planet Earth in 3D: analyze topology, extreme environment, and available ISRU resources for permanent base and planetary landing site selection."
                : "Explora el planeta Tierra en 3D: analiza la topología, medio ambiente, clima extremo y recursos ISRU disponibles para selección de futuras bases y sitios de aterrizaje planetario."}
            </p>
          </div>

          <div className="earth-quick-stats">
            <div className="stat-pill">
              <strong>{visibleRegions.length} / {countrySiteCount}</strong>
              <span>
                {countryFilter === "all"
                  ? isEn ? "Global Analogs" : "Análogos Globales"
                  : isEn ? `Analogs in ${countryFilter}` : `Análogos en ${countryFilter}`}
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar de selección de País / Ámbito con Combobox dinámico interactivo */}
        <div className="earth-filter-toolbar">
          <CountryCombobox
            selectedCountry={countryFilter}
            onSelectCountry={(nextCountry) => {
              setCountryFilter(nextCountry);
              // Si el país tiene análogos en catálogo, enfocar el primero para la ficha técnica
              const firstOfCountry = allDetailedRegionsList.find(
                (r) => nextCountry === "all" || r.country === nextCountry
              );
              if (firstOfCountry) {
                setSelectedId(firstOfCountry.id);
              }
            }}
          />

          <div className="country-filter-summary">
            {countryFilter === "all" ? (
              <span>{isEn ? "Showing analogs from across planet Earth" : "Mostrando análogos de todo el planeta Tierra"}</span>
            ) : (
              <span>
                {isEn ? (
                  <>Showing exclusively sites and dossiers for <strong>{countryFilter}</strong></>
                ) : (
                  <>Mostrando únicamente sitios y tarjetas de <strong>{countryFilter}</strong></>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Filtros de Variables Ambientales (Cambian de color los marcadores del globo 3D) */}
        <div className="process-filter-row">
          <span className="process-filter-label">
            {isEn ? "Filter by Physical / Environmental Process:" : "Filtrar por Fenómeno Físico / Ambiental:"}
          </span>
          <div className="process-buttons-list">
            {processFilters.map((p) => {
              const isActive = activeProcess === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`process-filter-btn ${isActive ? "active" : ""}`}
                  style={{
                    borderColor: isActive ? p.color : undefined,
                    backgroundColor: isActive ? `${p.color}22` : undefined,
                    color: isActive ? "#ffffff" : undefined,
                    boxShadow: isActive ? `0 0 14px ${p.glowColor}` : undefined,
                  }}
                  onClick={() => setActiveProcess(p.id)}
                >
                  <span className="process-signal-dot" style={{ backgroundColor: p.color }} />
                  <span className="process-btn-text">{getProcessLabel(p.id, true)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          ÁREA PRINCIPAL: VISOR 3D DEL PLANETA TIERRA + FICHA TÉCNICA DETALLADA
          ========================================================================= */}
      <section className="earth-viewport-section">
        {/* Mapa 3D del Planeta Tierra (MapLibre 3D Globe) */}
        <div className="earth-map-wrapper">
          <EarthMap
            visibleRegions={visibleRegions}
            selectedId={activeRegion.id}
            activeProcess={activeProcess}
            countryFilter={countryFilter}
            onSelect={(id) => {
              setSelectedId(id);
              setIsCardCollapsed(false);
            }}
          />
        </div>

        {/* Tarjeta Flotante HUD de la Región Seleccionada (Solo información de la Tierra) */}
        <aside className={`floating-region-card ${isCardCollapsed ? "collapsed" : ""}`}>
          <div className="card-drag-bar">
            <div className="card-status-dot" style={{ backgroundColor: activeProcessMeta.color }} />
            <span className="card-type-label">
              {isEn ? "SCIENTIFIC TECHNICAL DOSSIER (EARTH ONLY)" : "FICHA TÉCNICA CIENTÍFICA (SOLO TIERRA)"}
            </span>
            <button
              type="button"
              className="card-toggle-btn"
              onClick={() => setIsCardCollapsed(!isCardCollapsed)}
              aria-label={
                isCardCollapsed
                  ? isEn ? "Expand dossier" : "Expandir ficha"
                  : isEn ? "Collapse dossier" : "Colapsar ficha"
              }
            >
              {isCardCollapsed ? (isEn ? "▲ Expand" : "▲ Expandir") : (isEn ? "▼ Minimize" : "▼ Minimizar")}
            </button>
          </div>

          {!isCardCollapsed && (
            <div className="card-body-content">
              {/* Fotografía Satelital Esri World Imagery */}
              <div className="card-satellite-frame">
                {satellitePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={satellitePreview}
                    alt={`Observación satelital de ${activeRegion.name}`}
                    className="card-sat-img"
                  />
                ) : (
                  <div className="card-sat-fallback">
                    {isEn ? "Satellite photo calibrating" : "Fotografía satelital en calibración"}
                  </div>
                )}
                <div className="sat-overlay-pill">
                  <span className="sensor-dot" />
                  <span>{isEn ? "ESRI 3D ORTHOIMAGERY · HIGH RESOLUTION" : "ESRI ORTOIMAGEN 3D · ALTA RESOLUCIÓN"}</span>
                </div>
              </div>

              {/* Título de la Región y Ubicación Geográfica */}
              <div className="card-header-info">
                <div className="card-region-title">
                  <h2>{activeRegion.name}</h2>
                  <span className="country-badge">
                    {activeRegion.country} · {activeRegion.elevation}
                  </span>
                </div>
                <div className="card-coords-tag">
                  <Icon name="pin" size={13} />
                  <span>{activeRegion.coordinatesFormatted} (Datum WGS84)</span>
                </div>
              </div>

              {/* Sección 1: Topología y Geomorfología */}
              <div className="detail-section-block">
                <span className="section-micro-title">
                  {isEn ? "01 · TOPOLOGY AND GEOMORPHOLOGY" : "01 · TOPOLOGÍA Y GEOMORFOLOGÍA"}
                </span>
                <div className="topology-box">
                  <div className="topology-item">
                    <strong>{isEn ? "Surface Relief:" : "Relieve:"}</strong> {activeRegion.topologyGeomorphology.surfaceType}
                  </div>
                  <div className="topology-item">
                    <strong>{isEn ? "Slope Gradient:" : "Pendiente:"}</strong> {activeRegion.topologyGeomorphology.slope}
                  </div>
                  <div className="topology-item">
                    <strong>{isEn ? "Bearing Capacity:" : "Capacidad Portante:"}</strong> {activeRegion.topologyGeomorphology.bearingCapacity}
                  </div>
                  <div className="topology-item">
                    <strong>{isEn ? "Rover / Landing Hazard:" : "Riesgo para Rovers / Aterrizaje:"}</strong> {activeRegion.topologyGeomorphology.roverRisk}
                  </div>
                </div>
              </div>

              {/* Sección 2: Clima y Extremos Ambientales */}
              <div className="detail-section-block">
                <span className="section-micro-title">
                  {isEn ? "02 · CLIMATE & ENVIRONMENT" : "02 · CLIMA Y MEDIO AMBIENTE"}
                </span>
                <div className="card-metrics-grid">
                  <div className="metric-box">
                    <span className="metric-title">{isEn ? "DAY/NIGHT TEMP" : "TEMPERATURA DÍA/NOCHE"}</span>
                    <strong className="metric-val">{activeRegion.tempRange}</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-title">{isEn ? "SOLAR / UV INDEX" : "RADIACIÓN SOLAR / UV"}</span>
                    <strong className="metric-val" style={{ color: "#fbbf24" }}>
                      {activeRegion.uvIndex}
                    </strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-title">{isEn ? "PRESSURE (hPa)" : "PRESIÓN ATMOSFÉRICA"}</span>
                    <strong className="metric-val">{activeRegion.atmosphericPressure}</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-title">{isEn ? "MINERALOGY" : "MINERALOGÍA"}</span>
                    <strong className="metric-val" style={{ fontSize: "10px", lineHeight: "1.3" }}>
                      {activeRegion.primaryMinerals}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Sección 3: Recursos Disponibles in-situ (ISRU) */}
              <div className="detail-section-block">
                <span className="section-micro-title">
                  {isEn ? "03 · AVAILABLE IN-SITU RESOURCES (ISRU)" : "03 · RECURSOS DISPONIBLES (ISRU)"}
                </span>
                <div className="isru-details-box">
                  <div className="isru-item">
                    <strong>{isEn ? "Water Extraction:" : "Extracción Hídrica:"}</strong> {activeRegion.availableResourcesIsru.waterExtraction}
                  </div>
                  <div className="isru-item">
                    <strong>{isEn ? "Construction Materials:" : "Materiales para Construcción:"}</strong> {activeRegion.availableResourcesIsru.mineralsForConstruction}
                  </div>
                </div>
              </div>

              {/* Sección 4: Selección de Futuros Sitios de Aterrizaje y Bases */}
              <div className="detail-section-block highlight-block">
                <span className="section-micro-title">
                  {isEn ? "04 · CRITERIA FOR LANDING SITES & BASES" : "04 · CRITERIO PARA SITIOS DE ATERRIZAJE Y BASES"}
                </span>
                <p className="highlight-text">
                  <strong>{isEn ? "Landing Rationale:" : "Aterrizaje:"}</strong> {activeRegion.futureLandingBaseSuitability.landingSiteRationale}
                </p>
                <p className="highlight-text">
                  <strong>{isEn ? "Base & Habitat:" : "Base / Hábitat:"}</strong> {activeRegion.futureLandingBaseSuitability.baseConstructionRationale}
                </p>
              </div>

              {/* Sección 5: Dónde Sólida y Dónde Falla la Analogía */}
              <div className="detail-section-block limits-block">
                <span className="section-micro-title">
                  {isEn ? "05 · EPISTEMIC RIGOR" : "05 · RIGOR EPISTEMOLÓGICO"}
                </span>
                <div className="solid-analogy-box">
                  <strong>{isEn ? "Solid Analogy:" : "Analogía Sólida:"}</strong> {activeRegion.solidAnalogy}
                </div>
                <div className="limit-failure-box">
                  <strong>{isEn ? "Where It Fails:" : "Dónde Falla:"}</strong> {activeRegion.whereAnalogyFails.gravityLimit} · {activeRegion.whereAnalogyFails.atmospherePressureLimit}
                </div>
                <div className="mitigation-box">
                  <strong>{isEn ? "Mitigation Protocol:" : "Protocolo de Mitigación:"}</strong> {activeRegion.whereAnalogyFails.mitigationProtocol}
                </div>
              </div>

              {/* Botón para Abrir Informe Técnico Completo */}
              <div className="report-action-area">
                <button
                  type="button"
                  className="open-full-report-btn"
                  onClick={() => setReportModalOpen(true)}
                >
                  <Icon name="book" size={14} />
                  <span>{isEn ? "VIEW FULL TECHNICAL REPORT" : "VER INFORME TÉCNICO COMPLETO"}</span>
                </button>
              </div>
            </div>
          )}
        </aside>
      </section>

      {/* =========================================================================
          CARRUSEL INFERIOR: TARJETAS SEGÚN EL PAÍS SELECCIONADO
          (Si seleccionas Bolivia, solo aparecen las tarjetas de Bolivia!)
          ========================================================================= */}
      <section className="earth-regions-carousel-section">
        <div className="carousel-title-row">
          <span className="carousel-eyebrow">
            {isEn
              ? `• RESEARCH CARDS: ${countryFilter === "all" ? "ALL COUNTRIES" : countryFilter.toUpperCase()} (${visibleRegions.length} SITES AVAILABLE)`
              : `• TARJETAS DE INVESTIGACIÓN: ${countryFilter === "all" ? "TODOS LOS PAÍSES" : countryFilter.toUpperCase()} (${visibleRegions.length} SITIOS DISPONIBLES)`}
          </span>
          <span className="carousel-instruction">
            {isEn
              ? "Click on any card to rotate the 3D globe to that location and view its technical dossier"
              : "Haz clic en cualquier tarjeta para que el globo 3D gire hacia ese lugar y abra su ficha técnica"}
          </span>
        </div>

        {visibleRegions.length === 0 ? (
          <div className="empty-country-panel">
            <div className="empty-country-icon-wrap">
              <Icon name="globe" size={28} />
            </div>
            <div className="empty-country-info">
              <h4>
                {isEn ? "Satellite Territory Under Observation: " : "Territorio Satelital en Observación: "}
                {countryFilter}
              </h4>
              <p>
                {isEn ? (
                  <>
                    The 3D globe has rotated and centered the orbital camera on the coordinates of <strong>{countryFilter}</strong>.
                    This territory is open to global satellite telemetry; no terrestrial analog stations are currently indexed for the active filter.
                  </>
                ) : (
                  <>
                    El globo terráqueo 3D ha navegado y enfocado la cámara orbital sobre las coordenadas geográficas de <strong>{countryFilter}</strong>.
                    Este territorio está disponible para telemetría satelital global, sin estaciones análogas terrestres indexadas para el filtro seleccionado.
                  </>
                )}
              </p>
              <button
                type="button"
                className="reset-global-btn"
                onClick={() => {
                  setCountryFilter("all");
                  setActiveProcess("all");
                }}
              >
                {isEn ? "← Reset to All Countries (Global)" : "← Restablecer a Todos los Países (Global)"}
              </button>
            </div>
          </div>
        ) : (
          <div className="earth-regions-carousel">
            {visibleRegions.map((region) => {
              const isSelected = region.id === activeRegion.id;

              return (
                <button
                  key={region.id}
                  type="button"
                  className={`carousel-region-card ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedId(region.id);
                    setIsCardCollapsed(false);
                  }}
                >
                  <div className="carousel-card-top">
                    <span className="carousel-country">{region.country}</span>
                    <span className="carousel-elevation">{region.elevation}</span>
                  </div>
                  <h4 className="carousel-region-name">{region.name}</h4>
                  <p className="carousel-process">{region.analogProcess}</p>
                  <div className="carousel-card-tags">
                    <span className="mini-tag uv-tag">{region.uvIndex.split(" ")[0]}</span>
                    <span className="mini-tag temp-tag">{region.tempRange.split(" ")[0]}</span>
                  </div>
                  <div className="carousel-card-footer">
                    <span className="carousel-coords">{region.coordinatesFormatted}</span>
                    <span className="carousel-focus-arrow">{isEn ? "Rotate 3D ↗" : "Girar 3D ↗"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================================================
          MODAL DE INFORME TÉCNICO CIENTÍFICO COMPLETO
          ========================================================================= */}
      {reportModalOpen && (
        <div className="report-modal-backdrop" onClick={() => setReportModalOpen(false)}>
          <div
            className="report-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header-bar">
              <div className="modal-title-wrap">
                <span className="modal-eyebrow">
                  {isEn
                    ? "EARTH ANALOG TECHNICAL REPORT · NASA CHALLENGE 2026"
                    : "INFORME TÉCNICO DE ANÁLOGO TERRESTRE · RETO NASA 2026"}
                </span>
                <h2>{activeRegion.name} ({activeRegion.country})</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setReportModalOpen(false)}
                aria-label={isEn ? "Close report" : "Cerrar informe"}
              >
                ✕
              </button>
            </div>

            <div className="modal-scroll-body">
              <div className="report-meta-grid">
                <div className="report-meta-col">
                  <span>{isEn ? "ELEVATION:" : "ELEVACIÓN:"}</span> <strong>{activeRegion.elevation}</strong>
                </div>
                <div className="report-meta-col">
                  <span>{isEn ? "COORDINATES:" : "COORDENADAS:"}</span> <strong>{activeRegion.coordinatesFormatted} (WGS84)</strong>
                </div>
                <div className="report-meta-col">
                  <span>{isEn ? "ATMOSPHERIC PRESSURE:" : "PRESIÓN ATMOSFÉRICA:"}</span> <strong>{activeRegion.atmosphericPressure}</strong>
                </div>
                <div className="report-meta-col">
                  <span>{isEn ? "SATELLITE DATASETS:" : "DATASETS SATELITALES:"}</span> <strong>{activeRegion.verifiedDataset}</strong>
                </div>
              </div>

              <div className="report-text-block">
                <h3>{isEn ? "1. Topology, Surface Morphology and Terradynamics" : "1. Topología, Morfología de Superficie y Terradinámica"}</h3>
                <p>
                  {isEn
                    ? <>The site exhibits a surface classified as <em>{activeRegion.topologyGeomorphology.surfaceType}</em>. The estimated mean slope is <strong>{activeRegion.topologyGeomorphology.slope}</strong>, with micro-roughness of {activeRegion.topologyGeomorphology.roughness}. Substrate bearing capacity is <strong>{activeRegion.topologyGeomorphology.bearingCapacity}</strong>.</>
                    : <>El sitio presenta una superficie clasificada como <em>{activeRegion.topologyGeomorphology.surfaceType}</em>. La pendiente media estimada es de <strong>{activeRegion.topologyGeomorphology.slope}</strong>, con una micro-rugosidad de {activeRegion.topologyGeomorphology.roughness}. La capacidad portante del sustrato es de <strong>{activeRegion.topologyGeomorphology.bearingCapacity}</strong>.</>}
                </p>
                <div className="report-note-box">
                  <strong>{isEn ? "Rover and Lander Risk Assessment:" : "Evaluación de Riesgo para Rovers y Aterrizadores:"}</strong> {activeRegion.topologyGeomorphology.roverRisk}
                </div>
              </div>

              <div className="report-text-block">
                <h3>{isEn ? "2. Climatic, Thermal and Radiative Regime" : "2. Régimen Climático, Térmico y Radiativo"}</h3>
                <p>
                  {isEn
                    ? <>The measured thermal gradient is <strong>{activeRegion.tempRange}</strong> ({activeRegion.climateEnvironment.tempDayNight}). Surface solar insolation exceeds <strong>{activeRegion.climateEnvironment.solarInsolation}</strong>, with a UV radiation index of <strong>{activeRegion.uvIndex}</strong>. Local atmospheric density is <strong>{activeRegion.climateEnvironment.atmosphericDensity}</strong>, subject to {activeRegion.climateEnvironment.windDesiccation}.</>
                    : <>El gradiente de temperatura medido es de <strong>{activeRegion.tempRange}</strong> ({activeRegion.climateEnvironment.tempDayNight}). La insolación solar superficial supera los <strong>{activeRegion.climateEnvironment.solarInsolation}</strong>, con un índice de radiación ultravioleta de <strong>{activeRegion.uvIndex}</strong>. La densidad atmosférica local es de <strong>{activeRegion.climateEnvironment.atmosphericDensity}</strong>, sometida a {activeRegion.climateEnvironment.windDesiccation}.</>}
                </p>
              </div>

              <div className="report-text-block">
                <h3>{isEn ? "3. In-Situ Resource Characterization (ISRU)" : "3. Caracterización de Recursos in-situ (ISRU)"}</h3>
                <p>
                  <strong>{isEn ? "Water Extraction:" : "Extracción Hídrica:"}</strong> {activeRegion.availableResourcesIsru.waterExtraction}
                </p>
                <p>
                  <strong>{isEn ? "Construction & Sintering Materials:" : "Materiales para Construcción y Sinterizado:"}</strong> {activeRegion.availableResourcesIsru.mineralsForConstruction}
                </p>
                <p>
                  <strong>{isEn ? "Thermal Storage & Energy Balance:" : "Almacenamiento Térmico y Balanza de Energía:"}</strong> {activeRegion.availableResourcesIsru.thermalStorage}
                </p>
              </div>

              <div className="report-text-block">
                <h3>{isEn ? "4. Selection Criteria for Landing Sites & Permanent Bases" : "4. Criterios de Selección para Lugares de Aterrizaje y Bases Permanentes"}</h3>
                <p>
                  <strong>{isEn ? "Landing Site Rationale:" : "Justificación para Selección de Sitio de Aterrizaje:"}</strong> {activeRegion.futureLandingBaseSuitability.landingSiteRationale}
                </p>
                <p>
                  <strong>{isEn ? "Base Construction & Habitats:" : "Justificación para Construcción y Hábitats:"}</strong> {activeRegion.futureLandingBaseSuitability.baseConstructionRationale}
                </p>
                <p>
                  <strong>{isEn ? "Human EVA Operational Rehearsals:" : "Ensayos de Operaciones Humanas (EVA):"}</strong> {activeRegion.futureLandingBaseSuitability.evaTestingRationale}
                </p>
              </div>

              <div className="report-text-block">
                <h3>{isEn ? "5. Epistemic Rigor Clause: Where the Earth Analogy Fails" : "5. Cláusula de Rigor Epistemológico: Dónde Falla la Analogía Terrestre"}</h3>
                <ul className="report-limits-list">
                  <li>
                    <strong>{isEn ? "Gravitational Limit:" : "Límite Gravitacional:"}</strong> {activeRegion.whereAnalogyFails.gravityLimit}
                  </li>
                  <li>
                    <strong>{isEn ? "Atmospheric Pressure Limit:" : "Límite de Presión y Atmósfera:"}</strong> {activeRegion.whereAnalogyFails.atmospherePressureLimit}
                  </li>
                  <li>
                    <strong>{isEn ? "Cosmic Radiation Limit:" : "Límite de Radiación Cósmica:"}</strong> {activeRegion.whereAnalogyFails.radiationLimit}
                  </li>
                  <li>
                    <strong>{isEn ? "Biological Background Limit:" : "Límite Biológico:"}</strong> {activeRegion.whereAnalogyFails.biologicalLimit}
                  </li>
                  <li>
                    <strong>{isEn ? "Instrument Mitigation Protocol:" : "Protocolo de Mitigación Instrumental:"}</strong> {activeRegion.whereAnalogyFails.mitigationProtocol}
                  </li>
                </ul>
              </div>
            </div>

            <div className="modal-footer-bar">
              <span className="modal-footer-brand">
                {isEn ? "ANALOGX ENGINE · AUDITED SCIENTIFIC VERIFICATION" : "ANALOGX ENGINE · VERIFICACIÓN CIENTÍFICA AUDITADA"}
              </span>
              <button
                type="button"
                className="modal-print-btn"
                onClick={() => window.print()}
              >
                {isEn ? "Print / Save PDF 🖨" : "Imprimir / Guardar PDF 🖨"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
