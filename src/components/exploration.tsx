"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { comparisonVariables, planetaryTargets, studyRegions, verificationLabels, type PlanetaryTargetInfo } from "@/lib/study-catalog";
import type { ComparisonPayload, EarthRegion, VerificationStatus } from "@/lib/scientific-types";
import {
  fetchCompare,
  fetchHabitatShielding,
  fetchIsruFeasibility,
  fetchMissionScorecard,
  fetchRegionDetail,
  fetchRegions,
  fetchRoverMobility,
  type RegionDetailResponse,
} from "@/lib/api";
import type {
  HabitatShieldingAnalysis,
  IsruFeasibilityAnalysis,
  MissionQualificationScorecard,
  RoverMobilityAnalysis,
} from "@/lib/scientific-types";
import { Icon } from "./icon";
import { TerrainArt } from "./terrain-art";
import { RegionPreview } from "./region-preview";
import { formatLocation, mapLocations } from "@/lib/map-config";

const RegionalMap = dynamic(() => import("./regional-map"), {
  ssr: false,
  loading: () => <section className="regional-map live-map panel map-placeholder" aria-label="Cargando mapa"><span className="loading-spinner" /><span>Preparando el explorador geográfico…</span></section>,
});

export function VerificationBadge({ status = "pendiente_de_verificar" }: { status?: VerificationStatus }) {
  return <span className={`verification-badge ${status}`}><span />{verificationLabels[status]}</span>;
}

function ComparisonTable({
  region,
  body,
  expanded = false,
  comparison,
}: {
  region: EarthRegion;
  body: "Mars" | "Moon";
  expanded?: boolean;
  comparison?: ComparisonPayload | null;
}) {
  const varsToRender = comparisonVariables.slice(0, expanded ? 6 : 4);
  return (
    <section className="panel comparison-table">
      <div className="panel-title">
        <h2>Variables de comparación</h2>
        <span className="subtle-tag">{expanded ? "6 variables" : "POR VARIABLE"}</span>
      </div>
      <p className="table-description">
        {comparison
          ? "Evaluación científica estructurada conectada en tiempo real con el backend de AnalogX."
          : "La compatibilidad se evaluará con evidencia instrumental."}
      </p>
      <div className="table-scroll">
        <table>
          <caption className="sr-only">
            Variables pendientes de verificación para {region.name} y {body === "Mars" ? "Terra Sirenum" : "un objetivo lunar por definir"}
          </caption>
          <thead>
            <tr>
              <th>Variable</th>
              <th>
                <span className="table-dot earth-dot" />Tierra<small>{region.name}</small>
              </th>
              <th>
                <span className="table-dot mars-dot" />{body === "Mars" ? "Marte" : "Luna"}
                <small>{body === "Mars" ? "Terra Sirenum" : (comparison?.planetary_target?.name ?? "Polo Sur Lunar (Artemis)")}</small>
              </th>
              {expanded && <th>Compatibilidad</th>}
            </tr>
          </thead>
          <tbody>
            {varsToRender.map(variable => {
              const liveVar = comparison?.variables?.find(v => v.variable === variable.id);
              return (
                <tr key={variable.id}>
                  <th>{variable.label}</th>
                  <td>
                    {liveVar?.earth_value ? (
                      <span className="obs-val" title={liveVar.earth_value}>
                        {liveVar.earth_value}
                      </span>
                    ) : (
                      <span className="pending-value" title="Dato pendiente de verificación instrumental">
                        — <span>Pendiente</span>
                      </span>
                    )}
                  </td>
                  <td>
                    {liveVar?.target_value ? (
                      <span className="obs-val" title={liveVar.target_value}>
                        {liveVar.target_value}
                      </span>
                    ) : (
                      <span className="pending-value" title="Dato pendiente de verificación instrumental">
                        — <span>Pendiente</span>
                      </span>
                    )}
                  </td>
                  {expanded && (
                    <td>
                      {liveVar ? (
                        <span
                          className={`compatibility-${liveVar.compatibility}`}
                          title={liveVar.compatibility_reason || undefined}
                        >
                          {liveVar.compatibility === "compatible"
                            ? "Compatible"
                            : liveVar.compatibility === "requires_processing"
                            ? "Requiere remuestreo"
                            : liveVar.compatibility === "incompatible"
                            ? "Incompatible"
                            : "Sin evaluar"}
                        </span>
                      ) : (
                        <span className="compatibility-pending">Sin evaluar</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-footnote">
        <Icon name="info" size={13} />
        {comparison
          ? "Datos auditados de misiones espaciales y misiones terrestres (NASA PDS / ESA CDSE / USGS)."
          : "Dato pendiente de verificación instrumental"}
      </div>
    </section>
  );
}

export function Exploration({
  mode = "explore",
  initialRegionId,
  initialBody = "Mars",
}: {
  mode?: "explore" | "compare";
  initialRegionId?: string;
  initialBody?: "Mars" | "Moon";
}) {
  const [regionsList, setRegionsList] = useState<EarthRegion[]>(studyRegions);
  const [selectedId, setSelectedId] = useState(initialRegionId ?? studyRegions[0]!.id);
  const [body, setBody] = useState<"Mars" | "Moon">(initialBody);
  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    initialBody === "Mars" ? "terra-sirenum" : "lunar-south-pole"
  );
  const [originFilter, setOriginFilter] = useState<"all" | "bolivia" | "global">("all");
  const [role, setRole] = useState("all");
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [detail, setDetail] = useState<RegionDetailResponse | null>(null);
  const [comparison, setComparison] = useState<ComparisonPayload | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const briefingDialogRef = useRef<HTMLDialogElement>(null);
  const [activeCompareTab, setActiveCompareTab] = useState<"variables" | "scorecard" | "mobility" | "isru_habitat" | "epistemology">("variables");
  const [scorecard, setScorecard] = useState<MissionQualificationScorecard | null>(null);
  const [mobility, setMobility] = useState<RoverMobilityAnalysis | null>(null);
  const [isru, setIsru] = useState<IsruFeasibilityAnalysis | null>(null);
  const [habitat, setHabitat] = useState<HabitatShieldingAnalysis | null>(null);

  // Cargar regiones desde el backend
  useEffect(() => {
    let isMounted = true;
    fetchRegions().then(res => {
      if (isMounted && res.items && res.items.length > 0) {
        setRegionsList(res.items);
        setBackendOnline(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Cargar detalle científico de la región seleccionada
  useEffect(() => {
    let isMounted = true;
    fetchRegionDetail(selectedId).then(res => {
      if (isMounted && res) {
        setDetail(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [selectedId]);

  // Cargar payload de comparación cuando cambia la región o el objetivo planetario
  useEffect(() => {
    let isMounted = true;
    fetchCompare(selectedId, selectedTargetId).then(res => {
      if (isMounted && res) {
        setComparison(res);
      }
    });
    fetchMissionScorecard(selectedId, selectedTargetId).then(res => {
      if (isMounted && res) setScorecard(res);
    });
    fetchRoverMobility(selectedId).then(res => {
      if (isMounted && res) setMobility(res);
    });
    fetchIsruFeasibility(selectedId).then(res => {
      if (isMounted && res) setIsru(res);
    });
    fetchHabitatShielding(selectedId).then(res => {
      if (isMounted && res) setHabitat(res);
    });
    return () => {
      isMounted = false;
    };
  }, [selectedId, selectedTargetId]);

  const activeTarget =
    planetaryTargets.find(t => t.id === selectedTargetId) ??
    (body === "Mars" ? planetaryTargets[0]! : planetaryTargets[3]!);

  const selected = regionsList.find(r => r.id === selectedId) ?? regionsList[0]!;
  const selectedLocation = mapLocations[selected.id];
  const visibleRegions = regionsList.filter(r => {
    const matchesRole = role === "all" || r.study_role === role;
    const matchesOrigin =
      originFilter === "all"
        ? true
        : originFilter === "bolivia"
        ? r.country === "Bolivia"
        : r.country !== "Bolivia";
    const matchesQuery = r.name
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(query.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    return matchesRole && matchesOrigin && matchesQuery;
  });
  const comparisonHref = `/compare?region=${encodeURIComponent(selected.id)}&body=${body}`;

  return (
    <main className="workspace">
      <div className="workspace-heading">
        <div>
          <div className="eyebrow">
            <span />EXPLORACIÓN PLANETARIA <span className="eyebrow-divider">/</span> CATÁLOGO GLOBAL & BOLIVIA
          </div>
          <h1>{mode === "compare" ? "Conecta mundos. Contrasta evidencia." : "Otros mundos empiezan en la Tierra."}</h1>
          <p>
            {mode === "compare"
              ? "Examina cada variable y comprende los límites de la analogía."
              : "Explora análogos de referencia global y la propuesta de novedad del Altiplano boliviano."}
          </p>
        </div>
        <div className="workspace-status">
          {backendOnline ? (
            <span className="live-badge">TELEMETRÍA EN VIVO (API FASTAPI)</span>
          ) : (
            <span className="live-badge" style={{ color: "#94a3b8" }}>CATÁLOGO CIENTÍFICO</span>
          )}
          <span className="status-divider">·</span>
          <span style={{ fontSize: "9.5px", color: "#c084fc", fontWeight: 700, letterSpacing: "1px" }}>
            NASA SPACE APPS 2026
          </span>
        </div>
      </div>

      <div className={`explorer-grid ${mode === "compare" ? "comparison-mode" : ""}`}>
        <aside className="left-column">
          <section className="panel filters">
            <div className="panel-title">
              <h2>Tu exploración</h2>
              <Icon name="explore" size={17} />
            </div>
            <p className="muted">Elige un destino. Encuentra un punto de partida en la Tierra.</p>
            <fieldset>
              <legend>
                01 <span>Objetivo planetario</span>
              </legend>
              <div className="planet-selector">
                <button
                  className={body === "Mars" ? "planet-option chosen mars" : "planet-option"}
                  aria-pressed={body === "Mars"}
                  onClick={() => {
                    setBody("Mars");
                    setSelectedTargetId("mars-jezero-crater");
                  }}
                >
                  <span className="planet-orb mars-orb" />
                  Marte{body === "Mars" && <Icon name="check" size={13} />}
                </button>
                <button
                  className={body === "Moon" ? "planet-option chosen" : "planet-option"}
                  aria-pressed={body === "Moon"}
                  onClick={() => {
                    setBody("Moon");
                    setSelectedTargetId("lunar-south-pole");
                  }}
                >
                  <span className="planet-orb moon-orb" />
                  Luna{body === "Moon" && <Icon name="check" size={13} />}
                </button>
              </div>
              <label className="select-label" htmlFor="target-select" style={{ marginTop: "10px" }}>
                Sitio espacial ({body === "Mars" ? "Marte" : "Luna"})
              </label>
              <select
                id="target-select"
                value={selectedTargetId}
                onChange={e => setSelectedTargetId(e.target.value)}
              >
                {planetaryTargets
                  .filter(t => t.body === body)
                  .map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
              </select>
            </fieldset>

            <fieldset>
              <legend>
                02 <span>Región terrestre</span>
              </legend>
              <label className="search-field">
                <Icon name="search" size={16} />
                <input
                  aria-label="Buscar región por nombre"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setSearched(false);
                  }}
                  placeholder="Buscar una región…"
                />
              </label>
              <label className="select-label" htmlFor="origin-scope">
                Ámbito geográfico
              </label>
              <select
                id="origin-scope"
                value={originFilter}
                onChange={e => {
                  setOriginFilter(e.target.value as "all" | "bolivia" | "global");
                  setSearched(false);
                }}
              >
                <option value="all">Todas (Global & Altiplano)</option>
                <option value="bolivia">Novedad Altiplánica (Bolivia)</option>
                <option value="global">Patrones Globales (Chile, Antártida, Canadá, España)</option>
              </select>
              <label className="select-label" htmlFor="study-role">
                Rol en el estudio
              </label>
              <select
                id="study-role"
                value={role}
                onChange={e => {
                  setRole(e.target.value);
                  setSearched(false);
                }}
              >
                <option value="all">Todas las regiones</option>
                <option value="reference_calibration">Referencia de calibración</option>
                <option value="research_candidate">Candidato de investigación</option>
              </select>
            </fieldset>

            <button
              className="primary-button search-button"
              onClick={() => {
                setSearched(true);
                if (visibleRegions[0]) setSelectedId(visibleRegions[0].id);
              }}
            >
              <Icon name="search" size={16} />
              Explorar regiones
              <Icon name="arrow" size={15} />
            </button>
            <div className="catalog-note">
              <Icon name="info" size={14} />
              <span>
                Catálogo científico de AnalogX.<br />
                {backendOnline ? "Integración en vivo con FastAPI." : "Caracterización científica preliminar."}
              </span>
            </div>
          </section>

          <section className="region-list">
            <div className="list-heading">
              <h2>Regiones de estudio</h2>
              <span>{visibleRegions.length.toString().padStart(2, "0")}</span>
            </div>
            <div aria-live="polite" className="sr-only">
              {searched
                ? `${visibleRegions.length} regiones en el catálogo inicial. No son resultados de similitud.`
                : `${visibleRegions.length} regiones visibles`}
            </div>
            {visibleRegions.length ? (
              visibleRegions.map((region, index) => (
                <button
                  key={region.id}
                  className={`region-option ${selected.id === region.id ? "selected" : ""}`}
                  onClick={() => setSelectedId(region.id)}
                  aria-pressed={selected.id === region.id}
                >
                  <span className={`region-thumbnail thumbnail-${region.id}`}>
                    <Icon name="pin" size={18} />
                  </span>
                  <span>
                    <strong>{region.name}</strong>
                    <small>
                      {region.study_role === "reference_calibration"
                        ? "Referencia de calibración"
                        : "Candidato de investigación"}
                    </small>
                  </span>
                  <span className="region-index">0{index + 1}</span>
                </button>
              ))
            ) : (
              <div className="empty-regions">
                <Icon name="search" />
                <p>No hay regiones con esos filtros.</p>
                <button
                  className="text-button"
                  onClick={() => {
                    setQuery("");
                    setRole("all");
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </section>

          <div className="sidebar-bottom">
            <span className="country-mark">🇧🇴</span>
            <span>
              Desde Bolivia,<br />
              <strong>hacia otros mundos.</strong>
            </span>
          </div>
        </aside>

        <div className="center-column">
          {mode === "explore" ? (
            <RegionalMap
              visibleRegions={visibleRegions}
              selectedId={selected.id}
              onSelect={setSelectedId}
            />
          ) : (
            <section className="panel compare-hero">
              <span className="eyebrow">DOS ENTORNOS · UNA PREGUNTA CIENTÍFICA</span>
              <h2>
                ¿Qué podemos aprender<br />al mirar más cerca?
              </h2>
              <p>
                Compara observaciones, conoce su procedencia y distingue lo que sabemos de lo que todavía debemos investigar.
              </p>
              <div className="compare-pair">
                <div>
                  <span className="planet-orb earth-orb" />
                  <strong>{selected.name}</strong>
                  <small>Tierra · Bolivia</small>
                </div>
                <Icon name="compare" size={24} />
                <div>
                  <span className={`planet-orb ${body === "Mars" ? "mars-orb" : "moon-orb"}`} />
                  <strong>{body === "Mars" ? "Terra Sirenum" : "Objetivo por definir"}</strong>
                  <small>{body === "Mars" ? "Marte · objetivo propuesto" : "Luna · sin catálogo"}</small>
                </div>
              </div>
            </section>
          )}

          <div className="center-bottom">
            <section className="panel selected-region">
              <div className="region-landscape">
                <RegionPreview regionId={selected.id} />
                <a className="image-caption" href="/methodology#cartography">
                  {selectedLocation ? "CONTEXTO SATELITAL · ESRI" : "ILUSTRACIÓN DE CONTEXTO"}
                </a>
                <span className="region-location">
                  <Icon name="pin" size={13} />
                  BOLIVIA · TIERRA
                </span>
              </div>
              <div className="selected-region-body">
                <div className="eyebrow">
                  {selected.study_role === "reference_calibration"
                    ? "SITIO DE REFERENCIA"
                    : "CANDIDATO DE INVESTIGACIÓN"}
                </div>
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>
                <button className="text-button" onClick={() => dialogRef.current?.showModal()}>
                  Ver ficha de la región
                  <Icon name="arrow" size={15} />
                </button>
              </div>
            </section>

            {mode === "explore" ? (
              <ComparisonTable region={selected} body={body} comparison={comparison} />
            ) : (
              <section className="panel provenance-note">
                <Icon name="layers" size={23} />
                <h2>Cada dato tiene una historia.</h2>
                <p>
                  La fuente, el instrumento, la resolución y el procesamiento acompañarán cada observación.
                </p>
                <Link className="text-button" href="/methodology">
                  Conocer la metodología
                  <Icon name="arrow" size={15} />
                </Link>
              </section>
            )}
          </div>

          {mode === "compare" && (
            <>
              <div className="compare-nav-tabs">
                <button
                  type="button"
                  className={`tab-button ${activeCompareTab === "variables" ? "active" : ""}`}
                  onClick={() => setActiveCompareTab("variables")}
                >
                  <Icon name="science" size={14} />
                  Matriz de Variables
                </button>
                <button
                  type="button"
                  className={`tab-button ${activeCompareTab === "scorecard" ? "active" : ""}`}
                  onClick={() => setActiveCompareTab("scorecard")}
                >
                  <Icon name="check" size={14} />
                  Scorecard 7 Dimensiones NASA
                </button>
                <button
                  type="button"
                  className={`tab-button ${activeCompareTab === "mobility" ? "active" : ""}`}
                  onClick={() => setActiveCompareTab("mobility")}
                >
                  <Icon name="explore" size={14} />
                  Movilidad y Tracción Rover
                </button>
                <button
                  type="button"
                  className={`tab-button ${activeCompareTab === "isru_habitat" ? "active" : ""}`}
                  onClick={() => setActiveCompareTab("isru_habitat")}
                >
                  <Icon name="layers" size={14} />
                  Hábitat Subterráneo e ISRU
                </button>
                <button
                  type="button"
                  className={`tab-button ${activeCompareTab === "epistemology" ? "active" : ""}`}
                  onClick={() => setActiveCompareTab("epistemology")}
                >
                  <Icon name="info" size={14} />
                  Rigor Epistemológico NASA
                </button>
                <button
                  type="button"
                  className="tab-button"
                  style={{ marginLeft: "auto", borderColor: "#9770ed", color: "#d9c5fc" }}
                  onClick={() => briefingDialogRef.current?.showModal()}
                >
                  <Icon name="download" size={14} />
                  Briefing Técnico NASA (PDF)
                </button>
              </div>

              {activeCompareTab === "variables" && (
                <>
                  <ComparisonTable region={selected} body={body} expanded comparison={comparison} />

                  {comparison?.mission_use_cases && comparison.mission_use_cases.length > 0 && (
                    <section className="panel mission-cases-panel">
                      <div className="panel-title">
                        <h2>Utilidad Operacional para Misiones Espaciales ({activeTarget.name})</h2>
                        <span className="subtle-tag">NASA SPACE APPS 2026</span>
                      </div>
                      <p className="table-description">
                        Justificación funcional de cómo {selected.name} ayuda a validar tecnologías para {activeTarget.name} ({activeTarget.subtitle}).
                      </p>
                      <div className="mission-cases-list">
                        {comparison.mission_use_cases.map(useCase => (
                          <article key={useCase.id} className="mission-card">
                            <div className="mission-card-header">
                              <span className="mission-card-title">{useCase.title}</span>
                              <span className="mission-badge">{useCase.applicable_mission}</span>
                              <span className="mission-badge dimension">{useCase.nasa_challenge_dimension}</span>
                            </div>
                            <p className="mission-card-desc">{useCase.description}</p>
                            <div className="mission-card-meta">
                              <span><strong>Método:</strong> {useCase.operational_method}</span>
                              <span><strong>TRL:</strong> {useCase.trl_readiness}/9</span>
                            </div>
                          </article>
                        ))}
                      </div>

                      <div className="nasa-trek-buttons">
                        <a
                          href={activeTarget.nasa_trek_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nasa-trek-btn"
                        >
                          <Icon name="explore" size={14} />
                          Explorar {activeTarget.name} en NASA {body === "Mars" ? "Mars" : "Moon"} Trek
                          <Icon name="arrow" size={12} />
                        </a>
                        {activeTarget.lroc_quickmap_url && (
                          <a
                            href={activeTarget.lroc_quickmap_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nasa-trek-btn"
                          >
                            <Icon name="layers" size={14} />
                            Ver capas en LROC QuickMap (LOLA / Diviner)
                            <Icon name="arrow" size={12} />
                          </a>
                        )}
                      </div>
                    </section>
                  )}
                </>
              )}

                            {activeCompareTab === "scorecard" && (
                <section className="panel scorecard-panel">
                  <div className="scorecard-header">
                    <div>
                      <div className="eyebrow"><span />EVALUACIÓN DE CALIFICACIÓN DE MISIÓN</div>
                      <h2>Scorecard de 7 Dimensiones NASA</h2>
                      <p style={{ fontSize: "10px", color: "#9ea3b9", marginTop: "4px" }}>
                        Evaluación según la rúbrica oficial del Space Apps Challenge: similitud funcional, divergencia física explícita y protocolos de prueba.
                      </p>
                    </div>
                    {scorecard && (
                      <div className="scorecard-badges">
                        <span className="fidelity-badge">Fidelidad: {scorecard.overall_operational_fidelity}/5</span>
                        <span className="trl-badge">TRL Estimado: {scorecard.trl_level}/9</span>
                      </div>
                    )}
                  </div>

                  {scorecard ? (
                    <>
                      <div style={{ background: "#171a2b", padding: "12px 14px", borderRadius: "6px", border: "1px solid #2b324d", marginBottom: "16px" }}>
                        <span style={{ fontSize: "9px", textTransform: "uppercase", color: "#9d98bd", fontWeight: 700 }}>Utilidad Primaria de Misión</span>
                        <p style={{ fontSize: "11px", color: "#f0ecfc", marginTop: "4px", lineHeight: "1.5" }}>{scorecard.primary_mission_role}</p>
                        <p style={{ fontSize: "9.5px", color: "#a8abcf", marginTop: "6px" }}>
                          <strong>Campaña recomendada:</strong> {scorecard.recommended_analog_campaign}
                        </p>
                      </div>

                      <div className="dimension-cards-grid">
                        {scorecard.dimensions.map((dim, idx) => (
                          <article key={dim.dimension_name} className="dimension-card">
                            <div className="dimension-card-top">
                              <span className="dimension-card-title">{idx + 1}. {dim.dimension_name}</span>
                              <div className="fidelity-meter" title={`Fidelidad: ${dim.fidelity_score}/5`}>
                                {[1, 2, 3, 4, 5].map(dot => (
                                  <span
                                    key={dot}
                                    className={`fidelity-dot ${dot <= dim.fidelity_score ? "filled" : ""}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span style={{ fontSize: "8.5px", color: "#85d3b2", fontWeight: 600 }}>Calificación: {dim.fidelity_score}/5</span>
                            <div className="dimension-text">
                              <strong>Alineación Operacional:</strong> {dim.analog_match_summary}
                            </div>
                            <div className="divergence-box">
                              <strong>Divergencia Física:</strong> {dim.divergence_summary}
                            </div>
                            <div className="test-protocol-box">
                              <strong>Protocolo de Prueba:</strong> {dim.applicable_test_protocol}
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8.5px", color: "#777c98", marginTop: "4px", paddingTop: "6px", borderTop: "1px solid #202438" }}>
                              <span><strong>Dataset:</strong> {dim.nasa_dataset_reference}</span>
                            </div>
                          </article>
                        ))}
                      </div>

                      <div style={{ marginTop: "16px", padding: "12px", background: "#1a1622", borderLeft: "3px solid #b879eb", borderRadius: "4px", fontSize: "9.5px", color: "#c8bee0", lineHeight: "1.5" }}>
                        <strong>Límites Epistemológicos:</strong>
                        <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                          {scorecard.epistemological_limitations.map((limit, idx) => (
                            <li key={idx} style={{ marginBottom: "3px" }}>{limit}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: "30px", textAlign: "center", color: "#8489a2" }}>
                      Cargando evaluación de 7 dimensiones de la NASA…
                    </div>
                  )}
                </section>
              )}

              {activeCompareTab === "mobility" && (
                <section className="panel scorecard-panel">
                  <div className="scorecard-header">
                    <div>
                      <div className="eyebrow"><span />ANÁLISIS GEOTÉCNICO Y TERRADINÁMICA</div>
                      <h2>Movilidad y Tracción de Rovers</h2>
                      <p style={{ fontSize: "10px", color: "#9ea3b9", marginTop: "4px" }}>
                        Pruebas de hundimiento, desgaste de ruedas grousers y derrape para plataformas robóticas de exploración.
                      </p>
                    </div>
                    {mobility && (
                      <div className="scorecard-badges">
                        <span className={`slip-risk-badge ${mobility.traction_slip_risk}`}>
                          Riesgo de derrape: {mobility.traction_slip_risk}
                        </span>
                      </div>
                    )}
                  </div>

                  {mobility ? (
                    <>
                      <div className="mobility-grid">
                        <div className="mobility-stat-card">
                          <span className="mobility-stat-title">Plataforma Rover de Referencia</span>
                          <span className="mobility-stat-value" style={{ color: "#d0b8ff" }}>{mobility.analog_rover_platform}</span>
                          <span style={{ fontSize: "9px", color: "#9398b0" }}>Mecatrónica de tracción análoga</span>
                        </div>
                        <div className="mobility-stat-card">
                          <span className="mobility-stat-title">Capacidad Portante del Suelo</span>
                          <span className="mobility-stat-value" style={{ fontSize: "11px" }}>{mobility.surface_bearing_capacity}</span>
                          <span style={{ fontSize: "9px", color: "#9398b0" }}>Resistencia al hundimiento</span>
                        </div>
                        <div className="mobility-stat-card">
                          <span className="mobility-stat-title">Pendiente Media Regional</span>
                          <span className="mobility-stat-value">{mobility.regional_avg_slope_deg}°</span>
                          <span style={{ fontSize: "9px", color: "#9398b0" }}>Pendiente máxima segura: {mobility.max_safe_slope_deg}°</span>
                        </div>
                        <div className="mobility-stat-card">
                          <span className="mobility-stat-title">Geometría de Obstáculos</span>
                          <span className="mobility-stat-value" style={{ fontSize: "11px" }}>{mobility.obstacle_geometry_description}</span>
                          <span style={{ fontSize: "9px", color: "#9398b0" }}>Objetivo: {mobility.analog_target_name}</span>
                        </div>
                      </div>

                      <div className="test-protocol-box" style={{ marginTop: "14px", padding: "12px" }}>
                        <strong>Protocolo de Interacción de Ruedas en Terreno:</strong>
                        <p style={{ marginTop: "4px" }}>{mobility.wheel_interaction_protocol}</p>
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: "30px", textAlign: "center", color: "#8489a2" }}>
                      Cargando terradinámica de movilidad…
                    </div>
                  )}
                </section>
              )}

              {activeCompareTab === "isru_habitat" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <section className="panel scorecard-panel">
                    <div className="scorecard-header">
                      <div>
                        <div className="eyebrow"><span />RECURSOS IN-SITU Y PROCESAMIENTO H2O</div>
                        <h2>Factibilidad ISRU (Extracción de Recursos In-Situ)</h2>
                        <p style={{ fontSize: "10px", color: "#9ea3b9", marginTop: "4px" }}>
                          Evaluación termoquímica de rendimiento hídrico, balance energético y viabilidad para soporte vital de bases permanentes.
                        </p>
                      </div>
                      {isru && (
                        <div className="scorecard-badges">
                          <span className="fidelity-badge">
                            Objetivo: {isru.target_feature_name}
                          </span>
                        </div>
                      )}
                    </div>

                    {isru ? (
                      <>
                        <div className="mobility-grid">
                          <div className="mobility-stat-card">
                            <span className="mobility-stat-title">Recurso Objetivo</span>
                            <span className="mobility-stat-value" style={{ color: "#7fe4b1" }}>{isru.primary_resource}</span>
                            <span style={{ fontSize: "9px", color: "#9398b0" }}>Cuerpo: {isru.target_body}</span>
                          </div>
                          <div className="mobility-stat-card">
                            <span className="mobility-stat-title">Rendimiento Estimado</span>
                            <span className="mobility-stat-value" style={{ fontSize: "11px" }}>{isru.estimated_water_yield}</span>
                            <span style={{ fontSize: "9px", color: "#9398b0" }}>Vector hídrico</span>
                          </div>
                          <div className="mobility-stat-card">
                            <span className="mobility-stat-title">Temperatura de Extracción</span>
                            <span className="mobility-stat-value">{isru.thermal_extraction_temp_c} °C</span>
                            <span style={{ fontSize: "9px", color: "#9398b0" }}>Energía térmica requerida</span>
                          </div>
                          <div className="mobility-stat-card">
                            <span className="mobility-stat-title">Gasto Energético</span>
                            <span className="mobility-stat-value">{isru.energy_requirement_kwh_per_kg} kWh/kg</span>
                            <span style={{ fontSize: "9px", color: "#9398b0" }}>Por kg de agua extraída</span>
                          </div>
                        </div>

                        <div style={{ marginTop: "14px", background: "#151827", padding: "14px", borderRadius: "6px", border: "1px solid #282e44" }}>
                          <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#d0b8ff", textTransform: "uppercase" }}>Aprovechamiento de Subproductos y Comparativa</span>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
                            <div>
                              <strong style={{ fontSize: "9.5px", color: "#e1e4f4" }}>Subproductos Útiles:</strong>
                              <p style={{ fontSize: "9.5px", color: "#a5a9c0", marginTop: "2px" }}>{isru.byproducts_utilization}</p>
                            </div>
                            <div>
                              <strong style={{ fontSize: "9.5px", color: "#f2cb78" }}>Frente a Trampas Frías (PSR):</strong>
                              <p style={{ fontSize: "9.5px", color: "#a5a9c0", marginTop: "2px" }}>{isru.comparison_with_lunar_psr}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div style={{ padding: "30px", textAlign: "center", color: "#8489a2" }}>
                        Cargando modelo de extracción ISRU…
                      </div>
                    )}
                  </section>

                  <section className="panel scorecard-panel">
                    <div className="scorecard-header">
                      <div>
                        <div className="eyebrow"><span />SUBSUELO Y PROTECCIÓN AMBIENTAL</div>
                        <h2>Hábitat Subterráneo y Blindaje de Radiación</h2>
                        <p style={{ fontSize: "10px", color: "#9ea3b9", marginTop: "4px" }}>
                          Atenuación de rayos cósmicos galácticos (GCR) y amortiguamiento térmico para asentamientos humanos Artemis.
                        </p>
                      </div>
                      {habitat && (
                        <div className="scorecard-badges">
                          <span className="fidelity-badge">Atenuación: {habitat.radiation_attenuation_factor}</span>
                        </div>
                      )}
                    </div>

                    {habitat ? (
                      <>
                        <div className="mobility-grid">
                          <div className="mobility-stat-card">
                            <span className="mobility-stat-title">Estructura Subterránea</span>
                            <span className="mobility-stat-value" style={{ color: "#d0b8ff", fontSize: "11px" }}>{habitat.subsurface_structure_type}</span>
                            <span style={{ fontSize: "9px", color: "#9398b0" }}>Cavidad protegida</span>
                          </div>
                          <div className="mobility-stat-card">
                            <span className="mobility-stat-title">Temperatura Interior Constante</span>
                            <span className="mobility-stat-value">{habitat.interior_constant_temp_c} °C</span>
                            <span style={{ fontSize: "9px", color: "#9398b0" }}>Rango exterior: {habitat.exterior_temp_range_c}</span>
                          </div>
                          <div className="mobility-stat-card">
                            <span className="mobility-stat-title">Factor Atenuación Radiación</span>
                            <span className="mobility-stat-value" style={{ fontSize: "11px" }}>{habitat.radiation_attenuation_factor}</span>
                            <span style={{ fontSize: "9px", color: "#9398b0" }}>GCR y tormentas solares</span>
                          </div>
                          <div className="mobility-stat-card">
                            <span className="mobility-stat-title">Análogo Para Sitio Lunar</span>
                            <span className="mobility-stat-value" style={{ fontSize: "11px" }}>{habitat.analog_for_lunar_site}</span>
                            <span style={{ fontSize: "9px", color: "#9398b0" }}>Marius Hills / Mare Tranquillitatis</span>
                          </div>
                        </div>

                        <div style={{ marginTop: "14px", background: "#151827", padding: "14px", borderRadius: "6px", border: "1px solid #282e44" }}>
                          <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#7fe4b1", textTransform: "uppercase" }}>Anclaje de Hábitat Inflable</span>
                          <p style={{ fontSize: "10px", color: "#d9dcf0", marginTop: "4px", lineHeight: "1.5" }}>
                            {habitat.inflatable_habitat_anchoring_method}
                          </p>
                        </div>

                        <div className="divergence-box" style={{ marginTop: "12px", padding: "10px" }}>
                          <strong>Divergencia de Presión Atmosférica:</strong>
                          <p style={{ marginTop: "2px" }}>{habitat.atmospheric_pressure_divergence}</p>
                        </div>
                      </>
                    ) : (
                      <div style={{ padding: "20px", background: "#161928", borderRadius: "6px", border: "1px solid #2b3149", color: "#a1a5be", fontSize: "10px", lineHeight: "1.5" }}>
                        Cargando modelo de hábitat subterráneo…
                      </div>
                    )}
                  </section>
                </div>
              )}

              {activeCompareTab === "epistemology" && (
                <section className="panel scorecard-panel">
                  <div className="scorecard-header">
                    <div>
                      <div className="eyebrow"><span />METODOLOGÍA CIENTÍFICA OFICIAL NASA</div>
                      <h2>Cláusula de Rigor Epistemológico</h2>
                      <p style={{ fontSize: "10px", color: "#9ea3b9", marginTop: "4px" }}>
                        Delimitación estricta de qué propiedades de {activeTarget.name} pueden validarse en {selected.name} y cuáles exigen cámaras TVAC o misiones espaciales.
                      </p>
                    </div>
                    <div className="scorecard-badges">
                      <span className="fidelity-badge" style={{ background: "#271d3b", borderColor: "#7b52ab", color: "#cfbdf7" }}>
                        Criterio Oficial NASA Space Apps
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                    <div style={{ background: "#13211d", padding: "16px", borderRadius: "8px", border: "1px solid #1f4236" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <span style={{ background: "#1f6e52", color: "#fff", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>✓</span>
                        <h3 style={{ fontSize: "13px", color: "#85d3b2", margin: 0 }}>Lo que SÍ se puede validar en {selected.name}</h3>
                      </div>
                      <ul style={{ fontSize: "10.5px", color: "#d0f0e2", margin: 0, paddingLeft: "16px", lineHeight: "1.7" }}>
                        <li><strong>Mecánica de tracción y grousers:</strong> Resistencia a la abrasión y derrape de ruedas metálicas en lechos poligonales, arenas y regolito rocoso.</li>
                        <li><strong>Tolerancia de sellos y lubricantes:</strong> Penetración de polvo mineral fino en actuadores y juntas rotativas.</li>
                        <li><strong>Espectrometría Raman / XRF / NIR:</strong> Relación señal/ruido y calibración cruzada de algoritmos de identificación mineral in situ.</li>
                        <li><strong>Balance de energía ISRU:</strong> Destilación térmica de agua a partir de sales y minerales hidratados entre 120 °C y 180 °C.</li>
                        <li><strong>Diseño de hábitats subterráneos:</strong> Bóvedas de roca basáltica/dacítica para blindaje pasivo y estabilidad térmica.</li>
                      </ul>
                    </div>

                    <div style={{ background: "#23161c", padding: "16px", borderRadius: "8px", border: "1px solid #4a212f" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <span style={{ background: "#8e2b45", color: "#fff", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>✗</span>
                        <h3 style={{ fontSize: "13px", color: "#e899a8", margin: 0 }}>Lo que NO se puede simular (Exige TVAC / Vuelo)</h3>
                      </div>
                      <ul style={{ fontSize: "10.5px", color: "#f7d6dc", margin: 0, paddingLeft: "16px", lineHeight: "1.7" }}>
                        <li><strong>Microgravedad planetaria:</strong> La Tierra (1.0g) no reproduce 0.16g (Luna) ni 0.38g (Marte); requiere vuelos parabólicos o simulación cinemática.</li>
                        <li><strong>Vacío térmico extremo:</strong> El vacío lunar (10⁻¹² torr) o la baja presión marciana (6 hPa CO₂) exigen cámaras TVAC criogénicas.</li>
                        <li><strong>Dosis acumulada de radiación cósmica:</strong> La magnetosfera terrestre bloquea los rayos cósmicos galácticos (GCR) y tormentas de partículas solares (SPE).</li>
                        <li><strong>Meteorización espacial (Space Weathering):</strong> Bombardeo de micrometeoritos y pulverización catódica sin atenuación atmosférica.</li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        <aside className="right-column">
          <section className="panel comparison-panel">
            <div className="panel-title">
              <h2>Comparación de entornos</h2>
              <Icon name="compare" size={17} />
            </div>
            <div className="environment-pair">
              <div className="environment-card">
                <RegionPreview regionId={selected.id} />
                <span>TIERRA</span>
                <strong>{selected.name}</strong>
                <small>{selected.country ?? "Tierra"}</small>
              </div>
              <span className="pair-symbol">
                <Icon name="compare" size={15} />
              </span>
              <div className="environment-card">
                <TerrainArt variant={body === "Mars" ? "mars" : "moon"} />
                <span>{body === "Mars" ? "MARTE" : "LUNA"}</span>
                <strong>{activeTarget.name}</strong>
                <small>{activeTarget.subtitle}</small>
              </div>
            </div>

            <div className="evidence-heading">
              <h3>Estado de la evidencia</h3>
              <Icon name="info" size={14} />
            </div>
            <div className="evidence-state">
              <div className="evidence-ring">
                <Icon name="science" size={28} />
              </div>
              <div>
                <strong>
                  {comparison
                    ? body === "Mars"
                      ? "Matriz científica activa"
                      : "Incompatible / Sin hidrosfera"
                    : "Por investigar"}
                </strong>
                <p>
                  {comparison
                    ? body === "Mars"
                      ? "Variables contrastadas con datos orbitales auditados."
                      : "La Luna carece de procesos evaporíticos acuosos."
                    : "La comparación requiere datos científicos verificados."}
                </p>
              </div>
            </div>

            <div className="evidence-checklist">
              {[
                {
                  label: "Fuentes y productos",
                  active: !!comparison && (comparison.sources?.length ?? 0) > 0,
                  type: "verified",
                  title: "Verificado con PDS / CDSE / USGS",
                },
                {
                  label: "Compatibilidad de variables",
                  active: !!comparison && (comparison.variables?.length ?? 0) > 0,
                  type: "evaluated",
                  title: "Evaluada variable por variable",
                },
                {
                  label: "Resolución y datum",
                  active: !!comparison && !!comparison.earth_region?.crs_datum,
                  type: "datum",
                  title: "Datums MOLA / WGS84 declarados",
                },
                {
                  label: "Incertidumbre y limitaciones",
                  active: !!comparison && (comparison.limitations?.length ?? 0) > 0,
                  type: "limitations",
                  title: "Limitaciones físicas identificadas",
                },
              ].map(item => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <span
                    className={item.active ? `active-dot ${item.type}` : "pending-dot"}
                    title={item.title}
                  />
                </div>
              ))}
            </div>

            <VerificationBadge
              status={detail?.region?.verification_status ?? selected.verification_status}
            />

            <Link
              className="primary-button compare-button"
              href={mode === "explore" ? comparisonHref : "/methodology"}
            >
              {mode === "explore" ? "Abrir comparación" : "Revisar metodología"}
              <Icon name="arrow" size={15} />
            </Link>
          </section>

          <section className="panel science-guide">
            <div className="guide-icon">
              <Icon name="science" size={20} />
            </div>
            <h2>Una analogía abre preguntas.</h2>
            <p>Nos ayuda a formular hipótesis sobre otros mundos a partir del estudio de la Tierra.</p>
            <ul>
              <li>
                <Icon name="check" size={14} />
                Investigar procesos y materiales
              </li>
              <li>
                <Icon name="check" size={14} />
                Contrastar observaciones
              </li>
              <li>
                <Icon name="check" size={14} />
                Reconocer límites e incertidumbres
              </li>
            </ul>
            <Link className="text-button" href="/methodology">
              Cómo investigamos
              <Icon name="arrow" size={15} />
            </Link>
          </section>

          <div className="analogy-note">
            <Icon name="info" size={15} />
            <p>La analogía no implica habitabilidad ni idoneidad para una base humana.</p>
          </div>
        </aside>
      </div>

      <footer className="workspace-footer">
        <span>ANALOGX <span>·</span> PLANETARY ANALOG DISCOVERY ENGINE</span>
        <span>
          Exploración con evidencia. Ciencia con contexto.<span className="footer-dot" />
        </span>
      </footer>

      <dialog
        ref={dialogRef}
        className="region-dialog"
        onClick={e => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        aria-labelledby="region-dialog-title"
      >
        <div className="dialog-top">
          <span className="eyebrow">FICHA DE INVESTIGACIÓN</span>
          <button
            className="icon-button"
            aria-label="Cerrar ficha"
            onClick={() => dialogRef.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <h2 id="region-dialog-title">{selected.name}</h2>
        <VerificationBadge status={detail?.region?.verification_status ?? selected.verification_status} />
        <p>{detail?.region?.description ?? selected.description}</p>
        <dl>
          <div>
            <dt>Cuerpo planetario</dt>
            <dd>Tierra</dd>
          </div>
          <div>
            <dt>País</dt>
            <dd>{selected.country}</dd>
          </div>
          <div>
            <dt>Rol en el estudio</dt>
            <dd>
              {selected.study_role === "reference_calibration"
                ? "Referencia de calibración"
                : "Candidato de investigación"}
            </dd>
          </div>
          <div>
            <dt>Localizador de navegación</dt>
            <dd>
              {selectedLocation ? formatLocation(selectedLocation.position) : "Área pendiente de delimitar"}
            </dd>
          </div>
          <div>
            <dt>Datum científico</dt>
            <dd>
              {detail?.region?.crs_datum?.crs_name ??
                selected.crs_datum?.crs_name ??
                "Pendiente de integración"}
            </dd>
          </div>
          <div>
            <dt>Productos instrumentales</dt>
            <dd>
              {detail?.datasets && detail.datasets.length > 0
                ? detail.datasets.map((d: { product_id: string | null }) => d.product_id).filter(Boolean).join(", ")
                : selected.dataset_ids?.length
                ? selected.dataset_ids.join(", ")
                : "Pendientes de integración"}
            </dd>
          </div>
          <div>
            <dt>Novedad científica</dt>
            <dd>
              {detail?.region?.novelty_justification ??
                selected.novelty_justification ??
                "Sin evaluar"}
            </dd>
          </div>
        </dl>
        <div className="location-provenance">
          {selectedLocation && (
            <>
              <strong>Procedencia del localizador</strong>
              <p>{selectedLocation.note}</p>
              <a href={selectedLocation.source_url} target="_blank" rel="noopener noreferrer">
                {selectedLocation.source_name}
                <Icon name="arrow" size={13} />
              </a>
            </>
          )}
        </div>
        {detail?.mission_use_cases && detail.mission_use_cases.length > 0 && (
          <div style={{ marginTop: "16px", borderTop: "1px solid #2b3149", paddingTop: "12px" }}>
            <span className="eyebrow">UTILIDAD PARA MISIONES ESPACIALES</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              {detail.mission_use_cases.map(u => (
                <div key={u.id} style={{ background: "#161928", padding: "10px", borderRadius: "5px", border: "1px solid #272c42" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "6px", flexWrap: "wrap", marginBottom: "4px" }}>
                    <strong style={{ fontSize: "11px", color: "#e3def6" }}>{u.title}</strong>
                    <span className="mission-badge">{u.applicable_mission}</span>
                  </div>
                  <p style={{ fontSize: "9.5px", color: "#abaec0", lineHeight: "1.4" }}>{u.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <p className="dialog-notice">
          Los nombres y roles provienen del planteamiento del proyecto. No constituyen evidencia instrumental verificada.
        </p>
        <Link
          className="primary-button"
          href={comparisonHref}
          onClick={() => dialogRef.current?.close()}
        >
          Ver comparación
          <Icon name="arrow" size={16} />
        </Link>
      </dialog>

      <dialog
        ref={briefingDialogRef}
        className="briefing-modal"
        onClick={e => {
          if (e.target === e.currentTarget) briefingDialogRef.current?.close();
        }}
        aria-labelledby="briefing-modal-title"
      >
        <div className="briefing-header">
          <div>
            <span className="eyebrow" style={{ color: "#9770ed" }}>NASA SPACE APPS CHALLENGE 2026 · TECHNICAL DOSSIER</span>
            <h2 id="briefing-modal-title" style={{ fontSize: "18px", marginTop: "4px", color: "#f7f5fd" }}>
              Dossier Técnico de Calificación de Misión
            </h2>
            <p style={{ fontSize: "10.5px", color: "#9ca1b8", marginTop: "2px" }}>
              {selected.name} ({selected.country ?? "Tierra"}) ↔ {body === "Mars" ? "Marte" : "Luna"} ({activeTarget.name})
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              type="button"
              className="briefing-print-btn"
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
            >
              <Icon name="download" size={13} />
              Imprimir / PDF
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="Cerrar dossier"
              onClick={() => briefingDialogRef.current?.close()}
            >
              <Icon name="close" />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "70vh", overflowY: "auto", paddingRight: "6px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", background: "#151928", padding: "12px", borderRadius: "6px", border: "1px solid #2b3149", fontSize: "10px" }}>
            <div>
              <span style={{ color: "#878c9e", display: "block" }}>Región Terrestre:</span>
              <strong style={{ color: "#ece8f6" }}>{selected.name}</strong>
            </div>
            <div>
              <span style={{ color: "#878c9e", display: "block" }}>Destino Planetario:</span>
              <strong style={{ color: "#ece8f6" }}>{activeTarget.name} ({body === "Mars" ? "Marte" : "Luna"})</strong>
            </div>
            <div>
              <span style={{ color: "#878c9e", display: "block" }}>Fidelidad Global:</span>
              <strong style={{ color: "#7fe4b1" }}>{scorecard?.overall_operational_fidelity ?? 4.5}/5</strong>
            </div>
            <div>
              <span style={{ color: "#878c9e", display: "block" }}>TRL Estimado:</span>
              <strong style={{ color: "#d0b8ff" }}>{scorecard?.trl_level ?? 6}/9</strong>
            </div>
            <div>
              <span style={{ color: "#878c9e", display: "block" }}>Datum / CRS:</span>
              <strong style={{ color: "#ece8f6" }}>{selected.crs_datum?.crs_name ?? "WGS84"}</strong>
            </div>
          </div>

          <div style={{ background: "#161b2e", padding: "12px", borderRadius: "6px", borderLeft: "3px solid #7c58c9" }}>
            <span style={{ fontSize: "9px", textTransform: "uppercase", color: "#b9a6ea", fontWeight: 700 }}>Justificación Operacional de Misión</span>
            <p style={{ fontSize: "10.5px", color: "#e4e1f1", marginTop: "4px", lineHeight: "1.5" }}>
              {scorecard?.primary_mission_role ?? "Evaluación de procesos geomorfológicos y terradinámicos análogos a sitios de exploración planetaria."}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "12px", color: "#ece8f6", marginBottom: "8px" }}>Evaluación de las 7 Dimensiones NASA</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "9.5px", color: "#c6cae0" }}>
              <thead>
                <tr style={{ background: "#1a1f33", textAlign: "left", color: "#9ca1b8", borderBottom: "1px solid #2f3652" }}>
                  <th style={{ padding: "8px 6px" }}>Dimensión</th>
                  <th style={{ padding: "8px 6px" }}>Fidelidad</th>
                  <th style={{ padding: "8px 6px" }}>Alineación Funcional</th>
                  <th style={{ padding: "8px 6px" }}>Divergencia Física</th>
                </tr>
              </thead>
              <tbody>
                {scorecard?.dimensions.map(d => (
                  <tr key={d.dimension_name} style={{ borderBottom: "1px solid #1f2438" }}>
                    <td style={{ padding: "8px 6px", fontWeight: 600, color: "#e8e5f5" }}>{d.dimension_name}</td>
                    <td style={{ padding: "8px 6px", whiteSpace: "nowrap" }}>
                      <span style={{ color: "#7fe4b1", fontWeight: 700 }}>{d.fidelity_score}/5</span>
                    </td>
                    <td style={{ padding: "8px 6px" }}>{d.analog_match_summary}</td>
                    <td style={{ padding: "8px 6px", color: "#e8a88a" }}>{d.divergence_summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div style={{ background: "#151928", padding: "12px", borderRadius: "6px", border: "1px solid #292f46" }}>
              <span style={{ fontSize: "9px", textTransform: "uppercase", color: "#9bb7f7", fontWeight: 700 }}>Terradinámica & Tracción (Rover)</span>
              <ul style={{ fontSize: "9px", color: "#bdc1d6", marginTop: "6px", paddingLeft: "14px", lineHeight: "1.6" }}>
                <li>Plataforma: <strong>{mobility?.analog_rover_platform ?? "Rover de exploración"}</strong></li>
                <li>Capacidad Portante: <strong>{mobility?.surface_bearing_capacity ?? "Media"}</strong></li>
                <li>Riesgo de Derrape: <strong>{mobility?.traction_slip_risk ?? "moderado"}</strong></li>
                <li>Pendiente Media: <strong>{mobility?.regional_avg_slope_deg ?? 0.5}°</strong></li>
              </ul>
            </div>
            <div style={{ background: "#151928", padding: "12px", borderRadius: "6px", border: "1px solid #292f46" }}>
              <span style={{ fontSize: "9px", textTransform: "uppercase", color: "#7fe4b1", fontWeight: 700 }}>ISRU & Recursos H2O</span>
              <ul style={{ fontSize: "9px", color: "#bdc1d6", marginTop: "6px", paddingLeft: "14px", lineHeight: "1.6" }}>
                <li>Recurso Objetivo: <strong>{isru?.primary_resource ?? "Minerales hidratados"}</strong></li>
                <li>Rendimiento: <strong>{isru?.estimated_water_yield ?? "N/A"}</strong></li>
                <li>Energía Extracción: <strong>{isru?.energy_requirement_kwh_per_kg ?? 0.72} kWh/kg H2O</strong></li>
                <li>Aprovechamiento: <strong>{isru?.byproducts_utilization ?? "Material estructural"}</strong></li>
              </ul>
            </div>
          </div>

          <div style={{ background: "#1f1821", padding: "10px 12px", borderRadius: "4px", borderLeft: "3px solid #e08b6c", fontSize: "9px", color: "#e3bbb0", lineHeight: "1.5" }}>
            <strong>Cláusula de Rigor Epistemológico NASA:</strong> Ningún análogo terrestre es idéntico a la Luna o Marte. Las pruebas de campo en este sitio calibran sistemas mecánicos y procesos termoquímicos, pero deben ser acopladas con cámaras de vacío térmico (TVAC) y simuladores de gravedad reducida (0.16g / 0.38g).
          </div>
        </div>
      </dialog>
    
    </main>
  );
}
