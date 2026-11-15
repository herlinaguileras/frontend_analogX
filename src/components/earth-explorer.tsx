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
  const [selectedId, setSelectedId] = useState<string>("salar-de-uyuni");
  const [activeProcess, setActiveProcess] = useState<EarthProcessCategory>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

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
              VISTA DE LA TIERRA · GLOBO SATELITAL 3D
            </span>
            <h1>Catálogo de Análogos Terrestres</h1>
            <p className="earth-subtitle">
              Explora el planeta Tierra en 3D: analiza la topología, medio ambiente, clima extremo y recursos ISRU disponibles para selección de futuras bases y sitios de aterrizaje planetario.
            </p>
          </div>

          <div className="earth-quick-stats">
            <div className="stat-pill">
              <strong>{visibleRegions.length} / {countrySiteCount}</strong>
              <span>
                {countryFilter === "all" ? "Análogos Globales" : `Análogos en ${countryFilter}`}
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
              <span>Mostrando análogos de todo el planeta Tierra</span>
            ) : (
              <span>
                Mostrando únicamente sitios y tarjetas de <strong>{countryFilter}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Filtros de Variables Ambientales (Cambian de color los marcadores del globo 3D) */}
        <div className="process-filter-row">
          <span className="process-filter-label">Filtrar por Fenómeno Físico / Ambiental:</span>
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
                  <span className="process-btn-text">{p.shortLabel}</span>
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
            <span className="card-type-label">FICHA TÉCNICA CIENTÍFICA (SOLO TIERRA)</span>
            <button
              type="button"
              className="card-toggle-btn"
              onClick={() => setIsCardCollapsed(!isCardCollapsed)}
              aria-label={isCardCollapsed ? "Expandir ficha" : "Colapsar ficha"}
            >
              {isCardCollapsed ? "▲ Expandir" : "▼ Minimizar"}
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
                  <div className="card-sat-fallback">Fotografía satelital en calibración</div>
                )}
                <div className="sat-overlay-pill">
                  <span className="sensor-dot" />
                  <span>ESRI ORTOIMAGEN 3D · ALTA RESOLUCIÓN</span>
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
                <span className="section-micro-title">01 · TOPOLOGÍA Y GEOMORFOLOGÍA</span>
                <div className="topology-box">
                  <div className="topology-item">
                    <strong>Relieve:</strong> {activeRegion.topologyGeomorphology.surfaceType}
                  </div>
                  <div className="topology-item">
                    <strong>Pendiente:</strong> {activeRegion.topologyGeomorphology.slope}
                  </div>
                  <div className="topology-item">
                    <strong>Capacidad Portante:</strong> {activeRegion.topologyGeomorphology.bearingCapacity}
                  </div>
                  <div className="topology-item">
                    <strong>Riesgo para Rovers / Aterrizaje:</strong> {activeRegion.topologyGeomorphology.roverRisk}
                  </div>
                </div>
              </div>

              {/* Sección 2: Clima y Extremos Ambientales */}
              <div className="detail-section-block">
                <span className="section-micro-title">02 · CLIMA Y MEDIO AMBIENTE</span>
                <div className="card-metrics-grid">
                  <div className="metric-box">
                    <span className="metric-title">TEMPERATURA DÍA/NOCHE</span>
                    <strong className="metric-val">{activeRegion.tempRange}</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-title">RADIACIÓN SOLAR / UV</span>
                    <strong className="metric-val" style={{ color: "#fbbf24" }}>
                      {activeRegion.uvIndex}
                    </strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-title">PRESIÓN ATMOSFÉRICA</span>
                    <strong className="metric-val">{activeRegion.atmosphericPressure}</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-title">MINERALOGÍA</span>
                    <strong className="metric-val" style={{ fontSize: "10px", lineHeight: "1.3" }}>
                      {activeRegion.primaryMinerals}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Sección 3: Recursos Disponibles in-situ (ISRU) */}
              <div className="detail-section-block">
                <span className="section-micro-title">03 · RECURSOS DISPONIBLES (ISRU)</span>
                <div className="isru-details-box">
                  <div className="isru-item">
                    <strong>Extracción Hídrica:</strong> {activeRegion.availableResourcesIsru.waterExtraction}
                  </div>
                  <div className="isru-item">
                    <strong>Materiales para Construcción:</strong> {activeRegion.availableResourcesIsru.mineralsForConstruction}
                  </div>
                </div>
              </div>

              {/* Sección 4: Selección de Futuros Sitios de Aterrizaje y Bases */}
              <div className="detail-section-block highlight-block">
                <span className="section-micro-title">04 · CRITERIO PARA SITIOS DE ATERRIZAJE Y BASES</span>
                <p className="highlight-text">
                  <strong>Aterrizaje:</strong> {activeRegion.futureLandingBaseSuitability.landingSiteRationale}
                </p>
                <p className="highlight-text">
                  <strong>Base / Hábitat:</strong> {activeRegion.futureLandingBaseSuitability.baseConstructionRationale}
                </p>
              </div>

              {/* Sección 5: Dónde Sólida y Dónde Falla la Analogía */}
              <div className="detail-section-block limits-block">
                <span className="section-micro-title">05 · RIGOR EPISTEMOLÓGICO</span>
                <div className="solid-analogy-box">
                  <strong>Analogía Sólida:</strong> {activeRegion.solidAnalogy}
                </div>
                <div className="limit-failure-box">
                  <strong>Dónde Falla:</strong> {activeRegion.whereAnalogyFails.gravityLimit} · {activeRegion.whereAnalogyFails.atmospherePressureLimit}
                </div>
                <div className="mitigation-box">
                  <strong>Protocolo de Mitigación:</strong> {activeRegion.whereAnalogyFails.mitigationProtocol}
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
                  <span>VER INFORME TÉCNICO COMPLETO</span>
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
            • TARJETAS DE INVESTIGACIÓN: {countryFilter === "all" ? "TODOS LOS PAÍSES" : countryFilter.toUpperCase()} ({visibleRegions.length} SITIOS DISPONIBLES)
          </span>
          <span className="carousel-instruction">
            Haz clic en cualquier tarjeta para que el globo 3D gire hacia ese lugar y abra su ficha técnica
          </span>
        </div>

        {visibleRegions.length === 0 ? (
          <div className="empty-country-panel">
            <div className="empty-country-icon-wrap">
              <Icon name="globe" size={28} />
            </div>
            <div className="empty-country-info">
              <h4>Territorio Satelital en Observación: {countryFilter}</h4>
              <p>
                El globo terráqueo 3D ha navegado y enfocado la cámara orbital sobre las coordenadas geográficas de <strong>{countryFilter}</strong>.
                Este territorio está disponible para telemetría satelital global, sin estaciones análogas terrestres indexadas para el filtro seleccionado.
              </p>
              <button
                type="button"
                className="reset-global-btn"
                onClick={() => {
                  setCountryFilter("all");
                  setActiveProcess("all");
                }}
              >
                ← Restablecer a Todos los Países (Global)
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
                    <span className="carousel-focus-arrow">Girar 3D ↗</span>
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
                <span className="modal-eyebrow">INFORME TÉCNICO DE ANÁLOGO TERRESTRE · RETO NASA 2026</span>
                <h2>{activeRegion.name} ({activeRegion.country})</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setReportModalOpen(false)}
                aria-label="Cerrar informe"
              >
                ✕
              </button>
            </div>

            <div className="modal-scroll-body">
              <div className="report-meta-grid">
                <div className="report-meta-col">
                  <span>ELEVACIÓN:</span> <strong>{activeRegion.elevation}</strong>
                </div>
                <div className="report-meta-col">
                  <span>COORDENADAS:</span> <strong>{activeRegion.coordinatesFormatted} (WGS84)</strong>
                </div>
                <div className="report-meta-col">
                  <span>PRESIÓN ATMOSFÉRICA:</span> <strong>{activeRegion.atmosphericPressure}</strong>
                </div>
                <div className="report-meta-col">
                  <span>DATASETS SATELITALES:</span> <strong>{activeRegion.verifiedDataset}</strong>
                </div>
              </div>

              <div className="report-text-block">
                <h3>1. Topología, Morfología de Superficie y Terradinámica</h3>
                <p>
                  El sitio presenta una superficie clasificada como <em>{activeRegion.topologyGeomorphology.surfaceType}</em>.
                  La pendiente media estimada es de <strong>{activeRegion.topologyGeomorphology.slope}</strong>, con una micro-rugosidad de {activeRegion.topologyGeomorphology.roughness}.
                  La capacidad portante del sustrato es de <strong>{activeRegion.topologyGeomorphology.bearingCapacity}</strong>.
                </p>
                <div className="report-note-box">
                  <strong>Evaluación de Riesgo para Rovers y Aterrizadores:</strong> {activeRegion.topologyGeomorphology.roverRisk}
                </div>
              </div>

              <div className="report-text-block">
                <h3>2. Régimen Climático, Térmico y Radiativo</h3>
                <p>
                  El gradiente de temperatura medido es de <strong>{activeRegion.tempRange}</strong> ({activeRegion.climateEnvironment.tempDayNight}).
                  La insolación solar superficial supera los <strong>{activeRegion.climateEnvironment.solarInsolation}</strong>, con un índice de radiación ultravioleta de <strong>{activeRegion.uvIndex}</strong>.
                  La densidad atmosférica local es de <strong>{activeRegion.climateEnvironment.atmosphericDensity}</strong>, sometida a {activeRegion.climateEnvironment.windDesiccation}.
                </p>
              </div>

              <div className="report-text-block">
                <h3>3. Caracterización de Recursos in-situ (ISRU)</h3>
                <p>
                  <strong>Extracción Hídrica:</strong> {activeRegion.availableResourcesIsru.waterExtraction}
                </p>
                <p>
                  <strong>Materiales para Construcción y Sinterizado:</strong> {activeRegion.availableResourcesIsru.mineralsForConstruction}
                </p>
                <p>
                  <strong>Almacenamiento Térmico y Balanza de Energía:</strong> {activeRegion.availableResourcesIsru.thermalStorage}
                </p>
              </div>

              <div className="report-text-block">
                <h3>4. Criterios de Selección para Lugares de Aterrizaje y Bases Permanentes</h3>
                <p>
                  <strong>Justificación para Selección de Sitio de Aterrizaje:</strong> {activeRegion.futureLandingBaseSuitability.landingSiteRationale}
                </p>
                <p>
                  <strong>Justificación para Construcción y Hábitats:</strong> {activeRegion.futureLandingBaseSuitability.baseConstructionRationale}
                </p>
                <p>
                  <strong>Ensayos de Operaciones Humanas (EVA):</strong> {activeRegion.futureLandingBaseSuitability.evaTestingRationale}
                </p>
              </div>

              <div className="report-text-block">
                <h3>5. Cláusula de Rigor Epistemológico: Dónde Falla la Analogía Terrestre</h3>
                <ul className="report-limits-list">
                  <li>
                    <strong>Límite Gravitacional:</strong> {activeRegion.whereAnalogyFails.gravityLimit}
                  </li>
                  <li>
                    <strong>Límite de Presión y Atmósfera:</strong> {activeRegion.whereAnalogyFails.atmospherePressureLimit}
                  </li>
                  <li>
                    <strong>Límite de Radiación Cósmica:</strong> {activeRegion.whereAnalogyFails.radiationLimit}
                  </li>
                  <li>
                    <strong>Límite Biológico:</strong> {activeRegion.whereAnalogyFails.biologicalLimit}
                  </li>
                  <li>
                    <strong>Protocolo de Mitigación Instrumental:</strong> {activeRegion.whereAnalogyFails.mitigationProtocol}
                  </li>
                </ul>
              </div>
            </div>

            <div className="modal-footer-bar">
              <span className="modal-footer-brand">ANALOGX ENGINE · VERIFICACIÓN CIENTÍFICA AUDITADA</span>
              <button
                type="button"
                className="modal-print-btn"
                onClick={() => window.print()}
              >
                Imprimir / Guardar PDF 🖨
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
