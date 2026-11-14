/** Contratos de transporte propuestos. No ejecuta solicitudes HTTP. */
import type {
  BibliographicCitation,
  ComparisonPayload,
  DatasetMetadata,
  EarthRegion,
  PlanetaryRegion,
  PlanetaryTarget,
  ScientificObservation,
  ScientificSource,
  VerificationStatus,
} from "./scientific-types";

export interface ListResponse<T> {
  items: T[];
  next_cursor: string | null;
}

export interface RegionFilters {
  body: PlanetaryRegion["body"] | null;
  study_role: PlanetaryRegion["study_role"] | null;
  country: string | null;
  verification_status: VerificationStatus | null;
  cursor: string | null;
}

export interface RegionDetailResponse {
  region: PlanetaryRegion;
  observations: ScientificObservation[];
  datasets: DatasetMetadata[];
  sources: ScientificSource[];
  citations: BibliographicCitation[];
}

export interface CompareRequest {
  earth_region_id: EarthRegion["id"];
  planetary_target_id: PlanetaryTarget["id"];
}

export interface ApiError {
  code: string;
  message: string;
  request_id: string | null;
  details: string[] | null;
}

/** Índice para acordar con backend; no registra endpoints en Next.js. */
export interface PlannedApiContract {
  "GET /api/regions": ListResponse<EarthRegion>;
  "GET /api/regions/{id}": RegionDetailResponse;
  "GET /api/targets": ListResponse<PlanetaryTarget>;
  "POST /api/compare": { request: CompareRequest; response: ComparisonPayload };
  "GET /api/sources": ListResponse<ScientificSource>;
}
