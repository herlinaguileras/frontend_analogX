import { mapLocations } from "./map-config";

export type EarthProcessCategory =
  | "all"
  | "radiation"
  | "cryo_ice"
  | "hyper_arid"
  | "volcanic_tubes"
  | "altimetry_rover";

export interface EarthProcessFilter {
  id: EarthProcessCategory;
  label: string;
  shortLabel: string;
  color: string;
  glowColor: string;
  description: string;
}

export const processFilters: EarthProcessFilter[] = [
  {
    id: "all",
    label: "Todas las variables globales",
    shortLabel: "Todas",
    color: "#4141fc",
    glowColor: "rgba(65, 65, 252, 0.4)",
    description: "Catálogo completo de análogos terrestres auditados.",
  },
  {
    id: "radiation",
    label: "Radiación UV Extrema & Gran Altitud",
    shortLabel: "Radiación UV",
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)",
    description: "Sitios a >3,600 msnm con índice UV >14 y baja presión atmosférica para ensayos biológicos y trajes EVA.",
  },
  {
    id: "cryo_ice",
    label: "Criogénico, Hielo Relicto & Frío Polar",
    shortLabel: "Hielo Criogénico",
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.5)",
    description: "Ambientes periglaciares con hielo fósil subterráneo (>8 Ma) y temperaturas de hasta -45 °C análogos a trampas frías de Artemis.",
  },
  {
    id: "hyper_arid",
    label: "Hiperaridez & Costras Evaporíticas",
    shortLabel: "Hiperaridez",
    color: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.5)",
    description: "Precipitación <1 mm/año, presencia de percloratos y salmueras saturadas emulando el suelo oxidante de Marte.",
  },
  {
    id: "volcanic_tubes",
    label: "Vulcanismo & Tubos de Lava Subterráneos",
    shortLabel: "Tubos de Lava",
    color: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.5)",
    description: "Galerías y cavidades basálticas con >95% de atenuación de radiación cósmica para diseño de hábitats permanentes.",
  },
  {
    id: "altimetry_rover",
    label: "Calibración Altimétrica & Tracción Rover",
    shortLabel: "Altimetría & Rovers",
    color: "#7fd579",
    glowColor: "rgba(127, 213, 121, 0.5)",
    description: "Hiperplanicies salinas (<0.05° de pendiente) y canchas de terradinámica para rovers de exploración (VIPER / MSR).",
  },
];

export interface DetailedEarthRegionInfo {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  elevation: string;
  coordinatesFormatted: string;
  coordinatesRaw: [number, number];
  tempRange: string;
  uvIndex: string;
  atmosphericPressure: string;
  primaryMinerals: string;
  analogProcess: string;
  processCategories: EarthProcessCategory[];
  topologyGeomorphology: {
    surfaceType: string;
    slope: string;
    roughness: string;
    bearingCapacity: string;
    roverRisk: string;
  };
  climateEnvironment: {
    tempDayNight: string;
    solarInsolation: string;
    atmosphericDensity: string;
    windDesiccation: string;
  };
  availableResourcesIsru: {
    waterExtraction: string;
    mineralsForConstruction: string;
    thermalStorage: string;
    resourceRating: string;
  };
  futureLandingBaseSuitability: {
    landingSiteRationale: string;
    baseConstructionRationale: string;
    evaTestingRationale: string;
  };
  solidAnalogy: string;
  whereAnalogyFails: {
    gravityLimit: string;
    atmospherePressureLimit: string;
    radiationLimit: string;
    biologicalLimit: string;
    mitigationProtocol: string;
  };
  nasaRoleSummary: string;
  verifiedDataset: string;
}

export const detailedEarthRegions: Record<string, DetailedEarthRegionInfo> = {
  // ==========================================
  // BOLIVIA (8 SITIOS DE INVESTIGACIÓN)
  // ==========================================
  "salar-de-uyuni": {
    id: "salar-de-uyuni",
    name: "Salar de Uyuni",
    country: "Bolivia",
    countryCode: "BO",
    elevation: "3,653 msnm",
    coordinatesFormatted: "20.38° S · 66.95° O",
    coordinatesRaw: [-66.95, -20.38],
    tempRange: "-12 °C a +22 °C (Gradiente 34 °C)",
    uvIndex: "UV 14-16 (Extremo)",
    atmosphericPressure: "660 hPa (~34% menos que nivel del mar)",
    primaryMinerals: "Halita (NaCl), Yeso (CaSO4·2H2O), Cloruro de Litio, Boratos",
    analogProcess: "Hiperplanicie reflectante para calibración altimétrica satelital y terradinámica de ruedas metálicas grousers",
    processCategories: ["altimetry_rover", "radiation", "hyper_arid"],
    topologyGeomorphology: {
      surfaceType: "Costra de sal masiva hiperplana (10,582 km²) con polígonos de desecación métricos",
      slope: "< 0.05° en cuenca central (desnivel <1 metro en 100 km)",
      roughness: "Micro-rugosidad de 2 a 5 cm en bordes de crestas poligonales de halita",
      bearingCapacity: "> 450 kPa en costra seca (soporta vehículos pesados sin deformación plástica)",
      roverRisk: "Bajo riesgo de atrapamiento; alto desgaste abrasivo por microcristales de sal en sellos mecánicos",
    },
    climateEnvironment: {
      tempDayNight: "Fuerte oscilación térmica día/noche (+22 °C mediodía a -12 °C madrugada)",
      solarInsolation: "> 1,180 W/m² (albedo superficial > 0.69)",
      atmosphericDensity: "0.85 kg/m³ (~32% menor que estándar terrestre)",
      windDesiccation: "Vientos catabáticos constantes de 30-60 km/h que aceleran la deshidratación salina",
    },
    availableResourcesIsru: {
      waterExtraction: "Salmueras intersticiales subsuperficiales a 1-3 m y extracción térmica de yeso (hasta 209 kg H₂O/ton)",
      mineralsForConstruction: "Bloques de halita masiva sinterizables para cimientos de estructuras presurizadas",
      thermalStorage: "Lecho de sales cloruradas eutécticas con alta capacidad de almacenamiento térmico pasivo",
      resourceRating: "Alta (Agua intersticial, sales para reactores térmicos y sustrato firme)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Superficie de referencia mundial para calibrar radares de descenso altimétrico (LOLA / ICESat-2) y algoritmos autónomos de aterrizaje sin obstáculos topográficos.",
      baseConstructionRationale: "Ideal para simular pistas de aterrizaje masivas y zonas de alunizaje no pavimentadas protegidas de eyección de regolito.",
      evaTestingRationale: "Ensayos de movilidad de rovers pesados (tipo VIPER o Lunar Terrain Vehicle LTV) y fatiga de ruedas elásticas de malla de titanio.",
    },
    solidAnalogy: "Morfología de cuencas evaporíticas gigantes en Marte (Terra Sirenum) y llanuras mare lunares de mínima pendiente.",
    whereAnalogyFails: {
      gravityLimit: "Gravedad terrestre 1.0 g vs 0.16 g lunar. La masa suspendida del rover no experimenta el alivio de peso lunar.",
      atmospherePressureLimit: "Presión atmosférica de 660 hPa permite agua líquida, inexistente en superficie lunar o marciana.",
      radiationLimit: "Capa de ozono filtra radiación cósmica pesada (GCR); en la Luna la exposición es directa.",
      biologicalLimit: "Presencia de halobacterias y arqueas terrestres en salmueras vivas.",
      mitigationProtocol: "Aplicar compensadores de gravedad por cables (suspensión gravitacional 1/6 g) y cámaras TVAC para muestras.",
    },
    nasaRoleSummary: "Sitio patrón oficial de calibración altimétrica LOLA/ICESat y pruebas de movilidad de rovers sobre costras salinas duras.",
    verifiedDataset: "NASADEM_HGT.001 · ICESat-2 · Sentinel-2 MSI · COP-DEM-30",
  },

  "salar-coipasa": {
    id: "salar-coipasa",
    name: "Salar de Coipasa & Cuenca Norte",
    country: "Bolivia",
    countryCode: "BO",
    elevation: "3,657 msnm",
    coordinatesFormatted: "19.30° S · 68.15° O",
    coordinatesRaw: [-68.15, -19.30],
    tempRange: "-14 °C a +20 °C",
    uvIndex: "UV 14-16 (Extremo)",
    atmosphericPressure: "662 hPa",
    primaryMinerals: "Sulfato de magnesio, Halita, Borax, Ulexita",
    analogProcess: "Paleocuenca lacustre en transición desecatoria con salmueras mixtas sulfatadas",
    processCategories: ["hyper_arid", "altimetry_rover"],
    topologyGeomorphology: {
      surfaceType: "Cuenca evaporítica rodeada de estratovolcanes dacíticos con lagunas remanentes hipersalinas",
      slope: "< 0.1° en zona salina, 15-30° en bordes volcánicos",
      roughness: "Zonas fangosas salinas intermedias con fracturas poligonales húmedas",
      bearingCapacity: "Variable (150 a 380 kPa); áreas de transición con barro salino plástico",
      roverRisk: "Riesgo moderado de hundimiento de ruedas grousers en zonas ribereñas",
    },
    climateEnvironment: {
      tempDayNight: "Gradiente térmico de 32 °C con heladas nocturnas recurrentes",
      solarInsolation: "> 1,120 W/m²",
      atmosphericDensity: "0.85 kg/m³",
      windDesiccation: "Vientos intensos con transporte de polvo salino fino",
    },
    availableResourcesIsru: {
      waterExtraction: "Sales de sulfato magnésico hidratado (epsomita) con alta densidad de hidratación cristalina",
      mineralsForConstruction: "Depósitos de boratos y arcillas para blindaje térmico",
      thermalStorage: "Salmueras de sulfatos con propiedades de cambio de fase",
      resourceRating: "Media-Alta (Minerales hidratados ricos en agua de cristalización)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Ensayo de sensores LiDAR para detectar suelos blandos o inestables antes del contacto de los patines del módulo de descenso.",
      baseConstructionRationale: "Simulación de bases en bordes de paleocuencas lacustres de Marte (Cráter Jezero / Eridania).",
      evaTestingRationale: "Pruebas de cambio de adherencia de rovers al pasar de roca volcánica dura a barro evaporítico.",
    },
    solidAnalogy: "Paleolagos con estratos de sulfatos hidratados descubiertos por Mars Reconnaissance Orbiter (CRISM).",
    whereAnalogyFails: {
      gravityLimit: "El esfuerzo de corte del barro salino depende de la gravedad terrestre.",
      atmospherePressureLimit: "Agua líquida presente debido a la presión terrestre de 662 hPa.",
      radiationLimit: "Atenuación magnética y atmosférica terrestre.",
      biologicalLimit: "Tapetes microbianos vivos en lagunas saladas.",
      mitigationProtocol: "Pruebas de tracción en cámaras de regolito simulado con control de humedad.",
    },
    nasaRoleSummary: "Modelo de transición de lago a salar para comprender la deshidratación de paleocuencas marcianas.",
    verifiedDataset: "COP-DEM-GLO-30 · Landsat 8/9 C2L2",
  },

  "sol-de-manana": {
    id: "sol-de-manana",
    name: "Sol de Mañana",
    country: "Bolivia",
    countryCode: "BO",
    elevation: "4,850 msnm",
    coordinatesFormatted: "22.05° S · 67.76° O",
    coordinatesRaw: [-67.76, -22.05],
    tempRange: "-18 °C a +85 °C (fumarolas)",
    uvIndex: "UV 16-19 (Extremo)",
    atmosphericPressure: "570 hPa (~44% menor que nivel del mar)",
    primaryMinerals: "Sílice opalina hidratada, Azufre nativo, Sulfatos ácidos, Alunita",
    analogProcess: "Campo geotérmico activo de alta entalpía con emisiones de vapor ácido y alteración de roca",
    processCategories: ["volcanic_tubes", "radiation"],
    topologyGeomorphology: {
      surfaceType: "Cráteres de fumarolas, ollas de lodo hirviente y terrazas de sinter silíceo a 4,850 msnm",
      slope: "2° a 15° con microdepresiones de colapso hidrotermal",
      roughness: "Superficie muy irregular con costras de azufre frágiles y fisuras térmicas",
      bearingCapacity: "Baja a media (80 a 220 kPa); terreno térmicamente alterado",
      roverRisk: "Alto riesgo de colapso de costras y corrosión ácida en sensores de contacto",
    },
    climateEnvironment: {
      tempDayNight: "Extremo gradiente: -18 °C aire nocturno vs +85 °C en bocas de vapor fumarólico",
      solarInsolation: "> 1,220 W/m² (atmósfera hiperfina y cielo despejado)",
      atmosphericDensity: "0.72 kg/m³",
      windDesiccation: "Vientos helados andinos que condensan vapores sulfurosos en cristales de azufre",
    },
    availableResourcesIsru: {
      waterExtraction: "Vapor condensable directo de fuentes geotérmicas y minerales de sílice opalina",
      mineralsForConstruction: "Azufre elemental para hormigón de azufre (Sulfur Concrete, no requiere agua para fraguado)",
      thermalStorage: "Gradiente geotérmico activo utilizable para fuentes de calor por termopares",
      resourceRating: "Muy Alta para ISRU (Hormigón de azufre y energía térmica)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Pruebas de aterrizaje en proximidades de fuentes hidrotermales fósiles o activas de Marte (Home Plate, Nili Fossae).",
      baseConstructionRationale: "Ensayo de fabricación in-situ de 'Hormigón de Azufre' (Sulfur Concrete), tecnología clave de NASA para bases lunares sin agua.",
      evaTestingRationale: "Pruebas de sellos de trajes presurizados y resistencia de aleaciones metálicas a gases sulfurosos corrosivos.",
    },
    solidAnalogy: "Depósitos de sílice pura (>90%) descubiertos por el rover Spirit en Home Plate (Cráter Gusev, Marte).",
    whereAnalogyFails: {
      gravityLimit: "La convección de vapores y eyección de lodo depende de la aceleración 1g.",
      atmospherePressureLimit: "El agua ebulle a 85 °C a 570 hPa en lugar de ebullir a 0 °C en el vacío marciano.",
      radiationLimit: "Blindaje atmosférico residual de 570 hPa.",
      biologicalLimit: "Microorganismos hipertermófilos acidófilos terrestres.",
      mitigationProtocol: "Modelar cinética de vapor bajo presiones de 6 hPa mediante simulaciones de dinámica de fluidos (CFD).",
    },
    nasaRoleSummary: "Análogo geoquímico directo de depósitos hidrotermales ricos en sílice en Home Plate (Cráter Gusev, Spirit).",
    verifiedDataset: "COP-DEM-GLO-30 · Landsat 8/9 TIRS · ASTER GED",
  },

  "cuevas-volcanicas-lipez": {
    id: "cuevas-volcanicas-lipez",
    name: "Tubos de Lava y Cuevas de Lípez",
    country: "Bolivia",
    countryCode: "BO",
    elevation: "4,500 msnm",
    coordinatesFormatted: "22.27° S · 67.18° O",
    coordinatesRaw: [-67.18, -22.27],
    tempRange: "+1 °C a +6 °C interior (vs -22 °C exterior)",
    uvIndex: "Atenuación >98% en interior",
    atmosphericPressure: "590 hPa",
    primaryMinerals: "Dacitas, Basaltos cavernosos, Incrustaciones de calcita y yeso",
    analogProcess: "Cavidades volcánicas subterráneas con microclima térmicamente estabilizado y blindaje radiativo",
    processCategories: ["volcanic_tubes", "radiation"],
    topologyGeomorphology: {
      surfaceType: "Conductos volcánicos subterráneos relictos y abrigos rocosos de gran volumen",
      slope: "Paredes verticales y techos abovedados basálticos de 3 a 12 metros de altura",
      roughness: "Pisos de derrubios rocosos angulosos y bloques caídos de basalto",
      bearingCapacity: "> 800 kPa en roca madre basáltica",
      roverRisk: "Dificultad de navegación autónoma sin GPS (requiere SLAM óptico y LiDAR 3D)",
    },
    climateEnvironment: {
      tempDayNight: "Estabilidad térmica total: constante entre +1 °C y +5 °C todo el año",
      solarInsolation: "Oscuridad absoluta en galerías profundas (0 W/m²)",
      atmosphericDensity: "0.76 kg/m³ en interior",
      windDesiccation: "Flujo de aire laminar subterráneo de baja velocidad",
    },
    availableResourcesIsru: {
      waterExtraction: "Condensación de humedad interior en techos y microdepósitos de yeso",
      mineralsForConstruction: "Roca basáltica densa de techo para blindaje de radiación cósmica (>2 metros de espesor)",
      thermalStorage: "Masa térmica rocosa circundante que amortigua oscilaciones térmicas exteriores",
      resourceRating: "Alta (Blindaje estructural y estabilidad térmica pasiva)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Planificación de aterrizajes en la proximidad inmediata de claraboyas volcánicas (skylights) sin riesgo de colapso del techo.",
      baseConstructionRationale: "Validación de despliegue de hábitats inflables presurizados dentro de túneles basálticos (Programa Artemis / Marius Hills).",
      evaTestingRationale: "Ensayos de descenso por rapel de astronautas y rovers trepadores en pozos volcánicos lunares.",
    },
    solidAnalogy: "Claraboyas y tubos de lava de Marius Hills (Luna) y flancos de Olympus Mons / Pavonis Mons (Marte).",
    whereAnalogyFails: {
      gravityLimit: "La estabilidad estática del techo de roca es 6 veces más favorable en la Luna (soporta 6 veces más luz).",
      atmospherePressureLimit: "Presencia de aire respirable o presurizado en la Tierra.",
      radiationLimit: "En la Tierra no hay rayos cósmicos galácticos (GCR) directos en superficie.",
      biologicalLimit: "Musgos y microorganismos cavernícolas terrestres.",
      mitigationProtocol: "Escanear geometrías con LiDAR y modelar resistencia estructural con tensor de esfuerzos escalado a 1/6 g.",
    },
    nasaRoleSummary: "Banco de pruebas para diseño estructural de bases lunares en cavidades volcánicas (Marius Hills, Artemis).",
    verifiedDataset: "COP-DEM-GLO-30 · Modelos LiDAR terrestres",
  },

  "cumbre-licancabur": {
    id: "cumbre-licancabur",
    name: "Cumbre Criogénica Licancabur",
    country: "Bolivia",
    countryCode: "BO",
    elevation: "5,916 msnm",
    coordinatesFormatted: "22.83° S · 67.88° O",
    coordinatesRaw: [-67.88, -22.83],
    tempRange: "-25 °C a +4 °C",
    uvIndex: "UV 18-22 (Esterilizante)",
    atmosphericPressure: "490 hPa (~51% menor que nivel del mar)",
    primaryMinerals: "Andesitas silicificadas, Permafrost relicto alpino, Brechas piroclásticas",
    analogProcess: "Ambiente volcánico-criogénico extremo a casi 6,000 msnm con despresurización y radiación biocida",
    processCategories: ["cryo_ice", "radiation"],
    topologyGeomorphology: {
      surfaceType: "Cono estratovolcánico simétrico con cráter somital que alberga una laguna congelada",
      slope: "Pendientes de 30° a 38° en cono exterior; fondo de cráter plano (<5°)",
      roughness: "Acarreos de bloques andesíticos de 20-80 cm y regolito volcánico congelado",
      bearingCapacity: "> 600 kPa en roca congelada / permafrost",
      roverRisk: "Pendientes extremas impiden rovers sobre ruedas; ideal para robots hexápodos o trepadores",
    },
    climateEnvironment: {
      tempDayNight: "Temperaturas nocturnas de hasta -25 °C con viento congelante continuo (>80 km/h)",
      solarInsolation: "Radiación solar ultravioleta biocida máxima del planeta Tierra (>2,000 kJ/m² UV-B)",
      atmosphericDensity: "0.62 kg/m³ (~50% del aire a nivel del mar)",
      windDesiccation: "Aridez atmosférica severa con punto de rocío < -20 °C",
    },
    availableResourcesIsru: {
      waterExtraction: "Hielo de laguna de cráter y permafrost en suelos de altitud",
      mineralsForConstruction: "Roca andesítica densa para gaviones protectores",
      thermalStorage: "Agua de cráter con calor residual de baja entalpía en profundidad",
      resourceRating: "Media (Hielo en altura, pero de difícil accesibilidad operativa)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Criterio de aterrizaje en cumbres y bordes de cráteres de impacto con fuerte pendiente circundante (tipo Shackleton).",
      baseConstructionRationale: "Pruebas de sistemas de soporte vital bajo presiones reducidas (~500 hPa) equivalentes a la cabina del Orion.",
      evaTestingRationale: "Ensayos de fatiga física de astronautas con trajes presurizados EVA en hipoxia severa y radiación UV extrema.",
    },
    solidAnalogy: "Picos de luz eterna en bordes de cráteres polares lunares combinados con frío intenso y vacío parcial.",
    whereAnalogyFails: {
      gravityLimit: "La escalada y tracción se realiza bajo 1.0 g.",
      atmospherePressureLimit: "490 hPa es el límite de respiración humana con O2 puro, pero aún muy por encima del vacío lunar.",
      radiationLimit: "No hay flujo de neutrones secundarios libres como en la superficie lunar.",
      biologicalLimit: "Cianobacterias y nematodos extremófilos adaptados al cráter.",
      mitigationProtocol: "Monitoreo fisiológico de astronautas con sensores telemétricos de telemetría biomédica de la NASA.",
    },
    nasaRoleSummary: "Estudiado por NASA Ames y SETI Institute como análogo de resistencia de trajes espaciales y biología de límites extremos.",
    verifiedDataset: "COP-DEM-GLO-30 · Landsat 8/9 OLI · Sensores meteorológicos NASA Ames",
  },

  "laguna-colorada": {
    id: "laguna-colorada",
    name: "Laguna Colorada y Borateras",
    country: "Bolivia",
    countryCode: "BO",
    elevation: "4,278 msnm",
    coordinatesFormatted: "22.20° S · 67.78° O",
    coordinatesRaw: [-67.78, -22.20],
    tempRange: "-15 °C a +15 °C",
    uvIndex: "UV 15-18 (Extremo)",
    atmosphericPressure: "610 hPa",
    primaryMinerals: "Ulexita (NaCaB5O6(OH)6·5H2O), Halita, Bórax, Yeso, Pigmentos carotenoides",
    analogProcess: "Salmuera alcalina hipersalina somera rica en sedimentos de bórax y tapetes microbianos halófilos",
    processCategories: ["hyper_arid", "radiation"],
    topologyGeomorphology: {
      surfaceType: "Cuenca lacustre somera (<1.5 m) con islas flotantes de bórax y depósitos de salmuera roja",
      slope: "< 0.5° en fondo lacustre; 10-25° en abanicos aluviales circundantes",
      roughness: "Sedimentos de lodo salino blando con costras de evaporitas efervescentes",
      bearingCapacity: "Baja (50 a 140 kPa en bordes); riesgo de atollamiento",
      roverRisk: "Alto riesgo de atrapamiento de ruedas grousers en sustrato plástico saturado",
    },
    climateEnvironment: {
      tempDayNight: "Fuertes vientos catabáticos diarios de 40-70 km/h y congelamiento superficial nocturno",
      solarInsolation: "> 1,160 W/m²",
      atmosphericDensity: "0.78 kg/m³",
      windDesiccation: "Evaporación anual (>1,500 mm) supera con creces la precipitación (<100 mm)",
    },
    availableResourcesIsru: {
      waterExtraction: "Salmuera líquida separable por destilación solar y sales hidratadas de boro",
      mineralsForConstruction: "Compuestos de boro: excelente absorbente de neutrones térmicos para blindaje contra radiación espacial",
      thermalStorage: "Lagos salinos que actúan como trampas solares térmicas",
      resourceRating: "Alta para blindaje radiativo (Boro) y recursos químicos",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Selección de márgenes estables de paleocuencas lacustres de Marte para evitar suelos saturados de salmuera.",
      baseConstructionRationale: "Aprovechamiento de minerales de boro locales para fabricar compuestos poliméricos de blindaje de neutrones para hábitats.",
      evaTestingRationale: "Ensayos de toma de testigos de sedimentos salinos con taladros robóticos sin contaminar muestras orgánicas.",
    },
    solidAnalogy: "Lagos de salmueras saturadas de Marte y preservación de carotenoides y lípidos microbianos en sales de halita.",
    whereAnalogyFails: {
      gravityLimit: "La compactación de sedimentos y separación de cristales responde a 1g.",
      atmospherePressureLimit: "Presión atmosférica de 610 hPa mantiene el agua líquida estable durante el día.",
      radiationLimit: "Los rayos UV son filtrados parcialmente por la atmósfera superior.",
      biologicalLimit: "Población de flamencos y algas diatomeas terrestres.",
      mitigationProtocol: "Protocolos estrictos de Protección Planetaria (COSPAR Categoría IVb) para recolección de muestras asépticas.",
    },
    nasaRoleSummary: "Modelo canónico para astrobiología y detección de biofirmas carotenoides fosilizadas en sales de boro y halita.",
    verifiedDataset: "Sentinel-2 MSI · Landsat 8 OLI · COP-DEM-30",
  },

  "arenales-uyuni": {
    id: "arenales-uyuni",
    name: "Dunas y Arenales de Uyuni / Pampa Colorada",
    country: "Bolivia",
    countryCode: "BO",
    elevation: "3,720 msnm",
    coordinatesFormatted: "20.65° S · 66.85° O",
    coordinatesRaw: [-66.85, -20.65],
    tempRange: "-10 °C a +22 °C",
    uvIndex: "UV 15-17 (Extremo)",
    atmosphericPressure: "655 hPa",
    primaryMinerals: "Arenas silíceas eólicas, Polvo volcánico andino, Fragmentos de feldespato",
    analogProcess: "Campos de dunas y mantos de arena eólica de grano fino en ambiente de baja humedad relativa",
    processCategories: ["altimetry_rover", "hyper_arid"],
    topologyGeomorphology: {
      surfaceType: "Dunas longitudinales y barjanes de 2 a 8 metros de altura con rizaduras de viento (ripples)",
      slope: "Pendiente de barlovento 8-12°; pendiente de sotavento (talud de reposo) ~32°",
      roughness: "Uniforme con rizaduras milimétricas de arena clasificada eólicamente",
      bearingCapacity: "Baja a media (40 a 110 kPa); arena suelta no consolidada",
      roverRisk: "Alto riesgo de derrape, enterramiento de ruedas motrices y pérdida de tracción cinemática",
    },
    climateEnvironment: {
      tempDayNight: "Oscilación térmica de 30 °C; arena superficial alcanza 45 °C al sol y -8 °C de noche",
      solarInsolation: "> 1,140 W/m²",
      atmosphericDensity: "0.84 kg/m³",
      windDesiccation: "Vientos dominantes del oeste que reorganizan dunas activas",
    },
    availableResourcesIsru: {
      waterExtraction: "Muy baja en arena suelta (<0.5% humedad gravimétrica)",
      mineralsForConstruction: "Arenas de sílice ideales para sinterización láser directa y fabricación de ladrillos de regolito",
      thermalStorage: "Baja conductividad térmica superficial (aislante térmico natural de capas subyacentes)",
      resourceRating: "Media (Excelente para ensayos de tracción y sinterizado de arena)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Evaluación de zonas a evitar para aterrizaje debido al riesgo de eyección violenta de partículas y enterramiento de patines.",
      baseConstructionRationale: "Pruebas de impresoras 3D solares/microondas para consolidar arena suelta en plataformas estables sin aglomerantes.",
      evaTestingRationale: "Ensayos de movilidad de rovers de tracción total con sensores de slip (derrape) y control de par motor independiente.",
    },
    solidAnalogy: "Campos de dunas de regolito eólico en Marte (Dunas de Bagnold, Cráter Gale) y regolito pulverulento lunar.",
    whereAnalogyFails: {
      gravityLimit: "El ángulo de reposo de la arena y el hundimiento de las ruedas depende de la gravedad normal (1g vs 0.38g).",
      atmospherePressureLimit: "El transporte de granos de arena depende de la densidad del aire (0.84 kg/m³ vs 0.02 kg/m³ en Marte).",
      radiationLimit: "Atenuación atmosférica de viento solar.",
      biologicalLimit: "Esporas microbianas transportadas por el viento terrestre.",
      mitigationProtocol: "Aplicar factores de corrección de terradinámica de Bekker-Wong adaptados a gravedad lunar y marciana.",
    },
    nasaRoleSummary: "Banco de pruebas para terradinámica de ruedas de rovers (Curiosity, Perseverance) y ensayos de derrape en arena.",
    verifiedDataset: "Sentinel-2 MSI · Landsat 8/9 C2L2 · COP-DEM-30",
  },

  "volcan-ollague": {
    id: "volcan-ollague",
    name: "Complejo Volcánico Ollagüe",
    country: "Bolivia",
    countryCode: "BO",
    elevation: "5,868 msnm",
    coordinatesFormatted: "21.30° S · 68.18° O",
    coordinatesRaw: [-68.18, -21.30],
    tempRange: "-22 °C a +8 °C",
    uvIndex: "UV 17-20 (Extremo)",
    atmosphericPressure: "495 hPa",
    primaryMinerals: "Azufre masivo, Andesitas porfídicas, Sulfatos de hierro, Arcillas hidrotermales",
    analogProcess: "Estratovolcán andino activo con depósitos masivos de azufre y solfataras de alta altitud",
    processCategories: ["volcanic_tubes", "radiation"],
    topologyGeomorphology: {
      surfaceType: "Cono volcánico andesítico con domos de lava dacítica y calderas de colapso",
      slope: "Pendientes fuertes de 20° a 42° con escarpes rocosos",
      roughness: "Muy rugoso con bloques de lava andesítica de hasta 2 metros de diámetro",
      bearingCapacity: "> 700 kPa en roca andesítica firme",
      roverRisk: "Terreno no transitable por rovers convencionales; apto para rovers bípedos o drones de vuelo en atmósfera tenue",
    },
    climateEnvironment: {
      tempDayNight: "Frío periglacial extremo con vientos huracanados andinos (>100 km/h en invierno)",
      solarInsolation: "> 1,200 W/m²",
      atmosphericDensity: "0.63 kg/m³",
      windDesiccation: "Aire extremadamente seco y enrarecido",
    },
    availableResourcesIsru: {
      waterExtraction: "Extracción térmica de condensados de solfataras activas",
      mineralsForConstruction: "Yacimientos masivos de azufre de pureza superior al 85% para síntesis de polímeros y hormigones",
      thermalStorage: "Calor volcánico residual en zonas de solfataras",
      resourceRating: "Alta para materias primas químicas e intermediarios reactivos",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Sitio no apto para alunizaje directo; simula zonas de recolección geológica en los flancos de volcanes de Marte.",
      baseConstructionRationale: "Uso de azufre y roca volcánica para construcción automatizada de escudos térmicos y antiradiación.",
      evaTestingRationale: "Ensayos de muestreo geológico en pendientes escarpadas con herramientas robóticas autónomas.",
    },
    solidAnalogy: "Volcanismo basáltico-andesítico de los Tharsis Montes y Elysium Mons en Marte.",
    whereAnalogyFails: {
      gravityLimit: "La viscosidad aparente y fragmentación piroclástica está regida por 1g.",
      atmospherePressureLimit: "Presión de 495 hPa.",
      radiationLimit: "Atenuación atmosférica terrestre.",
      biologicalLimit: "Líquenes y bacterias acidófilas en solfataras.",
      mitigationProtocol: "Simulación de reactores químicos de azufre en atmósfera cerrada de CO2 a 6 hPa.",
    },
    nasaRoleSummary: "Modelo de recursos de azufre y minerales piroclásticos para reactores químicos ISRU extraterrestres.",
    verifiedDataset: "COP-DEM-GLO-30 · Landsat 8 TIRS · Observatorio Vulcanológico",
  },

  // ==========================================
  // CHILE (2 SITIOS)
  // ==========================================
  "atacama-yungay": {
    id: "atacama-yungay",
    name: "Desierto de Atacama (Yungay)",
    country: "Chile",
    countryCode: "CL",
    elevation: "1,000 msnm",
    coordinatesFormatted: "24.08° S · 69.87° O",
    coordinatesRaw: [-69.87, -24.08],
    tempRange: "0 °C a +35 °C",
    uvIndex: "UV 12-14 (Muy alto)",
    atmosphericPressure: "900 hPa",
    primaryMinerals: "Percloratos (ClO4-), Nitratos, Yeso, Halita, Anhidrita",
    analogProcess: "Hiperaridez absoluta (<1 mm/año durante milenios) con presencia de sales oxidantes de perclorato",
    processCategories: ["hyper_arid", "radiation"],
    topologyGeomorphology: {
      surfaceType: "Llanuras coluviales y abanicos aluviales fósiles con costras duras de caliche y yeso",
      slope: "< 2° en llanuras aluviales; 5-15° en colinas circundantes",
      roughness: "Baja a media con pavimentos desérticos de piedras pulidas por el viento (ventifactos)",
      bearingCapacity: "350 a 500 kPa en suelos consolidados",
      roverRisk: "Bajo riesgo de atrapamiento; óptimo para pruebas de velocidad de rovers",
    },
    climateEnvironment: {
      tempDayNight: "Amplia variación térmica día/noche con humedad relativa menor al 5%",
      solarInsolation: "> 1,100 W/m² (más de 330 días de sol absoluto al año)",
      atmosphericDensity: "1.10 kg/m³",
      windDesiccation: "Régimen hiperárido sin lluvia detectable durante décadas",
    },
    availableResourcesIsru: {
      waterExtraction: "Extracción térmica de yeso anhidro y costras de salmueras relictas subsuperficiales",
      mineralsForConstruction: "Costras de sulfato de calcio (yeso) como material de aglomeración y matriz mineral",
      thermalStorage: "Regolito árido con alta inercia térmica diurna",
      resourceRating: "Media (Baja disponibilidad de agua, pero alta pureza de minerales oxidantes)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Zona plana despejada ideal para ensayar algoritmos de navegación óptica de aterrizaje sin sombras de relieve.",
      baseConstructionRationale: "Simulación de campamentos base presurizados en llanuras desérticas marcianas (Utopia / Chryse Planitia).",
      evaTestingRationale: "Banco canónico de la NASA para probar instrumentos de detección de vida (L/D enantiómeros, secuenciación ADN in-situ).",
    },
    solidAnalogy: "Suelo marciano con percloratos descubierto por la misión Phoenix (2008) y Curiosity en el Cráter Gale.",
    whereAnalogyFails: {
      gravityLimit: "Tracción en 1g; el polvo no flota en vórtices prolongados como en Marte.",
      atmospherePressureLimit: "Presión atmosférica de 900 hPa.",
      radiationLimit: "Filtración de radiación cósmica por la atmósfera.",
      biologicalLimit: "Límite extremo de la vida, pero existen bacterias endolíticas microscópicas dentro de cristales de halita.",
      mitigationProtocol: "Muestreos con protocolos asépticos y pruebas en cámaras de simulación marciana (cámaras de vacío a 6 hPa con CO2).",
    },
    nasaRoleSummary: "Referencia canónica internacional para detección de biofirmas y ensayos de instrumentos biológicos (Viking / Phoenix).",
    verifiedDataset: "Landsat 8/9 C2L2 · COP-DEM-30 · NASA Astrobiology Science 2003",
  },

  "cordillera-sal-atacama": {
    id: "cordillera-sal-atacama",
    name: "Valle de la Luna & Cordillera de la Sal",
    country: "Chile",
    countryCode: "CL",
    elevation: "2,400 msnm",
    coordinatesFormatted: "22.95° S · 68.28° O",
    coordinatesRaw: [-68.28, -22.95],
    tempRange: "-2 °C a +30 °C",
    uvIndex: "UV 13-15 (Extremo)",
    atmosphericPressure: "765 hPa",
    primaryMinerals: "Halita cristalina, Arcillas esmectíticas secas, Sulfato de calcio, Cloruros",
    analogProcess: "Estructuras tectónicas de plegamiento salino y erosión eólica extrema sin intervención de agua líquida moderna",
    processCategories: ["hyper_arid", "altimetry_rover"],
    topologyGeomorphology: {
      surfaceType: "Escarpes escarpados de sal, cañones ciegos y crestones de halita plegada",
      slope: "10° a 45° con crestas agudas y quebradas profundas",
      roughness: "Muy alta: agujas de sal cortantes de 10 a 50 cm",
      bearingCapacity: "> 400 kPa en roca de sal; peligro de colapso en microcavernas",
      roverRisk: "Alto riesgo de corte y punzonamiento en neumáticos o ruedas metálicas",
    },
    climateEnvironment: {
      tempDayNight: "Días cálidos y noches frías con nula humedad",
      solarInsolation: "> 1,150 W/m²",
      atmosphericDensity: "0.98 kg/m³",
      windDesiccation: "Vientos abrasivos cargados de arena que esculpen crestas de sal",
    },
    availableResourcesIsru: {
      waterExtraction: "Agua de hidratación en arcillas profundas y yeso",
      mineralsForConstruction: "Sal gema masiva para fabricación de cavernas de almacenamiento subterráneo",
      thermalStorage: "Alta conductividad térmica en estratos de sal pura",
      resourceRating: "Media-Alta (Cavidades naturales y sales masivas)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Ensayos de aterrizaje de precisión en cañones estrechos y mesetas escarpadas (análogo de Valles Marineris).",
      baseConstructionRationale: "Aprovechamiento de cañones y abrigos rocosos salinos para ubicar hábitats resguardados del viento.",
      evaTestingRationale: "Pruebas de durabilidad de suelas de trajes espaciales contra bordes afilados de halita cristalina.",
    },
    solidAnalogy: "Estratos sedimentarios plegados de arcillas y sales de sulfato en Mount Sharp (Cráter Gale, Marte).",
    whereAnalogyFails: {
      gravityLimit: "La resistencia al corte y estabilidad de las pendientes salinas responde a 1g.",
      atmospherePressureLimit: "Presión de 765 hPa.",
      radiationLimit: "Atenuación magnética terrestre.",
      biologicalLimit: "Microorganismos extremófilos en cavidades protegidas.",
      mitigationProtocol: "Ensayos comparativos con modelos geomecánicos de Marte a 0.38g.",
    },
    nasaRoleSummary: "Modelo geomorfológico de cañones sedimentarios y desgaste de materiales en superficies de halita afilada.",
    verifiedDataset: "COP-DEM-GLO-30 · Sentinel-2 MSI · NASA Astrobiology Field Data",
  },

  // ==========================================
  // ANTÁRTIDA (2 SITIOS)
  // ==========================================
  "mcmurdo-dry-valleys": {
    id: "mcmurdo-dry-valleys",
    name: "Valles Secos de McMurdo (Beacon Valley)",
    country: "Antártida",
    countryCode: "AQ",
    elevation: "1,200 msnm",
    coordinatesFormatted: "77.85° S · 160.75° E",
    coordinatesRaw: [160.75, -77.85],
    tempRange: "-45 °C a -10 °C",
    uvIndex: "Variable polar",
    atmosphericPressure: "860 hPa",
    primaryMinerals: "Hielo masivo relicto (>8 Ma), Areniscas de cuarzo Beacon, Cuñas de hielo, Sales de nitrato",
    analogProcess: "Desierto frío polar hiperárido sin nieve con hielo masivo subsuperficial relicto preservado por sublimación lenta",
    processCategories: ["cryo_ice"],
    topologyGeomorphology: {
      surfaceType: "Suelos periglaciares estructurados en polígonos de contracción térmica con regolito seco sobre hielo masivo",
      slope: "< 3° en piso de valles; 15-35° en laderas montañosas de dolerita",
      roughness: "Media: pavimento de cantos rodados y polígonos de hielo de 10 a 20 metros de diámetro",
      bearingCapacity: "> 500 kPa sobre permafrost consolidado",
      roverRisk: "Tracción resbaladiza en parches de hielo desnudo; atasco en cuñas poligonales",
    },
    climateEnvironment: {
      tempDayNight: "Frío perpetuo extremo: media anual de -20 °C con mínimas de -45 °C; noche polar de 4 meses",
      solarInsolation: "0 W/m² en noche polar continua a >800 W/m² en sol de medianoche",
      atmosphericDensity: "1.25 kg/m³ (aire polar muy denso)",
      windDesiccation: "Vientos catabáticos supersécos (>120 km/h) que subliman instantáneamente la nieve",
    },
    availableResourcesIsru: {
      waterExtraction: "Hielo puro subsuperficial masivo a solo 20-50 cm bajo el manto de regolito seco",
      mineralsForConstruction: "Rocas de dolerita densa y bloques de permafrost",
      thermalStorage: "Crioconservación biológica y de reactivos sin consumo energético",
      resourceRating: "Máxima (Mayor reserva accesible de hielo fósil análogo a la Luna)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Selección de sitios en regiones polares lunares (Cráter Shackleton) y casquetes polares de Marte.",
      baseConstructionRationale: "Desarrollo de técnicas de perforación y minería de hielo en trampas frías criogénicas sin fundir el pozo.",
      evaTestingRationale: "Pruebas de sistemas de calentamiento de trajes EVA y lubricantes de vacío resistentes a -45 °C.",
    },
    solidAnalogy: "Trampas frías polares lunares en sombras permanentes (PSR) y suelo congelado con hielo fósil de Marte.",
    whereAnalogyFails: {
      gravityLimit: "La sublimación de hielo y penetración del taladro opera bajo 1g en lugar de 0.16g.",
      atmospherePressureLimit: "Presión atmosférica de 860 hPa impide la sublimación explosiva en vacío.",
      radiationLimit: "Campo magnético terrestre protege de radiación letal cósmica.",
      biologicalLimit: "Microorganismos criptoendolíticos que habitan el interior de areniscas.",
      mitigationProtocol: "Realizar ensayos de perforación de hielo en cámaras criogénicas al vacío (TVAC a 40 Kelvin).",
    },
    nasaRoleSummary: "Análogo de las trampas frías de hielo polar en el Cráter Shackleton (Luna) y casquetes polares de Marte.",
    verifiedDataset: "LRO Diviner LST · USGS Antarctic Names · NSF Antarctic Research",
  },

  "lago-vanda-taylor": {
    id: "lago-vanda-taylor",
    name: "Glaciar Taylor & Canales Hipersalinos",
    country: "Antártida",
    countryCode: "AQ",
    elevation: "150 msnm",
    coordinatesFormatted: "77.52° S · 161.55° E",
    coordinatesRaw: [161.55, -77.52],
    tempRange: "-40 °C a -5 °C",
    uvIndex: "Bajo a moderado polar",
    atmosphericPressure: "980 hPa",
    primaryMinerals: "Óxidos de hierro hidratados, Salmueras de halita y cloruro de calcio, Hielo glacial",
    analogProcess: "Salmueras subglaciares anóxicas ricas en hierro que fluyen a temperaturas bajo cero sin congelarse ('Blood Falls')",
    processCategories: ["cryo_ice", "hyper_arid"],
    topologyGeomorphology: {
      surfaceType: "Frente de lengua de glaciar frío sobre cuenca salina con filtraciones líquidas ferruginosas",
      slope: "Pared de hielo vertical de 20-30 metros de altura",
      roughness: "Hielo vítreo pulido con canales de drenaje de salmuera rojiza",
      bearingCapacity: "> 900 kPa en hielo glacial masivo",
      roverRisk: "Superficies de hielo extremadamente resbaladizas; exige púas metálicas (ice-claws)",
    },
    climateEnvironment: {
      tempDayNight: "Temperaturas siempre bajo cero, salmuera permanece líquida a -7 °C debido a la salinidad",
      solarInsolation: "Estacional polar",
      atmosphericDensity: "1.30 kg/m³",
      windDesiccation: "Vientos catabáticos severos",
    },
    availableResourcesIsru: {
      waterExtraction: "Hielo glacial puro y salmueras para electrólisis de agua",
      mineralsForConstruction: "Óxidos de hierro para reducción carbotérmica y obtención de hierro metálico",
      thermalStorage: "Efecto eutéctico de salmueras para fluidos de transferencia de calor",
      resourceRating: "Alta (Agua líquida eutéctica y depósitos de hierro)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Ensayos de aterrizaje y penetración de sondas criogénicas tipo criobots para lunas heladas (Europa / Encélado).",
      baseConstructionRationale: "Estudio de anclajes criogénicos de módulos presurizados directamente en hielo glacial.",
      evaTestingRationale: "Ensayos de equipos de fusión térmica para muestreo aséptico de agua líquida subterránea.",
    },
    solidAnalogy: "Salmueras subsuperficiales de percloratos en Marte (RSL) y océanos subglaciares bajo costras de hielo extraterrestres.",
    whereAnalogyFails: {
      gravityLimit: "La presión hidrostática de la salmuera depende de 1g.",
      atmospherePressureLimit: "Presencia de atmósfera terrestre a 980 hPa.",
      radiationLimit: "Atenuación por la magnetosfera.",
      biologicalLimit: "Comunidad bacteriana autótrofa metabolizadora de hierro y azufre viva bajo el hielo.",
      mitigationProtocol: "Esterilización de instrumental con calor seco y radiación gamma para evitar bio-contaminación.",
    },
    nasaRoleSummary: "Modelo de biosferas aisladas en salmueras bajo cero y transporte de óxidos en climas polares de Marte.",
    verifiedDataset: "USGS Antarctic Geographic Names · NSF Polar Programs",
  },

  // ==========================================
  // CANADÁ (1 SITIO)
  // ==========================================
  "haughton-crater": {
    id: "haughton-crater",
    name: "Cráter Haughton (Isla Devon)",
    country: "Canadá",
    countryCode: "CA",
    elevation: "200 msnm",
    coordinatesFormatted: "75.38° N · 89.67° O",
    coordinatesRaw: [-89.67, 75.38],
    tempRange: "-35 °C a +10 °C",
    uvIndex: "Bajo (Ártico)",
    atmosphericPressure: "990 hPa",
    primaryMinerals: "Brechas de impacto carbonatadas, Dolomita, Yeso de choque, Permafrost continuo",
    analogProcess: "Cráter de impacto meteórico complejo de 23 km de diámetro emplazado en roca carbonatada sobre permafrost ártico",
    processCategories: ["altimetry_rover", "cryo_ice"],
    topologyGeomorphology: {
      surfaceType: "Cráter de impacto complejo con pico central erosionado, manto de eyección y valles en U",
      slope: "0° a 5° en piso de cráter; 15-25° en bordes de la estructura de impacto",
      roughness: "Alta densidad de bloques de roca carbonatada fracturada por impacto (10 a 100 cm)",
      bearingCapacity: "> 500 kPa en lecho de brecha consolidado",
      roverRisk: "Riesgo de bloqueo de rovers por campos de rocas de eyección angulosas",
    },
    climateEnvironment: {
      tempDayNight: "Clima desértico polar ártico frío sin árboles; permafrost continuo de más de 400 m de profundidad",
      solarInsolation: "Estacional polar (noche polar invernal continua)",
      atmosphericDensity: "1.28 kg/m³",
      windDesiccation: "Vientos árticos moderados con escasa precipitación líquida",
    },
    availableResourcesIsru: {
      waterExtraction: "Hielo masivo en permafrost continuo a partir de 30 cm de profundidad",
      mineralsForConstruction: "Brechas carbonatadas ricas en calcio y magnesio para materiales de construcción aglomerados",
      thermalStorage: "Permafrost estable como sumidero térmico",
      resourceRating: "Alta (Agua congelada en permafrost y roca para construcción)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Selección de sitios dentro de cráteres de impacto lunares y marcianos evitando campos de bloques expulsados (boulder fields).",
      baseConstructionRationale: "Sede del Haughton-Mars Project (HMP) de NASA y Mars Society (FMARS): hábitats análogos tipo cilindro de dos plantas.",
      evaTestingRationale: "Ensayos sistemáticos de trajes espaciales presurizados, rovers tripulados (Humvee de Marte) y drones de reconocimiento.",
    },
    solidAnalogy: "Estructuras de impacto complejas en las tierras altas lunares (Anorthosite highlands) y cráteres degradados de Marte.",
    whereAnalogyFails: {
      gravityLimit: "La movilidad de los astronautas y rovers se evalúa bajo 1g terrestre.",
      atmospherePressureLimit: "Presión atmosférica normal que permite respiración en el exterior con abrigo térmico.",
      radiationLimit: "Protección por campo magnético y atmósfera terrestre.",
      biologicalLimit: "Líquenes y musgos árticos adaptados.",
      mitigationProtocol: "Simulaciones operativas en régimen estricto de cuarentena de comunicaciones y retraso temporal de radio (15 min).",
    },
    nasaRoleSummary: "Sede oficial del Haughton-Mars Project (HMP) de NASA para ensayos de operaciones humanas y rovers presurizados.",
    verifiedDataset: "COP-DEM-GLO-30 · HMP Field Data · NASA Ames Astrobiology",
  },

  // ==========================================
  // ESPAÑA (2 SITIOS)
  // ==========================================
  "tubos-lava-lanzarote": {
    id: "tubos-lava-lanzarote",
    name: "Tubos de Lava de Malpaís (Lanzarote)",
    country: "España",
    countryCode: "ES",
    elevation: "250 msnm",
    coordinatesFormatted: "29.15° N · 13.48° O",
    coordinatesRaw: [-13.48, 29.15],
    tempRange: "+18 °C a +22 °C (estable interior)",
    uvIndex: "Atenuación 100% subterránea",
    atmosphericPressure: "985 hPa",
    primaryMinerals: "Basaltos alcalinos, Espeleotemas de sulfatos y yeso, Silicatos de magnesio",
    analogProcess: "Tubo de lava basáltico gigante (Tubo de la Corona, 7.6 km de longitud y 25 m de diámetro) con claraboyas naturales ('jameos')",
    processCategories: ["volcanic_tubes"],
    topologyGeomorphology: {
      surfaceType: "Galería volcánica tubular de gran sección con tramos sumergidos y secos y aberturas de colapso en el techo",
      slope: "Piso suave de lava cordada (<3°) interrumpido por bloques de colapso esporádicos",
      roughness: "Paredes estriadas con salientes basálticas y piso de lava pahoehoe",
      bearingCapacity: "> 900 kPa en roca madre basáltica compacta",
      roverRisk: "Navegación subterránea a oscuras sin satélites; exige iluminación LED y sensores de proximidad ultrasónicos",
    },
    climateEnvironment: {
      tempDayNight: "Termorregulación perfecta: variación menor a 2 °C entre día y noche en interior",
      solarInsolation: "0 W/m² (ausencia de luz solar)",
      atmosphericDensity: "1.20 kg/m³",
      windDesiccation: "Flujo de aire geotérmico controlado por efecto chimenea de las claraboyas",
    },
    availableResourcesIsru: {
      waterExtraction: "Infiltraciones de agua de mar desalinizada naturalmente por roca volcánica en cotas bajas",
      mineralsForConstruction: "Basalto alcalino de alta resistencia mecánica (>120 MPa de compresión) para blindaje y sinterizado",
      thermalStorage: "Masa basáltica infinita que mantiene temperatura humana confortable sin climatización",
      resourceRating: "Alta (Blindaje volumétrico masivo y estabilidad estructural)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Criterio de descenso en campos volcánicos basálticos cerca de claraboyas para acceso expedito al subsuelo.",
      baseConstructionRationale: "Instalación de hábitats permanentes bajo techo de roca basáltica de 15 a 30 metros de espesor para anular radiación cósmica.",
      evaTestingRationale: "Campo oficial del programa de astronautas PANGAEA de la Agencia Espacial Europea (ESA) para geología planetaria.",
    },
    solidAnalogy: "Tubos de lava de Marius Hills en Oceanus Procellarum (Luna) con claraboya de 65 metros observada por LROC.",
    whereAnalogyFails: {
      gravityLimit: "La gravedad terrestre 1g hace que los techos soporten 6 veces más peso por metro cúbico que en la Luna.",
      atmospherePressureLimit: "Presencia de aire marino húmedo en la cueva.",
      radiationLimit: "Blindaje de la Tierra.",
      biologicalLimit: "Fauna troglobia endémica marina y terrestre (cangrejo ciego Munidopsis polymorpha).",
      mitigationProtocol: "Modelar mecánicas de colapso de techos en software de elementos finitos con gravedad lunar de 1.62 m/s².",
    },
    nasaRoleSummary: "Campo oficial del programa de astronautas PANGAEA (ESA) para exploración de cuevas lunares en Marius Hills.",
    verifiedDataset: "ESA PANGAEA GIS · Sentinel-2 MSI · Geoparque Mundial UNESCO",
  },

  "parque-timanfaya": {
    id: "parque-timanfaya",
    name: "Parque Nacional de Timanfaya",
    country: "España",
    countryCode: "ES",
    elevation: "350 msnm",
    coordinatesFormatted: "29.00° N · 13.73° O",
    coordinatesRaw: [-13.73, 29.00],
    tempRange: "+12 °C a +32 °C",
    uvIndex: "UV 9-11 (Muy alto)",
    atmosphericPressure: "975 hPa",
    primaryMinerals: "Basaltos toleíticos vírgenes, Olivino, Piroxenos, Puzolanas volcánicas",
    analogProcess: "Campos de lava basáltica prístina e histórica (erupciones de 1730-1736) sin alteración de vegetación",
    processCategories: ["volcanic_tubes", "altimetry_rover"],
    topologyGeomorphology: {
      surfaceType: "Malpaís de lava escoriácea 'aa' extremadamente rugosa y campos de lava cordada 'pahoehoe'",
      slope: "2° a 25° en flancos de conos volcánicos y hornitos",
      roughness: "Extrema en lavas 'aa' con bloques dentados de 10-60 cm; lisa y ondulada en lavas cordadas",
      bearingCapacity: "> 850 kPa",
      roverRisk: "Severo desgaste mecánico de ruedas metálicas en lavas 'aa'; riesgo de vuelco en hornitos",
    },
    climateEnvironment: {
      tempDayNight: "Clima subtropical árido con anomalías térmicas geotérmicas activas en subsuelo somero (hasta 600 °C a 13 m)",
      solarInsolation: "> 1,050 W/m²",
      atmosphericDensity: "1.18 kg/m³",
      windDesiccation: "Vientos alisios constantes del noreste",
    },
    availableResourcesIsru: {
      waterExtraction: "Muy baja en lavas superficiales; requiere reactores de reducción de óxidos de hierro",
      mineralsForConstruction: "Basalto de grano fino ideal para fundición de tuberías y losas de protección",
      thermalStorage: "Anomalía geotérmica somera para ensayos de generación termoeléctrica",
      resourceRating: "Media-Alta (Excelente análogo de lavas vírgenes de los mares lunares)",
    },
    futureLandingBaseSuitability: {
      landingSiteRationale: "Pruebas de descenso en superficies volcánicas rugosas con detección autónoma de obstáculos (hazard detection).",
      baseConstructionRationale: "Simulación de bases en mares basálticos lunares (Mare Tranquillitatis / Mare Serenitatis).",
      evaTestingRationale: "Ensayos de calibración de espectrómetros de reflectancia infrarroja en basaltos prístinos idénticos a los de Apolo.",
    },
    solidAnalogy: "Llanuras de inundación basáltica de los mares lunares y campos de lava de Marte (Cerberus Fossae).",
    whereAnalogyFails: {
      gravityLimit: "La fragmentación de lava 'aa' al paso del rover se acelera por 1g.",
      atmospherePressureLimit: "Presencia de atmósfera a 975 hPa.",
      radiationLimit: "Atenuación magnética terrestre.",
      biologicalLimit: "Mínima en malpaís vítreo, pero presencia de líquenes pioneros.",
      mitigationProtocol: "Calibrar algoritmos de clasificación espectral orbital contrastando datos in-situ con espectrómetros de laboratorio.",
    },
    nasaRoleSummary: "Banco de pruebas de la ESA para entrenamiento geológico de astronautas y calibración espectral orbital en basaltos.",
    verifiedDataset: "ESA PANGAEA Field Data · Sentinel-2 MSI · IGN España",
  },
};

export const allDetailedRegionsList: DetailedEarthRegionInfo[] = Object.values(detailedEarthRegions);
