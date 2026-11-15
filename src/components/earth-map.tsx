"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { formatLocation, mapLocations, type BasemapId } from "@/lib/map-config";
import { Icon } from "./icon";
import { processFilters, detailedEarthRegions, type DetailedEarthRegionInfo, type EarthProcessCategory } from "@/lib/earth-catalog";
import { getCountryView, GLOBAL_VIEW } from "@/lib/world-countries";
import { useLanguage } from "@/context/language-context";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}

export type ExtendedBasemapId = "satellite" | "cartographic" | "terrain";

const basemapSources = {
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  cartographic: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  terrain: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
};

function createEarth3DGlobeStyle(): maplibregl.StyleSpecification {
  return {
    version: 8,
    // Proyección de Globo Esférico 3D nativa de MapLibre
    projection: { type: "globe" },
    sources: {
      satellite: {
        type: "raster",
        tiles: [basemapSources.satellite],
        tileSize: 256,
        maxzoom: 18,
        attribution: '© Esri, Vantor, Earthstar Geographics',
      },
      cartographic: {
        type: "raster",
        tiles: [basemapSources.cartographic],
        tileSize: 256,
        maxzoom: 18,
        attribution: '© Esri World Topo Map',
      },
      terrain: {
        type: "raster",
        tiles: [basemapSources.terrain],
        tileSize: 256,
        maxzoom: 13,
        attribution: '© Esri World Shaded Relief, USGS, CGIAR',
      },
    },
    layers: [
      { id: "background", type: "background", paint: { "background-color": "#020409" } },
      { id: "satellite", type: "raster", source: "satellite", paint: { "raster-fade-duration": 200 } },
      { id: "cartographic", type: "raster", source: "cartographic", layout: { visibility: "none" }, paint: { "raster-fade-duration": 200 } },
      { id: "terrain", type: "raster", source: "terrain", layout: { visibility: "none" }, paint: { "raster-fade-duration": 200 } },
    ],
  };
}

interface EarthMapProps {
  visibleRegions: DetailedEarthRegionInfo[];
  selectedId: string;
  focusRequestSeq?: number;
  activeProcess: EarthProcessCategory;
  countryFilter: string;
  onSelect: (id: string) => void;
  onProbeCoordinate?: (coords: { lat: number; lng: number }) => void;
  activeProbeCoords?: { lat: number; lng: number } | null;
}

export default function EarthMap({
  visibleRegions,
  selectedId,
  focusRequestSeq = 0,
  activeProcess,
  countryFilter,
  onSelect,
  onProbeCoordinate,
  activeProbeCoords = null,
}: EarthMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const probeMarkerRef = useRef<maplibregl.Marker | null>(null);
  const onSelectRef = useRef(onSelect);
  const onProbeCoordinateRef = useRef(onProbeCoordinate);
  const lastHandledFocusSeq = useRef(0);
  const previousCountry = useRef(countryFilter);
  const basemapRef = useRef<ExtendedBasemapId>("satellite");

  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [basemap, setBasemap] = useState<ExtendedBasemapId>("satellite");
  const [zoom, setZoom] = useState(1.8);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [probeModeActive, setProbeModeActive] = useState(false);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    onProbeCoordinateRef.current = onProbeCoordinate;
  }, [onProbeCoordinate]);

  const activeColorMeta = processFilters.find(p => p.id === activeProcess) ?? processFilters[0]!;
  const markerColor = activeColorMeta.color;

  useEffect(() => {
    if (!containerRef.current) return;
    let map: maplibregl.Map;
    setLoading(true);

    try {
      const initialView = getCountryView(countryFilter);
      map = new maplibregl.Map({
        container: containerRef.current,
        style: createEarth3DGlobeStyle(),
        center: initialView.center,
        zoom: initialView.zoom,
        minZoom: 1.0,
        maxZoom: 18,
        attributionControl: false,
        renderWorldCopies: false,
        cooperativeGestures: true,
      });

      mapRef.current = map;
    } catch (e) {
      console.error("Error al iniciar MapLibre 3D Globe:", e);
      setLoading(false);
      return;
    }

    basemapRef.current = "satellite";
    setBasemap("satellite");

    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-left");

    const loadTimeout = window.setTimeout(() => setLoading(false), 6000);

    map.on("style.load", () => {
      map.setProjection({ type: "globe" });
      setReady(true);
    });
    map.on("load", () => {
      window.clearTimeout(loadTimeout);
      setLoading(false);
    });
    map.on("idle", () => {
      window.clearTimeout(loadTimeout);
      setLoading(false);
    });
    map.on("error", () => {
      window.clearTimeout(loadTimeout);
      setLoading(false);
    });
    map.on("zoomend", () => setZoom(map.getZoom()));

    map.on("mousemove", (e) => {
      setCursorCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    });

    map.on("click", (e) => {
      if (onProbeCoordinateRef.current) {
        onProbeCoordinateRef.current({ lat: e.lngLat.lat, lng: e.lngLat.lng });
      }
    });

    const resize = new ResizeObserver(() => map.resize());
    resize.observe(containerRef.current);

    return () => {
      window.clearTimeout(loadTimeout);
      resize.disconnect();
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, []);

  // Vuelo 3D cuando cambia el país seleccionado en el filtro
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || previousCountry.current === countryFilter) return;
    previousCountry.current = countryFilter;

    const targetView = getCountryView(countryFilter);
    map.stop();
    map.flyTo({
      center: targetView.center,
      zoom: targetView.zoom,
      bearing: 0,
      pitch: 0,
      duration: 1800,
      essential: true,
    });
  }, [countryFilter, ready]);

  // Actualización de marcadores reactivos al filtro
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    for (const region of visibleRegions) {
      const position = region.coordinatesRaw;
      if (!position) continue;

      const isSelected = selectedId === region.id;
      const el = document.createElement("div");
      el.className = `earth-marker-wrapper ${isSelected ? "selected" : ""}`;
      el.setAttribute("title", `${region.name} (${region.country}) · Clic para enfocar`);

      const pulseRing = document.createElement("span");
      pulseRing.className = "earth-marker-pulse";
      pulseRing.style.borderColor = markerColor;
      pulseRing.style.boxShadow = `0 0 16px ${markerColor}`;

      const dot = document.createElement("span");
      dot.className = "earth-marker-dot";
      dot.style.backgroundColor = isSelected ? "#ffffff" : markerColor;
      dot.style.boxShadow = `0 0 12px ${markerColor}`;

      el.append(pulseRing, dot);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectRef.current(region.id);
      });

      const marker = new maplibregl.Marker({
        element: el,
        anchor: "center",
        opacityWhenCovered: "0",
      })
        .setLngLat(position)
        .addTo(map);

      markersRef.current.push(marker);
    }
  }, [visibleRegions, selectedId, ready, markerColor]);

  // Marcador de Sonda Libre Dinámica (Custom Probe Beacon)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    if (probeMarkerRef.current) {
      probeMarkerRef.current.remove();
      probeMarkerRef.current = null;
    }

    if (activeProbeCoords) {
      const el = document.createElement("div");
      el.className = "custom-probe-marker";
      el.innerHTML = `
        <span class="probe-marker-pulse"></span>
        <span class="probe-marker-crosshair"></span>
      `;
      const marker = new maplibregl.Marker({
        element: el,
        anchor: "center",
        opacityWhenCovered: "0",
      })
        .setLngLat([activeProbeCoords.lng, activeProbeCoords.lat])
        .addTo(map);

      probeMarkerRef.current = marker;
    }
  }, [activeProbeCoords, ready]);

  // Cursor del mapa en modo sonda
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const canvas = map.getCanvas();
    if (probeModeActive) {
      canvas.style.cursor = "crosshair";
    } else {
      canvas.style.cursor = "";
    }
  }, [probeModeActive]);

  // Vuelo explícito hacia una región seleccionada (clic en tarjeta o marcador)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || focusRequestSeq <= 0 || lastHandledFocusSeq.current === focusRequestSeq) {
      return;
    }
    lastHandledFocusSeq.current = focusRequestSeq;

    const targetRegion =
      visibleRegions.find((r) => r.id === selectedId) ?? detailedEarthRegions[selectedId];
    if (!targetRegion?.coordinatesRaw) return;

    const targetZooms: Record<string, number> = {
      "sol-de-manana": 10.5,
      "tubos-lava-lanzarote": 10.5,
      "cumbre-licancabur": 10.5,
      "cuevas-volcanicas-lipez": 9.5,
      "volcan-ollague": 9.5,
      "parque-timanfaya": 9.5,
      "laguna-colorada": 9.0,
      "arenales-uyuni": 8.8,
      "cordillera-sal-atacama": 8.8,
      "atacama-yungay": 8.5,
      "haughton-crater": 8.5,
      "salar-de-uyuni": 8.5,
      "salar-coipasa": 8.5,
      "lago-vanda-taylor": 8.0,
      "mcmurdo-dry-valleys": 7.5,
      "altiplano-sur": 7.5,
    };
    const targetZoom = targetZooms[selectedId] ?? 8.5;

    map.stop();
    map.flyTo({
      center: targetRegion.coordinatesRaw,
      zoom: targetZoom,
      bearing: 0,
      pitch: 0,
      duration: 1500,
      essential: true,
    });
  }, [selectedId, focusRequestSeq, ready, visibleRegions]);

  function switchBasemap(next: ExtendedBasemapId) {
    const map = mapRef.current;
    if (!map || !ready || next === basemap) return;
    basemapRef.current = next;
    setBasemap(next);

    map.setLayoutProperty("satellite", "visibility", next === "satellite" ? "visible" : "none");
    map.setLayoutProperty("cartographic", "visibility", next === "cartographic" ? "visible" : "none");
    map.setLayoutProperty("terrain", "visibility", next === "terrain" ? "visible" : "none");
  }

  function resetView() {
    const targetView = getCountryView(countryFilter);
    mapRef.current?.flyTo({
      center: targetView.center,
      zoom: targetView.zoom,
      bearing: 0,
      pitch: 0,
      duration: 1200,
    });
  }

  const { lang } = useLanguage();
  const isEn = lang === "en";

  const selectedRegion = visibleRegions.find(r => r.id === selectedId);

  return (
    <div
      className="earth-map-container"
      aria-label={
        isEn
          ? "Interactive 3D viewer of planet Earth"
          : "Visor 3D interactivo del planeta Tierra"
      }
    >
      {/* Esquinas técnicas HUD */}
      <div className="hud-corner top-left" />
      <div className="hud-corner top-right" />
      <div className="hud-corner bottom-left" />
      <div className="hud-corner bottom-right" />

      {/* Contenedor MapLibre 3D Globe */}
      <div ref={containerRef} className="map-canvas-fullscreen" />

      {/* Barra superior de telemetría y capas */}
      <div className="earth-map-topbar">
        <div className="map-mission-tag">
          <span className="live-ping" style={{ backgroundColor: markerColor }} />
          <span>
            {isEn ? "3D SATELLITE GLOBE · " : "GLOBO 3D SATELITAL · "}
            <strong>
              {visibleRegions.length} {isEn ? "AUDITED ANALOGS" : "ANÁLOGOS AUDITADOS"}
            </strong>
          </span>
        </div>

        <div className="map-layer-selector">
          <button
            type="button"
            className={`layer-btn ${basemap === "satellite" ? "active" : ""}`}
            onClick={() => switchBasemap("satellite")}
          >
            <Icon name="globe" size={13} />
            <span>{isEn ? "3D Satellite (Esri)" : "Satélite 3D (Esri)"}</span>
          </button>
          <button
            type="button"
            className={`layer-btn ${basemap === "terrain" ? "active" : ""}`}
            onClick={() => switchBasemap("terrain")}
          >
            <Icon name="layers" size={13} />
            <span>{isEn ? "Shaded Relief" : "Relieve Sombreado"}</span>
          </button>
          <button
            type="button"
            className={`layer-btn ${basemap === "cartographic" ? "active" : ""}`}
            onClick={() => switchBasemap("cartographic")}
          >
            <span>{isEn ? "Cartographic" : "Cartográfico"}</span>
          </button>
        </div>
      </div>

      {/* Controles de navegación y orientación 3D */}
      <div className="earth-nav-controls">
        <button
          type="button"
          className="map-nav-btn"
          aria-label={isEn ? "Zoom in" : "Acercar mapa"}
          title={isEn ? "Zoom in (+)" : "Acercar zoom (+)"}
          onClick={() => {
            const map = mapRef.current;
            if (!map) return;
            map.zoomTo(map.getZoom() + 1, { duration: 400 });
          }}
        >
          <span>+</span>
        </button>
        <button
          type="button"
          className="map-nav-btn"
          aria-label={isEn ? "Zoom out" : "Alejar mapa"}
          title={isEn ? "Zoom out (−)" : "Alejar zoom (−)"}
          onClick={() => {
            const map = mapRef.current;
            if (!map) return;
            map.zoomTo(Math.max(1, map.getZoom() - 1), { duration: 400 });
          }}
        >
          <span>−</span>
        </button>
        <div className="nav-btn-divider" />
        <button
          type="button"
          className="map-nav-btn"
          aria-label={isEn ? "Recenter orbital view" : "Recentrar vista orbital"}
          title={isEn ? "Recenter country / globe view" : "Recentrar vista del país / globo"}
          onClick={resetView}
        >
          <Icon name="target" size={16} />
        </button>
        <button
          type="button"
          className="map-nav-btn"
          aria-label={isEn ? "Reset compass north" : "Orientar al norte"}
          title={isEn ? "Reset compass North" : "Orientar brújula al Norte"}
          onClick={() => mapRef.current?.resetNorth({ duration: 500 })}
        >
          <span className="compass-icon">N↑</span>
        </button>
        <div className="nav-btn-divider" />
        <button
          type="button"
          className={`map-nav-btn ${probeModeActive ? "probe-active" : ""}`}
          aria-label={isEn ? "Point & Scan: Free Planetary Probe" : "Sondeo Libre: Prospección Planetaria"}
          title={
            probeModeActive
              ? isEn
                ? "Deactivate Probe Mode"
                : "Desactivar Modo Sonda"
              : isEn
              ? "Point & Scan: Click anywhere on Earth to compare with Moon/Mars"
              : "Sondeo Libre: Haz clic en cualquier punto de la Tierra para comparar con Luna/Marte"
          }
          onClick={() => setProbeModeActive((prev) => !prev)}
        >
          <span style={{ fontSize: "14px" }}>🛰️</span>
        </button>
      </div>

      {/* Barra inferior de telemetría y coordenadas dinámicas */}
      <div className="earth-coords-bar">
        <div className="coords-item">
          <span className="coords-label">{isEn ? "CURSOR COORDS:" : "COORDENADAS CURSOR:"}</span>
          <strong>
            {cursorCoords
              ? `${Math.abs(cursorCoords.lat).toFixed(4)}° ${cursorCoords.lat < 0 ? "S" : "N"} · ${Math.abs(cursorCoords.lng).toFixed(4)}° ${cursorCoords.lng < 0 ? (isEn ? "W" : "O") : "E"}`
              : isEn ? "20.3800° S · 66.9500° W" : "20.3800° S · 66.9500° O"}
          </strong>
        </div>
        <div className="coords-sep">|</div>
        <div className="coords-item">
          <span className="coords-label">ZOOM:</span>
          <strong>{zoom.toFixed(1)}x</strong>
        </div>
        <div className="coords-sep">|</div>
        <div className="coords-item">
          <span className="coords-label">{isEn ? "PROJECTION:" : "PROYECCIÓN:"}</span>
          <strong>{isEn ? "3D SPHERICAL GLOBE (WGS84)" : "GLOBO 3D ESFÉRICO (WGS84)"}</strong>
        </div>
        {selectedRegion && (
          <>
            <div className="coords-sep">|</div>
            <div className="coords-item source-link">
              <span>{selectedRegion.verifiedDataset}</span>
            </div>
          </>
        )}
      </div>

      {loading && (
        <div className="earth-map-loading-overlay">
          <span className="loading-spinner" />
          <span>
            {isEn
              ? "Rendering 3D sphere & loading satellite orthophotos…"
              : "Generando esfera 3D y cargando ortofotos satelitales…"}
          </span>
        </div>
      )}
    </div>
  );
}
