"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type SupportedLang = "es" | "en";

interface LanguageContextType {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  toggleLang: () => void;
  t: (key: string, defaultText?: string) => string;
}

const DICTIONARY: Record<SupportedLang, Record<string, string>> = {
  es: {
    // Header & Nav
    "nav.back_home": "Volver al Inicio",
    "nav.earth_view": "🌍 VISTA DE LA TIERRA 360°",
    "nav.nasa_badge": "NASA SPACE APPS",
    "nav.project_year": "PROYECTO · 2026",
    "nav.skip": "Saltar al contenido",

    // Home Hero
    "home.badge": "NASA SPACE APPS CHALLENGE 2026 · RETO OFICIAL",
    "home.title": "Otros mundos empiezan en la Tierra.",
    "home.lead": "Motor analítico y de datos abiertos para identificar, caracterizar y comparar de forma verificable regiones terrestres que comparten procesos geológicos, físicos y térmicos con la Base Lunar Permanente Artemis y paleocuencas de Marte.",
    "home.btn_earth": "🌍 VISTA DE LA TIERRA · EXPLORADOR SATELITAL 360°",
    "home.btn_missions": "OBJETIVOS LUNA & MARTE ↓",
    "home.stat_analogs": "Análogos Terrestres",
    "home.stat_targets": "Objetivos Espaciales",
    "home.stat_datasets": "Datasets Satelitales",
    "home.stat_scorecard": "Scorecard NASA",
    "home.globe_caption": "• GLOBO DE DATOS TOPOGRÁFICOS · PUNTO VERDE: CAL/VAL BOLIVIA & ANÁLOGOS GLOBALES",

    // Home Mission Portals
    "portals.eyebrow": "• OBJETIVOS EXTRATERRESTRES DE ESTUDIO",
    "portals.title": "Selecciona un cuerpo celeste para iniciar la misión",
    "portals.desc": "El reto exige contrastar regiones de la Tierra con sitios candidatos para asentamientos humanos sostenibles en la Luna y misiones robóticas o tripuladas a Marte.",
    "portals.moon_badge": "PROGRAMA ARTEMIS",
    "portals.moon_code": "MOON-TRK // POLO SUR",
    "portals.moon_title": "La Luna",
    "portals.moon_sub": "Base Lunar Permanente & Trampas Frías",
    "portals.moon_btn": "ABRIR EXPLORADOR LUNAR",
    "portals.moon_analogs": "Análogos: Lípez · Licancabur · McMurdo · Lanzarote",
    "portals.mars_badge": "EXPLORACIÓN PLANETARIA",
    "portals.mars_code": "MARS-TRK // PALEOCUENCAS",
    "portals.mars_title": "Planeta Marte",
    "portals.mars_sub": "Geología Fluvial, Sales & Paleolagos",
    "portals.mars_btn": "ABRIR EXPLORADOR MARTE",
    "portals.mars_analogs": "Análogos: Uyuni · Sol de Mañana · Atacama · Haughton",

    // Home Dimensions
    "dims.eyebrow": "• RÚBRICA CIENTÍFICA NASA SPACE APPS",
    "dims.title": "Las 8 Dimensiones de Analogía Planetaria",
    "dims.desc": "La NASA exige evaluar sitios más allá de la apariencia visual superficial, midiendo procesos geológicos, físicos y operacionales concretos.",
    "dims.01_title": "Geología y Superficie",
    "dims.01_desc": "Composición mineralógica: halita, sulfatos hidratados, arcillas y regolito anortosítico contrastados con firmas orbitales.",
    "dims.02_title": "Topografía y Pendientes",
    "dims.02_desc": "Rango de elevaciones, inclinación y rugosidad RMS para evaluar la seguridad de sitios de aterrizaje y tráfico de rovers.",
    "dims.03_title": "Radiación y Escudo UV",
    "dims.03_desc": "Radiación solar ultravioleta extrema (UV 14-24 en alta montaña) y dosis acumulada equivalente a superficies extraterrestres.",
    "dims.04_title": "Agua, Hielo e ISRU",
    "dims.04_desc": "Permafrost relicto masivo, salmueras eutécticas y deshidratación térmica de yeso para obtener hasta 209 kg H₂O/tonelada.",
    "dims.05_title": "Viento y Atmósfera",
    "dims.05_desc": "Deflación eólica, dunas de regolito, erosión abrasiva y dispersión de aerosoles minerales.",
    "dims.06_title": "Biología y Biofirmas",
    "dims.06_desc": "Límites de extremófilos en salmueras saturadas y preservación de moléculas orgánicas en sales evaporíticas.",
    "dims.07_title": "Tubos de Lava y Cuevas",
    "dims.07_desc": "Estructuras volcánicas subterráneas con >95% de blindaje contra radiación cósmica (GCR/SPE) para bases Artemis.",
    "dims.08_title": "Terradinámica de Rovers",
    "dims.08_desc": "Capacidad portante del sustrato (kPa), riesgo de derrape y fatiga mecánica en ruedas grousers metálicas (VIPER/MSR).",

    // Home Novelty
    "novelty.eyebrow": "• CRITERIO \"SURPRISE US\" DE LA NASA",
    "novelty.title": "Superando los análogos obvios: El potencial no explotado del Altiplano",
    "novelty.lead": "Mientras que Atacama, Hawái y la Antártida son ampliamente estudiados, AnalogX introduce a Bolivia como un laboratorio natural extremo de altitud (>3,600 a 5,900 msnm):",
    "novelty.stats_title": "METADATOS CIENTÍFICOS VERIFICADOS",

    // Earth Explorer
    "earth.badge": "SATÉLITE 3D · RETO NASA 2026",
    "earth.title": "Explorador Satelital 360° del Planeta Tierra",
    "earth.subtitle": "Explora el planeta Tierra en 3D: analiza la topología, medio ambiente, clima extremo y recursos ISRU disponibles para selección de futuras bases y sitios de aterrizaje planetario.",
    "earth.stat_title": "ANÁLOGOS GLOBALES",
    "earth.stat_val": "15 Análogos Terrestres",
    "earth.stat_desc": "Bolivia · Chile · Antártida · Canadá · España",
    "earth.filter_country_label": "Filtrar por País o Ámbito Territorial:",
    "earth.filter_process_label": "Filtrar por Fenómeno Físico / Ambiental:",
    "earth.card_type": "FICHA TÉCNICA CIENTÍFICA (SOLO TIERRA)",
    "earth.expand": "▲ Expandir",
    "earth.minimize": "▼ Minimizar",
    "earth.sec_01": "01 · TOPOLOGÍA Y GEOMORFOLOGÍA",
    "earth.sec_02": "02 · CLIMA Y MEDIO AMBIENTE",
    "earth.sec_03": "03 · RECURSOS DISPONIBLES ISRU",
    "earth.sec_04": "04 · APTITUD DE ATERRIZAJE Y BASE FUTURA",
    "earth.sec_05": "05 · DÓNDE FALLA LA ANALOGÍA (LÍMITES FÍSICOS)",
    "earth.btn_full_report": "Abrir Informe Científico Completo de la NASA ↗",
    "earth.btn_explore_mission": "Ver Comparativa con la Misión (Luna / Marte) →",
    "earth.carousel_title": "CATÁLOGO DE REGIONES TERRESTRES:",

    // Methodology & Findings
    "method.eyebrow": "EL MÉTODO ANALOGX",
    "method.title": "La evidencia antes que la semejanza visual.",
    "method.intro": "Un paisaje parecido es un punto de partida. Una analogía científica necesita fuentes trazables, variables compatibles y límites explícitos.",
    "findings.eyebrow": "BITÁCORA CIENTÍFICA",
    "findings.title": "Las preguntas de hoy. Los hallazgos de mañana.",
  },
  en: {
    // Header & Nav
    "nav.back_home": "Back to Home",
    "nav.earth_view": "🌍 360° EARTH VIEW",
    "nav.nasa_badge": "NASA SPACE APPS",
    "nav.project_year": "PROJECT · 2026",
    "nav.skip": "Skip to content",

    // Home Hero
    "home.badge": "NASA SPACE APPS CHALLENGE 2026 · OFFICIAL CHALLENGE",
    "home.title": "Other worlds begin on Earth.",
    "home.lead": "Open-data analytical engine to verifiably identify, characterize, and compare Earth regions that share geological, physical, and thermal processes with the Artemis Lunar Base and Mars paleobasins.",
    "home.btn_earth": "🌍 3D EARTH VIEW · 360° SATELLITE EXPLORER",
    "home.btn_missions": "MOON & MARS TARGETS ↓",
    "home.stat_analogs": "Earth Analogs",
    "home.stat_targets": "Space Targets",
    "home.stat_datasets": "Satellite Datasets",
    "home.stat_scorecard": "NASA Scorecard",
    "home.globe_caption": "• TOPOGRAPHIC DATA GLOBE · GREEN DOT: BOLIVIA CAL/VAL & GLOBAL ANALOGS",

    // Home Mission Portals
    "portals.eyebrow": "• EXTRATERRESTRIAL STUDY TARGETS",
    "portals.title": "Select a celestial body to begin the mission",
    "portals.desc": "The NASA challenge requires contrasting Earth regions with candidate sites for sustainable human settlements on the Moon and robotic or crewed missions to Mars.",
    "portals.moon_badge": "ARTEMIS PROGRAM",
    "portals.moon_code": "MOON-TRK // SOUTH POLE",
    "portals.moon_title": "The Moon",
    "portals.moon_sub": "Permanent Lunar Base & Cold Traps",
    "portals.moon_btn": "OPEN LUNAR EXPLORER",
    "portals.moon_analogs": "Analogs: Lípez · Licancabur · McMurdo · Lanzarote",
    "portals.mars_badge": "PLANETARY EXPLORATION",
    "portals.mars_code": "MARS-TRK // PALEOBASINS",
    "portals.mars_title": "Planet Mars",
    "portals.mars_sub": "Fluvial Geology, Salts & Paleolakes",
    "portals.mars_btn": "OPEN MARS EXPLORER",
    "portals.mars_analogs": "Analogs: Uyuni · Sol de Mañana · Atacama · Haughton",

    // Home Dimensions
    "dims.eyebrow": "• NASA SPACE APPS SCIENTIFIC RUBRIC",
    "dims.title": "The 8 Dimensions of Planetary Analogy",
    "dims.desc": "NASA requires evaluating candidate sites beyond superficial visual resemblance by measuring concrete geological, physical, and operational processes.",
    "dims.01_title": "Geology & Surface",
    "dims.01_desc": "Mineralogical composition: halite, hydrated sulfates, clays, and anorthositic regolith benchmarked against orbital spectra.",
    "dims.02_title": "Topography & Slope",
    "dims.02_desc": "Elevation gradients, slope inclination, and RMS roughness to evaluate landing site safety and rover trafficability.",
    "dims.03_title": "Radiation & UV Shielding",
    "dims.03_desc": "Extreme solar UV irradiance (UV 14-24 in high mountains) and cumulative radiation doses matching extraterrestrial surfaces.",
    "dims.04_title": "Water, Ice & ISRU",
    "dims.04_desc": "Massive relict permafrost, eutectic brines, and thermal gypsum dehydration yielding up to 209 kg H₂O/ton.",
    "dims.05_title": "Wind & Atmosphere",
    "dims.05_desc": "Aeolian deflation, regolith dunes, abrasive saltation wear, and mineral aerosol transport.",
    "dims.06_title": "Biology & Biosignatures",
    "dims.06_desc": "Extremophile limits in hypersaline brines and organic molecule preservation in evaporitic mineral matrices.",
    "dims.07_title": "Lava Tubes & Caves",
    "dims.07_desc": "Subterranean volcanic conduits offering >95% attenuation of cosmic radiation (GCR/SPE) for Artemis habitats.",
    "dims.08_title": "Rover Terradynamics",
    "dims.08_desc": "Substrate bearing capacity (kPa), wheel slippage risk, and mechanical fatigue on metallic grouser wheels (VIPER/MSR).",

    // Home Novelty
    "novelty.eyebrow": "• NASA SPACE APPS CRITERION // \"SURPRISE US\"",
    "novelty.title": "Beyond the Obvious Analogs: The Untapped Potential of the Altiplano",
    "novelty.lead": "While Atacama, Hawaii, and Antarctica are widely studied, AnalogX introduces Bolivia as an extreme high-altitude natural laboratory (>3,600 to 5,900 m a.s.l.):",
    "novelty.stats_title": "VERIFIED SCIENTIFIC METADATA",

    // Earth Explorer
    "earth.badge": "3D SATELLITE · NASA CHALLENGE 2026",
    "earth.title": "360° Satellite Explorer of Planet Earth",
    "earth.subtitle": "Explore planet Earth in 3D: analyze topology, extreme climate environment, and available ISRU resources for landing site and permanent planetary base selection.",
    "earth.stat_title": "GLOBAL ANALOGS",
    "earth.stat_val": "15 Earth Analogs",
    "earth.stat_desc": "Bolivia · Chile · Antarctica · Canada · Spain",
    "earth.filter_country_label": "Filter by Country or Territorial Realm:",
    "earth.filter_process_label": "Filter by Physical / Environmental Process:",
    "earth.card_type": "SCIENTIFIC TECHNICAL DOSSIER (EARTH ONLY)",
    "earth.expand": "▲ Expand",
    "earth.minimize": "▼ Minimize",
    "earth.sec_01": "01 · TOPOLOGY AND GEOMORPHOLOGY",
    "earth.sec_02": "02 · CLIMATE & EXTREME ENVIRONMENT",
    "earth.sec_03": "03 · AVAILABLE IN-SITU RESOURCES (ISRU)",
    "earth.sec_04": "04 · LANDING AND PERMANENT BASE SUITABILITY",
    "earth.sec_05": "05 · WHERE THE ANALOGY FAILS (PHYSICAL LIMITS)",
    "earth.btn_full_report": "Open Full NASA Scientific Report ↗",
    "earth.btn_explore_mission": "Compare with Mission Target (Moon / Mars) →",
    "earth.carousel_title": "EARTH REGIONS CATALOG:",

    // Methodology & Findings
    "method.eyebrow": "THE ANALOGX METHOD",
    "method.title": "Scientific evidence before visual resemblance.",
    "method.intro": "A similar landscape is only a starting point. A scientific analogy requires traceable datasets, compatible physical variables, and explicit limits.",
    "findings.eyebrow": "SCIENTIFIC LOGBOOK",
    "findings.title": "Today's questions. Tomorrow's findings.",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string, defaultText?: string) => defaultText ?? key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SupportedLang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("analogx_lang") as SupportedLang | null;
      if (saved === "es" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // localStorage may fail in restricted sandboxes
    }
  }, []);

  const setLang = (next: SupportedLang) => {
    setLangState(next);
    try {
      localStorage.setItem("analogx_lang", next);
      document.documentElement.lang = next;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  const t = (key: string, defaultText?: string): string => {
    return DICTIONARY[lang]?.[key] ?? defaultText ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
