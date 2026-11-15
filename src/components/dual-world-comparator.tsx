"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import type { SupportedLang } from "@/lib/translations";
import { getClimateComparison } from "@/lib/climate-science-engine";

export interface DualWorldPreset {
  id: string;
  label: string;
  body: "Mars" | "Moon";
  fidelityIndex: number;
  verifiedPercent: number;
  spatialResolution: string;
  earthRegionId: string;
  planetaryTarget: {
    name: string;
    subtitle: string;
    coordinates: string;
    instrument: string;
    image: string;
    featureTag: string;
  };
  earthTwin: {
    name: string;
    subtitle: string;
    coordinates: string;
    instrument: string;
    image: string;
    featureTag: string;
  };
  rehearsalObjective: string;
  transect: {
    maxSlope: string;
    roughnessRms: string;
    sinkageRisk: string;
    points: { dist: number; spaceElev: number; earthElev: number }[];
  };
}

export const DUAL_WORLD_PRESETS: DualWorldPreset[] = [
  {
    id: "jezero-atacama",
    label: "Jezero Delta ↔ Atacama (Marte · 88.1%)",
    body: "Mars",
    fidelityIndex: 88.1,
    verifiedPercent: 91,
    spatialResolution: "10m",
    earthRegionId: "atacama-yungay",
    planetaryTarget: {
      name: "Cráter Jezero (Delta Occidental)",
      subtitle: "Abanico Aluvial de Neretva Vallis (Marte)",
      coordinates: "18.38° N · 77.58° E",
      instrument: "NASA MRO HiRISE / CRISM",
      image: "/images/geology/mars-jezero.jpg",
      featureTag: "Delta Fan Deposits (Western)",
    },
    earthTwin: {
      name: "Desierto de Atacama (Núcleo Yungay)",
      subtitle: "Quebradas Hiperáridas con Percloratos (Chile)",
      coordinates: "24.08° S · 69.87° O",
      instrument: "ESA Copernicus Sentinel-2 / USGS",
      image: "/images/geology/earth-atacama.jpg",
      featureTag: "Yungay Fluvial Relict / Perchlorates",
    },
    rehearsalObjective: "Rover Traverse & Traction",
    transect: {
      maxSlope: "14.2°",
      roughnessRms: "8.5 cm",
      sinkageRisk: "Medio (Capas de arcilla friable)",
      points: [
        { dist: 0, spaceElev: 120, earthElev: 110 },
        { dist: 1, spaceElev: 180, earthElev: 165 },
        { dist: 2, spaceElev: 310, earthElev: 290 },
        { dist: 3, spaceElev: 260, earthElev: 280 },
        { dist: 4, spaceElev: 420, earthElev: 390 },
        { dist: 5, spaceElev: 490, earthElev: 470 },
      ],
    },
  },
  {
    id: "shackleton-mcmurdo",
    label: "Shackleton Rim ↔ McMurdo (Luna · 84.6%)",
    body: "Moon",
    fidelityIndex: 84.6,
    verifiedPercent: 94,
    spatialResolution: "20m",
    earthRegionId: "mcmurdo-dry-valleys",
    planetaryTarget: {
      name: "Borde de Cráter Shackleton (PSR)",
      subtitle: "Trampas Criogénicas en Sombra Permanente (Polo Sur Lunar)",
      coordinates: "89.9° S · 0.0° E",
      instrument: "NASA LRO LOLA Altimetry / Diviner",
      image: "/images/geology/moon-shackleton.jpg",
      featureTag: "Cold-Trap Volatiles Reservoir",
    },
    earthTwin: {
      name: "Valles Secos de McMurdo (Beacon Valley)",
      subtitle: "Permafrost Criogénico sin Nieve (Antártida)",
      coordinates: "77.85° S · 160.75° E",
      instrument: "USGS Antarctic Geographic / CSA Radarsat",
      image: "/images/geology/earth-mcmurdo.jpg",
      featureTag: "Subsurface Relict Ice Wedges",
    },
    rehearsalObjective: "Cryogenic ISRU & Volatiles Drilling",
    transect: {
      maxSlope: "28.5°",
      roughnessRms: "18.2 cm",
      sinkageRisk: "Bajo (Lecho rocoso criogénico)",
      points: [
        { dist: 0, spaceElev: 800, earthElev: 750 },
        { dist: 1, spaceElev: 620, earthElev: 680 },
        { dist: 2, spaceElev: 410, earthElev: 450 },
        { dist: 3, spaceElev: 210, earthElev: 260 },
        { dist: 4, spaceElev: 90, earthElev: 120 },
        { dist: 5, spaceElev: 40, earthElev: 60 },
      ],
    },
  },
  {
    id: "marius-lanzarote",
    label: "Marius Hills ↔ Lanzarote (Luna · 89.3%)",
    body: "Moon",
    fidelityIndex: 89.3,
    verifiedPercent: 92,
    spatialResolution: "5m",
    earthRegionId: "tubos-lava-lanzarote",
    planetaryTarget: {
      name: "Claraboya y Tubos de Marius Hills",
      subtitle: "Fosa de Colapso Volcánico Lunar (Oceanus Procellarum)",
      coordinates: "14.2° N · 303.3° E",
      instrument: "NASA LROC NAC / JAXA SELENE Radar",
      image: "/images/geology/moon-marius-hills.jpg",
      featureTag: "65m Basaltic Skylight Pit",
    },
    earthTwin: {
      name: "Tubos de Lava y Cuevas de Malpaís (Lanzarote)",
      subtitle: "Galerías Basálticas Subterráneas (España)",
      coordinates: "29.15° N · 13.48° O",
      instrument: "ESA PANGAEA Astronaut Training / IGN",
      image: "/images/geology/earth-lanzarote.jpg",
      featureTag: "Tubo de la Corona (7.6 km)",
    },
    rehearsalObjective: "Subsurface Habitat Shielding",
    transect: {
      maxSlope: "12.0°",
      roughnessRms: "22.0 cm",
      sinkageRisk: "Nulo (Basalto compacto)",
      points: [
        { dist: 0, spaceElev: 300, earthElev: 280 },
        { dist: 1, spaceElev: 290, earthElev: 285 },
        { dist: 2, spaceElev: 180, earthElev: 210 },
        { dist: 3, spaceElev: 160, earthElev: 170 },
        { dist: 4, spaceElev: 280, earthElev: 275 },
        { dist: 5, spaceElev: 295, earthElev: 290 },
      ],
    },
  },
  {
    id: "sirenum-uyuni",
    label: "Terra Sirenum ↔ Salar de Uyuni (Marte · 86.8%)",
    body: "Mars",
    fidelityIndex: 86.8,
    verifiedPercent: 95,
    spatialResolution: "15m",
    earthRegionId: "salar-de-uyuni",
    planetaryTarget: {
      name: "Paleocuenca Salina de Terra Sirenum",
      subtitle: "Depósitos de Cloruros Noéjicos (Tierras Altas de Marte)",
      coordinates: "38.8° S · 139.0° O",
      instrument: "Mars Odyssey THEMIS / MRO CRISM",
      image: "/images/geology/mars-sirenum.jpg",
      featureTag: "Chloride Salt Crusts",
    },
    earthTwin: {
      name: "Salar de Uyuni (Núcleo Central)",
      subtitle: "Costra Hiperplana de Halita y Polígonos (Bolivia)",
      coordinates: "20.38° S · 66.95° O",
      instrument: "NASA ICESat-2 (ATL08) / Sentinel-2",
      image: "/images/geology/earth-uyuni.jpg",
      featureTag: "10,582 km² Hyperflat Standard",
    },
    rehearsalObjective: "Altimeter Calibration & Evaporite Mining",
    transect: {
      maxSlope: "0.05°",
      roughnessRms: "5.0 cm",
      sinkageRisk: "Alto en zonas de salmuera freática",
      points: [
        { dist: 0, spaceElev: 3653, earthElev: 3653 },
        { dist: 1, spaceElev: 3653.2, earthElev: 3653.1 },
        { dist: 2, spaceElev: 3653.4, earthElev: 3653.2 },
        { dist: 3, spaceElev: 3653.3, earthElev: 3653.2 },
        { dist: 4, spaceElev: 3653.5, earthElev: 3653.3 },
        { dist: 5, spaceElev: 3653.6, earthElev: 3653.4 },
      ],
    },
  },
  {
    id: "gale-haughton",
    label: "Cráter Gale ↔ Cráter Haughton (Marte · 82.5%)",
    body: "Mars",
    fidelityIndex: 82.5,
    verifiedPercent: 88,
    spatialResolution: "12m",
    earthRegionId: "haughton-crater",
    planetaryTarget: {
      name: "Monte Sharp y Brechas de Gale",
      subtitle: "Estratigrafía de Impacto Complejo (Cráter Gale)",
      coordinates: "5.4° S · 137.8° E",
      instrument: "NASA Curiosity Mastcam / MOLA",
      image: "/images/geology/mars-gale.jpg",
      featureTag: "154 km Impact Stratigraphy",
    },
    earthTwin: {
      name: "Cráter Haughton (Isla Devon)",
      subtitle: "Brechas de Choque en Desierto Polar Ártico (Canadá)",
      coordinates: "75.38° N · 89.67° O",
      instrument: "NASA Haughton-Mars Project / Radarsat",
      image: "/images/geology/earth-haughton.jpg",
      featureTag: "23 km Shatter Cones & Impact Melt",
    },
    rehearsalObjective: "Impact Geology & Rover Navigation",
    transect: {
      maxSlope: "18.4°",
      roughnessRms: "14.8 cm",
      sinkageRisk: "Medio en gravas de impacto",
      points: [
        { dist: 0, spaceElev: 200, earthElev: 180 },
        { dist: 1, spaceElev: 450, earthElev: 380 },
        { dist: 2, spaceElev: 780, earthElev: 620 },
        { dist: 3, spaceElev: 1100, earthElev: 890 },
        { dist: 4, spaceElev: 1350, earthElev: 1120 },
        { dist: 5, spaceElev: 1520, earthElev: 1280 },
      ],
    },
  },
  {
    id: "tranquillitatis-timanfaya",
    label: "Tranquillitatis ↔ Timanfaya (Luna · 86.4%)",
    body: "Moon",
    fidelityIndex: 86.4,
    verifiedPercent: 93,
    spatialResolution: "8m",
    earthRegionId: "parque-timanfaya",
    planetaryTarget: {
      name: "Mare Tranquillitatis (Llanura Basáltica)",
      subtitle: "Lavas Ilmeníticas de Alto Titanio (Luna)",
      coordinates: "8.5° N · 31.4° E",
      instrument: "NASA LROC / Apollo 11 Compendium",
      image: "/images/geology/moon-tranquillitatis.jpg",
      featureTag: "High-Ti Basalt Regolith",
    },
    earthTwin: {
      name: "Campos de Lava de Timanfaya (Lanzarote)",
      subtitle: "Manto de Escorias y Lavas Vítreas (España)",
      coordinates: "29.00° N · 13.73° O",
      instrument: "ESA PANGAEA / Copernicus Sentinel-2",
      image: "/images/geology/earth-lanzarote.jpg",
      featureTag: "Pristine Basalt Scoria Fields",
    },
    rehearsalObjective: "Regolith Tractions & Lunar ISRU",
    transect: {
      maxSlope: "8.5°",
      roughnessRms: "11.2 cm",
      sinkageRisk: "Medio en arenas de escoria",
      points: [
        { dist: 0, spaceElev: 100, earthElev: 90 },
        { dist: 1, spaceElev: 120, earthElev: 115 },
        { dist: 2, spaceElev: 140, earthElev: 135 },
        { dist: 3, spaceElev: 130, earthElev: 125 },
        { dist: 4, spaceElev: 160, earthElev: 155 },
        { dist: 5, spaceElev: 175, earthElev: 170 },
      ],
    },
  },
  {
    id: "malapert-licancabur",
    label: "Pico Malapert ↔ Licancabur (Luna · 87.2%)",
    body: "Moon",
    fidelityIndex: 87.2,
    verifiedPercent: 90,
    spatialResolution: "15m",
    earthRegionId: "cumbre-licancabur",
    planetaryTarget: {
      name: "Pico Malapert PEL (Polo Sur Lunar)",
      subtitle: "Punto de Cuasi-Eterna Luz y Frío Extremo (Luna)",
      coordinates: "84.9° S · 12.9° E",
      instrument: "NASA LRO LOLA Altimetry / LAMP",
      image: "/images/geology/moon-shackleton.jpg",
      featureTag: "Point of Eternal Light (PEL)",
    },
    earthTwin: {
      name: "Cumbre Criogénica Licancabur (Bolivia)",
      subtitle: "Cúspide Volcánica a 5,916 msnm con Frío Polar",
      coordinates: "22.83° S · 67.88° O",
      instrument: "NASA Ames / SETI Astrobiology Field Research",
      image: "/images/geology/earth-licancabur.jpg",
      featureTag: "5,916m Extreme UV & Cryogenic Summit",
    },
    rehearsalObjective: "Polar EVA Testing & Grazing Sunlight Solar Power",
    transect: {
      maxSlope: "24.0°",
      roughnessRms: "16.4 cm",
      sinkageRisk: "Bajo (Cresta rocosa criogénica)",
      points: [
        { dist: 0, spaceElev: 500, earthElev: 480 },
        { dist: 1, spaceElev: 650, earthElev: 620 },
        { dist: 2, spaceElev: 820, earthElev: 790 },
        { dist: 3, spaceElev: 980, earthElev: 940 },
        { dist: 4, spaceElev: 1100, earthElev: 1060 },
        { dist: 5, spaceElev: 1250, earthElev: 1210 },
      ],
    },
  },
  {
    id: "gusev-sol-manana",
    label: "Cráter Gusev ↔ Sol de Mañana (Marte · 89.7%)",
    body: "Mars",
    fidelityIndex: 89.7,
    verifiedPercent: 94,
    spatialResolution: "10m",
    earthRegionId: "sol-de-manana",
    planetaryTarget: {
      name: "Home Plate (Cráter Gusev, Marte)",
      subtitle: "Depósitos de Sílice Opalina Hidrotermal Fósil",
      coordinates: "14.6° S · 175.5° E",
      instrument: "NASA MER Spirit Mini-TES / APXS",
      image: "/images/geology/mars-gusev.jpg",
      featureTag: ">90% Opaline Silica Nodules",
    },
    earthTwin: {
      name: "Campo Geotérmico Sol de Mañana (Bolivia)",
      subtitle: "Fumarolas y Barros Ácidos a 4,850 msnm",
      coordinates: "22.27° S · 67.18° O",
      instrument: "Copernicus Sentinel-2 / ASTER Global Emissivity",
      image: "/images/geology/earth-sol-manana.jpg",
      featureTag: "Active Boiling Acid Hydrothermal Sinter",
    },
    rehearsalObjective: "Hydrothermal Biosignatures & Acid Alteration",
    transect: {
      maxSlope: "9.2°",
      roughnessRms: "7.8 cm",
      sinkageRisk: "Alto en costras de lodo caliente",
      points: [
        { dist: 0, spaceElev: 150, earthElev: 140 },
        { dist: 1, spaceElev: 180, earthElev: 175 },
        { dist: 2, spaceElev: 220, earthElev: 210 },
        { dist: 3, spaceElev: 260, earthElev: 250 },
        { dist: 4, spaceElev: 310, earthElev: 300 },
        { dist: 5, spaceElev: 340, earthElev: 330 },
      ],
    },
  },
];

interface DualWorldComparatorProps {
  initialPresetId?: string;
  targetBody?: "Moon" | "Mars";
  lang?: SupportedLang;
}

export function DualWorldComparator({
  initialPresetId,
  targetBody,
  lang = "es",
}: DualWorldComparatorProps) {
  const isEn = lang === "en";

  // Filter presets strictly by targetBody if provided
  const availablePresets = useMemo(() => {
    if (targetBody) {
      return DUAL_WORLD_PRESETS.filter((p) => p.body === targetBody);
    }
    return DUAL_WORLD_PRESETS;
  }, [targetBody]);

  // Default to appropriate preset based on body
  const defaultPresetId = useMemo(() => {
    if (initialPresetId && availablePresets.some((p) => p.id === initialPresetId)) {
      return initialPresetId;
    }
    return availablePresets[0]?.id ?? DUAL_WORLD_PRESETS[0]!.id;
  }, [initialPresetId, availablePresets]);

  const [selectedPresetId, setSelectedPresetId] = useState<string>(defaultPresetId);
  const [activeTab, setActiveTab] = useState<"imagery" | "transect" | "climate">("imagery");
  const [splitPos, setSplitPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // If targetBody changes, reset to the first matching preset
  useEffect(() => {
    if (!availablePresets.some((p) => p.id === selectedPresetId)) {
      setSelectedPresetId(availablePresets[0]?.id ?? DUAL_WORLD_PRESETS[0]!.id);
    }
  }, [availablePresets, selectedPresetId]);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentPreset =
    availablePresets.find((p) => p.id === selectedPresetId) ?? availablePresets[0] ?? DUAL_WORLD_PRESETS[0]!;
  const climateData = getClimateComparison(currentPreset.earthRegionId, currentPreset.body);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setSplitPos(Math.round(pct * 10) / 10);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignorar si no estaba capturado
    }
  }, []);

  return (
    <section className="dual-comparator-card liquid-glass-strong">
      {/* Top Header */}
      <div className="dual-comparator-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.35rem" }}>
            <span className={`dual-header-pill ${currentPreset.body === "Mars" ? "mars" : "moon"}`}>
              {currentPreset.body === "Mars" ? "MARS REFERENCE" : "LUNAR REFERENCE"}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.6875rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              MISSION REHEARSAL VERIFICATION
            </span>
          </div>
          <h3 className="dual-comparator-title">Dual-World Terrain Comparator</h3>
          <p className="dual-comparator-subtitle">
            {isEn
              ? "1:1 scale topographic match comparing orbital laser altimetry against calibrated terrestrial test grounds"
              : "Alineación topográfica escala 1:1 contrastando altimetría láser orbital frente a bancos de prueba terrestres"}
          </p>
        </div>

        {/* Right Metrics Badges */}
        <div className="dual-metrics-group">
          <div className="dual-metric-block">
            <span className="metric-label">TWIN FIDELITY INDEX</span>
            <div className="metric-value-huge">{currentPreset.fidelityIndex.toFixed(1)}%</div>
          </div>
          <div className="dual-metric-subbadges">
            <span className="subbadge-verified">✔ {currentPreset.verifiedPercent}% verified data</span>
            <span className="subbadge-res">{currentPreset.spatialResolution} spatial resolution</span>
          </div>
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="dual-presets-bar">
        <span className="presets-label">{isEn ? "Calibrated Baselines:" : "Patrones Calibrados:"}</span>
        <div className="presets-scroll">
          {availablePresets.map((preset) => {
            const active = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                type="button"
                className={`preset-chip ${active ? "active" : ""}`}
                onClick={() => setSelectedPresetId(preset.id)}
              >
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="dual-selectors-grid">
        <div className="dual-select-field">
          <label>1. {isEn ? "PLANETARY TARGET" : "OBJETIVO PLANETARIO"}</label>
          <div className="select-box-static">
            <strong>{currentPreset.planetaryTarget.name}</strong>
            <small>{currentPreset.planetaryTarget.instrument}</small>
          </div>
        </div>

        <div className="dual-select-field">
          <label>2. {isEn ? "EARTH ANALOG TWIN" : "ANÁLOGO GEMELO TERRESTRE"}</label>
          <div className="select-box-static">
            <strong>{currentPreset.earthTwin.name}</strong>
            <small>{currentPreset.earthTwin.instrument}</small>
          </div>
        </div>

        <div className="dual-select-field">
          <label>3. {isEn ? "REHEARSAL OBJECTIVE" : "OBJETIVO OPERACIONAL"}</label>
          <div className="select-box-static">
            <strong>{currentPreset.rehearsalObjective}</strong>
            <small>CRITERIO DE PESO BALÍSTICO / TRACCIÓN</small>
          </div>
        </div>
      </div>

      {/* Sub-bar: Scrubber mode & Tabs */}
      <div className="dual-scrubber-topbar">
        <div className="scrubber-status">
          <span className="scrubber-icon">⚡</span>
          <strong>{isEn ? "Interactive 1:1 Surface Scrubber" : "Deslizador Interactivo de Superficie 1:1"}</strong>
          <span className="scrubber-pct">
            ({Math.round(splitPos)}% / {Math.round(100 - splitPos)}% split)
          </span>
          <span className="scrubber-hint">
            {isEn ? "• Drag divider left or right to inspect terrain alignment" : "• Arrastra el divisor para inspeccionar alineación"}
          </span>
        </div>

        <div className="dual-view-tabs">
          <button
            type="button"
            className={`view-tab-btn ${activeTab === "imagery" ? "active" : ""}`}
            onClick={() => setActiveTab("imagery")}
          >
            <span>📷 {isEn ? "Topographic Imagery" : "Imágenes Topográficas"}</span>
          </button>
          <button
            type="button"
            className={`view-tab-btn ${activeTab === "transect" ? "active" : ""}`}
            onClick={() => setActiveTab("transect")}
          >
            <span>📈 {isEn ? "Elevation Transect" : "Transecto Altimétrico"}</span>
          </button>
          <button
            type="button"
            className={`view-tab-btn ${activeTab === "climate" ? "active" : ""}`}
            onClick={() => setActiveTab("climate")}
          >
            <span>🌡️ {isEn ? "Atmospheric & Climate Matrix" : "Matriz Climática y Atmosférica"}</span>
          </button>
        </div>
      </div>

      {/* MAIN VIEW AREA */}
      {activeTab === "imagery" ? (
        <div
          ref={containerRef}
          className="dual-canvas-wrapper"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ cursor: isDragging ? "ew-resize" : "default" }}
        >
          {/* Earth Image (Base / Underneath) */}
          <div className="canvas-layer canvas-layer-earth">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPreset.earthTwin.image}
              alt={currentPreset.earthTwin.name}
              draggable={false}
            />
            {/* Earth Tag Overlays */}
            <div className="hud-corner-tag bottom-right">
              <span className="hud-tag-title">EARTH TWIN CANDIDATE</span>
              <strong>{currentPreset.earthTwin.name}</strong>
              <small>{currentPreset.earthTwin.coordinates} · {currentPreset.earthTwin.instrument}</small>
            </div>
            <div className="hud-feature-tag earth-feature">
              {currentPreset.earthTwin.featureTag}
            </div>
          </div>

          {/* Planetary Image (Clipped / Left Layer) */}
          <div
            className="canvas-layer canvas-layer-space"
            style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPreset.planetaryTarget.image}
              alt={currentPreset.planetaryTarget.name}
              draggable={false}
            />
            {/* Space Tag Overlays */}
            <div className="hud-corner-tag bottom-left">
              <span className="hud-tag-title">PLANETARY TARGET ({currentPreset.body.toUpperCase()})</span>
              <strong>{currentPreset.planetaryTarget.name}</strong>
              <small>{currentPreset.planetaryTarget.coordinates} · {currentPreset.planetaryTarget.instrument}</small>
            </div>
            <div className="hud-feature-tag space-feature">
              {currentPreset.planetaryTarget.featureTag}
            </div>
            {/* Corner Crosshairs */}
            <div className="hud-crosshair top-left">+</div>
            <div className="hud-crosshair bottom-left-corner">+</div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className="canvas-divider-handle"
            style={{ left: `${splitPos}%` }}
          >
            <div className="divider-line" />
            <div className="divider-knob" title="Arrastra para deslizar">
              <span className="knob-arrow">◀</span>
              <span className="knob-bars">||</span>
              <span className="knob-arrow">▶</span>
            </div>
          </div>
        </div>
      ) : activeTab === "transect" ? (
        /* Elevation Transect View */
        <div className="dual-transect-wrapper liquid-glass">
          <div className="transect-header">
            <h4>{isEn ? "5 km Topographic Cross-Section Profile" : "Perfil de Transecto Topográfico 5 km (LOLA / MOLA vs Copernicus DEM)"}</h4>
            <div className="transect-legend">
              <span className="legend-item space-line">
                <span className="legend-color-dot space" />
                {currentPreset.planetaryTarget.name}
              </span>
              <span className="legend-item earth-line">
                <span className="legend-color-dot earth" />
                {currentPreset.earthTwin.name}
              </span>
            </div>
          </div>

          {/* SVG Profile Chart */}
          <div className="transect-svg-container">
            <svg viewBox="0 0 700 240" className="transect-svg">
              <defs>
                <linearGradient id="spaceArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="earthArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="60" y1="30" x2="660" y2="30" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <line x1="60" y1="90" x2="660" y2="90" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <line x1="60" y1="150" x2="660" y2="150" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <line x1="60" y1="210" x2="660" y2="210" stroke="rgba(255,255,255,0.2)" />

              {/* Axis Labels */}
              <text x="25" y="35" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">+500m</text>
              <text x="25" y="95" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">+300m</text>
              <text x="25" y="155" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">+100m</text>
              <text x="35" y="215" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">0m</text>

              <text x="60" y="230" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">0 km</text>
              <text x="210" y="230" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">1.25 km</text>
              <text x="360" y="230" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">2.5 km</text>
              <text x="510" y="230" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">3.75 km</text>
              <text x="650" y="230" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">5 km</text>

              {/* Earth Curve Area */}
              <polygon
                points="60,210 60,160 180,120 300,75 420,110 540,65 660,40 660,210"
                fill="url(#earthArea)"
              />
              {/* Earth Line */}
              <polyline
                points="60,160 180,120 300,75 420,110 540,65 660,40"
                fill="none"
                stroke="#c084fc"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Space Curve Area */}
              <polygon
                points="60,210 60,150 180,110 300,60 420,95 540,55 660,30 660,210"
                fill="url(#spaceArea)"
              />
              {/* Space Line */}
              <polyline
                points="60,150 180,110 300,60 420,95 540,55 660,30"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="300" cy="60" r="4" fill="#38bdf8" />
              <circle cx="300" cy="75" r="4" fill="#c084fc" />
            </svg>
          </div>

          {/* Transect Metrics Table */}
          <div className="transect-stats-grid">
            <div className="transect-stat-cell">
              <span>{isEn ? "Max Transect Slope" : "Pendiente Máxima de Transecto"}</span>
              <strong>{currentPreset.transect.maxSlope}</strong>
            </div>
            <div className="transect-stat-cell">
              <span>{isEn ? "Surface Roughness RMS" : "Rugosidad Superficial RMS"}</span>
              <strong>{currentPreset.transect.roughnessRms}</strong>
            </div>
            <div className="transect-stat-cell">
              <span>{isEn ? "Wheel Sinkage Risk" : "Riesgo de Atollamiento de Rueda"}</span>
              <strong style={{ color: "#7fd579" }}>{currentPreset.transect.sinkageRisk}</strong>
            </div>
          </div>
        </div>
      ) : (
        /* CLIMATE & ATMOSPHERE COMPARISON TAB */
        <div className="dual-climate-view">
          <div className="dual-climate-header-summary">
            <div className="dual-climate-title-group">
              <h4>
                {isEn
                  ? "Planetary Atmosphere & Diurnal Thermal Contrast"
                  : "Contraste Atmosférico y Régimen Térmico Diurno"}
              </h4>
              <p>
                {isEn
                  ? `Comparing extreme environments between ${currentPreset.planetaryTarget.name} and ${currentPreset.earthTwin.name}`
                  : `Comparando entornos extremos entre ${currentPreset.planetaryTarget.name} y ${currentPreset.earthTwin.name}`}
              </p>
            </div>
            <div className="dual-climate-fidelity-pill">
              <span>⚡ {climateData.space.climateFidelityRating} {isEn ? "CLIMATE COMPATIBILITY" : "COMPATIBILIDAD CLIMÁTICA"}</span>
            </div>
          </div>

          <div className="dual-climate-columns-grid">
            {/* Space Column */}
            <div className={`dual-climate-col space ${currentPreset.body === "Mars" ? "mars" : ""}`}>
              <div className="col-header-tag">
                <span>{currentPreset.body === "Mars" ? "🪐 ATMÓSFERA MARCIANA" : "🌕 EXOSFERA LUNAR"}</span>
                <small>{currentPreset.planetaryTarget.instrument}</small>
              </div>

              <div className="climate-metrics-stack">
                <div className="climate-metric-entry">
                  <span className="metric-name">{isEn ? "Surface Temperature Cycle" : "Ciclo Térmico Superficial"}</span>
                  <strong className="metric-value">{climateData.space.tempRange}</strong>
                  <span className="metric-desc">{climateData.space.tempDescription}</span>
                </div>

                <div className="climate-metric-entry">
                  <span className="metric-name">{isEn ? "Atmospheric Pressure & Density" : "Presión Atmosférica y Densidad"}</span>
                  <strong className="metric-value">{climateData.space.atmosphericPressure}</strong>
                  <span className="metric-desc">{climateData.space.pressureDescription}</span>
                </div>

                <div className="climate-metric-entry">
                  <span className="metric-name">{isEn ? "Solar UV & Cosmic Radiation" : "Radiación Solar UV y Cósmica"}</span>
                  <strong className="metric-value">{climateData.space.solarRadiationUv}</strong>
                  <span className="metric-desc">{climateData.space.radiationDescription}</span>
                </div>

                <div className="climate-metric-entry">
                  <span className="metric-name">{isEn ? "Humidity & Dust Dynamics" : "Humedad y Dinámica de Polvo"}</span>
                  <strong className="metric-value">{climateData.space.relativeHumidity}</strong>
                  <span className="metric-desc">{climateData.space.windEolianDynamics}</span>
                </div>
              </div>
            </div>

            {/* Earth Twin Column */}
            <div className="dual-climate-col earth">
              <div className="col-header-tag">
                <span>🌍 ANÁLOGO TERRESTRE ({currentPreset.earthTwin.name})</span>
                <small>{currentPreset.earthTwin.instrument}</small>
              </div>

              <div className="climate-metrics-stack">
                <div className="climate-metric-entry">
                  <span className="metric-name">{isEn ? "Earth Temperature Range" : "Rango Térmico Terrestre"}</span>
                  <strong className="metric-value">{climateData.earth.tempRange}</strong>
                  <span className="metric-desc">{climateData.earth.tempDayNight}</span>
                </div>

                <div className="climate-metric-entry">
                  <span className="metric-name">{isEn ? "Local Barometric Pressure" : "Presión Barométrica Local"}</span>
                  <strong className="metric-value">{climateData.earth.atmosphericPressure}</strong>
                  <span className="metric-desc">{climateData.earth.atmosphericDensity}</span>
                </div>

                <div className="climate-metric-entry">
                  <span className="metric-name">{isEn ? "Solar UV Index & Insolation" : "Índice UV Solar e Insolación"}</span>
                  <strong className="metric-value" style={{ color: "#fbbf24" }}>{climateData.earth.uvIndex}</strong>
                  <span className="metric-desc">{climateData.earth.solarInsolation}</span>
                </div>

                <div className="climate-metric-entry">
                  <span className="metric-name">{isEn ? "Aeolian Desiccation" : "Desecación Eólica y Vientos"}</span>
                  <strong className="metric-value">{climateData.earth.windDesiccation}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Takeaway */}
          <div className="climate-divergence-box" style={{ marginTop: "0.5rem" }}>
            <div className="divergence-tag">
              <span>⚡ {isEn ? "OPERATIONAL ATMOSPHERIC RATIONALE" : "JUSTIFICACIÓN OPERACIONAL ATMOSFÉRICA"}</span>
            </div>
            <div className="divergence-text">
              <p><strong>{isEn ? "Scientific Divergence: " : "Divergencia Científica: "}</strong>{climateData.scientificDivergence.thermalDivergence}</p>
              <p><strong>{isEn ? "Mission Testing Value: " : "Valor de Ensayo en Misión: "}</strong>{climateData.space.operationalAtmosphericNote}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
