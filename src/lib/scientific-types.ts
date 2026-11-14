/** Propuesta de contrato JSON v0; pendiente de conciliar con Pydantic.
 * Campos requeridos, metadatos desconocidos explícitamente null.
 * Los tipos no validan respuestas HTTP en tiempo de ejecución.
 */
export type PlanetaryBody = "Earth" | "Mars" | "Moon";
export type SourcePriority = "MVP" | "segunda_fase" | "descartado";
export type VerificationStatus =
  | "verificado_con_fuente"
  | "inferencia_razonable"
  | "hipotesis"
  | "pendiente_de_verificar";
export type DatasetCategory =
  | "dato_instrumental"
  | "producto_derivado"
  | "interpretacion_bibliografica"
  | "dato_demostracion";
export type ObservedVariable =
  | "pendiente"
  | "rugosidad"
  | "morfologia"
  | "mineralogia"
  | "procesos_evaporiticos"
  | "contexto_ambiental";
export type ComparisonType = "directa" | "indirecta" | "cualitativa";

export interface ScientificSource {
  id: string;
  name: string;
  agency: string | null;
  official_url: string | null;
  license: string | null;
  priority: SourcePriority;
}

/** Resolución horizontal; no se presupone la misma resolución en ambos ejes. */
export interface SpatialResolution {
  x: number | null;
  y: number | null;
  unit: string | null;
  description: string | null;
}

export interface CrsDatum {
  body: PlanetaryBody;
  crs_name: string | null;
  authority_code: string | null;
  horizontal_datum: string | null;
  vertical_datum: string | null;
  coordinate_unit: string | null;
  latitude_convention: "planetocentric" | "planetographic" | null;
  longitude_convention: "east_180" | "east_360" | "west_360" | null;
}

export interface BibliographicCitation {
  id: string;
  title: string | null;
  authors: string[] | null;
  publication_year: number | null;
  doi: string | null;
  url: string | null;
  source_id: string | null;
  accessed_at: string | null;
}

export type PhysicalIncompatibility =
  | "gravedad"
  | "atmosfera"
  | "datums"
  | "procesos_antiguos_vs_actuales"
  | "resolucion_espacial"
  | "unidades"
  | "metodo_procesamiento"
  | "otra";

export type AnalogyNotice =
  "La analogía no implica habitabilidad ni idoneidad para una base humana.";

export interface ScientificLimitation {
  id: string;
  text: string;
  incompatibilities: PhysicalIncompatibility[];
  affected_observation_ids: string[];
  citation_ids: string[];
  verification_status: VerificationStatus;
  analogy_notice: AnalogyNotice;
}

export interface DatasetMetadata {
  id: string;
  source_id: string | null;
  product_id: string | null;
  mission: string | null;
  instrument: string | null;
  version: string | null;
  spatial_resolution: SpatialResolution | null;
  units: string[] | null;
  download_method: string | null;
  download_url: string | null;
  category: DatasetCategory;
  verification_status: VerificationStatus;
  limitations: ScientificLimitation[];
}

/** Coordenadas [longitud, latitud] en el crs_datum asociado; no implica WGS84. */
export type Position = readonly [longitude: number, latitude: number];
export type RegionGeometry =
  | { type: "Point"; coordinates: Position }
  | { type: "Polygon"; coordinates: Position[][] }
  | { type: "MultiPolygon"; coordinates: Position[][][] };

interface RegionMetadata {
  id: string;
  name: string;
  country: string | null;
  description: string | null;
  geometry: RegionGeometry | null;
  approximate_coordinates: Position | null;
  crs_datum: CrsDatum | null;
  novelty_level: "reference_established" | "candidate_to_assess" | "documented_novelty" | null;
  novelty_justification: string | null;
  verification_status: VerificationStatus;
  dataset_ids: string[];
  citation_ids: string[];
  limitations: ScientificLimitation[];
}

export interface EarthRegion extends RegionMetadata {
  body: "Earth";
  study_role: "reference_calibration" | "research_candidate";
}

export interface PlanetaryTarget extends RegionMetadata {
  body: "Mars" | "Moon";
  study_role: "planetary_target";
}

export type PlanetaryRegion = EarthRegion | PlanetaryTarget;

export interface ScientificObservation {
  id: string;
  region_id: string;
  dataset_id: string | null;
  source_id: string | null;
  source_url: string | null;
  product_id: string | null;
  acquisition_date: string | null;
  version: string | null;
  variable: ObservedVariable;
  unit: string | null;
  spatial_resolution: SpatialResolution | null;
  crs_datum: CrsDatum | null;
  processing_method: string | null;
  value: number | string | null;
  quality: string | null;
  uncertainty: string | null;
  verification_status: VerificationStatus;
  citation_ids: string[];
  limitations: ScientificLimitation[];
}

export interface QualitativeEvidence {
  id: string;
  text: string;
  evidence_type: "bibliografica" | "observacional";
  comparison_type: ComparisonType;
  region_ids: string[];
  observation_ids: string[];
  citation_ids: string[];
  verification_status: VerificationStatus;
  limitations: ScientificLimitation[];
  analogy_notice: AnalogyNotice;
}

export interface ResamplingRequirement {
  required: boolean | null;
  target_resolution: SpatialResolution | null;
  method: string | null;
  justification: string | null;
  performed: boolean | null;
}

export interface VariableComparison {
  variable: ObservedVariable;
  earth_observation_id: string | null;
  target_observation_id: string | null;
  comparison_type: ComparisonType;
  compatibility: "compatible" | "requires_processing" | "incompatible" | "pending";
  compatibility_reason: string | null;
  common_unit: string | null;
  unit_conversion_method: string | null;
  resampling: ResamplingRequirement;
  evidence_ids: string[];
  limitations: ScientificLimitation[];
  earth_value?: string | null;
  target_value?: string | null;
}

export type MissionCategory =
  | "rover_mobility"
  | "instrument_calibration"
  | "base_habitat_shielding"
  | "isru_resources"
  | "sample_preservation";

export interface MissionUseCase {
  id: string;
  title: string;
  category: MissionCategory;
  earth_region_id: string;
  planetary_target_id: string;
  applicable_mission: string;
  description: string;
  operational_method: string;
  trl_readiness: number;
  nasa_challenge_dimension: string;
}

/** Sin puntuación global: la compatibilidad se expresa por variable y evidencia. */
export interface ComparisonPayload {
  id: string;
  contract_version: "0";
  generated_at: string | null;
  methodology_version: string | null;
  earth_region: EarthRegion;
  planetary_target: PlanetaryTarget;
  observations: ScientificObservation[];
  variables: VariableComparison[];
  qualitative_evidence: QualitativeEvidence[];
  sources: ScientificSource[];
  datasets: DatasetMetadata[];
  citations: BibliographicCitation[];
  limitations: ScientificLimitation[];
  mission_use_cases?: MissionUseCase[];
  analogy_notice: AnalogyNotice;
}

export interface FindingItem {
  id: string;
  title: string;
  summary: string;
  evidence_count: number;
  verification_status: VerificationStatus;
  earth_region_name: string;
  target_name: string;
  limitations_summary: string;
}

