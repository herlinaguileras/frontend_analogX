"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { probeCoordinate, type ProbeEvaluateResponse } from "@/lib/api";
import { CustomProbeDossier } from "./custom-probe-dossier";
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
  const [focusRequestSeq, setFocusRequestSeq] = useState<number>(0);
  const [activeProcess, setActiveProcess] = useState<EarthProcessCategory>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [probeResult, setProbeResult] = useState<ProbeEvaluateResponse | null>(null);
  const [probeLoading, setProbeLoading] = useState<boolean>(false);
  const [activeProbeCoords, setActiveProbeCoords] = useState<{ lat: number; lng: number } | null>(null);
  const viewportRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.toggle("printing-earth-report", reportModalOpen);
    if (!reportModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setReportModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("printing-earth-report");
    };
  }, [reportModalOpen]);

  const handleProbeCoordinate = async (coords: { lat: number; lng: number }) => {
    setActiveProbeCoords(coords);
    setProbeLoading(true);
    try {
      const res = await probeCoordinate(coords.lat, coords.lng);
      setProbeResult(res);
    } catch (err) {
      console.error("Error al sondear coordenada:", err);
    } finally {
      setProbeLoading(false);
    }
  };

  const handleFocusRegion = (regionId: string, scrollToGlobe = false) => {
    setSelectedId(regionId);
    setIsCardCollapsed(false);
    setFocusRequestSeq((seq) => seq + 1);

    if (scrollToGlobe && viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      if (rect.top < 16 || rect.bottom > window.innerHeight) {
        viewportRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

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
      <section ref={viewportRef} className="earth-viewport-section">
        {/* Mapa 3D del Planeta Tierra (MapLibre 3D Globe) */}
        <div className="earth-map-wrapper">
          <EarthMap
            visibleRegions={visibleRegions}
            selectedId={activeRegion.id}
            focusRequestSeq={focusRequestSeq}
            activeProcess={activeProcess}
            countryFilter={countryFilter}
            onSelect={(id) => handleFocusRegion(id, false)}
            onProbeCoordinate={handleProbeCoordinate}
            activeProbeCoords={activeProbeCoords}
          />
        </div>

        {/* Expediente Flotante de Sonda Libre (Point & Scan Telemetry) */}
        {probeResult && (
          <CustomProbeDossier
            probeResult={probeResult}
            loading={probeLoading}
            onClose={() => {
              setProbeResult(null);
              setActiveProbeCoords(null);
            }}
            onOpenComparator={(targetId) => {
              const compSection = document.getElementById("dual-world-comparator");
              if (compSection) {
                compSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        )}

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
                  onClick={() => handleFocusRegion(region.id, true)}
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
          <article
            className="report-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="earth-report-title"
          >
            <header className="modal-header-bar">
              <div className="modal-title-wrap">
                <div className="report-header-badges">
                  <span className="modal-eyebrow">
                    {isEn
                      ? "ANALOGX TECHNICAL DOSSIER · NASA CHALLENGE 2026"
                      : "DOSSIER TÉCNICO ANALOGX · RETO NASA 2026"}
                  </span>
                  <span className="report-doc-code">ID: {activeRegion.id.toUpperCase()}</span>
                </div>
                <h2 id="earth-report-title">
                  {activeRegion.name} <span className="report-country-sub">({activeRegion.country} · {activeRegion.countryCode})</span>
                </h2>
                <p className="report-lead-summary">{activeRegion.nasaRoleSummary}</p>
              </div>
              <div className="report-header-actions print-hide">
                <button
                  type="button"
                  className="modal-print-btn modal-print-btn-primary"
                  onClick={() => window.print()}
                >
                  {isEn ? "Print / Save PDF" : "Imprimir / Guardar PDF"}
                </button>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setReportModalOpen(false)}
                  aria-label={isEn ? "Close report" : "Cerrar informe"}
                >
                  ✕
                </button>
              </div>
            </header>

            <div className="modal-scroll-body">
              <div className="report-meta-grid">
                <div className="report-meta-col">
                  <span className="meta-label">{isEn ? "ELEVATION" : "ELEVACIÓN"}</span>
                  <strong className="meta-val">{activeRegion.elevation}</strong>
                </div>
                <div className="report-meta-col">
                  <span className="meta-label">{isEn ? "COORDINATES (WGS84)" : "COORDENADAS (WGS84)"}</span>
                  <strong className="meta-val">{activeRegion.coordinatesFormatted}</strong>
                </div>
                <div className="report-meta-col">
                  <span className="meta-label">{isEn ? "THERMAL RANGE" : "RANGO TÉRMICO"}</span>
                  <strong className="meta-val">{activeRegion.tempRange}</strong>
                </div>
                <div className="report-meta-col">
                  <span className="meta-label">{isEn ? "ATMOSPHERIC PRESSURE" : "PRESIÓN ATMOSFÉRICA"}</span>
                  <strong className="meta-val">{activeRegion.atmosphericPressure}</strong>
                </div>
              </div>

              <div className="report-provenance-strip">
                <div className="provenance-cell">
                  <span className="meta-label">{isEn ? "PRIMARY MINERALOGY" : "MINERALOGÍA DOMINANTE"}</span>
                  <span className="provenance-val">{activeRegion.primaryMinerals}</span>
                </div>
                <div className="provenance-cell">
                  <span className="meta-label">{isEn ? "VERIFIED SATELLITE DATASETS" : "DATASETS SATELITALES AUDITADOS"}</span>
                  <span className="provenance-val">{activeRegion.verifiedDataset}</span>
                </div>
              </div>

              <div className="report-sections-grid">
                <section className="report-section-card">
                  <div className="report-card-head">
                    <span className="section-num">01</span>
                    <h3>{isEn ? "Topology & Terradynamics" : "Topología y Terradinámica"}</h3>
                  </div>
                  <dl className="report-spec-list">
                    <div className="spec-row">
                      <dt>{isEn ? "Surface Morphology" : "Morfología de superficie"}</dt>
                      <dd>{activeRegion.topologyGeomorphology.surfaceType}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Slope & Roughness" : "Pendiente y rugosidad"}</dt>
                      <dd>{activeRegion.topologyGeomorphology.slope} · {activeRegion.topologyGeomorphology.roughness}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Bearing Capacity" : "Capacidad portante"}</dt>
                      <dd>{activeRegion.topologyGeomorphology.bearingCapacity}</dd>
                    </div>
                  </dl>
                  <div className="report-note-box">
                    <strong>{isEn ? "Rover & Lander Risk:" : "Riesgo para Rovers y Aterrizaje:"}</strong> {activeRegion.topologyGeomorphology.roverRisk}
                  </div>
                </section>

                <section className="report-section-card">
                  <div className="report-card-head">
                    <span className="section-num">02</span>
                    <h3>{isEn ? "Climate, Radiation & Atmosphere" : "Clima, Radiación y Atmósfera"}</h3>
                  </div>
                  <dl className="report-spec-list">
                    <div className="spec-row">
                      <dt>{isEn ? "Diurnal Thermal Cycle" : "Oscilación térmica día/noche"}</dt>
                      <dd>{activeRegion.climateEnvironment.tempDayNight}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Solar Insolation & UV" : "Insolación solar y UV"}</dt>
                      <dd>{activeRegion.climateEnvironment.solarInsolation} · {activeRegion.uvIndex}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Atmospheric Density" : "Densidad atmosférica"}</dt>
                      <dd>{activeRegion.climateEnvironment.atmosphericDensity}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Aeolian Dynamics" : "Dinámica eólica y desecación"}</dt>
                      <dd>{activeRegion.climateEnvironment.windDesiccation}</dd>
                    </div>
                  </dl>
                </section>

                <section className="report-section-card">
                  <div className="report-card-head">
                    <span className="section-num">03</span>
                    <h3>{isEn ? "In-Situ Resource Utilization (ISRU)" : "Recursos In-Situ Disponibles (ISRU)"}</h3>
                    <span className="report-rating-pill">{activeRegion.availableResourcesIsru.resourceRating}</span>
                  </div>
                  <dl className="report-spec-list">
                    <div className="spec-row">
                      <dt>{isEn ? "Water & Volatiles" : "Extracción hídrica"}</dt>
                      <dd>{activeRegion.availableResourcesIsru.waterExtraction}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Construction & Sintering" : "Construcción y sinterizado"}</dt>
                      <dd>{activeRegion.availableResourcesIsru.mineralsForConstruction}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Thermal Storage" : "Almacenamiento térmico"}</dt>
                      <dd>{activeRegion.availableResourcesIsru.thermalStorage}</dd>
                    </div>
                  </dl>
                </section>

                <section className="report-section-card">
                  <div className="report-card-head">
                    <span className="section-num">04</span>
                    <h3>{isEn ? "Landing, Base & EVA Suitability" : "Aptitud de Aterrizaje, Bases y EVA"}</h3>
                  </div>
                  <dl className="report-spec-list">
                    <div className="spec-row">
                      <dt>{isEn ? "Landing Site Rationale" : "Sitio de aterrizaje"}</dt>
                      <dd>{activeRegion.futureLandingBaseSuitability.landingSiteRationale}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Habitats & Construction" : "Construcción y hábitats"}</dt>
                      <dd>{activeRegion.futureLandingBaseSuitability.baseConstructionRationale}</dd>
                    </div>
                    <div className="spec-row">
                      <dt>{isEn ? "Human EVA Rehearsals" : "Operaciones humanas (EVA)"}</dt>
                      <dd>{activeRegion.futureLandingBaseSuitability.evaTestingRationale}</dd>
                    </div>
                  </dl>
                  <div className="report-note-box report-note-solid">
                    <strong>{isEn ? "Verifiable Extraterrestrial Twin:" : "Analogía Extraterrestre Sólida:"}</strong> {activeRegion.solidAnalogy}
                  </div>
                </section>
              </div>

              <section className="report-section-card report-section-full">
                <div className="report-card-head">
                  <span className="section-num">05</span>
                  <h3>
                    {isEn
                      ? "Epistemic Rigor Clause: Where the Earth Analogy Fails"
                      : "Cláusula de Rigor Epistemológico: Límites Físicos de la Analogía"}
                  </h3>
                </div>
                <div className="report-limits-grid">
                  <div className="limit-card">
                    <strong>{isEn ? "Gravitational Limit" : "Límite Gravitacional"}</strong>
                    <p>{activeRegion.whereAnalogyFails.gravityLimit}</p>
                  </div>
                  <div className="limit-card">
                    <strong>{isEn ? "Atmospheric Pressure Limit" : "Límite de Presión y Atmósfera"}</strong>
                    <p>{activeRegion.whereAnalogyFails.atmospherePressureLimit}</p>
                  </div>
                  <div className="limit-card">
                    <strong>{isEn ? "Cosmic Radiation Limit" : "Límite de Radiación Cósmica"}</strong>
                    <p>{activeRegion.whereAnalogyFails.radiationLimit}</p>
                  </div>
                  <div className="limit-card">
                    <strong>{isEn ? "Biological Background Limit" : "Límite Biológico Terrestre"}</strong>
                    <p>{activeRegion.whereAnalogyFails.biologicalLimit}</p>
                  </div>
                </div>
                <div className="report-mitigation-banner">
                  <strong>{isEn ? "Instrument Mitigation Protocol:" : "Protocolo de Mitigación Instrumental:"}</strong>{" "}
                  <span>{activeRegion.whereAnalogyFails.mitigationProtocol}</span>
                </div>
              </section>
            </div>

            <footer className="modal-footer-bar">
              <span className="modal-footer-brand">
                {isEn
                  ? "ANALOGX ENGINE · AUDITED SCIENTIFIC VERIFICATION · NASA SPACE APPS 2026"
                  : "ANALOGX ENGINE · VERIFICACIÓN CIENTÍFICA AUDITADA · NASA SPACE APPS 2026"}
              </span>
              <div className="report-footer-actions print-hide">
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setReportModalOpen(false)}
                >
                  {isEn ? "Close" : "Cerrar"}
                </button>
                <button
                  type="button"
                  className="modal-print-btn"
                  onClick={() => window.print()}
                >
                  {isEn ? "Print / Save PDF" : "Imprimir / Guardar PDF"}
                </button>
              </div>
            </footer>
          </article>
        </div>
      )}
    </main>
  );
}
