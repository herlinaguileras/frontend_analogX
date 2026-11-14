"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { comparisonVariables, studyRegions, verificationLabels } from "@/lib/study-catalog";
import type { ComparisonPayload, EarthRegion, VerificationStatus } from "@/lib/scientific-types";
import { fetchCompare, fetchRegionDetail, fetchRegions, type RegionDetailResponse } from "@/lib/api";
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
  const [role, setRole] = useState("all");
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [detail, setDetail] = useState<RegionDetailResponse | null>(null);
  const [comparison, setComparison] = useState<ComparisonPayload | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  // Cargar payload de comparación cuando cambia la región o el cuerpo celeste
  useEffect(() => {
    let isMounted = true;
    const targetId = body === "Mars" ? "terra-sirenum" : "lunar-south-pole";
    fetchCompare(selectedId, targetId).then(res => {
      if (isMounted && res) {
        setComparison(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [selectedId, body]);

  const selected = regionsList.find(r => r.id === selectedId) ?? regionsList[0]!;
  const selectedLocation = mapLocations[selected.id];
  const visibleRegions = regionsList.filter(
    r =>
      (role === "all" || r.study_role === role) &&
      r.name
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(query.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
  );
  const comparisonHref = `/compare?region=${encodeURIComponent(selected.id)}&body=${body}`;

  return (
    <main className="workspace">
      <div className="workspace-heading">
        <div>
          <div className="eyebrow">
            <span />EXPLORACIÓN PLANETARIA <span className="eyebrow-divider">/</span> BOLIVIA
          </div>
          <h1>{mode === "compare" ? "Conecta mundos. Contrasta evidencia." : "Otros mundos empiezan en la Tierra."}</h1>
          <p>
            {mode === "compare"
              ? "Examina cada variable y comprende los límites de la analogía."
              : "Explora regiones de Bolivia y su potencial para el estudio de análogos planetarios."}
          </p>
        </div>
        <div className="workspace-status">
          <span />
          {backendOnline ? <span className="live-badge">API CONECTADA</span> : "Espacio de investigación"}
          <span className="status-divider">/</span>
          Fase 1
        </div>
      </div>

      <div className="exploration-toolbar">
        <div>
          <span className="toolbar-label">ESPACIO DE TRABAJO</span>
          <span className="toolbar-current">
            <Icon name={mode === "explore" ? "globe" : "compare"} size={15} />
            {mode === "explore" ? "Explorador geográfico" : "Comparación científica"}
          </span>
        </div>
        <div>
          <span className="toolbar-stat">
            <strong>{regionsList.length.toString().padStart(2, "0")}</strong> regiones de estudio
          </span>
          <span className="toolbar-separator" />
          <span className="toolbar-scope">
            <Icon name="layers" size={14} />
            {backendOnline ? "Catálogo backend activo" : "Catálogo preliminar"}
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
                  onClick={() => setBody("Mars")}
                >
                  <span className="planet-orb mars-orb" />
                  Marte{body === "Mars" && <Icon name="check" size={13} />}
                </button>
                <button
                  className={body === "Moon" ? "planet-option chosen" : "planet-option"}
                  aria-pressed={body === "Moon"}
                  onClick={() => setBody("Moon")}
                >
                  <span className="planet-orb moon-orb" />
                  Luna{body === "Moon" && <Icon name="check" size={13} />}
                </button>
              </div>
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
              <ComparisonTable region={selected} body={body} expanded comparison={comparison} />

              {comparison?.mission_use_cases && comparison.mission_use_cases.length > 0 && (
                <section className="panel mission-cases-panel">
                  <div className="panel-title">
                    <h2>Utilidad Operacional para Misiones Espaciales (NASA Challenge)</h2>
                    <span className="subtle-tag">NASA SPACE APPS 2026</span>
                  </div>
                  <p className="table-description">
                    Justificación funcional de cómo este análogo terrestre ayuda a resolver desafíos de misiones reales (Artemis, rovers, hábitats e ISRU).
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
                    {body === "Mars" ? (
                      <a
                        href="https://trek.nasa.gov/mars/#v=0.1&x=-139.0&y=-38.8&z=5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nasa-trek-btn"
                      >
                        <Icon name="explore" size={14} />
                        Explorar Terra Sirenum en NASA Mars Trek
                        <Icon name="arrow" size={12} />
                      </a>
                    ) : (
                      <>
                        <a
                          href="https://trek.nasa.gov/moon/#v=0.1&x=0.0&y=-89.9&z=6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nasa-trek-btn"
                        >
                          <Icon name="explore" size={14} />
                          Explorar Polo Sur Lunar en NASA Moon Trek
                          <Icon name="arrow" size={12} />
                        </a>
                        <a
                          href="https://quickmap.lroc.asu.edu/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nasa-trek-btn"
                        >
                          <Icon name="layers" size={14} />
                          Ver capas en LROC QuickMap (LOLA / Diviner)
                          <Icon name="arrow" size={12} />
                        </a>
                      </>
                    )}
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
                <small>Bolivia</small>
              </div>
              <span className="pair-symbol">
                <Icon name="compare" size={15} />
              </span>
              <div className="environment-card">
                <TerrainArt variant={body === "Mars" ? "mars" : "moon"} />
                <span>{body === "Mars" ? "MARTE" : "LUNA"}</span>
                <strong>{body === "Mars" ? "Terra Sirenum" : "Por definir"}</strong>
                <small>Objetivo propuesto</small>
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
    </main>
  );
}
