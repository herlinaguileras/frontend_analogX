/**
 * Cliente API y contratos de transporte para AnalogX.
 * Conecta el frontend con el backend FastAPI (puerto 8000).
 */
import type {
  BibliographicCitation,
  ComparisonPayload,
  DatasetMetadata,
  EarthRegion,
  FindingItem,
  HabitatShieldingAnalysis,
  IsruFeasibilityAnalysis,
  MissionQualificationScorecard,
  MissionUseCase,
  PlanetaryRegion,
  PlanetaryTarget,
  RoverMobilityAnalysis,
  ScientificObservation,
  ScientificSource,
  VerificationStatus,
} from "./scientific-types";
import { studyRegions } from "./study-catalog";

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
  mission_use_cases?: MissionUseCase[];
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

/** Índice de contratos acordado con backend. */
export interface PlannedApiContract {
  "GET /api/regions": ListResponse<EarthRegion>;
  "GET /api/regions/{id}": RegionDetailResponse;
  "GET /api/targets": ListResponse<PlanetaryTarget>;
  "POST /api/compare": { request: CompareRequest; response: ComparisonPayload };
  "GET /api/sources": ListResponse<ScientificSource>;
}

export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
}

export async function fetchRegions(filters?: Partial<RegionFilters>): Promise<ListResponse<EarthRegion>> {
  const baseUrl = getApiBaseUrl();
  const params = new URLSearchParams();
  if (filters?.study_role && (filters.study_role as string) !== "all") params.set("study_role", filters.study_role);
  if (filters?.country) params.set("country", filters.country);
  if (filters?.verification_status) params.set("verification_status", filters.verification_status);
  if (filters?.cursor) params.set("cursor", filters.cursor);

  const query = params.toString() ? `?${params.toString()}` : "";
  try {
    const res = await fetch(`${baseUrl}/api/regions${query}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: ListResponse<EarthRegion> = await res.json();
    return data;
  } catch {
    // Fallback defensivo a regiones base para estabilidad si el backend no está activo
    return { items: studyRegions, next_cursor: null };
  }
}

export async function fetchRegionDetail(regionId: string): Promise<RegionDetailResponse | null> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/regions/${encodeURIComponent(regionId)}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchTargets(body?: string): Promise<ListResponse<PlanetaryTarget>> {
  const baseUrl = getApiBaseUrl();
  const query = body ? `?body=${encodeURIComponent(body)}` : "";
  try {
    const res = await fetch(`${baseUrl}/api/targets${query}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return { items: [], next_cursor: null };
  }
}

export async function fetchCompare(
  earthRegionId: string,
  planetaryTargetId: string
): Promise<ComparisonPayload | null> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/compare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        earth_region_id: earthRegionId,
        planetary_target_id: planetaryTargetId,
      }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchSources(): Promise<ListResponse<ScientificSource>> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/sources`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return { items: [], next_cursor: null };
  }
}

export async function fetchFindings(): Promise<FindingItem[]> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/findings`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return [];
  }
}

export async function checkBackendHealth(): Promise<{ status: string; online: boolean }> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/health`, {
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });
    if (!res.ok) return { status: "offline", online: false };
    const data = await res.json();
    return { status: data.status || "healthy", online: true };
  } catch {
    return { status: "offline", online: false };
  }
}

export async function fetchMissionUseCases(category?: string): Promise<ListResponse<MissionUseCase>> {
  const baseUrl = getApiBaseUrl();
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  try {
    const res = await fetch(`${baseUrl}/api/missions/use-cases${query}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return { items: [], next_cursor: null };
  }
}

export async function fetchMissionScorecard(
  earthRegionId: string,
  planetaryTargetId: string
): Promise<MissionQualificationScorecard | null> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/missions/scorecard?earth_region_id=${encodeURIComponent(earthRegionId)}&planetary_target_id=${encodeURIComponent(planetaryTargetId)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchRoverMobility(earthRegionId: string): Promise<RoverMobilityAnalysis | null> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/missions/mobility?earth_region_id=${encodeURIComponent(earthRegionId)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchIsruFeasibility(earthRegionId: string): Promise<IsruFeasibilityAnalysis | null> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/missions/isru?earth_region_id=${encodeURIComponent(earthRegionId)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchHabitatShielding(earthRegionId: string): Promise<HabitatShieldingAnalysis | null> {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(
      `${baseUrl}/api/missions/habitat-shielding?earth_region_id=${encodeURIComponent(earthRegionId)}`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
}
