/**
 * AnalogX — Motor de Prospección y Comparación Planetaria Dinámica
 * Evalúa cualquier coordenada de la Tierra en tiempo real frente a los objetivos de la NASA.
 * Funciona como motor cliente y fallback offline idéntico al endpoint POST /api/probe/evaluate de FastAPI.
 */

export interface ProbeCoordinates {
  lat: number;
  lon: number;
  formatted: string;
}

export interface ProbeMatchedTarget {
  id: string;
  name: string;
  body: "Moon" | "Mars" | "None";
  instrument: string;
  target_coordinates: string;
  target_image: string;
  feature_tag: string;
}

export interface ProbeSubsystems {
  rover_mobility: number;
  isru_feasibility: number;
  habitat_shielding: number;
  environmental_rigor: number;
}

export interface ProbeGravityComparison {
  earth_g: number;
  target_g: number;
  rover_mass_1000kg_weight_n: number;
  divergence_notice: string;
}

export interface ProbeAtmosphericComparison {
  earth_pressure_hpa: number;
  target_pressure_hpa: number;
  divergence_notice: string;
}

export interface ProbeEvaluateResponse {
  coordinates: ProbeCoordinates;
  surface_type: "land" | "ocean";
  geographic_zone: string;
  biome_classification: string;
  fidelity_index: number;
  confidence_level: "alta" | "media" | "baja" | "nula_oceano";
  matched_target: ProbeMatchedTarget;
  subsystems: ProbeSubsystems;
  gravity_comparison: ProbeGravityComparison;
  atmospheric_comparison: ProbeAtmosphericComparison;
  scientific_limitations: string[];
  epistemological_audit: string;
  recommended_rehearsal: string;
}

export function isCoordinateInOcean(lat: number, lon: number): boolean {
  // Antártida es tierra continental bajo casquete
  if (lat < -60.0) return false;

  // Gran Océano Pacífico
  if ((lon < -68.0 && lon > -180.0) || (lon > 120.0 && lon <= 180.0)) {
    // Sudamérica
    if (lat >= -56.0 && lat <= 13.0 && lon >= -82.0 && lon <= -34.0) return false;
    // Norteamérica
    if (lat >= 14.0 && lat <= 72.0 && lon >= -168.0 && lon <= -52.0) return false;
    // Australia y Nueva Zelanda
    if (lat >= -48.0 && lat <= -10.0 && lon >= 112.0 && lon <= 178.0) return false;
    // Japón, Filipinas, Indonesia
    if (lat >= -11.0 && lat <= 46.0 && lon >= 118.0 && lon <= 150.0) return false;
    return true;
  }

  // Océano Atlántico
  if (lon >= -68.0 && lon <= 20.0) {
    if (lat >= -56.0 && lat <= 13.0 && lon >= -82.0 && lon <= -34.0) return false;
    if (lat >= 14.0 && lat <= 72.0 && lon >= -168.0 && lon <= -52.0) return false;
    if (lat >= -35.0 && lat <= 37.0 && lon >= -18.0 && lon <= 52.0) return false;
    if (lat >= 36.0 && lat <= 72.0 && lon >= -10.0 && lon <= 45.0) return false;
    if (lat >= 60.0 && lat <= 84.0 && lon >= -73.0 && lon <= -11.0) return false;
    return true;
  }

  // Océano Índico
  if (lon > 20.0 && lon < 115.0 && lat < 25.0) {
    if (lat >= -35.0 && lat <= 37.0 && lon <= 52.0) return false;
    if (lat >= -26.0 && lat <= -12.0 && lon >= 43.0 && lon <= 51.0) return false;
    if (lat >= 8.0 && lat <= 35.0 && lon >= 68.0 && lon <= 90.0) return false;
    if (lat >= -11.0 && lat <= 25.0 && lon >= 95.0 && lon <= 120.0) return false;
    return true;
  }

  // Océano Ártico
  if (lat > 82.0) return true;

  return false;
}

export function formatLatLon(lat: number, lon: number): string {
  const latStr = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? "N" : "S"}`;
  const lonStr = `${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? "E" : "O"}`;
  return `${latStr} · ${lonStr}`;
}

export function evaluateCustomProbeOffline(
  lat: number,
  lon: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _preferredBody: "Moon" | "Mars" | "Auto" = "Auto"
): ProbeEvaluateResponse {
  const inOcean = isCoordinateInOcean(lat, lon);
  const coordsFmt = formatLatLon(lat, lon);

  if (inOcean) {
    return {
      coordinates: { lat, lon, formatted: coordsFmt },
      surface_type: "ocean",
      geographic_zone: "Cuenca Oceánica / Masa Marina Abierta",
      biome_classification: "Hidrosfera Marina Profunda en Fase Líquida",
      fidelity_index: 0.0,
      confidence_level: "nula_oceano",
      matched_target: {
        id: "incompatible_ocean",
        name: "Incompatible para Superficie Lunar o Marciana",
        body: "None",
        instrument: "Cláusula de Barrera Hidrosférica",
        target_coordinates: "N/A",
        target_image: "/images/geology/moon-shackleton.jpg",
        feature_tag: "Liquid Water Ocean (0% Fidelity)",
      },
      subsystems: {
        rover_mobility: 0.0,
        isru_feasibility: 0.0,
        habitat_shielding: 0.0,
        environmental_rigor: 0.0,
      },
      gravity_comparison: {
        earth_g: 1.0,
        target_g: 0.0,
        rover_mass_1000kg_weight_n: 0.0,
        divergence_notice: "Hundimiento hidrostático total. Los rovers de ruedas de aleación rígida requieren regolito o lecho rocoso.",
      },
      atmospheric_comparison: {
        earth_pressure_hpa: 1013.25,
        target_pressure_hpa: 0.0,
        divergence_notice: "La Luna es vacío duro (10^-12 torr) y Marte está a 6 hPa (bajo el punto triple del agua), impidiendo masas de agua abierta.",
      },
      scientific_limitations: [
        "Barrera Hidrosférica Absoluta: Masas de agua líquida superficial no pueden coexistir con el vacío lunar ni con la baja presión marciana.",
        "Incompatibilidad de Rodadura: Hundimiento del 100% de cualquier rover terrestre en suelo marino.",
        "Nota de Ciencia Abierta: Podría servir únicamente como análogo térmico e hidrodinámico para océanos subsuperficiales protegidos bajo hielo en Europa (Júpiter) o Encélado (Saturno), pero queda formalmente descalificado para la Base Lunar Artemis y rovers marcianos.",
      ],
      epistemological_audit: "El motor de AnalogX programáticamente invalida el punto por violar la ley de presión de vapor de la atmósfera marciana y el vacío lunar.",
      recommended_rehearsal: "Descalificado para pruebas de superficie de Artemis/Marte. Recomendado reubicar la sonda a tierra firme continental.",
    };
  }

  // 1. ZONA CRIOGÉNICA / POLAR
  if (lat < -60.0 || lat > 65.0) {
    return {
      coordinates: { lat, lon, formatted: coordsFmt },
      surface_type: "land",
      geographic_zone: "Zona Polar Criogénica / Permafrost Glaciar",
      biome_classification: "Desierto Polar sin Nieve y Hielo Relictual",
      fidelity_index: 88.4,
      confidence_level: "alta",
      matched_target: {
        id: "moon-shackleton-psr",
        name: "Borde de Cráter Shackleton (Polo Sur Lunar)",
        body: "Moon",
        instrument: "NASA LRO LOLA / Diviner / ShadowCam",
        target_coordinates: "89.9° S · 0.0° E",
        target_image: "/images/geology/moon-shackleton.jpg",
        feature_tag: "Cold-Trap Volatiles Reservoir",
      },
      subsystems: {
        rover_mobility: 79.0,
        isru_feasibility: 94.0,
        habitat_shielding: 76.0,
        environmental_rigor: 89.0,
      },
      gravity_comparison: {
        earth_g: 1.0,
        target_g: 0.166,
        rover_mass_1000kg_weight_n: 1628.0,
        divergence_notice: "Un rover de 1000 kg pesará solo 166 kg-fuerza en la Luna, reduciendo el agarre por gravedad pero facilitando pendientes extremas.",
      },
      atmospheric_comparison: {
        earth_pressure_hpa: 680.0,
        target_pressure_hpa: 0.0,
        divergence_notice: "La ausencia de atmósfera lunar impide enfriamiento convectivo; la disipación térmica es puramente radiativa.",
      },
      scientific_limitations: [
        "Gravedad Lunar (0.16 g): La tracción sobre permafrost terrestre sobrestima la fricción disponible en la Luna.",
        "Vacío Duro: El hielo en la Tierra sublima bajo aire; en la Luna ocurre en vacío absoluto a <40 K.",
      ],
      epistemological_audit: "Excelente fidelidad para ensayos de taladros criogénicos (ISRU) y fatiga de materiales a temperaturas bajo cero.",
      recommended_rehearsal: "Calificación de sistemas de perforación criogénica y sellos de trajes espaciales Artemis xEMU.",
    };
  }

  // 2. ZONAS ÁRIDAS / DESIERTOS / SALARES
  const isArid =
    (lat >= -32.0 && lat <= -14.0 && lon >= -73.0 && lon <= -64.0) ||
    (lat >= 14.0 && lat <= 33.0 && lon >= -16.0 && lon <= 58.0) ||
    (lat >= -33.0 && lat <= -18.0 && lon >= 115.0 && lon <= 142.0) ||
    (lat >= 31.0 && lat <= 42.0 && lon >= -122.0 && lon <= -108.0);

  if (isArid) {
    return {
      coordinates: { lat, lon, formatted: coordsFmt },
      surface_type: "land",
      geographic_zone: "Cuenca Evaporítica y Desierto Hiperárido",
      biome_classification: "Costra Salina, Arcillas de Desecación y Regolito Eólico",
      fidelity_index: 89.6,
      confidence_level: "alta",
      matched_target: {
        id: "mars-terra-sirenum",
        name: "Paleocuenca Salina de Terra Sirenum",
        body: "Mars",
        instrument: "NASA MRO CRISM / HiRISE",
        target_coordinates: "38.8° S · 139.0° O",
        target_image: "/images/geology/mars-sirenum.jpg",
        feature_tag: "Chloride Salt Deposits & Polygons",
      },
      subsystems: {
        rover_mobility: 91.0,
        isru_feasibility: 86.0,
        habitat_shielding: 72.0,
        environmental_rigor: 82.0,
      },
      gravity_comparison: {
        earth_g: 1.0,
        target_g: 0.38,
        rover_mass_1000kg_weight_n: 3728.0,
        divergence_notice: "Un rover de 1000 kg pesará 373 kg-fuerza en Marte, reduciendo el riesgo de atollamiento en costras friables.",
      },
      atmospheric_comparison: {
        earth_pressure_hpa: 850.0,
        target_pressure_hpa: 6.1,
        divergence_notice: "La atmósfera terrestre contiene 21% O2 frente al 95% CO2 marciano; la corrosión química y oxidantes percloratos difieren.",
      },
      scientific_limitations: [
        "Disparidad de Presión: 6.1 hPa en Marte frente a ~850 hPa en desiertos terrestres.",
        "Erosión Eólica Activa: La atmósfera densa de la Tierra arrastra partículas mayores que el tenue viento marciano.",
      ],
      epistemological_audit: "Homología morfológica y mineralógica de primer orden para algoritmos de tracción y espectrometría in situ.",
      recommended_rehearsal: "Pruebas de movilidad de rovers clase Curiosity/Perseverance y calibración de espectrómetros Raman/XRF.",
    };
  }

  // 3. ZONAS VOLCÁNICAS
  const isVolcanic =
    (lat >= 27.0 && lat <= 29.5 && lon >= -18.5 && lon <= -13.0) ||
    (lat >= 63.0 && lat <= 66.8 && lon >= -25.0 && lon <= -13.0) ||
    (lat >= 18.5 && lat <= 22.5 && lon >= -161.0 && lon <= -154.0) ||
    (lat >= -25.0 && lat <= -18.0 && lon >= -70.0 && lon <= -66.5);

  if (isVolcanic) {
    return {
      coordinates: { lat, lon, formatted: coordsFmt },
      surface_type: "land",
      geographic_zone: "Manto Volcánico Basáltico y Cavidades Piroclásticas",
      biome_classification: "Malpaís de Lava 'Aa' y Tubos de Lava Subterráneos",
      fidelity_index: 87.2,
      confidence_level: "alta",
      matched_target: {
        id: "moon-marius-hills",
        name: "Claraboyas y Tubos de Lava de Marius Hills (Luna)",
        body: "Moon",
        instrument: "NASA LROC NAC / SELENE",
        target_coordinates: "14.2° N · 303.3° E",
        target_image: "/images/geology/moon-marius-hills.jpg",
        feature_tag: "Subsurface Shielded Lava Tubes",
      },
      subsystems: {
        rover_mobility: 80.0,
        isru_feasibility: 74.0,
        habitat_shielding: 95.0,
        environmental_rigor: 84.0,
      },
      gravity_comparison: {
        earth_g: 1.0,
        target_g: 0.166,
        rover_mass_1000kg_weight_n: 1628.0,
        divergence_notice: "La baja gravedad lunar permitió que los tubos basálticos alcancen diámetros >500 m sin colapso cenital.",
      },
      atmospheric_comparison: {
        earth_pressure_hpa: 900.0,
        target_pressure_hpa: 0.0,
        divergence_notice: "Los tubos terrestres albergan humedad atmosférica; los tubos lunares están en vacío absoluto protegido de radiación solar.",
      },
      scientific_limitations: [
        "Escala Estructural: Los tubos de lava lunares son un orden de magnitud mayores que los terrestres debido a la gravedad de 0.16 g.",
        "Presencia de Agua Subterránea: La humedad terrestre genera espeleotemas que no existen en la Luna.",
      ],
      epistemological_audit: "Excelente laboratorio de análogo estructural para ensayar hábitats inflables presurizados y descenso a fosas con grúa/cable.",
      recommended_rehearsal: "Ensayos de despliegue de hábitats subterráneos presurizados y atenuación de radiación cósmica.",
    };
  }

  // 4. ZONAS DE SELVA TROPICAL / BIOMASA
  const isTropical =
    (lat >= -15.0 && lat <= 8.0 && lon >= -75.0 && lon <= -48.0) ||
    (lat >= -5.0 && lat <= 5.0 && lon >= 10.0 && lon <= 30.0) ||
    (lat >= -10.0 && lat <= 8.0 && lon >= 95.0 && lon <= 140.0);

  if (isTropical) {
    return {
      coordinates: { lat, lon, formatted: coordsFmt },
      surface_type: "land",
      geographic_zone: "Bosque Húmedo Tropical y Cuenca Fluvial Densa",
      biome_classification: "Cobertura Biogénica Densa con Pedogénesis Activa",
      fidelity_index: 14.5,
      confidence_level: "baja",
      matched_target: {
        id: "incompatible_biogenic",
        name: "Incompatible por Enmascaramiento Biogénico",
        body: "None",
        instrument: "Cláusula de Interferencia Biológica",
        target_coordinates: "N/A",
        target_image: "/images/geology/mars-gale.jpg",
        feature_tag: "Biogenic Obfuscation (<15% Fidelity)",
      },
      subsystems: {
        rover_mobility: 18.0,
        isru_feasibility: 12.0,
        habitat_shielding: 22.0,
        environmental_rigor: 10.0,
      },
      gravity_comparison: {
        earth_g: 1.0,
        target_g: 0.38,
        rover_mass_1000kg_weight_n: 3728.0,
        divergence_notice: "El suelo vegetal orgánico carece de cohesión de regolito y genera atollamiento biogénico.",
      },
      atmospheric_comparison: {
        earth_pressure_hpa: 1010.0,
        target_pressure_hpa: 6.1,
        divergence_notice: "Humedad relativa del >90% incompatible con la hiperaridez absoluta de Marte y la Luna.",
      },
      scientific_limitations: [
        "Barrera Biogénica: La densa biomasa y suelo rico en humus ocultan cualquier firma mineralógica o geomorfológica extraterrestre.",
        "Meteorización Hídrica Acelerada: La alteración química por agua líquida y plantas no tiene equivalencia en cuerpos planetarios estériles.",
      ],
      epistemological_audit: "AnalogX descalifica el terreno por sobre-enmascaramiento biológico y ciclo de agua continuo.",
      recommended_rehearsal: "No recomendado para misiones de superficie. Reubicar la sonda a desiertos o áreas peri-glaciares.",
    };
  }

  // 5. CONTINENTAL GENERAL / TEMPLADO
  return {
    coordinates: { lat, lon, formatted: coordsFmt },
    surface_type: "land",
    geographic_zone: "Zona Continental Mixta / Relieve Moderado",
    biome_classification: "Terreno Mixto con Meteorización Hídrica Terrestre",
    fidelity_index: 46.2,
    confidence_level: "media",
    matched_target: {
      id: "mars-gale-strata",
      name: "Monte Sharp y Estratigrafía de Gale (Marte)",
      body: "Mars",
      instrument: "NASA Curiosity Mastcam / ChemCam",
      target_coordinates: "5.4° S · 137.8° E",
      target_image: "/images/geology/mars-gale.jpg",
      feature_tag: "Layered Sedimentary Strata",
    },
    subsystems: {
      rover_mobility: 52.0,
      isru_feasibility: 44.0,
      habitat_shielding: 48.0,
      environmental_rigor: 40.0,
    },
    gravity_comparison: {
      earth_g: 1.0,
      target_g: 0.38,
      rover_mass_1000kg_weight_n: 3728.0,
      divergence_notice: "Gravedad terrestre de 1.0 g frente a 0.38 g en Marte.",
    },
    atmospheric_comparison: {
      earth_pressure_hpa: 980.0,
      target_pressure_hpa: 6.1,
      divergence_notice: "Presión terrestre sustancialmente mayor que la marciana.",
    },
    scientific_limitations: [
      "Erosión Fluvial Activa: La presencia de lluvias regulares modifica los estratos geológicos de forma distinta a Marte.",
      "Capa de Suelo Edáfico: Suelos agrícolas o pastizales amortiguan la reflectancia del lecho rocoso.",
    ],
    epistemological_audit: "Compatibilidad parcial para pruebas de navegación todoterreno, pero restringida para espectrometría pura.",
    recommended_rehearsal: "Ensayos de navegación autónoma visual (VO) y superación de pendientes con rocas.",
  };
}
