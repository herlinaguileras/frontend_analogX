"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { comparisonVariables, studyRegions, verificationLabels } from "@/lib/study-catalog";
import type { EarthRegion, VerificationStatus } from "@/lib/scientific-types";
import { Icon } from "./icon";
import { TerrainArt } from "./terrain-art";

export function VerificationBadge({ status = "pendiente_de_verificar" }: { status?: VerificationStatus }) {
  return <span className={`verification-badge ${status}`}><span />{verificationLabels[status]}</span>;
}

function RegionalSketch({ visibleRegions, selectedId, onSelect }: { visibleRegions: EarthRegion[]; selectedId: string; onSelect: (id: string) => void }) {
  const [zoom, setZoom] = useState(1);
  const [layersOpen, setLayersOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const positions: Record<string, { left: string; top: string }> = {
    "salar-de-uyuni": { left: "38%", top: "39%" },
    "sol-de-manana": { left: "48%", top: "73%" },
    "altiplano-sur": { left: "62%", top: "59%" },
  };
  return <section className="regional-map panel" aria-label="Esquema orientativo de las regiones de estudio">
    <div className="map-heading"><span className="map-live-dot" />REGIONES DE ESTUDIO<span className="map-label">BOLIVIA</span></div>
    <div className="map-scene" style={{ transform: `scale(${zoom})` }}>
      <svg className="geographic-sketch" viewBox="0 0 800 580" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="land" x2="1" y2="1"><stop stopColor="#253442" /><stop offset=".45" stopColor="#655b4c" /><stop offset="1" stopColor="#263e39" /></linearGradient>
          <linearGradient id="highland" x2="1" y2=".5"><stop stopColor="#b4a58b" /><stop offset=".5" stopColor="#8c7763" /><stop offset="1" stopColor="#45463d" /></linearGradient>
          <pattern id="terrain-lines" width="65" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(24)"><path d="M0 0q40 18 16 40T35 80M25 0q40 18 16 40T60 80M50 0q40 18 16 40T85 80" stroke="#d7ba91" strokeWidth="1" opacity=".22" fill="none" /></pattern>
          <pattern id="map-grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M100 0H0v100" stroke="#cbd5db" strokeWidth=".6" opacity=".12" fill="none" /></pattern>
          <filter id="relief"><feTurbulence type="fractalNoise" baseFrequency=".018 .06" numOctaves="4" seed="8" /><feColorMatrix type="saturate" values="0" /><feBlend in="SourceGraphic" mode="soft-light" /></filter>
        </defs>
        <rect width="800" height="580" fill="url(#land)" />
        <path d="M170-40 360 15l-20 95 93 55-25 90 75 60-33 110 72 69-33 126H240l-38-100 49-87-69-97 57-70-90-78Z" fill="url(#highland)" filter="url(#relief)" opacity=".9" />
        <rect width="800" height="580" fill="url(#terrain-lines)" />
        <path d="m342-10 59 90 112 26 17 86 83 58-12 88-101 49-15 104-80 19-34 80" fill="none" stroke="#e5d3ab" strokeWidth="1.5" strokeDasharray="5 5" opacity=".65" />
        <path d="m115-10 69 104-21 106 68 63-29 99 60 78-21 150" fill="none" stroke="#c8d8d4" opacity=".3" />
        <path d="m293 203 42-17 42 16 6 31-24 26-52-4-29-26Z" fill="#e5e2d3" opacity=".88" />
        <path d="m363 86 17-11 15 8-3 24-13 14-19-12Z" fill="#578690" opacity=".8" />
        <path d="M271 180q80 45 101 132t68 163" fill="none" stroke="#bca18b" strokeWidth="1.8" strokeDasharray="3 5" opacity=".6" />
        {showGrid && <rect width="800" height="580" fill="url(#map-grid)" />}
        <text x="525" y="235" fill="#f3e7d9" opacity=".55" letterSpacing="11" fontSize="18">BOLIVIA</text>
        <text x="82" y="350" fill="#f3e7d9" opacity=".3" letterSpacing="7" fontSize="12" transform="rotate(-73 82 350)">CORDILLERA DE LOS ANDES</text>
      </svg>
      {visibleRegions.map(region => <button key={region.id} className={`map-pin ${selectedId === region.id ? "selected" : ""}`} style={positions[region.id]} onClick={() => onSelect(region.id)} aria-label={`Seleccionar ${region.name}`} aria-pressed={selectedId === region.id}><span className="pin-point"><Icon name="pin" size={20} /></span>{showLabels && <span className="pin-label">{region.name}</span>}</button>)}
    </div>
    <div className="map-controls"><button aria-label="Acercar esquema" onClick={() => setZoom(z => Math.min(1.6, z + .2))} disabled={zoom >= 1.6}>+</button><button aria-label="Alejar esquema" onClick={() => setZoom(z => Math.max(1, z - .2))} disabled={zoom <= 1}>−</button><span /><button aria-label="Restablecer vista" onClick={() => setZoom(1)}><Icon name="target" /></button><button aria-label="Capas del esquema" aria-expanded={layersOpen} onClick={() => setLayersOpen(!layersOpen)}><Icon name="layers" /></button></div>
    {layersOpen && <div className="layer-options"><strong>Capas del esquema</strong><label><input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} /> Cuadrícula visual</label><label><input type="checkbox" checked={showLabels} onChange={e => setShowLabels(e.target.checked)} /> Nombres de regiones</label></div>}
    <div className="map-north" aria-hidden="true">N<span>↑</span></div>
    <div className="map-bottom"><span><Icon name="info" size={13} />Esquema orientativo · sin georreferenciación</span><span>Ilustración AnalogX</span></div>
  </section>;
}

function ComparisonTable({ region, body, expanded = false }: { region: EarthRegion; body: "Mars" | "Moon"; expanded?: boolean }) {
  return <section className="panel comparison-table"><div className="panel-title"><h2>Variables de comparación</h2><span className="subtle-tag">{expanded ? "6 variables" : "POR VARIABLE"}</span></div><p className="table-description">La compatibilidad se evaluará con evidencia instrumental.</p><div className="table-scroll"><table><caption className="sr-only">Variables pendientes de verificación para {region.name} y {body === "Mars" ? "Terra Sirenum" : "un objetivo lunar por definir"}</caption><thead><tr><th>Variable</th><th><span className="table-dot earth-dot" />Tierra<small>{region.name}</small></th><th><span className="table-dot mars-dot" />{body === "Mars" ? "Marte" : "Luna"}<small>{body === "Mars" ? "Terra Sirenum" : "Objetivo por definir"}</small></th>{expanded && <th>Compatibilidad</th>}</tr></thead><tbody>{comparisonVariables.slice(0, expanded ? 6 : 4).map(variable => <tr key={variable.id}><th>{variable.label}</th><td><span className="pending-value" title="Dato pendiente de verificación instrumental">— <span>Pendiente</span></span></td><td><span className="pending-value" title="Dato pendiente de verificación instrumental">— <span>Pendiente</span></span></td>{expanded && <td><span className="compatibility-pending">Sin evaluar</span></td>}</tr>)}</tbody></table></div><div className="table-footnote"><Icon name="info" size={13} />Dato pendiente de verificación instrumental</div></section>;
}

export function Exploration({ mode = "explore", initialRegionId, initialBody = "Mars" }: { mode?: "explore" | "compare"; initialRegionId?: string; initialBody?: "Mars" | "Moon" }) {
  const [selectedId, setSelectedId] = useState(initialRegionId ?? studyRegions[0]!.id);
  const [body, setBody] = useState<"Mars" | "Moon">(initialBody);
  const [role, setRole] = useState("all");
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = studyRegions.find(r => r.id === selectedId) ?? studyRegions[0]!;
  const visibleRegions = studyRegions.filter(r => (role === "all" || r.study_role === role) && r.name.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
  const comparisonHref = `/compare?region=${encodeURIComponent(selected.id)}&body=${body}`;

  return <main className="workspace">
    <div className="workspace-heading"><div><div className="eyebrow"><span />EXPLORACIÓN PLANETARIA</div><h1>{mode === "compare" ? "Conecta mundos. Contrasta evidencia." : "Otros mundos empiezan en la Tierra."}</h1><p>{mode === "compare" ? "Examina cada variable y comprende los límites de la analogía." : "Explora regiones de Bolivia y su potencial para el estudio de análogos planetarios."}</p></div><span className="workspace-status"><span />Espacio de investigación<span className="status-divider">/</span>Fase 1</span></div>
    <div className={`explorer-grid ${mode === "compare" ? "comparison-mode" : ""}`}>
      <aside className="left-column">
        <section className="panel filters"><div className="panel-title"><h2>Tu exploración</h2><Icon name="explore" size={17} /></div><p className="muted">Elige un destino. Encuentra un punto de partida en la Tierra.</p>
          <fieldset><legend>01 <span>Objetivo planetario</span></legend><div className="planet-selector"><button className={body === "Mars" ? "planet-option chosen mars" : "planet-option"} aria-pressed={body === "Mars"} onClick={() => setBody("Mars")}><span className="planet-orb mars-orb" />Marte{body === "Mars" && <Icon name="check" size={13} />}</button><button className={body === "Moon" ? "planet-option chosen" : "planet-option"} aria-pressed={body === "Moon"} onClick={() => setBody("Moon")}><span className="planet-orb moon-orb" />Luna{body === "Moon" && <Icon name="check" size={13} />}</button></div></fieldset>
          <fieldset><legend>02 <span>Región terrestre</span></legend><label className="search-field"><Icon name="search" size={16} /><input aria-label="Buscar región por nombre" value={query} onChange={e => { setQuery(e.target.value); setSearched(false); }} placeholder="Buscar una región…" /></label><label className="select-label" htmlFor="study-role">Rol en el estudio</label><select id="study-role" value={role} onChange={e => { setRole(e.target.value); setSearched(false); }}><option value="all">Todas las regiones</option><option value="reference_calibration">Referencia de calibración</option><option value="research_candidate">Candidato de investigación</option></select></fieldset>
          <button className="primary-button search-button" onClick={() => { setSearched(true); if (visibleRegions[0]) setSelectedId(visibleRegions[0].id); }}><Icon name="search" size={16} />Explorar regiones<Icon name="arrow" size={15} /></button>
          <div className="catalog-note"><Icon name="info" size={14} /><span>Catálogo inicial del proyecto.<br />Caracterización científica pendiente.</span></div>
        </section>
        <section className="region-list"><div className="list-heading"><h2>Regiones de estudio</h2><span>{visibleRegions.length.toString().padStart(2, "0")}</span></div><div aria-live="polite" className="sr-only">{searched ? `${visibleRegions.length} regiones en el catálogo inicial. No son resultados de similitud.` : `${visibleRegions.length} regiones visibles`}</div>{visibleRegions.length ? visibleRegions.map((region, index) => <button key={region.id} className={`region-option ${selected.id === region.id ? "selected" : ""}`} onClick={() => setSelectedId(region.id)} aria-pressed={selected.id === region.id}><span className={`region-thumbnail thumbnail-${region.id}`}><Icon name="pin" size={18} /></span><span><strong>{region.name}</strong><small>{region.study_role === "reference_calibration" ? "Referencia de calibración" : "Candidato de investigación"}</small></span><span className="region-index">0{index + 1}</span></button>) : <div className="empty-regions"><Icon name="search" /><p>No hay regiones con esos filtros.</p><button className="text-button" onClick={() => { setQuery(""); setRole("all"); }}>Limpiar filtros</button></div>}</section>
        <div className="sidebar-bottom"><span className="country-mark">🇧🇴</span><span>Desde Bolivia,<br /><strong>hacia otros mundos.</strong></span></div>
      </aside>
      <div className="center-column">
        {mode === "explore" ? <RegionalSketch visibleRegions={visibleRegions} selectedId={selected.id} onSelect={setSelectedId} /> : <section className="panel compare-hero"><span className="eyebrow">DOS ENTORNOS · UNA PREGUNTA CIENTÍFICA</span><h2>¿Qué podemos aprender<br />al mirar más cerca?</h2><p>Compara observaciones, conoce su procedencia y distingue lo que sabemos de lo que todavía debemos investigar.</p><div className="compare-pair"><div><span className="planet-orb earth-orb" /><strong>{selected.name}</strong><small>Tierra · Bolivia</small></div><Icon name="compare" size={24} /><div><span className={`planet-orb ${body === "Mars" ? "mars-orb" : "moon-orb"}`} /><strong>{body === "Mars" ? "Terra Sirenum" : "Objetivo por definir"}</strong><small>{body === "Mars" ? "Marte · objetivo propuesto" : "Luna · sin catálogo"}</small></div></div></section>}
        <div className="center-bottom"><section className="panel selected-region"><div className="region-landscape"><TerrainArt /><span className="image-caption">ILUSTRACIÓN DE CONTEXTO</span><span className="region-location"><Icon name="pin" size={13} />BOLIVIA · TIERRA</span></div><div className="selected-region-body"><div className="eyebrow">{selected.study_role === "reference_calibration" ? "SITIO DE REFERENCIA" : "CANDIDATO DE INVESTIGACIÓN"}</div><h2>{selected.name}</h2><p>{selected.description}</p><button className="text-button" onClick={() => dialogRef.current?.showModal()}>Ver ficha de la región<Icon name="arrow" size={15} /></button></div></section>{mode === "explore" ? <ComparisonTable region={selected} body={body} /> : <section className="panel provenance-note"><Icon name="layers" size={23} /><h2>Cada dato tiene una historia.</h2><p>La fuente, el instrumento, la resolución y el procesamiento acompañarán cada observación.</p><Link className="text-button" href="/methodology">Conocer la metodología<Icon name="arrow" size={15} /></Link></section>}</div>
        {mode === "compare" && <ComparisonTable region={selected} body={body} expanded />}
      </div>
      <aside className="right-column"><section className="panel comparison-panel"><div className="panel-title"><h2>Comparación de entornos</h2><Icon name="compare" size={17} /></div><div className="environment-pair"><div className="environment-card"><TerrainArt /><span>TIERRA</span><strong>{selected.name}</strong><small>Bolivia</small></div><span className="pair-symbol"><Icon name="compare" size={15} /></span><div className="environment-card"><TerrainArt variant={body === "Mars" ? "mars" : "moon"} /><span>{body === "Mars" ? "MARTE" : "LUNA"}</span><strong>{body === "Mars" ? "Terra Sirenum" : "Por definir"}</strong><small>Objetivo propuesto</small></div></div><div className="evidence-heading"><h3>Estado de la evidencia</h3><Icon name="info" size={14} /></div><div className="evidence-state"><div className="evidence-ring"><Icon name="science" size={28} /></div><div><strong>Por investigar</strong><p>La comparación requiere<br />datos científicos verificados.</p></div></div><div className="evidence-checklist">{["Fuentes y productos", "Compatibilidad de variables", "Resolución y datum", "Incertidumbre y limitaciones"].map(label => <div key={label}><span>{label}</span><span className="pending-dot" title="Pendiente" /></div>)}</div><VerificationBadge /><Link className="primary-button compare-button" href={mode === "explore" ? comparisonHref : "/methodology"}>{mode === "explore" ? "Abrir comparación" : "Revisar metodología"}<Icon name="arrow" size={15} /></Link></section>
        <section className="panel science-guide"><div className="guide-icon"><Icon name="science" size={20} /></div><h2>Una analogía abre preguntas.</h2><p>Nos ayuda a formular hipótesis sobre otros mundos a partir del estudio de la Tierra.</p><ul><li><Icon name="check" size={14} />Investigar procesos y materiales</li><li><Icon name="check" size={14} />Contrastar observaciones</li><li><Icon name="check" size={14} />Reconocer límites e incertidumbres</li></ul><Link className="text-button" href="/methodology">Cómo investigamos<Icon name="arrow" size={15} /></Link></section>
        <div className="analogy-note"><Icon name="info" size={15} /><p>La analogía no implica habitabilidad ni idoneidad para una base humana.</p></div>
      </aside>
    </div>
    <footer className="workspace-footer"><span>ANALOGX <span>·</span> PLANETARY ANALOG DISCOVERY ENGINE</span><span>Exploración con evidencia. Ciencia con contexto.<span className="footer-dot" /></span></footer>
    <dialog ref={dialogRef} className="region-dialog" onClick={e => { if (e.target === e.currentTarget) dialogRef.current?.close(); }} aria-labelledby="region-dialog-title"><div className="dialog-top"><span className="eyebrow">FICHA DE INVESTIGACIÓN</span><button className="icon-button" aria-label="Cerrar ficha" onClick={() => dialogRef.current?.close()}><Icon name="close" /></button></div><h2 id="region-dialog-title">{selected.name}</h2><VerificationBadge status={selected.verification_status} /><p>{selected.description}</p><dl><div><dt>Cuerpo planetario</dt><dd>Tierra</dd></div><div><dt>País</dt><dd>{selected.country}</dd></div><div><dt>Rol en el estudio</dt><dd>{selected.study_role === "reference_calibration" ? "Referencia de calibración" : "Candidato de investigación"}</dd></div><div><dt>Coordenadas y datum</dt><dd>Pendientes de verificación</dd></div><div><dt>Productos instrumentales</dt><dd>Pendientes de integración</dd></div><div><dt>Novedad científica</dt><dd>Sin evaluar</dd></div></dl><p className="dialog-notice">Los nombres y roles provienen del planteamiento del proyecto. No constituyen evidencia instrumental verificada.</p><Link className="primary-button" href={comparisonHref} onClick={() => dialogRef.current?.close()}>Ver comparación<Icon name="arrow" size={16} /></Link></dialog>
  </main>;
}
