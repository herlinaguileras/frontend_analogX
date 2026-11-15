import { detailedEarthRegions } from "./earth-catalog";

export interface SpaceClimateProfile {
  targetName: string;
  body: "Moon" | "Mars";
  tempRange: string;
  tempDescription: string;
  atmosphericPressure: string;
  pressureDescription: string;
  solarRadiationUv: string;
  radiationDescription: string;
  relativeHumidity: string;
  windEolianDynamics: string;
  climateFidelityRating: "ALTA" | "MEDIA" | "PARCIAL" | "LÍMITE";
  operationalAtmosphericNote: string;
}

export interface ClimateComparisonData {
  earth: {
    tempRange: string;
    tempDayNight: string;
    solarInsolation: string;
    uvIndex: string;
    atmosphericPressure: string;
    atmosphericDensity: string;
    windDesiccation: string;
  };
  space: SpaceClimateProfile;
  scientificDivergence: {
    thermalDivergence: string;
    pressureDivergence: string;
    radiationDivergence: string;
    atmosphericMitigation: string;
  };
}

const SPACE_CLIMATE_DATABASE: Record<string, { moon?: SpaceClimateProfile; mars?: SpaceClimateProfile }> = {
  "salar-de-uyuni": {
    moon: {
      targetName: "Mare Tranquillitatis (Llanura Basáltica)",
      body: "Moon",
      tempRange: "-130 °C a +120 °C (Gradiente 250 °C)",
      tempDescription: "Ciclo térmico de 28 días terrestres con choque térmico severo durante el ocaso lunar.",
      atmosphericPressure: "< 10⁻¹⁰ hPa (Vacío ultra-alto)",
      pressureDescription: "Exosfera tenue sin atenuación de gas. Sin dispersión Rayleigh ni efecto invernadero.",
      solarRadiationUv: "Insolación directa de 1,361 W/m² sin ozono",
      radiationDescription: "Espectro electromagnético completo UV-A/B/C y flujo de radiación cósmica galáctica (GCR).",
      relativeHumidity: "0.0% HR (Anhidro absoluto)",
      windEolianDynamics: "0 km/h (Ausencia de viento atmosférico)",
      climateFidelityRating: "MEDIA",
      operationalAtmosphericNote: "Uyuni calibra sensores ópticos orbitales en el espectro solar bajo alta irradiancia diurna.",
    },
    mars: {
      targetName: "Terra Sirenum (Paleocuenca Salina Marciana)",
      body: "Mars",
      tempRange: "-105 °C a 0 °C (Gradiente 105 °C)",
      tempDescription: "Oscilación diurna drástica; caídas gélidas por baja inercia térmica de la tenue atmósfera.",
      atmosphericPressure: "5.5 a 7.2 hPa (~0.7% de 1 atm)",
      pressureDescription: "Composición de 95.3% CO2. Presión muy cercana al punto triple del agua (6.1 hPa).",
      solarRadiationUv: "590 W/m² (UV-C esterilizante no filtrado)",
      radiationDescription: "Sin capa de ozono protectora; fotólisis continua de moléculas orgánicas superficiales.",
      relativeHumidity: "< 0.5% HR (Hiperaridez continental)",
      windEolianDynamics: "20 a 60 km/h (Torbellinos de polvo 'dust devils')",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "La extrema radiación UV y baja humedad de Uyuni replican el estrés fototérmico marciano.",
    },
  },

  "cuevas-volcanicas-lipez": {
    moon: {
      targetName: "Marius Hills Pit (Tragaluz Volcánico Lunar)",
      body: "Moon",
      tempRange: "Constante -20 °C ± 2 °C (Interior protegido)",
      tempDescription: "Aislamiento térmico basáltico masivo que amortigua el gradiente de 250 °C del exterior.",
      atmosphericPressure: "< 10⁻¹⁰ hPa (Vacío dentro del tubo)",
      pressureDescription: "Sin presión atmosférica pero con volumen hermetizable natural para futuras bases presurizadas.",
      solarRadiationUv: "0 W/m² (Blindaje cósmico > 99%)",
      radiationDescription: "El techo basáltico de 20-40 m de espesor detiene partículas ionizantes GCR y erupciones SPE.",
      relativeHumidity: "0.0% HR",
      windEolianDynamics: "0 km/h (Ambiente sellado al viento solar)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Las cavidades de Lípez modelan el microclima isotérmico y la protección radiativa de hábitats subterráneos.",
    },
    mars: {
      targetName: "Fosas de Olympus Mons y Cavernas Volcánicas",
      body: "Mars",
      tempRange: "Constante -35 °C a -25 °C (Subterráneo)",
      tempDescription: "Interior térmicamente estable protegido de las heladas nocturnas de -100 °C de la superficie.",
      atmosphericPressure: "6.0 a 7.5 hPa (CO2)",
      pressureDescription: "Presión equivalente al exterior pero sin ráfagas turbulentas de viento ni polvo eólico fino.",
      solarRadiationUv: "0 W/m² UV (Atenuación radiativa total)",
      radiationDescription: "Blindaje natural esencial para la preservación de biofirmas y seguridad de tripulaciones EVA.",
      relativeHumidity: "1% a 4% HR (Microclima protegido)",
      windEolianDynamics: "< 2 km/h (Ausencia de transporte de polvo abrasivo)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Ambiente idóneo para calibrar sensores de calidad de aire interior y trajes espaciales presurizados.",
    },
  },

  "sol-de-manana": {
    mars: {
      targetName: "Cráter Gusev (Complejo Hidrotermal Home Plate)",
      body: "Mars",
      tempRange: "-95 °C a +15 °C (Gradiente 110 °C)",
      tempDescription: "Frío marciano severo mitigado localmente en el pasado por fluidos termales de alta entalpía.",
      atmosphericPressure: "6.5 a 8.0 hPa (CO2)",
      pressureDescription: "Atmosfera de baja densidad donde el vapor de agua fumarólico se sublima casi instantáneamente.",
      solarRadiationUv: "590 W/m² con flujo UV esterilizante",
      radiationDescription: "Condiciones de alta irradiación combinadas con gases sulfurosos y lodo ácido.",
      relativeHumidity: "< 1% HR (Exterior hiperárido) / 100% saturado en bocas de vapor",
      windEolianDynamics: "30 a 70 km/h (Vientos catabáticos andinos análogos a depresiones marcianas)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Simula la desgasificación volcánica marciana bajo extrema altitud barométrica (~500 hPa).",
    },
  },

  "cumbre-licancabur": {
    moon: {
      targetName: "Pico Malapert y Montes Polares Lunares",
      body: "Moon",
      tempRange: "-180 °C a -50 °C (Polo Sur Lunar)",
      tempDescription: "Luz solar rasante continua con caídas extremas en sectores sombreados.",
      atmosphericPressure: "< 10⁻¹⁰ hPa (Vacío absoluto)",
      pressureDescription: "Sin densidad atmosférica.",
      solarRadiationUv: "Radiación solar no filtrada 1,361 W/m²",
      radiationDescription: "Exposición a dosis letales de radiación sin blindaje troposférico.",
      relativeHumidity: "0.0% HR",
      windEolianDynamics: "0 km/h",
      climateFidelityRating: "MEDIA",
      operationalAtmosphericNote: "Ensayo de resistencia de materiales textiles de trajes espaciales bajo frío gélido y UV extremo.",
    },
    mars: {
      targetName: "Volcanes del Escudo de Tharsis / Cráteres de Cumbre",
      body: "Mars",
      tempRange: "-100 °C noche / +5 °C día en verano",
      tempDescription: "Atmósfera extremadamente rarificada en cumbre con radiación UV biológicamente letal.",
      atmosphericPressure: "3.5 a 5.0 hPa en alta elevación marciana",
      pressureDescription: "Aproximación más cercana en la Tierra a la finura atmosférica marciana (490 hPa en cumbre).",
      solarRadiationUv: "UV Index 20-24 (El registro más alto medido en la biosfera)",
      radiationDescription: "Irradiancia ultravioleta equivalente al flujo solar incidente sobre la superficie marciana.",
      relativeHumidity: "< 3% HR",
      windEolianDynamics: "40 a 90 km/h (Turbulencia atmosférica de gran altitud)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "El mejor análogo terrestre del mundo para estudiar el límite de supervivencia biológica bajo UV.",
    },
  },

  "atacama-yungay": {
    mars: {
      targetName: "Cráter Jezero (Delta y Llanura de Neretva)",
      body: "Mars",
      tempRange: "-90 °C noche / +20 °C día (Verano marciano)",
      tempDescription: "Inversión térmica nocturna drástica; humedad disponible absorbida por sales del suelo.",
      atmosphericPressure: "6.1 a 7.5 hPa (NASA MEDA instrument)",
      pressureDescription: "Presión media marciana registrada por el rover Perseverance en Jezero.",
      solarRadiationUv: "590 W/m² con índice UV equivalente a 15-18",
      radiationDescription: "Fotodescomposición química acelerada por percloratos activados por radiación UV.",
      relativeHumidity: "< 0.1% a 2% HR (El sitio más seco del planeta Tierra)",
      windEolianDynamics: "15 a 45 km/h (Erosión eólica y formación de ventifactos)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Validación de sensores meteorológicos atmosféricos y ensayos de reactores ISRU de extracción de suelo.",
    },
  },

  "mcmurdo-dry-valleys": {
    moon: {
      targetName: "Cráter Shackleton PSR (Región de Sombra Permanente)",
      body: "Moon",
      tempRange: "40 K (-233 °C) criogénico perpetuo",
      tempDescription: "Trampa criogénica termodinámicamente estable donde el hielo no se sublima durante miles de millones de años.",
      atmosphericPressure: "< 10⁻¹⁰ hPa",
      pressureDescription: "Vacío espacial directo.",
      solarRadiationUv: "0 W/m² solar (Ausencia total de luz visible) / Flujo GCR difuso",
      radiationDescription: "Ambiente hiperfrío sin calentamiento solar; preservación de hidrógeno y volátiles polares.",
      relativeHumidity: "0.0% HR",
      windEolianDynamics: "0 km/h",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Beacon Valley modela el hielo fósil subsuperficial protegido por capas de escombros secos.",
    },
    mars: {
      targetName: "Llanuras Circumpolares de Utopia y Arcadia Planitia",
      body: "Mars",
      tempRange: "-125 °C a -20 °C (Ciclo estacional marciano)",
      tempDescription: "Permafrost criogénico con cuñas de hielo poligonal idénticas a las observadas por la sonda Phoenix.",
      atmosphericPressure: "6.0 a 7.2 hPa",
      pressureDescription: "Sublimación directa de hielo a vapor cuando se remueve el regolito protector suprayacente.",
      solarRadiationUv: "Radiación solar estacional atenuada por polvo polar",
      radiationDescription: "Fotólisis superficial con preservación de núcleos glaciares a 20-50 cm de profundidad.",
      relativeHumidity: "< 1% HR (Hiperaridez fría)",
      windEolianDynamics: "Vientos catabáticos antárticos de hasta 120 km/h",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Calibración del radar orbital de penetración (SHARAD) y ensayos de perforación de hielo en frío extremo.",
    },
  },

  "haughton-crater": {
    moon: {
      targetName: "Impactos Polares y Cuencas del Borde Sur",
      body: "Moon",
      tempRange: "-180 °C a -30 °C",
      tempDescription: "Régimen periglacial estacional severo con regolito fragmentado por ondas de choque de impacto.",
      atmosphericPressure: "< 10⁻¹⁰ hPa",
      pressureDescription: "Vacío lunar.",
      solarRadiationUv: "Flujo UV no atenuado",
      radiationDescription: "Impacto de partículas cósmicas sin escudo atmosférico.",
      relativeHumidity: "0% HR",
      windEolianDynamics: "0 km/h",
      climateFidelityRating: "MEDIA",
      operationalAtmosphericNote: "Ensayos de movilidad de rovers tripulados sobre manto de eyección brechado en clima gélido.",
    },
    mars: {
      targetName: "Cráter Gale (Monte Sharp e Impactos Circundantes)",
      body: "Mars",
      tempRange: "-85 °C a +15 °C (NASA REMS Curiosity Data)",
      tempDescription: "Estructura de impacto meteórico expuesta a milenios de erosión eólica periglacial continua.",
      atmosphericPressure: "7.0 a 9.2 hPa",
      pressureDescription: "Variación barométrica estacional causada por la condensación polar de dióxido de carbono.",
      solarRadiationUv: "Flujo solar marciano con índice UV 12-16",
      radiationDescription: "Atenuación estacional por turbidez óptica atmosférica (Tau de polvo).",
      relativeHumidity: "< 2% HR en verano",
      windEolianDynamics: "20 a 50 km/h con transporte de gravas y arenas finas",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Campo oficial del Haughton-Mars Project de la NASA para probar hábitats y protocolos EVA humanos.",
    },
  },

  "salar-coipasa": {
    mars: {
      targetName: "Depósitos Evaporíticos de Meridiani Planum",
      body: "Mars",
      tempRange: "-90 °C noche / +18 °C día",
      tempDescription: "Cuenca evaporítica con sales de magnesio y sulfatos que reducen el punto de congelación del agua.",
      atmosphericPressure: "6.2 a 7.8 hPa",
      pressureDescription: "Atmosfera marciana delgada propensa a la formación de salmueras transitorias.",
      solarRadiationUv: "UV solar extremo (590 W/m²)",
      radiationDescription: "Radiación UV que cataliza la oxidación de minerales de hierro a hematita.",
      relativeHumidity: "< 1% HR",
      windEolianDynamics: "30 a 65 km/h (Erosión de costras salinas y transporte de aerosoles)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Modelo climático de paleolagos en proceso de desecación final bajo atmósfera rarefacta.",
    },
  },

  "laguna-colorada": {
    mars: {
      targetName: "Paleocuencas Hidrotermales de Columbus Crater",
      body: "Mars",
      tempRange: "-100 °C noche / +12 °C día",
      tempDescription: "Salmueras hipersalinas alcalinas que permanecen líquidas hasta -20 °C por efecto eutéctico.",
      atmosphericPressure: "6.0 a 7.5 hPa",
      pressureDescription: "Baja presión que incrementa la tasa de ebullición y desecación de salmueras expuestas.",
      solarRadiationUv: "UV Index 18-22 (Extrema radiación fotooxidante)",
      radiationDescription: "Estrés fotoquímico severo que induce pigmentos carotenoides de protección en microorganismos.",
      relativeHumidity: "< 4% HR",
      windEolianDynamics: "40 a 80 km/h (Vientos continuos de cordillera volcánica)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Pruebas de bioseñales espectrales para espectrómetros Raman y SHERLOC de rovers marcianos.",
    },
  },

  "arenales-uyuni": {
    mars: {
      targetName: "Campos de Dunas Bagnold (Cráter Gale, Marte)",
      body: "Mars",
      tempRange: "-85 °C a +15 °C",
      tempDescription: "Arenas silíceas y basálticas sometidas a ciclos térmicos diarios de 100 °C de amplitud.",
      atmosphericPressure: "6.8 a 8.5 hPa",
      pressureDescription: "Baja densidad del aire que exige vientos de mayor velocidad para iniciar el movimiento de saltación.",
      solarRadiationUv: "UV solar directo sin absorción vegetal",
      radiationDescription: "Fotoionización de superficies granulares y acumulación de cargas electrostáticas.",
      relativeHumidity: "< 2% HR",
      windEolianDynamics: "30 a 70 km/h (Migración de ondas de arena métricas)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Calibración del hundimiento de ruedas (sinkage) y torque de tracción en dunas sueltas.",
    },
  },

  "volcan-ollague": {
    mars: {
      targetName: "Estratovolcanes de Elysium Mons y Tharsis",
      body: "Mars",
      tempRange: "-95 °C a +10 °C",
      tempDescription: "Cumbres volcánicas heladas con desgasificación residual rica en azufre elemental.",
      atmosphericPressure: "5.0 a 6.5 hPa",
      pressureDescription: "Presión muy baja en el cono volcánico que facilita la sublimación de fumarolas de azufre.",
      solarRadiationUv: "UV extremo de alta montaña (UV Index 18)",
      radiationDescription: "Ambiente oxidante con sulfatos y gases ácidos en microclimas de cumbre.",
      relativeHumidity: "< 3% HR",
      windEolianDynamics: "40 a 90 km/h",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Ensayos de extracción química y reactores ISRU para producción de reactivos en bases marcianas.",
    },
  },

  "cordillera-sal-atacama": {
    mars: {
      targetName: "Cañones Escarpados de Valles Marineris (Candor Chasma)",
      body: "Mars",
      tempRange: "-80 °C a +25 °C (En el fondo del cañón)",
      tempDescription: "Gradiente térmico adiabático con mayor temperatura en las profundidades de la fosa tectónica.",
      atmosphericPressure: "8.5 a 11.5 hPa (Punto de mayor presión atmosférica en Marte)",
      pressureDescription: "Mayor columna de aire que favorece la estabilidad temporal de agua líquida en cañones.",
      solarRadiationUv: "UV solar intenso con sombras topográficas pronunciadas",
      radiationDescription: "Sombras profundas en paredes de falla que generan contrastes térmicos de más de 70 °C en metros.",
      relativeHumidity: "< 1% HR",
      windEolianDynamics: "25 a 60 km/h (Vientos de canalización en gargantas y cañones)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Evaluación de descenso en paredes verticales y navegación por radar en cañones hiperáridos.",
    },
  },

  "lago-vanda-taylor": {
    moon: {
      targetName: "Depósitos Polares Subsuperficiales de Cabeus",
      body: "Moon",
      tempRange: "40 K a 90 K (-233 °C a -183 °C)",
      tempDescription: "Condiciones criogénicas profundas donde se detectaron 5.5% en peso de agua por la sonda LCROSS.",
      atmosphericPressure: "< 10⁻¹⁰ hPa",
      pressureDescription: "Vacío estricto.",
      solarRadiationUv: "0 W/m² (Protegido bajo capas de regolito seco)",
      radiationDescription: "El manto superior actúa de aislante térmico y escudo de radiación cósmica.",
      relativeHumidity: "0.0% HR",
      windEolianDynamics: "0 km/h",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Modelo térmico para la extracción de volátiles por calentamiento por microondas in-situ.",
    },
  },

  "tubos-lava-lanzarote": {
    moon: {
      targetName: "Marius Hills Pit y Tubos de Lava del Mar de la Tranquilidad",
      body: "Moon",
      tempRange: "Constante -20 °C ± 1 °C interior",
      tempDescription: "Amortiguación geotérmica infinita por la masa basáltica de la corteza lunar.",
      atmosphericPressure: "< 10⁻¹⁰ hPa",
      pressureDescription: "Cámara subterránea apta para instalación de hábitats inflables presurizados a 1 atm.",
      solarRadiationUv: "0 W/m² (Atenuación del 100% de luz solar y UV)",
      radiationDescription: "Reducción de dosis de radiación cósmica a niveles seguros para misiones de larga duración.",
      relativeHumidity: "0.0% HR exterior / 50% controlado en hábitat",
      windEolianDynamics: "0 km/h (Sin perturbaciones externas de regolito lunar abrasivo)",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Campo de entrenamiento oficial de la ESA (PANGAEA) para astronautas del programa Artemis.",
    },
  },

  "parque-timanfaya": {
    moon: {
      targetName: "Llanuras Volcánicas de Oceanus Procellarum",
      body: "Moon",
      tempRange: "-130 °C noche / +120 °C día",
      tempDescription: "Campos de basalto y escorias volcánicas expuestas a ciclos continuos de radiación y frío.",
      atmosphericPressure: "< 10⁻¹⁰ hPa",
      pressureDescription: "Vacío absoluto.",
      solarRadiationUv: "1,361 W/m² solar directo sin filtro",
      radiationDescription: "Meteorización por viento solar que genera nanorreducción de hierro en la capa exterior.",
      relativeHumidity: "0.0% HR",
      windEolianDynamics: "0 km/h",
      climateFidelityRating: "ALTA",
      operationalAtmosphericNote: "Validación de la abrasión mecánica de fragmentos basálticos vítreos en juntas de trajes espaciales.",
    },
  },
};

export function getSpaceClimateProfile(regionId: string, body: "Moon" | "Mars"): SpaceClimateProfile {
  const entry = SPACE_CLIMATE_DATABASE[regionId];
  if (body === "Moon") {
    if (entry?.moon) return entry.moon;
    return {
      targetName: "Polo Sur Lunar (Regiones de Sombra Permanente)",
      body: "Moon",
      tempRange: "40 K a 120 K (-233 °C a -153 °C)",
      tempDescription: "Trampa de frío perpetua en cráteres polares protegidos del calor solar.",
      atmosphericPressure: "< 10⁻¹⁰ hPa (Vacío espacial)",
      pressureDescription: "Exosfera lunar sin presión atmosférica apreciable.",
      solarRadiationUv: "0 W/m² solar directo / Exposición a radiación cósmica GCR",
      radiationDescription: "Bombardeo continuo de partículas pesadas de alta energía.",
      relativeHumidity: "0.0% HR (Anhidro absoluto)",
      windEolianDynamics: "0 km/h (Sin atmósfera convectiva)",
      climateFidelityRating: "MEDIA",
      operationalAtmosphericNote: "Ensayos de supervivencia de mecanismos y lubricantes a temperaturas criogénicas extremas.",
    };
  }

  if (entry?.mars) return entry.mars;
  return {
    targetName: "Cráter Jezero / Tierras Altas Marcianas",
    body: "Mars",
    tempRange: "-90 °C noche / +20 °C día (Gradiente 110 °C)",
    tempDescription: "Amplitud térmica diurna severa bajo atmósfera tenue de dióxido de carbono.",
    atmosphericPressure: "6.1 a 8.5 hPa (~0.7% de la Tierra)",
    pressureDescription: "Atmósfera delgada de CO2 que no permite la presencia de agua líquida pura estable.",
    solarRadiationUv: "590 W/m² con radiación UV-C esterilizante",
    radiationDescription: "Sin capa de ozono; flujo solar letal para organismos desprotegidos.",
    relativeHumidity: "< 0.5% HR (Hiperaridez global)",
    windEolianDynamics: "15 a 50 km/h con transporte de polvo fino de óxidos de hierro",
    climateFidelityRating: "ALTA",
    operationalAtmosphericNote: "Validación de trajes presurizados, sistemas de soporte de vida y rovers autónomos.",
  };
}

export function getClimateComparison(regionId: string, body: "Moon" | "Mars"): ClimateComparisonData {
  const earthRegion = detailedEarthRegions[regionId] ?? detailedEarthRegions["salar-de-uyuni"]!;
  const spaceProfile = getSpaceClimateProfile(regionId, body);

  const isMoon = body === "Moon";

  return {
    earth: {
      tempRange: earthRegion.tempRange,
      tempDayNight: earthRegion.climateEnvironment.tempDayNight,
      solarInsolation: earthRegion.climateEnvironment.solarInsolation,
      uvIndex: earthRegion.uvIndex,
      atmosphericPressure: earthRegion.atmosphericPressure,
      atmosphericDensity: earthRegion.climateEnvironment.atmosphericDensity,
      windDesiccation: earthRegion.climateEnvironment.windDesiccation,
    },
    space: spaceProfile,
    scientificDivergence: {
      thermalDivergence: isMoon
        ? `La amplitud térmica lunar (${spaceProfile.tempRange}) supera por un factor de 7× al gradiente terrestre (${earthRegion.tempRange}), exigiendo radiadores térmicos activos y mantas multicapa (MLI) en hardware.`
        : `La amplitud térmica marciana (${spaceProfile.tempRange}) duplica el gradiente terrestre (${earthRegion.tempRange}), generando fatiga cíclica acelerada en aleaciones y sellos elásticos.`,
      pressureDivergence: isMoon
        ? `Vacío absoluto (< 10⁻¹⁰ hPa) vs presión terrestre (${earthRegion.atmosphericPressure}). La ausencia total de gas elimina cualquier enfriamiento por convección atmosférica.`
        : `Presión marciana extremadamente baja (6.1-8.5 hPa) vs presión terrestre (${earthRegion.atmosphericPressure}). Cerca del límite de Armstrong (el agua hierve a 37 °C sin presurización artificial).`,
      radiationDivergence: isMoon
        ? `Sin magnetosfera ni atmósfera protectora en la Luna. Las pruebas en alta montaña terrestre capturan flujo UV extremo, pero no replican los iones pesados de rayos cósmicos galácticos (GCR).`
        : `Marte carece de capa de ozono; el flujo UV-C (~200-280 nm) es fotooxidante e hidroliza enlaces orgánicos, replicado análogamente por la extrema irradiancia UV de gran altitud en la Tierra.`,
      atmosphericMitigation:
        "Protocolo AnalogX: Se deben aplicar factores de corrección barométrica y coeficientes de atenuación radiativa en los modelos de simulación de misión.",
    },
  };
}
