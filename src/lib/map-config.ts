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
  "cuevas-volcanicas-lipez": {
    position: [-67.18, -22.27],
    source_name: "AnalogX · Complejo Volcánico Uturuncu / Lípez",
    source_url: "https://doi.org/10.1016/j.earscirev.2020.103288",
    source_crs: "WGS84 (EPSG:4326)",
    note: "Sector de cavidades y tubos de lava relictos en el Altiplano Sur (~4400 msnm) para análogos de hábitats subterráneos lunares/marcianos.",
  },
  "cumbre-licancabur": {
    position: [-67.88, -22.83],
    source_name: "NASA Ames / SETI Institute Astrobiology Field Research",
    source_url: "https://doi.org/10.1029/2006JG000318",
    source_crs: "WGS84 (EPSG:4326)",
    note: "Cumbre criogénica y laguna de cráter volcánico (~5916 msnm); análogo extremo para pruebas de trajes espaciales EVA y frío polar.",
  },
  "altiplano-sur": {
    position: [-67.50, -21.20],
    source_name: "AnalogX · Cuenca Altiplánica Regional",
    source_url: "https://doi.org/10.1016/0012-821X(91)90104-Y",
    source_crs: "WGS84 (EPSG:4326)",
    note: "Corredor regional para evaluar gradientes de salinidad y desecación progresiva bajo extrema radiación UV.",
  },
  "atacama-yungay": {
    position: [-69.87, -24.08],
    source_name: "NASA Astrobiology / Science 2003",
    source_url: "https://doi.org/10.1126/science.1089143",
    source_crs: "WGS84 (EPSG:4326)",
    note: "Sector hiperárido de Yungay con suelos de percloratos y nitratos análogos a Marte.",
  },
  "mcmurdo-dry-valleys": {
    position: [160.75, -77.85],
    source_name: "USGS Antarctic Geographic Names / NASA LRO",
    source_url: "https://doi.org/10.1130/0016-7606(2002)114",
    source_crs: "WGS84 (EPSG:4326)",
    note: "Beacon Valley: desierto polar frío con hielo masivo subsuperficial relicto.",
  },
  "haughton-crater": {
    position: [-89.67, 75.38],
    source_name: "NASA Ames / Haughton-Mars Project",
    source_url: "https://doi.org/10.1111/j.1945-5100.2005.tb00145.x",
    source_crs: "WGS84 (EPSG:4326)",
    note: "Cráter de impacto meteórico en ambiente periglacial ártico continuo.",
  },
  "tubos-lava-lanzarote": {
    position: [-13.48, 29.15],
    source_name: "ESA PANGAEA / UNESCO Geoparque",
    source_url: "https://doi.org/10.1016/j.earscirev.2020.103288",
    source_crs: "WGS84 (EPSG:4326)",
    note: "Tubo volcánico de la Corona: campo oficial de entrenamiento de astronautas de la ESA.",
  },
};

export const regionalView = { center: [-35.0, 15.0] as [number, number], zoom: 2.2 };
export const boliviaView = { center: [-67.5, -21.2] as [number, number], zoom: 6.0 };
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
  const zoomLevels: Record<string, number> = {
    "salar-de-uyuni": 8,
    "sol-de-manana": 10,
    "cuevas-volcanicas-lipez": 9,
    "cumbre-licancabur": 10,
    "altiplano-sur": 7,
    "atacama-yungay": 8,
    "mcmurdo-dry-valleys": 7,
    "haughton-crater": 8,
    "tubos-lava-lanzarote": 10,
  };
  const zoom = zoomLevels[regionId] ?? 8;
  const count = 2 ** zoom;
  const x = Math.floor((lon + 180) / 360 * count);
  const rad = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.asinh(Math.tan(rad)) / Math.PI) / 2 * count);
  return satelliteTiles.replace("{z}", String(zoom)).replace("{x}", String(x)).replace("{y}", String(y));
}
