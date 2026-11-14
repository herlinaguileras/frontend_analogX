import proj4 from "proj4";
import type { StyleSpecification } from "maplibre-gl";

export type BasemapId = "satellite" | "cartographic";
export interface MapLocation {
  position: [longitude: number, latitude: number];
  source_name: string;
  source_url: string;
  note: string;
  source_crs: string | null;
}

// ENDE, 2021, p. 5: UTM WGS84, zona 19K (hemisferio sur).
const solDeManana = proj4(
  "+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs",
  "EPSG:4326",
  [629577.24, 7518040.45],
);

/** Localizadores para navegación; no son geometrías ni observaciones científicas. */
export const mapLocations: Partial<Record<string, MapLocation>> = {
  "salar-de-uyuni": {
    position: [-66.95, -20.38],
    source_name: "USGS · EROS Cal/Val",
    source_url: "https://calval.cr.usgs.gov/apps/uyuni-salt-flats",
    source_crs: null,
    note: "Localizador del sitio de calibración USGS, no centro del salar. WGS84 asumido para navegación; datum de origen por confirmar.",
  },
  "sol-de-manana": {
    position: [solDeManana[0]!, solDeManana[1]!],
    source_name: "ENDE · Laguna Colorada, 2021",
    source_url: "https://www.ende.bo/public/licitaciones/09-06-2021-expresion-de-interes-ende-ei-01-2021-tercera.pdf",
    source_crs: "WGS84 / UTM 19S (EPSG:32719)",
    note: "Punto referencial del proyecto ENDE en Sol de Mañana; convertido de UTM 19S a WGS84 con Proj4. No delimita el campo geotérmico.",
  },
};

export const regionalView = { center: [-67.5, -21.2] as [number, number], zoom: 6.0 };
export const satelliteTiles = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

export function createMapStyle(): StyleSpecification {
  return {
    version: 8,
    sources: {
      satellite: {
        type: "raster", tiles: [satelliteTiles], tileSize: 256, maxzoom: 18,
        attribution: '© <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a>, Vantor, Earthstar Geographics, GIS User Community',
      },
      cartographic: {
        type: "raster", tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"], tileSize: 256, maxzoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
      },
    },
    layers: [
      { id: "background", type: "background", paint: { "background-color": "#172431" } },
      { id: "satellite", type: "raster", source: "satellite", paint: { "raster-fade-duration": 250 } },
      { id: "cartographic", type: "raster", source: "cartographic", layout: { visibility: "none" } },
    ],
  };
}

export function formatLocation(position: [number, number]): string {
  const [longitude, latitude] = position;
  return `${Math.abs(latitude).toFixed(2)}° ${latitude < 0 ? "S" : "N"} · ${Math.abs(longitude).toFixed(2)}° ${longitude < 0 ? "O" : "E"}`;
}

/** Una tesela de contexto, sin inferir límites ni resolución instrumental. */
export function regionPreviewUrl(regionId: string): string | null {
  const location = mapLocations[regionId];
  if (!location) return null;
  const [lon, lat] = location.position;
  const zoom = regionId === "salar-de-uyuni" ? 8 : 10;
  const count = 2 ** zoom;
  const x = Math.floor((lon + 180) / 360 * count);
  const rad = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.asinh(Math.tan(rad)) / Math.PI) / 2 * count);
  return satelliteTiles.replace("{z}", String(zoom)).replace("{x}", String(x)).replace("{y}", String(y));
}
