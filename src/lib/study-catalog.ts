import type { EarthRegion, ObservedVariable, VerificationStatus } from "./scientific-types";

// Nombres y roles procedentes del brief del proyecto; no es un catálogo instrumental.
export const studyRegions: EarthRegion[] = [
  {
    id: "salar-de-uyuni", name: "Salar de Uyuni", body: "Earth",
    study_role: "reference_calibration", country: "Bolivia",
    description: "Sitio de referencia propuesto para el estudio de análogos planetarios en Bolivia.",
    geometry: null, approximate_coordinates: null, crs_datum: null,
    novelty_level: null, novelty_justification: null,
    verification_status: "pendiente_de_verificar", dataset_ids: [], citation_ids: [], limitations: [],
  },
  {
    id: "sol-de-manana", name: "Sol de Mañana", body: "Earth",
    study_role: "research_candidate", country: "Bolivia",
    description: "Sector propuesto como candidato de investigación. Su caracterización requiere productos y fuentes verificadas.",
    geometry: null, approximate_coordinates: null, crs_datum: null,
    novelty_level: null, novelty_justification: null,
    verification_status: "pendiente_de_verificar", dataset_ids: [], citation_ids: [], limitations: [],
  },
  {
    id: "altiplano-sur", name: "Altiplano Sur", body: "Earth",
    study_role: "research_candidate", country: "Bolivia",
    description: "Área de estudio propuesta. Los límites y sectores específicos se definirán con el catálogo científico.",
    geometry: null, approximate_coordinates: null, crs_datum: null,
    novelty_level: null, novelty_justification: null,
    verification_status: "pendiente_de_verificar", dataset_ids: [], citation_ids: [], limitations: [],
  },
];

export const verificationLabels: Record<VerificationStatus, string> = {
  verificado_con_fuente: "Verificado con fuente",
  inferencia_razonable: "Inferencia razonable",
  hipotesis: "Hipótesis",
  pendiente_de_verificar: "Pendiente de verificar",
};

export const comparisonVariables: { id: ObservedVariable; label: string }[] = [
  { id: "pendiente", label: "Pendiente del terreno" },
  { id: "rugosidad", label: "Rugosidad" },
  { id: "morfologia", label: "Morfología" },
  { id: "mineralogia", label: "Mineralogía" },
  { id: "procesos_evaporiticos", label: "Procesos evaporíticos" },
  { id: "contexto_ambiental", label: "Contexto ambiental" },
];
