"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { createMapStyle, formatLocation, mapLocations, regionalView, type BasemapId } from "@/lib/map-config";
import type { EarthRegion } from "@/lib/scientific-types";
import { Icon } from "./icon";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}

export default function RegionalMap({ visibleRegions, selectedId, onSelect }: { visibleRegions: EarthRegion[]; selectedId: string; onSelect: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  const previousSelection = useRef(selectedId);
  const basemapRef = useRef<BasemapId>("satellite");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [basemap, setBasemap] = useState<BasemapId>("satellite");
  const [labels, setLabels] = useState(true);
  const [layersOpen, setLayersOpen] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [unsupported, setUnsupported] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [zoom, setZoom] = useState(regionalView.zoom);
  const selectedLocation = mapLocations[selectedId];
  const missingLocations = visibleRegions.filter(region => !mapLocations[region.id]);

  useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    if (!containerRef.current) return;
    let map: maplibregl.Map;
    setLoading(true);
    setProblem(null);
    setUnsupported(false);
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: createMapStyle(),
        center: regionalView.center,
        zoom: regionalView.zoom,
        minZoom: 1.5, maxZoom: 18,
        attributionControl: false,
        renderWorldCopies: true,
        cooperativeGestures: true,
        locale: {
          "CooperativeGesturesHandler.WindowsHelpText": "Usa Ctrl + rueda para acercar el mapa",
          "CooperativeGesturesHandler.MacHelpText": "Usa ⌘ + rueda para acercar el mapa",
          "CooperativeGesturesHandler.MobileHelpText": "Usa dos dedos para mover el mapa",
          "AttributionControl.ToggleAttribution": "Ver atribuciones del mapa",
        },
      });
    } catch {
      setUnsupported(true);
      setLoading(false);
      return;
    }
    mapRef.current = map;
    basemapRef.current = "satellite";
    setBasemap("satellite");
    map.addControl(new maplibregl.AttributionControl({ compact: false }), "bottom-right");
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 90, unit: "metric" }), "bottom-left");
    const timeout = window.setTimeout(() => {
      setLoading(false);
      setProblem("El mapa está tardando en responder. Comprueba tu conexión o prueba otra capa.");
    }, 18_000);
    // Los controles funcionan incluso si el proveedor de teselas tarda.
    map.on("style.load", () => setReady(true));
    map.on("load", () => { window.clearTimeout(timeout); setLoading(false); });
    map.on("idle", () => { setLoading(false); });
    map.on("zoomend", () => setZoom(map.getZoom()));
    map.on("error", () => {
      setLoading(false);
      setProblem("No se pudo cargar parte de la cartografía. Prueba otra capa o vuelve a intentarlo.");
    });
    map.on("sourcedata", event => {
      if (event.sourceId === basemapRef.current && event.sourceDataType === "content") {
        setProblem(null);
      }
    });
    const resize = new ResizeObserver(() => map.resize());
    resize.observe(containerRef.current);
    return () => {
      window.clearTimeout(timeout);
      resize.disconnect();
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
  }, [attempt]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    for (const region of visibleRegions) {
      const location = mapLocations[region.id];
      if (!location) continue;
      const wrapper = document.createElement("div");
      const button = document.createElement("button");
      button.type = "button";
      button.className = `geographic-marker${selectedId === region.id ? " is-selected" : ""}${labels ? "" : " hide-label"}`;
      button.setAttribute("aria-label", `Seleccionar ${region.name} en el mapa`);
      button.setAttribute("aria-pressed", String(selectedId === region.id));
      const dot = document.createElement("span");
      dot.className = "geographic-marker-dot";
      const label = document.createElement("span");
      label.className = "geographic-marker-label";
      label.textContent = region.name;
      button.append(dot, label);
      button.addEventListener("click", () => onSelectRef.current(region.id));
      wrapper.append(button);
      markersRef.current.push(new maplibregl.Marker({ element: wrapper, anchor: "left" }).setLngLat(location.position).addTo(map));
    }
  }, [visibleRegions, selectedId, labels, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || previousSelection.current === selectedId) return;
    previousSelection.current = selectedId;
    const location = mapLocations[selectedId];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetZooms: Record<string, number> = {
      "sol-de-manana": 10,
      "tubos-lava-lanzarote": 10,
      "cumbre-licancabur": 10,
      "cuevas-volcanicas-lipez": 9,
      "atacama-yungay": 8,
      "haughton-crater": 8,
      "salar-de-uyuni": 8,
      "mcmurdo-dry-valleys": 7,
      "altiplano-sur": 7,
    };
    const zoomLevel = targetZooms[selectedId] ?? 8;
    map.flyTo(location
      ? { center: location.position, zoom: zoomLevel, duration: reduceMotion ? 0 : 1200 }
      : { ...regionalView, duration: reduceMotion ? 0 : 800 });
  }, [selectedId, ready]);

  function switchBasemap(next: BasemapId) {
    const map = mapRef.current;
    if (!map || !ready || next === basemap) return;
    basemapRef.current = next;
    setBasemap(next);
    setProblem(null);
    setLoading(true);
    map.setLayoutProperty("satellite", "visibility", next === "satellite" ? "visible" : "none");
    map.setLayoutProperty("cartographic", "visibility", next === "cartographic" ? "visible" : "none");
  }

  function resetView() {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 800;
    mapRef.current?.flyTo({ ...regionalView, bearing: 0, pitch: 0, duration });
  }

  return <section className="regional-map live-map panel" aria-label="Mapa geográfico interactivo de las regiones de estudio">
    <div ref={containerRef} className="map-canvas" />
    <div className="map-topbar"><div className="map-context"><span className="map-context-dot" /><span>EXPLORACIÓN GLOBAL DE ANÁLOGOS<small>{basemap === "satellite" ? "Observación satelital global de contexto (Esri)" : "Cartografía OpenStreetMap"}</small></span></div><div className="basemap-switch" aria-label="Mapa base"><button aria-pressed={basemap === "satellite"} disabled={!ready} onClick={() => switchBasemap("satellite")}><Icon name="globe" size={13} />Satélite</button><button aria-pressed={basemap === "cartographic"} disabled={!ready} onClick={() => switchBasemap("cartographic")}>Cartográfico</button></div></div>
    {loading && !unsupported && <div className="map-loading" role="status"><span className="loading-spinner" />Cargando cartografía…</div>}
    {unsupported && <div className="map-unavailable"><Icon name="globe" size={36} /><h2>El mapa necesita WebGL</h2><p>Activa la aceleración gráfica o abre la aplicación en un navegador compatible. Puedes seguir explorando las regiones en el panel lateral.</p><button className="primary-button" onClick={() => setAttempt(value => value + 1)}>Volver a intentar</button></div>}
    {problem && !unsupported && <div className="map-error" role="status"><Icon name="info" size={17} /><p>{problem}</p><button onClick={() => setAttempt(value => value + 1)}>Reintentar</button></div>}
    <div className="live-map-controls"><button disabled={!ready || zoom >= 18} aria-label="Acercar mapa" onClick={() => mapRef.current?.zoomIn()}><span>+</span></button><button disabled={!ready || zoom <= 1.5} aria-label="Alejar mapa" onClick={() => mapRef.current?.zoomOut()}><span>−</span></button><div /><button disabled={!ready} aria-label="Ver toda la región" onClick={resetView}><Icon name="target" size={17} /></button><button disabled={!ready} aria-label="Configurar capas" aria-expanded={layersOpen} onClick={() => setLayersOpen(!layersOpen)}><Icon name="layers" size={17} /></button><button disabled={!ready} aria-label="Orientar al norte" onClick={() => mapRef.current?.resetNorth()}><span className="north-control">N<span>↑</span></span></button></div>
    {layersOpen && <div className="live-layer-options"><div><strong>Capas visibles</strong><button aria-label="Cerrar capas" onClick={() => setLayersOpen(false)}><Icon name="close" size={14} /></button></div><label><input type="checkbox" checked={labels} onChange={event => setLabels(event.target.checked)} />Nombres de sitios</label><p>Los puntos son localizadores de referencia, no áreas de muestreo.</p><a href="/methodology#cartography">Fuentes y precisión<Icon name="arrow" size={12} /></a></div>}
    {!unsupported && <div className="map-location-strip"><Icon name="pin" size={15} /><div><strong>{selectedId === "altiplano-sur" ? "Altiplano Sur · vista regional" : visibleRegions.find(region => region.id === selectedId)?.name ?? "Selección fuera del filtro"}</strong><span>{selectedLocation ? formatLocation(selectedLocation.position) : "Área de estudio pendiente de delimitar"}</span></div>{selectedLocation && <a href={selectedLocation.source_url} target="_blank" rel="noopener noreferrer" title={selectedLocation.note}>{selectedLocation.source_name}<Icon name="arrow" size={12} /></a>}</div>}
    {missingLocations.length > 0 && !unsupported && <div className="map-area-note"><span />{missingLocations.map(region => region.name).join(", ")}: sin límite geográfico validado</div>}
    <div className="map-engine-label">MAPLIBRE <span>·</span> WEB MERCATOR</div>
  </section>;
}
