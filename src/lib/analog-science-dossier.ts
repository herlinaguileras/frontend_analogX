export interface SpaceTargetProfile {
  targetId: string;
  targetName: string;
  body: "Moon" | "Mars";
  coordinates: string;
  image: string;
  imageTitle: string;
  imageSubtitle: string;
  geologySummary: string;
  mineralogy: string;
}

export interface GeologyComparisonItem {
  id: string;
  name: string;
  country: string;
  region: string;
  elevation: string;
  fidelityScore: number;
  missionTarget: "Moon" | "Mars" | "Both";
  
  // Categorías de filtro
  operationalRoles: string[]; // e.g. ["landing", "base", "isru", "caves", "mobility", "astrobiology"]
  physicalConditions: string[]; // e.g. ["regolith", "cryogenic", "hyperarid", "radiation", "sulfate"]
  environmentType: "altiplano" | "hyperarid" | "polar" | "volcanic";

  // Identificadores de imágenes terrestres
  earthImage: string;
  earthImageTitle: string;
  earthImageSubtitle: string;
  earthGeologySummary: string;
  earthMineralogy: string;

  // Perfiles de objetivo espacial separados estrictamente
  lunarProfile?: SpaceTargetProfile;
  martianProfile?: SpaceTargetProfile;

  // Campos retrocompatibles (para llamadas generales sin especificar cuerpo)
  spaceTargetId: string;
  spaceTargetName: string;
  spaceTargetBody: "Moon" | "Mars" | "Both";
  spaceTargetCoordinates: string;
  spaceImage: string;
  spaceImageTitle: string;
  spaceImageSubtitle: string;
  spaceGeologySummary: string;
  spaceMineralogy: string;

  // Análisis Científico Exhaustivo (Criterios NASA)
  executiveSummary: string;
  solidAnalogy: string[];
  analogyLimitations: string[];
  operationalValue: string[];

  // Métricas de comparación física
  metrics: {
    variable: string;
    earthValue: string;
    spaceValue: string;
    compatibility: "ALTA" | "MEDIA" | "PARCIAL" | "LÍMITE";
  }[];

  // Datasets Satelitales Verificados
  auditedDatasets: string[];
  officialCitations: string[];
}

export function getSpaceProfile(item: GeologyComparisonItem, body: "Moon" | "Mars"): SpaceTargetProfile | null {
  if (body === "Moon") {
    if (item.lunarProfile) return item.lunarProfile;
    if (item.missionTarget === "Moon") {
      return {
        targetId: item.spaceTargetId,
        targetName: item.spaceTargetName,
        body: "Moon",
        coordinates: item.spaceTargetCoordinates,
        image: item.spaceImage,
        imageTitle: item.spaceImageTitle,
        imageSubtitle: item.spaceImageSubtitle,
        geologySummary: item.spaceGeologySummary,
        mineralogy: item.spaceMineralogy,
      };
    }
    return null;
  }

  if (body === "Mars") {
    if (item.martianProfile) return item.martianProfile;
    if (item.missionTarget === "Mars") {
      return {
        targetId: item.spaceTargetId,
        targetName: item.spaceTargetName,
        body: "Mars",
        coordinates: item.spaceTargetCoordinates,
        image: item.spaceImage,
        imageTitle: item.spaceImageTitle,
        imageSubtitle: item.spaceImageSubtitle,
        geologySummary: item.spaceGeologySummary,
        mineralogy: item.spaceMineralogy,
      };
    }
    return null;
  }

  return null;
}

export const scienceDossierList: GeologyComparisonItem[] = [
  // 1. SALAR DE UYUNI (BOLIVIA) - DUAL (LUNA & MARTE)
  {
    id: "salar-de-uyuni",
    name: "Salar de Uyuni",
    country: "Bolivia",
    region: "Departamento de Potosí · Altiplano Central",
    elevation: "3,653 msnm",
    fidelityScore: 94,
    missionTarget: "Both",
    operationalRoles: ["landing", "mobility", "isru"],
    physicalConditions: ["regolith", "radiation", "sulfate"],
    environmentType: "altiplano",

    earthImage: "/images/geology/earth-uyuni.jpg",
    earthImageTitle: "Costra Hiperplana de Halita y Polígonos de Sal",
    earthImageSubtitle: "Salar de Uyuni · Altiplano Andino (Bolivia)",
    earthGeologySummary: "Llanura evaporítica masiva de 10,582 km² con un desnivel vertical menor a 1 m. Costra dura de halita (NaCl >98%) con redes poligonales de desecación de 1 a 3 m y salmueras enriquecidas en Li, K, B y Mg.",
    earthMineralogy: "Halita (NaCl), Yeso (CaSO4·2H2O), Ulexita, Cloruro de Litio y Sulfatos",

    lunarProfile: {
      targetId: "moon-mare-tranquillitatis",
      targetName: "Llanuras Basálticas de Mare Tranquillitatis",
      body: "Moon",
      coordinates: "0.67° N · 23.47° E (Base Tranquilidad Lunar)",
      image: "/images/geology/moon-tranquillitatis.jpg",
      imageTitle: "Llanura Basáltica y Regolito de Mare Tranquillitatis",
      imageSubtitle: "Sitio de Alunizaje Apollo 11 · Misión NASA LRO LOLA",
      geologySummary: "Llanura basáltica de impacto con rugosidad milimétrica de regolito cohesivo y pendiente inferior a 0.5°, análoga para calibración de radares Doppler y altímetros láser de módulos Artemis.",
      mineralogy: "Plagioclasa cálcica, Ilmenita (FeTiO3), Piroxenos y Vidrios piroclásticos lunares"
    },

    martianProfile: {
      targetId: "mars-terra-sirenum",
      targetName: "Paleocuencas de Sal de Terra Sirenum",
      body: "Mars",
      coordinates: "38.8° S · 139.0° O (Tierras Altas Noéjicas)",
      image: "/images/geology/mars-sirenum.jpg",
      imageTitle: "Costras Evaporíticas de Cloruro en Terra Sirenum",
      imageSubtitle: "Paleolagos Noéjicos · Mars Odyssey THEMIS / MRO CRISM",
      geologySummary: "Cuencas endorreicas cerradas con redes poligonales de desecación y depósitos masivos de sales de cloruro dejados tras la evaporación de lagos marcianos hace >3.5 Ga.",
      mineralogy: "Halita (NaCl), Sulfatos hidratados, Arcillas esmectitas y Basalto alterado"
    },

    spaceTargetId: "lunar-mare-tranquillitatis",
    spaceTargetName: "Mares Lunares (Tranquillitatis) / Paleocuencas Marcianas (Sirenum)",
    spaceTargetBody: "Moon",
    spaceTargetCoordinates: "0.67° N · 23.47° E",
    spaceImage: "/images/geology/moon-tranquillitatis.jpg",
    spaceImageTitle: "Llanura Basáltica de Mare Tranquillitatis",
    spaceImageSubtitle: "Base Tranquilidad Lunar · Apollo 11 / LRO",
    spaceGeologySummary: "Llanura basáltica de impacto con rugosidad milimétrica de regolito cohesivo.",
    spaceMineralogy: "Plagioclasa cálcica, Ilmenita (FeTiO3), Piroxenos",

    executiveSummary: "El Salar de Uyuni es el patrón altimétrico hiperplano más grande del planeta Tierra. Su superficie reflectante y homogénea es utilizada formalmente por misiones de la NASA (ICESat-2, Landsat) para calibrar altímetros láser y radares de descenso que utilizarán los módulos de aterrizaje tripulado Artemis HLS y Starship en la Luna y Marte.",
    solidAnalogy: [
      "Microtopografía hiperplana ideal para calibración de radares Doppler y altímetros Lidar de descenso espacial.",
      "Terradinámica de ruedas metálicas con grousers: reproduce la resistencia mecánica, adherencia y desgaste sobre costras secas minerales de alta fricción.",
      "Alta reflectancia de albedo (>0.70) para puesta a punto de algoritmos ópticos de navegación autónoma relativa al terreno (TRN)."
    ],
    analogyLimitations: [
      "Presión atmosférica terrestre de ~660 hPa en el Altiplano frente al ultra-alto vacío lunar (10⁻¹² hPa) o tenue atmósfera de CO2 en Marte (~6 hPa).",
      "Presencia de salmueras líquidas saturadas a escasa profundidad freática (0.5 - 2 m), inexistentes en la superficie lunar.",
      "Gravedad terrestre (1g) que genera mayor peso por eje en los rovers que el entorno lunar (0.166g) o marciano (0.38g)."
    ],
    operationalValue: [
      "Ensayos de precisión milimétrica para sensores de altimetría láser de los landers Artemis III de la NASA.",
      "Evaluación de desgaste por abrasión salina de bandas de rodadura y juntas rotativas de rovers de exploración lunar y marciana.",
      "Simulación de separación electroquímica de sales minerales para extracción in-situ de oxígeno y litio."
    ],
    metrics: [
      { variable: "Pendiente Topográfica", earthValue: "< 0.05° en 100 km", spaceValue: "0.2° a 1.5° en Mares", compatibility: "ALTA" },
      { variable: "Rugosidad Superficial", earthValue: "Polígonos de 5 a 15 cm", spaceValue: "Ondulaciones de regolito 3-10 cm", compatibility: "ALTA" },
      { variable: "Índice UV Solar", earthValue: "UV 14-16 (Extremo)", spaceValue: "UV sin filtro (Esterilizante)", compatibility: "MEDIA" },
      { variable: "Dureza de Sustrato", earthValue: "Costra de sal 15-45 MPa", spaceValue: "Regolito compactado 20-60 MPa", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA ICESat-2 (ATL03/ATL08)", "NASADEM_HGT.001", "ESA Sentinel-2 L2A", "Landsat 8/9 OLI C2L2", "LRO LOLA (NASA PDS)"],
    officialCitations: ["Borsa et al. (2008), Geophysical Journal International", "Cabrol et al. (2007), NASA Astrobiology Institute", "Risacher & Fritz (1991), Geochimica et Cosmochimica Acta"]
  },

  // 2. TUBOS DE LAVA Y CUEVAS DE LÍPEZ & LANZAROTE - DUAL (LUNA & MARTE)
  {
    id: "cuevas-volcanicas-lipez",
    name: "Tubos de Lava y Cuevas de Lípez & Lanzarote",
    country: "Bolivia / España",
    region: "Cordillera de Lípez (Bolivia) / Malpaís de La Corona (Lanzarote)",
    elevation: "4,450 msnm / 250 msnm",
    fidelityScore: 95,
    missionTarget: "Both",
    operationalRoles: ["base", "caves", "radiation", "landing"],
    physicalConditions: ["regolith", "radiation"],
    environmentType: "volcanic",

    earthImage: "/images/geology/earth-lanzarote.jpg",
    earthImageTitle: "Estructuras Subterráneas de Tubos de Lava Basálticos",
    earthImageSubtitle: "Conductos de Flujo Magmático y Claraboyas (Skylights)",
    earthGeologySummary: "Galerías volcánicas basálticas formadas por el drenaje de lava fluida subterránea. Techos de 5 a 20 m de espesor de basalto compacto con aberturas verticales de colapso y microclima interior totalmente aislado del exterior.",
    earthMineralogy: "Basalto alcalino, Olivino, Piroxenos augíticos y Costras silíceas secundarias",

    lunarProfile: {
      targetId: "moon-marius-hills",
      targetName: "Claraboya y Tubos de Lava de Marius Hills",
      body: "Moon",
      coordinates: "14.2° N · 303.3° E (Oceanus Procellarum)",
      image: "/images/geology/moon-marius-hills.jpg",
      imageTitle: "Fosa de Marius Hills vista por LROC NAC (NASA)",
      imageSubtitle: "Claraboya Lunar de 65 m hacia Cavidades Basálticas",
      geologySummary: "Fosa circular de colapso de 65 m de diámetro que conduce a conductos basálticos subterráneos masivos con >95% de blindaje natural contra radiación cósmica galáctica y tormentas solares.",
      mineralogy: "Basalto lunar rico en titanio, Anortosita, Olivino y Vidrio piroclástico"
    },

    martianProfile: {
      targetId: "mars-arsia-mons-caves",
      targetName: "Pozos de Colapso Volcánico de Arsia Mons",
      body: "Mars",
      coordinates: "8.4° S · 239.1° E (Complejo Volcánico de Tharsis)",
      image: "/images/geology/moon-marius-hills.jpg",
      imageTitle: "Pozos de Colapso en Flancos de Arsia Mons",
      imageSubtitle: "Cuevas Volcánicas Profundas · Mars Reconnaissance Orbiter (HiRISE)",
      geologySummary: "Aberturas volcánicas profundas de decenas de metros en el basalto marciano que ofrecen protección contra rayos cósmicos galácticos (GCR) y microclima térmicamente amortiguado.",
      mineralogy: "Basalto toleítico marciano, Hematita, Piroxenos y Costras silíceas"
    },

    spaceTargetId: "lunar-marius-hills",
    spaceTargetName: "Claraboya y Tubos de Lava de Marius Hills (Luna)",
    spaceTargetBody: "Moon",
    spaceTargetCoordinates: "14.2° N · 303.3° E (Oceanus Procellarum)",
    spaceImage: "/images/geology/moon-marius-hills.jpg",
    spaceImageTitle: "Fosa de Marius Hills vista por LROC NAC (NASA)",
    spaceImageSubtitle: "Claraboya Lunar de 65 m de Diámetro hacia Cavidades Basálticas",
    spaceGeologySummary: "Fosa circular de colapso de 65 m de diámetro que conduce a túneles basálticos masivos de decenas de kilómetros sin colapsar.",
    spaceMineralogy: "Basalto de mar lunar rico en titanio, Anortosita, Piromorfita y Vidrio piroclástico",

    executiveSummary: "Para la Base Lunar Permanente de Artemis y los hábitats en Marte, la radiación cósmica y las variaciones térmicas de 250 °C en superficie son letales. Los tubos de lava de Lípez y Lanzarote representan el modelo geológico exacto para diseñar hábitats subterráneos presurizados que protejan a los astronautas bajo decenas de metros de roca volcánica.",
    solidAnalogy: [
      "Atenuación natural del >95% de la radiación ionizante cósmica galáctica (GCR) y tormentas de partículas solares (SPE).",
      "Aislamiento térmico radical: temperatura interior constante y amortiguada frente a los extremos térmicos violentos de la superficie.",
      "Protección estructural total contra impactos de micrometeoritos y eyecciones hiperveloces."
    ],
    analogyLimitations: [
      "Dimensiones: debido a la gravedad lunar reducida (1/6g), los tubos lunares pueden superar los 500 metros de ancho, mucho más grandes que los tubos terrestres (5 a 30 m).",
      "Erosión eólica y atmosférica en la Tierra inexistente en la Luna, aunque el interior de las cuevas permanece prácticamente pristino.",
      "Presencia de humedad condensada terrestre vs vacío absoluto en conductos lunares."
    ],
    operationalValue: [
      "Calificación de vehículos autónomos exploradores de cuevas tipo rovers saltadores o drones de escaneo LiDAR 3D (ESA PANGAEA).",
      "Ensayos de despliegue de hábitats inflables presurizados dentro de tubos de lava (NASA Innovative Advanced Concepts).",
      "Instalación de repetidores de radioenlace y protocolos de comunicación sin visibilidad directa (NLOS) en entornos subterráneos."
    ],
    metrics: [
      { variable: "Blindaje Radiativo Estimado", earthValue: "> 99% bajo 10 m basalto", spaceValue: "> 95% atenuación GCR", compatibility: "ALTA" },
      { variable: "Estabilidad Térmica Interior", earthValue: "Constante ± 1.5 °C anual", spaceValue: "Constante -20 °C a 10 m prof.", compatibility: "ALTA" },
      { variable: "Resistencia Mecánica Techo", earthValue: "RQD > 80% (Basalto sano)", spaceValue: "Lavas de mar de alta densidad", compatibility: "ALTA" },
      { variable: "Amplitud de Bóveda", earthValue: "5 a 25 metros", spaceValue: "200 a 800 metros en la Luna", compatibility: "MEDIA" }
    ],
    auditedDatasets: ["NASA LROC Narrow Angle Camera (NAC)", "JAXA SELENE (Kaguya) Lunar Radar Sounder", "COP-DEM-GLO-30 (ESA)", "Instituto Geográfico Nacional de España (IGN)"],
    officialCitations: ["Sauro et al. (2020), Earth-Science Reviews", "Haruyama et al. (2009), Geophysical Research Letters", "Kaku et al. (2017), Geophysical Research Letters"]
  },

  // 3. SOL DE MAÑANA (BOLIVIA) - STRICTLY MARS
  {
    id: "sol-de-manana",
    name: "Sol de Mañana",
    country: "Bolivia",
    region: "Departamento de Potosí · Reserva Eduardo Avaroa",
    elevation: "4,850 msnm",
    fidelityScore: 92,
    missionTarget: "Mars",
    operationalRoles: ["astrobiology", "isru", "base"],
    physicalConditions: ["sulfate", "radiation", "cryogenic"],
    environmentType: "altiplano",

    earthImage: "/images/geology/earth-sol-manana.jpg",
    earthImageTitle: "Fumarolas Sulfatadas y Ollas de Barro Ácido Hirviente",
    earthImageSubtitle: "Campo Geotérmico Sol de Mañana (4,850 msnm)",
    earthGeologySummary: "Campo geotérmico activo de alta entalpía con emisiones de vapor a 150 °C, solfataras, geiseres de barro ácido rico en azufre elemental, ácido sulfúrico y depósitos de sílice amorfa opalina.",
    earthMineralogy: "Azufre nativo (S), Jarosita, Alunita, Hematita fina, Sílice amorfa opalina y Caolinita",

    martianProfile: {
      targetId: "mars-gusev-homeplate",
      targetName: "Depósitos Hidrotermales de Home Plate (Marte)",
      body: "Mars",
      coordinates: "14.6° S · 175.5° E (Cráter Gusev)",
      image: "/images/geology/mars-gusev.jpg",
      imageTitle: "Nódulos de Sílice Opalina y Fumarolas Ácidas en Gusev",
      imageSubtitle: "Descubrimiento del Rover Spirit (NASA) · Formación Home Plate",
      geologySummary: "Terreno hidrotermal fósil del Marte temprano descubierto por el rover Spirit. Depósitos ricos en sílice pura (>90% SiO2) generados por respiraderos volcánicos ácidos, considerado uno de los ambientes candidatos con mayor probabilidad de haber albergado o preservado vida microbiana marciana.",
      mineralogy: "Sílice amorfa opalina (>90% SiO2), Sulfatos de hierro (Jarosita), Hematita nodular y Piromorfita"
    },

    spaceTargetId: "mars-gusev-homeplate",
    spaceTargetName: "Estructuras Nodulares de Sílice de Home Plate (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "14.6° S · 175.5° E (Cráter Gusev)",
    spaceImage: "/images/geology/mars-gusev.jpg",
    spaceImageTitle: "Nódulos de Sílice Opalina descubiertos por el Rover Spirit",
    spaceImageSubtitle: "Formación Home Plate · Cráter Gusev (NASA Mars Exploration Rover)",
    spaceGeologySummary: "Terreno hidrotermal fósil del Marte temprano descubierto por el rover Spirit. Depósitos ricos en sílice pura (>90% SiO2) generados por respiraderos volcánicos ácidos.",
    spaceMineralogy: "Sílice amorfa opalina (>90% SiO2), Sulfatos de hierro (Jarosita), Hematita nodular",

    executiveSummary: "Sol de Mañana es el análogo hidrotermal ácido de alta cota más potente del mundo para estudiar las formaciones de sílice descubiertas por el rover Spirit en Home Plate (Cráter Gusev). Su altitud extrema (~4,850 msnm) reduce la presión de ebullición del agua a ~84 °C y multiplica la radiación UV esterilizante, recreando la física y geoquímica de los sistemas hidrotermales del periodo Hespérico marciano.",
    solidAnalogy: [
      "Química sulfato-ácida y precipitación de sílice opalina idéntica al registro instrumental de Mini-TES y APXS de Spirit en Marte.",
      "Condiciones hidrotermales extremas con microbios termófilos y acidófilos que sirven de modelo bio-arqueológico para misiones de retorno de muestras (Mars Sample Return).",
      "Presencia de sales hidratadas de sulfatos (jarosita/alunita) como indicadores de interacción agua-roca ácida en Marte."
    ],
    analogyLimitations: [
      "Presión atmosférica de 560 hPa: aunque es baja para la Tierra, sigue siendo dos órdenes de magnitud superior a los ~6 hPa de Marte.",
      "Actividad hidrotermal continua y viva hoy en Bolivia, frente a sistemas marcianos extintos hace más de 3,000 millones de años.",
      "Oxígeno gaseoso disuelto y libre en la atmósfera terrestre que favorece reacciones oxidantes secundarias ausentes en Marte."
    ],
    operationalValue: [
      "Calibración de espectrómetros Raman y sensores UV de bioseñales (PIXL/SHERLOC) en rovers marcianos.",
      "Pruebas de resistencia a la corrosión ácida severa para ruedas, sensores y carcasas de módulos de aterrizaje.",
      "Desarrollo de protocolos de no-contaminación biológica de retorno hacia la Tierra (Protección Planetaria COSPAR)."
    ],
    metrics: [
      { variable: "Contenido de Sílice (SiO2)", earthValue: "70 a 92% en costras", spaceValue: "> 90% en nódulos de Spirit", compatibility: "ALTA" },
      { variable: "pH de Soluciones Hidrotermales", earthValue: "pH 1.5 a 3.0 (Ácido)", spaceValue: "Estimado pH 2.0 a 4.0", compatibility: "ALTA" },
      { variable: "Presión de Operación", earthValue: "560 hPa (~5,000 m)", spaceValue: "6 a 9 hPa en superficie marciana", compatibility: "MEDIA" },
      { variable: "Temperatura de Fumarolas", earthValue: "95 °C a 160 °C", spaceValue: "Extinto (Paleotemperatura >120 °C)", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA MER Spirit Mini-TES / APXS Datasets", "NASA PDS Geosciences Node", "Copernicus Sentinel-2 L2A", "ASTER Global Emissivity Dataset (GED)"],
    officialCitations: ["Squyres et al. (2008), Science", "Cabrol et al. (2007), Journal of Geophysical Research", "Ruff et al. (2011), Nature Communications"]
  },

  // 4. CUMBRE CRIOGÉNICA LICANCABUR (BOLIVIA) - DUAL (LUNA & MARTE)
  {
    id: "cumbre-licancabur",
    name: "Cumbre Criogénica Licancabur y Lagunas de Alta Cota",
    country: "Bolivia",
    region: "Frontera Potosí (Bolivia) / Antofagasta (Chile)",
    elevation: "5,916 msnm",
    fidelityScore: 93,
    missionTarget: "Both",
    operationalRoles: ["astrobiology", "landing", "isru"],
    physicalConditions: ["cryogenic", "radiation", "hyperarid"],
    environmentType: "altiplano",

    earthImage: "/images/geology/earth-licancabur.jpg",
    earthImageTitle: "Laguna de Cráter Volcánico en la Cumbre (5,916 msnm)",
    earthImageSubtitle: "Volcán Licancabur · Reserva Eduardo Avaroa (Bolivia)",
    earthGeologySummary: "Estratovolcán cónico cuya cima alberga la laguna cratérica más alta del planeta (5,916 msnm). Presión atmosférica reducida a la mitad (~490 hPa), niveles récord de radiación UV (índice UV >20) y temperaturas nocturnas de hasta -30 °C con congelamiento superficial perenne.",
    earthMineralogy: "Andesita basáltica, Feldespatos plagioclasas, Azufre nativo, Sulfatos y Sales precipitadas",

    lunarProfile: {
      targetId: "moon-polar-ridge",
      targetName: "Crestas de Exposición Térmica y Radiación Polar",
      body: "Moon",
      coordinates: "89.2° S · 120.0° E (Macizo Malapert / Polo Sur)",
      image: "/images/geology/moon-malapert.jpg",
      imageTitle: "Crestas Polares de Radiación Solar Directa y Frío Extremo",
      imageSubtitle: "Picos de Luz Eterna (PEL) · Misión NASA LRO Diviner",
      geologySummary: "Puntos elevados sometidos a gradientes térmicos violentos y radiación cósmica directa sin filtro atmosférico, ideales para probar la degradación de polímeros y trajes espaciales Artemis.",
      mineralogy: "Anortosita cálcica pura, Vidrios de impacto y Regolito polar pulverizado"
    },

    martianProfile: {
      targetId: "mars-jezero-crater",
      targetName: "Lagos de Alta Cota y Sedimentos de Jezero",
      body: "Mars",
      coordinates: "18.38° N · 77.58° E (Cuenca de Jezero)",
      image: "/images/geology/mars-jezero.jpg",
      imageTitle: "Paleolago de Borde de Cráter y Sedimentos Carbonatados",
      imageSubtitle: "Sitio de Búsqueda de Bioseñales · Rover Perseverance",
      geologySummary: "Laguna de cráter sometida a radiación UV esterilizante (índice 16-19) y congelación nocturna extrema (-25 °C), simulando los lagos que existieron durante la transición húmedo-árida de Marte.",
      mineralogy: "Carbonatos de magnesio, Arcillas esmectitas, Sulfatos y Basalto"
    },

    spaceTargetId: "lunar-polar-ridge",
    spaceTargetName: "Crestas Polares Lunares / Paleolago del Cráter Jezero (Marte)",
    spaceTargetBody: "Both",
    spaceTargetCoordinates: "89.2° S · 120.0° E // 18.38° N · 77.58° E",
    spaceImage: "/images/geology/moon-malapert.jpg",
    spaceImageTitle: "Crestas Polares de Radiación Solar Directa",
    spaceImageSubtitle: "Macizo Malapert / Cráter Jezero · Misiones LRO & Mars 2020",
    spaceGeologySummary: "Cumbres expuestas a gradientes térmicos violentos y radiación cósmica sin filtro.",
    spaceMineralogy: "Anortosita cálcica pura, Carbonatos de magnesio, Arcillas y Sulfatos",

    executiveSummary: "La expedición de astrobiología liderada por la NASA (Dra. Nathalie Cabrol) categorizó al volcán Licancabur como el mejor análogo terrestre de los lagos que existieron en Marte hace 3,500 millones de años. Su atmósfera enrarecida (menos del 50% de la densidad a nivel del mar), irradiación UV récord mundial y ciclos de congelación/descongelación extremos lo convierten en el banco de pruebas definitivo para trajes de astronautas y supervivencia biológica.",
    solidAnalogy: [
      "Radiación UV ultravioleta extrema (UV index >20): el espectro de irradiancia biológicamente efectiva más cercano a la superficie marciana.",
      "Criopreservación en salmueras frías: el lago de cráter permanece cubierto de hielo gran parte del año, simulando lagos subglaciares o bolsas freáticas frías marcianas.",
      "Altísima rarefacción atmosférica que pone a prueba la estanqueidad y el intercambio térmico de trajes espaciales y sellos mecánicos."
    ],
    analogyLimitations: [
      "Gravedad terrestre (1g) completa frente a 0.38g marciana o 0.16g lunar.",
      "Presencia de bacterias extremófilas vivas y cianobacterias altamente adaptadas, mientras que en Marte aún no se ha confirmado vida activa.",
      "Composición atmosférica rica en N2/O2 en lugar de CO2 dominante marciano."
    ],
    operationalValue: [
      "Pruebas de esfuerzo metabólico y respiratorio de tripulaciones con trajes de presurización EVA a casi 6,000 msnm.",
      "Ensayos de calibración óptica de radiómetros y cámaras multiespectrales para evitar deslumbramientos por albedo de hielo bajo UV extremo.",
      "Técnicas de perforación de costras de hielo sobre lagunas sin perturbar el ecosistema acuático inferior."
    ],
    metrics: [
      { variable: "Irradiancia UV Solar Máxima", earthValue: "UV Index 20 a 24", spaceValue: "UV sin filtro de ozono", compatibility: "ALTA" },
      { variable: "Presión Atmosférica", earthValue: "490 hPa (Casi 50% de 1 atm)", spaceValue: "6 a 10 hPa en Marte", compatibility: "MEDIA" },
      { variable: "Ciclo Térmico Día / Noche", earthValue: "+15 °C día / -30 °C noche", spaceValue: "-10 °C día / -90 °C noche", compatibility: "ALTA" },
      { variable: "Salinidad de Agua", earthValue: "Ligeramente salobre (<5 g/L)", spaceValue: "Salmueras eutécticas percloradas", compatibility: "PARCIAL" }
    ],
    auditedDatasets: ["NASA Astrobiology Institute Licancabur Expedition Data", "LRO LOLA Digital Elevation Data", "ESA Sentinel-3 SLSTR Radiometer", "NASA PDS Planetary Atmosphere Node"],
    officialCitations: ["Cabrol et al. (2009), Astrobiology", "Escudero et al. (2007), International Journal of Astrobiology", "Farley et al. (2020), Space Science Reviews"]
  },

  // 5. DESIERTO DE ATACAMA (YUNGAY, CHILE) - STRICTLY MARS
  {
    id: "atacama-yungay",
    name: "Desierto de Atacama (Yungay)",
    country: "Chile",
    region: "Región de Antofagasta · Depresión Intermedia",
    elevation: "950 msnm",
    fidelityScore: 98,
    missionTarget: "Mars",
    operationalRoles: ["mobility", "astrobiology", "landing"],
    physicalConditions: ["hyperarid", "radiation", "regolith"],
    environmentType: "hyperarid",

    earthImage: "/images/geology/earth-atacama.jpg",
    earthImageTitle: "Suelos Hiperáridos Oxidantes con Percloratos",
    earthImageSubtitle: "Núcleo de Yungay · Desierto de Atacama (Chile)",
    earthGeologySummary: "La región más hiperárida del planeta Tierra con precipitaciones promedio menores a 1 mm por año durante décadas. Suelo químicamente oxidante con presencia natural de sales de perclorato (ClO4-), nitratos y ausencia casi total de materia orgánica a profundidades de más de 1 metro.",
    earthMineralogy: "Perclorato de sodio/magnesio, Yeso anhidro, Halita, Anhidrita y Polvo basáltico oxidado",

    martianProfile: {
      targetId: "mars-jezero-crater",
      targetName: "Delta Fluvio-Lacustre de Neretva Vallis (Cráter Jezero)",
      body: "Mars",
      coordinates: "18.38° N · 77.58° E (Cráter Jezero)",
      image: "/images/geology/mars-jezero.jpg",
      imageTitle: "Abanico Aluvial Deltaico del Cráter Jezero (NASA HiRISE)",
      imageSubtitle: "Misión Mars 2020 / Rover Perseverance (NASA)",
      geologySummary: "Delta fluvial fósil depositado en un paleolago hace 3,700 Ma con presencia de sales de perclorato y arcillas esmectitas idénticas al núcleo hiperárido de Yungay.",
      mineralogy: "Arcillas esmectitas ricas en Fe/Mg, Carbonatos, Percloratos (ClO4-) y Olivino"
    },

    spaceTargetId: "mars-jezero-crater",
    spaceTargetName: "Delta Fluvio-Lacustre y Suelos Oxidantes de Jezero (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "18.38° N · 77.58° E (Cráter Jezero)",
    spaceImage: "/images/geology/mars-jezero.jpg",
    spaceImageTitle: "Abanico Aluvial Deltaico del Cráter Jezero",
    spaceImageSubtitle: "Misión Mars 2020 / Rover Perseverance (NASA)",
    spaceGeologySummary: "Delta fluvial fósil depositado en un paleolago marciano hace 3,700 millones de años con presencia de sales de perclorato y arcillas esmectitas idénticas al núcleo hiperárido de Yungay.",
    spaceMineralogy: "Arcillas esmectitas ricas en Fe/Mg, Carbonatos, Percloratos (ClO4-) y Olivino",

    executiveSummary: "El sector de Yungay en el Desierto de Atacama es el estándar de oro (Gold Standard) mundial de la NASA para la química del suelo marciano. En 2003, la célebre investigación de Rafael Navarro-González demostró que los analizadores de las sondas Viking habrían dado falso negativo en Atacama por la degradación de materia orgánica provocada por percloratos y oxidantes.",
    solidAnalogy: [
      "Química oxidante de suelo idéntica a los hallazgos de las misiones Phoenix Lander y Curiosity de la NASA.",
      "Límite seco para la vida (dry limit of life): la actividad de agua (aw) desciende regularmente por debajo de 0.60, umbral metabólico celular conocido.",
      "Suelos estériles y polvorientos ideales para evaluar el desgaste por abrasión y la tracción de los rovers marcianos."
    ],
    analogyLimitations: [
      "Temperaturas cálidas diurnas (25 a 35 °C) muy superiores a las temperaturas polares y medias marcianas (-60 °C).",
      "Presión atmosférica normal a 1,000 msnm (~900 hPa).",
      "Entrada ocasional de niebla marina (camanchaca) en las zonas costeras periféricas."
    ],
    operationalValue: [
      "Calibración de instrumentos de cromatografía de gases y espectrometría de masas (SAM de Curiosity).",
      "Ensayos de campo ciegos para rovers autónomos de búsqueda de vida subterránea (NASA Sample Return Rover Tests).",
      "Pruebas de filtrado electrostático de polvo sobre paneles solares y radiadores térmicos."
    ],
    metrics: [
      { variable: "Humedad Relativa Diurna", earthValue: "< 5% regular", spaceValue: "< 1% (Ultraárido)", compatibility: "ALTA" },
      { variable: "Concentración de Percloratos", earthValue: "0.05 a 0.25% en peso", spaceValue: "0.5 a 1.0% (Phoenix Lander)", compatibility: "ALTA" },
      { variable: "Carbono Orgánico Total (TOC)", earthValue: "< 10 a 50 ppm", spaceValue: "< 50 ppm en regolito", compatibility: "ALTA" },
      { variable: "Temperatura Media", earthValue: "+20 °C", spaceValue: "-60 °C (Promedio global)", compatibility: "LÍMITE" }
    ],
    auditedDatasets: ["NASA Mars Perseverance PIXL/SHERLOC", "HiRISE MRO (NASA/JPL/Univ. Arizona)", "Landsat 8 OLI Band 7/5", "NASA Astrobiology Dry Limit Data"],
    officialCitations: ["Navarro-González et al. (2003), Science", "Farley et al. (2020), Space Science Reviews", "Ewing et al. (2006), Geochimica et Cosmochimica Acta"]
  },

  // 6. VALLES SECOS DE MCMURDO (ANTÁRTIDA) - DUAL (LUNA & MARTE)
  {
    id: "mcmurdo-dry-valleys",
    name: "Valles Secos de McMurdo (Beacon Valley)",
    country: "Antártida",
    region: "Tierra Victoria · Antártida Oriental",
    elevation: "1,200 msnm",
    fidelityScore: 96,
    missionTarget: "Both",
    operationalRoles: ["isru", "base", "cryogenic"],
    physicalConditions: ["cryogenic", "hyperarid", "regolith"],
    environmentType: "polar",

    earthImage: "/images/geology/earth-mcmurdo.jpg",
    earthImageTitle: "Suelos Poligonales de Permafrost Criogénico sin Nieve",
    earthImageSubtitle: "Beacon Valley · Valles Secos de McMurdo (Antártida)",
    earthGeologySummary: "Desierto frío hiperárido libre de nieve. Suelos poligonales formados por cuñas de hielo fósil subsuperficial de más de 8 millones de años bajo una capa de 20-50 cm de escombros rocosos secos.",
    earthMineralogy: "Hielo de agua masivo sublaminar, Arenisca cuarcítica Beacon, Halita y Sulfatos",

    lunarProfile: {
      targetId: "moon-shackleton-psr",
      targetName: "Trampas Criogénicas del Cráter Shackleton",
      body: "Moon",
      coordinates: "89.9° S · 0.0° E (Polo Sur Lunar)",
      image: "/images/geology/moon-shackleton.jpg",
      imageTitle: "Trampas Criogénicas en Sombra Permanente (PSR)",
      imageSubtitle: "Cráter Shackleton · Programa Artemis / LRO Diviner & LAMP",
      geologySummary: "Depósitos masivos de hielo de agua atrapados en sombra permanente (PSR a 40 K) protegidos del vacío solar por capas de regolito seco polar, análogo termodinámico directo para minería espacial de hielo (ISRU).",
      mineralogy: "Hielo de agua masivo (H2O), Volátiles atrapados (CO, NH3), Anortosita polar y Regolito criogénico"
    },

    martianProfile: {
      targetId: "mars-arcadia-ice",
      targetName: "Manto Glaciar Enterrado de Arcadia Planitia",
      body: "Mars",
      coordinates: "39.2° N · 171.0° E (Llanuras Boreales de Arcadia)",
      image: "/images/geology/mars-sirenum.jpg",
      imageTitle: "Capas de Hielo Glaciar Subsuperficial en Arcadia Planitia",
      imageSubtitle: "Latitudes Medias Marcianas · Radar Subsuperficial MRO SHARAD",
      geologySummary: "Láminas masivas de hielo fósil de alta pureza conservadas a 20-50 cm bajo regolito seco y gravas de impacto, idénticas a las redes de hielo fósil de Beacon Valley.",
      mineralogy: "Hielo de agua masivo (H2O), Regolito basáltico fragmentario, Arcillas y Sulfatos"
    },

    spaceTargetId: "lunar-shackleton-psr",
    spaceTargetName: "Trampas Criogénicas de Shackleton (Luna) / Glaciares de Arcadia (Marte)",
    spaceTargetBody: "Both",
    spaceTargetCoordinates: "89.9° S · 0.0° E",
    spaceImage: "/images/geology/moon-shackleton.jpg",
    spaceImageTitle: "Trampas Criogénicas en Shackleton",
    spaceImageSubtitle: "Polo Sur Lunar · LRO Diviner",
    spaceGeologySummary: "Depósitos masivos de hielo de agua protegidos del vacío solar por capas de regolito seco superficial.",
    spaceMineralogy: "Hielo de agua (H2O), Regolito polar y Minerales hidratados",

    executiveSummary: "Los Valles Secos de McMurdo son el análogo morfológico y termodinámico más preciso de la Tierra para la extracción de hielo de agua (ISRU) en los polos lunares y en las llanuras glaciares enterradas de Marte. Su permafrost fósil protegido por regolito seco simula con fidelidad del 96% las operaciones mineras espaciales.",
    solidAnalogy: [
      "Modelo termodinámico de conservación de hielo bajo escombros secos que previene la sublimación directa al espacio.",
      "Redes poligonales de contracción térmica idénticas a las fotografiadas por HiRISE en latitudes medias y altas de Marte.",
      "Temperaturas invernales extremas (-50 °C a -60 °C) y vientos catabáticos severos que desafían la mecánica de perforación."
    ],
    analogyLimitations: [
      "Presencia de presión atmosférica normal que eleva el punto de sublimación respecto al vacío lunar.",
      "Presencia de microorganismos endolíticos que habitan el interior de las rocas porosas."
    ],
    operationalValue: [
      "Desarrollo de cabezales de perforación térmica y mecánica para minería de hielo espacial (Artemis Volatiles Extraction).",
      "Validación de radares de penetración de suelo (GPR) para estimar la profundidad de la tabla de hielo antes del aterrizaje.",
      "Simulación de generación in-situ de combustible criogénico (LOX/metano o hidrógeno)."
    ],
    metrics: [
      { variable: "Estabilidad de Hielo Subterráneo", earthValue: "Conservado >8 Ma a 20 cm prof.", spaceValue: "Hielo masivo a 30-100 cm prof.", compatibility: "ALTA" },
      { variable: "Geometría Poligonal de Suelo", earthValue: "Polígonos de 10 a 25 m diámetro", spaceValue: "Polígonos de 15 a 30 m en Marte", compatibility: "ALTA" },
      { variable: "Humedad Absoluta de Aire", earthValue: "< 0.01 g/m³ (Aire ultraseco)", spaceValue: "Trazas de vapor en Marte", compatibility: "ALTA" },
      { variable: "Energía Requerida Extracción", earthValue: "334 kJ/kg fusión hielo", spaceValue: "2.8 MJ/kg sublimación en vacío", compatibility: "MEDIA" }
    ],
    auditedDatasets: ["NASA LRO LAMP / Diviner Thermal Data", "MRO SHARAD Subsurface Radar", "USGS Antarctic Geographic Survey", "Landsat 8 Band 8 Panchromatic"],
    officialCitations: ["Marchant & Head (2007), Icarus", "Heldmann et al. (2014), Astrobiology", "Dickson et al. (2008), Geology"]
  },

  // 7. CRÁTER HAUGHTON (ISLA DEVON, CANADÁ) - DUAL (LUNA & MARTE)
  {
    id: "haughton-crater",
    name: "Cráter Haughton (Isla Devon)",
    country: "Canadá",
    region: "Archipiélago Ártico · Nunavut",
    elevation: "300 msnm",
    fidelityScore: 89,
    missionTarget: "Both",
    operationalRoles: ["landing", "mobility", "base"],
    physicalConditions: ["regolith", "cryogenic"],
    environmentType: "polar",

    earthImage: "/images/geology/earth-haughton.jpg",
    earthImageTitle: "Brechas de Choque y Morfología de Impacto en Clima Polar",
    earthImageSubtitle: "Cráter Haughton · Isla Devon (Ártico Canadiense)",
    earthGeologySummary: "Estructura de impacto compleja de 23 km de diámetro formada hace 39 millones de años en dolomías y calizas bajo un régimen desértico polar frío y estéril.",
    earthMineralogy: "Brechas hidrotermales de impacto, Shatter cones, Dolomita pulverizada y Regolito de grano fino",

    lunarProfile: {
      targetId: "moon-shackleton-rim",
      targetName: "Bordes y Macizos de Impacto de Shackleton",
      body: "Moon",
      coordinates: "89.5° S · 0.0° E (Borde de Shackleton / Macizo Malapert)",
      image: "/images/geology/moon-shackleton.jpg",
      imageTitle: "Crestas de Impacto y Brechas de Choque Polares",
      imageSubtitle: "Zona de Aterrizaje Artemis III · LRO LOLA Altimetry",
      geologySummary: "Estructuras de impacto complejas con conos de choque, mantos de eyección pulverizada y pendientes rocosas severas que desafían la tracción de los rovers y la movilidad EVA de los astronautas.",
      mineralogy: "Brechas de impacto, Anortosita fragmentada, Vidrio de choque y Regolito polar"
    },

    martianProfile: {
      targetId: "mars-gale-crater",
      targetName: "Estratigrafía de Impacto del Cráter Gale",
      body: "Mars",
      coordinates: "5.4° S · 137.8° E (Monte Sharp)",
      image: "/images/geology/mars-gale.jpg",
      imageTitle: "Estratigrafía del Monte Sharp y Cráter Gale",
      imageSubtitle: "Cráter de Impacto de 154 km · Misión Rover Curiosity (NASA)",
      geologySummary: "Cuenca de impacto profunda con anillo de eyección, monte central estratificado y lechos de brechas sedimentarias depositadas tras el impacto catastrófico.",
      mineralogy: "Arcillas esmectitas, Sulfatos de magnesio, Vidrio de impacto, Piroxenos y Magnetita"
    },

    spaceTargetId: "mars-gale-crater",
    spaceTargetName: "Cráteres de Impacto Complejos (Gale en Marte / Shackleton en Luna)",
    spaceTargetBody: "Both",
    spaceTargetCoordinates: "5.4° S · 137.8° E // 89.9° S · 0.0° E",
    spaceImage: "/images/geology/mars-gale.jpg",
    spaceImageTitle: "Estratigrafía del Monte Sharp y Cráter Gale",
    spaceImageSubtitle: "Cráter de Impacto de 154 km · Misión Rover Curiosity (NASA)",
    spaceGeologySummary: "Cuenca de impacto profunda con anillo de eyección y monte central estratificado.",
    spaceMineralogy: "Arcillas, Sulfatos de magnesio, Vidrio de impacto, Piroxenos y Magnetita",

    executiveSummary: "El Cráter Haughton en la Isla Devon es la sede de la estación de investigación análoga Haughton-Mars Project (HMP) de la NASA. Durante casi tres décadas ha servido para simular la vida en una base lunar/marciana, ensayos de rovers presurizados y entrenamiento de caminatas espaciales en terreno escarpado por impactos.",
    solidAnalogy: [
      "Conos de fractura (shatter cones) y fundidos por choque hiperveloz idénticos a los del regolito lunar.",
      "Valles en artesa secos y colinas de eyección que recrean las rutas de navegación de los rovers Curiosity y Perseverance.",
      "Aislamiento geográfico y logístico extremo que somete a prueba la autonomía de las tripulaciones."
    ],
    analogyLimitations: [
      "Degradación hídrica estival por deshielo de capas superficiales de permafrost.",
      "Vegetación ártica pionera presente en las zonas bajas del cráter."
    ],
    operationalValue: [
      "Pruebas de habitabilidad en módulos cilíndricos análogos tipo Mars Society Flashline Station.",
      "Optimización de rutas de exploración robótica y EVA humana considerando la pendiente de las paredes del cráter."
    ],
    metrics: [
      { variable: "Morfología de Brechas", earthValue: "Brechas polimícticas 23 km", spaceValue: "Manto de eyección crateriano", compatibility: "ALTA" },
      { variable: "Resistencia de Paredes de Cráter", earthValue: "Pendientes 18° a 35°", spaceValue: "Paredes de Shackleton 25°-32°", compatibility: "ALTA" },
      { variable: "Cobertura de Suelo por Regolito", earthValue: "Capa fina 0.5 - 2 m", spaceValue: "Regolito lunar 3 a 15 m prof.", compatibility: "MEDIA" },
      { variable: "Severidad Térmica Polar", earthValue: "-40 °C invierno", spaceValue: "-130 °C a -240 °C (PSR)", compatibility: "PARCIAL" }
    ],
    auditedDatasets: ["NASA Haughton-Mars Project Archives", "NASA LRO LOLA DEM Polar", "Copernicus DEM GLO-30", "Radarsat-1 SAR Polar Imagery"],
    officialCitations: ["Lee & Osinski (2005), Meteoritics & Planetary Science", "Cockell et al. (2001), Astrobiology", "Tornabene et al. (2006), Journal of Geophysical Research"]
  },

  // 8. SALAR DE COIPASA (BOLIVIA) - STRICTLY MARS
  {
    id: "salar-coipasa",
    name: "Salar de Coipasa",
    country: "Bolivia",
    region: "Departamento de Oruro · Altiplano Central",
    elevation: "3,657 msnm",
    fidelityScore: 91,
    missionTarget: "Mars",
    operationalRoles: ["landing", "mobility", "isru"],
    physicalConditions: ["regolith", "sulfate", "radiation"],
    environmentType: "altiplano",

    earthImage: "/images/geology/earth-uyuni.jpg",
    earthImageTitle: "Cuenca Evaporítica Terminal y Salmueras Intersticiales",
    earthImageSubtitle: "Salar de Coipasa · Cuenca Endorreica del Altiplano",
    earthGeologySummary: "Segunda cuenca salina más extensa de Bolivia (2,218 km²). Posee una costra evaporítica delgada con zonas de salmuera superficial y presencia significativa de sales sulfatadas y magnesianas.",
    earthMineralogy: "Halita (NaCl), Sulfato de magnesio, Sulfato de potasio, Arcillas limosas y Yeso",

    martianProfile: {
      targetId: "mars-terra-sirenum",
      targetName: "Cuencas de Evaporitas Cloruradas de Terra Sirenum",
      body: "Mars",
      coordinates: "38.5° S · 140.2° O (Terra Sirenum)",
      image: "/images/geology/mars-sirenum.jpg",
      imageTitle: "Lagunas Hipersalinas Terminales Noéjicas",
      imageSubtitle: "Depósitos Evaporíticos Residuales · Mars Odyssey THEMIS",
      geologySummary: "Cuenca evaporítica secundaria con salmueras de alta densidad y costras delgadas sobre lodos salinos, análogo de paleolagos en fase de desecación terminal.",
      mineralogy: "Halita, Sulfato de magnesio, Bórax y Arcillas salinas"
    },

    spaceTargetId: "mars-terra-sirenum",
    spaceTargetName: "Cuencas de Evaporitas Cloruradas de Terra Sirenum (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "38.5° S · 140.2° O",
    spaceImage: "/images/geology/mars-sirenum.jpg",
    spaceImageTitle: "Lagunas Hipersalinas Terminales Noéjicas",
    spaceImageSubtitle: "Mars Odyssey THEMIS / MRO CRISM",
    spaceGeologySummary: "Cuenca evaporítica secundaria con salmueras de alta densidad y costras delgadas sobre lodos salinos.",
    spaceMineralogy: "Halita, Sulfato de magnesio, Bórax y Arcillas salinas",

    executiveSummary: "El Salar de Coipasa complementa a Uyuni al representar la etapa senescente de un lago salino. Sus salmueras saturadas residuales y costras salinas friables simulan el comportamiento de las salmueras percloradas marcianas que permanecen líquidas a temperaturas bajo cero mediante depresión del punto de congelación.",
    solidAnalogy: [
      "Depresión del punto de congelación por sales concentradas: salmueras que no se congelan a -15 °C.",
      "Terradinámica de costras blandas sobre lodos saturados: evaluación de riesgo de colapso y atrapamiento de ruedas.",
      "Gradiente de precipitación evaporítica de sales cloruradas a sulfatos."
    ],
    analogyLimitations: [
      "Presencia de agua líquida libre estacional con mayor actividad hídrica que en Marte actual.",
      "Atmósfera oxidante con 660 hPa de presión."
    ],
    operationalValue: [
      "Ensayos de movilidad de rovers en terrenos de baja capacidad portante.",
      "Desarrollo de sensores electroquímicos para detección in-situ de salmueras líquidas."
    ],
    metrics: [
      { variable: "Resistencia Portante de Costra", earthValue: "50 a 180 kPa (Blando)", spaceValue: "80 a 250 kPa en llanuras salinas", compatibility: "ALTA" },
      { variable: "Temperatura de Congelación Salmuera", earthValue: "-12 °C a -18 °C", spaceValue: "-20 °C a -50 °C (Eutéctico)", compatibility: "ALTA" },
      { variable: "Concentración de Cloruros", earthValue: "> 250 g/L en salmuera", spaceValue: "Saturación completa", compatibility: "ALTA" }
    ],
    auditedDatasets: ["ESA Sentinel-2 L2A", "NASA Landsat 8 OLI", "USGS EROS Altiplano Catalog"],
    officialCitations: ["Risacher & Fritz (1991), Geochimica et Cosmochimica Acta", "Borselli et al. (2012), Catena"]
  },

  // 9. LAGUNA COLORADA (BOLIVIA) - STRICTLY MARS
  {
    id: "laguna-colorada",
    name: "Laguna Colorada y Borateras",
    country: "Bolivia",
    region: "Departamento de Potosí · Reserva Eduardo Avaroa",
    elevation: "4,278 msnm",
    fidelityScore: 90,
    missionTarget: "Mars",
    operationalRoles: ["astrobiology", "isru", "landing"],
    physicalConditions: ["sulfate", "radiation", "hyperarid"],
    environmentType: "altiplano",

    earthImage: "/images/geology/earth-sol-manana.jpg",
    earthImageTitle: "Sedimentos de Bórax e Islas de Evaporitas en Salmuera Roja",
    earthImageSubtitle: "Laguna Colorada · 4,278 msnm (Bolivia)",
    earthGeologySummary: "Cuenca lacustre somera hipersalina rica en minerales de boro (ulexita, bórax) y tapetes microbianos pigmentados de color rojo por carotenoides de protección UV extrema.",
    earthMineralogy: "Ulexita (NaCaB5O6(OH)6·5H2O), Halita, Bórax, Yeso y Pigmentos carotenoides",

    martianProfile: {
      targetId: "mars-gusev-sediments",
      targetName: "Cuencas Lacustres Ricas en Boratos y Sulfatos",
      body: "Mars",
      coordinates: "14.5° S · 175.4° E (Cráter Gusev)",
      image: "/images/geology/mars-gusev.jpg",
      imageTitle: "Sedimentos de Salmuera y Carotenoides Protegidos",
      imageSubtitle: "Paleocuencas Acuosas Ácidas · Mars Exploration Rover",
      geologySummary: "Salmuera alcalina hipersalina con tapetes microbianos adaptados a radiación UV extrema (UV 15-18), análogo de los últimos refugios acuosos marcianos.",
      mineralogy: "Ulexita, Halita, Bórax, Yeso y Pigmentos carotenoides"
    },

    spaceTargetId: "mars-gusev-sediments",
    spaceTargetName: "Cuencas Ricas en Boratos del Cráter Gusev (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "14.5° S · 175.4° E",
    spaceImage: "/images/geology/mars-gusev.jpg",
    spaceImageTitle: "Sedimentos de Salmuera en Gusev",
    spaceImageSubtitle: "Rover Spirit (NASA)",
    spaceGeologySummary: "Salmueras ricas en boro y sulfatos análogas a los últimos refugios acuosos marcianos.",
    spaceMineralogy: "Ulexita, Halita, Bórax, Yeso",

    executiveSummary: "El descubrimiento de boratos en el Cráter Gale por el rover Curiosity (2017) confirmó que los minerales de boro jugaron un papel crucial en la estabilización de ribosa para el origen de la vida en Marte. Laguna Colorada es uno de los depósitos de ulexita y bórax más ricos de la Tierra bajo radiación UV límite.",
    solidAnalogy: [
      "Presencia masiva de minerales de boro (ulexita) análoga a las vetas de boratos descubiertas por ChemCam en Gale.",
      "Pigmentación por carotenoides como mecanismo biológico de fotoprotección contra la radiación UV espacial.",
      "Ambiente de salmuera alcalina evaporítica fría."
    ],
    analogyLimitations: [
      "Abundante biota activa (flamencos andinos y microalgas) que no existe en Marte.",
      "Mayor régimen de viento y aporte orgánico moderno."
    ],
    operationalValue: [
      "Calibración de espectrómetros láser LIBS (ChemCam / SuperCam) para detección cuantitativa de boro y litio.",
      "Simulación de extracción de agua de cristalización en minerales boratados (ISRU)."
    ],
    metrics: [
      { variable: "Concentración de Boro (B)", earthValue: "> 1,200 ppm en sedimentos", spaceValue: "Detector ChemCam > 500 ppm", compatibility: "ALTA" },
      { variable: "Índice UV Biológico", earthValue: "UV Index 16 a 18", spaceValue: "UV solar sin atenuación", compatibility: "ALTA" },
      { variable: "pH de Cuenca", earthValue: "8.5 a 9.2 (Alcalino)", spaceValue: "7.0 a 8.5 en Gale tardío", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA Curiosity ChemCam Spectrometer Data", "ESA Sentinel-2 MSI", "Landsat 8 OLI"],
    officialCitations: ["Gasda et al. (2017), Geophysical Research Letters", "Cabrol et al. (2009), Astrobiology"]
  },

  // 10. ARENALES Y DUNAS DE UYUNI (BOLIVIA) - STRICTLY MARS
  {
    id: "arenales-uyuni",
    name: "Dunas y Arenales de Uyuni / Pampa Colorada",
    country: "Bolivia",
    region: "Departamento de Potosí · Borde Oriental del Salar",
    elevation: "3,720 msnm",
    fidelityScore: 88,
    missionTarget: "Mars",
    operationalRoles: ["mobility", "landing"],
    physicalConditions: ["regolith", "radiation", "hyperarid"],
    environmentType: "altiplano",

    earthImage: "/images/geology/earth-uyuni.jpg",
    earthImageTitle: "Campos de Dunas Eólicas y Manto de Arena Fina",
    earthImageSubtitle: "Pampa Colorada · Altiplano Andino (Bolivia)",
    earthGeologySummary: "Campos de arena volcánica y silícea eólica activa que rodean los bordes del salar. Suelos granulares sueltos con baja cohesión sometidos a fuertes vientos estacionales (>80 km/h).",
    earthMineralogy: "Arenas silíceas eólicas, Polvo volcánico andino, Fragmentos de feldespato y Sales dispersas",

    martianProfile: {
      targetId: "mars-bagnold-dunes",
      targetName: "Campos de Dunas Activas de Bagnold (Cráter Gale)",
      body: "Mars",
      coordinates: "4.7° S · 137.4° E (Cráter Gale)",
      image: "/images/geology/mars-gale.jpg",
      imageTitle: "Dunas Eólicas Oscuras de Bagnold en Gale",
      imageSubtitle: "Arenales Basálticos Móviles · Rover Curiosity (NASA)",
      geologySummary: "Dunas y mantos de arena eólica fina sometidos a saltación bajo vientos intensos, análogo de riesgo crítico de hundimiento y deslizamiento para rovers espaciales.",
      mineralogy: "Arenas silíceas eólicas, Polvo volcánico, Feldespatos y Magnetita"
    },

    spaceTargetId: "mars-bagnold-dunes",
    spaceTargetName: "Campos de Dunas de Bagnold en Gale (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "4.7° S · 137.4° E",
    spaceImage: "/images/geology/mars-gale.jpg",
    spaceImageTitle: "Dunas de Bagnold en Cráter Gale",
    spaceImageSubtitle: "Rover Curiosity (NASA)",
    spaceGeologySummary: "Dunas eólicas activas con alto riesgo de deslizamiento y atollamiento de ruedas.",
    spaceMineralogy: "Arenas basálticas, Feldespatos, Magnetita",

    executiveSummary: "El incidente del rover Spirit en 'Troy' (donde quedó atrapado en arena suelta) demostró que las dunas y arenas eólicas son el mayor peligro de movilidad en Marte. Los arenales de Uyuni permiten ensayar algoritmos anti-deslizamiento y tracción de ruedas grousers en pendientes granulares sueltas.",
    solidAnalogy: [
      "Distribución granulométrica de arena fina a media muy similar al regolito eólico marciano.",
      "Riesgo de hundimiento (sinkage) y cizalladura de grano bajo ruedas rígidas.",
      "Transporte eólico por saltación bajo aire de baja densidad."
    ],
    analogyLimitations: [
      "Gravedad 1g genera mayor compactación que en Marte (0.38g).",
      "Arenas de composición más rica en cuarzo que las arenas basálticas oscuras marcianas."
    ],
    operationalValue: [
      "Pruebas de control de deslizamiento (traction control) y recuperación de atascos en pendientes arenosas.",
      "Evaluación del desgaste abrasivo por impacto de granos de arena eólicos en cámaras y lentes."
    ],
    metrics: [
      { variable: "Ángulo de Reposo de Arena", earthValue: "32° a 34°", spaceValue: "33° a 35° (Dunas marcianas)", compatibility: "ALTA" },
      { variable: "Diámetro de Grano Medio", earthValue: "150 a 300 µm", spaceValue: "100 a 250 µm", compatibility: "ALTA" },
      { variable: "Hundimiento de Rueda (Sinkage)", earthValue: "3 a 8 cm en arena suelta", spaceValue: "4 a 12 cm en dunas de Gale", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA Curiosity Mars Hand Lens Imager (MAHLI)", "NASA MRO HiRISE Dune Tracking", "Copernicus Sentinel-2"],
    officialCitations: ["Bridges et al. (2012), Geology", "Arvidson et al. (2011), Journal of Field Robotics"]
  },

  // 11. VOLCÁN OLLAGÜE (BOLIVIA) - STRICTLY MARS
  {
    id: "volcan-ollague",
    name: "Volcán Ollagüe y Azufreras de Altitud",
    country: "Bolivia",
    region: "Frontera Potosí (Bolivia) / Antofagasta (Chile)",
    elevation: "5,868 msnm",
    fidelityScore: 89,
    missionTarget: "Mars",
    operationalRoles: ["base", "astrobiology", "isru"],
    physicalConditions: ["sulfate", "cryogenic", "radiation"],
    environmentType: "volcanic",

    earthImage: "/images/geology/earth-sol-manana.jpg",
    earthImageTitle: "Fumarolas de Cumbre y Solfataras de Azufre Masivo",
    earthImageSubtitle: "Volcán Ollagüe · 5,868 msnm (Bolivia/Chile)",
    earthGeologySummary: "Estratovolcán andesítico activo con fumarolas de cumbre que emiten vapores sulfurosos continuos a más de 5,800 msnm. Depósitos masivos de azufre nativo y alteración hidrotermal extrema.",
    earthMineralogy: "Azufre nativo elemental (S8), Yeso, Anhidrita, Jarosita y Andesita silicificada",

    martianProfile: {
      targetId: "mars-olympus-mons-slopes",
      targetName: "Flancos y Fumarolas de Montes Volcánicos Marcianos",
      body: "Mars",
      coordinates: "18.65° N · 226.2° E (Olympus Mons)",
      image: "/images/geology/mars-sirenum.jpg",
      imageTitle: "Estructuras Volcánicas y Depósitos de Azufre",
      imageSubtitle: "Estratovolcanes Planetarios · NASA MRO",
      geologySummary: "Estratovolcán activo con depósitos de azufre andesíticos y desgasificación fumarólica a más de 5,800 msnm, análogo para resistencia de sensores a gases corrosivos y baja presión.",
      mineralogy: "Azufre nativo, Andesita, Dióxido de azufre, Jarosita"
    },

    spaceTargetId: "mars-olympus-mons-slopes",
    spaceTargetName: "Flancos Volcánicos de Olympus Mons (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "18.65° N · 226.2° E",
    spaceImage: "/images/geology/mars-sirenum.jpg",
    spaceImageTitle: "Flancos Volcánicos en Marte",
    spaceImageSubtitle: "Misión NASA MRO",
    spaceGeologySummary: "Depósitos volcánicos sulfatados en laderas de gran altitud marcianas.",
    spaceMineralogy: "Azufre nativo, Andesita basáltica, Jarosita",

    executiveSummary: "El Volcán Ollagüe combina altitud extrema (>5,800 msnm, ~490 hPa de presión), frío andino (-25 °C) y exhalaciones sulfurosas permanentes. Es un banco de pruebas severo para ensayar la resistencia química de los sellos de hábitats y la espectrometría de volátiles en rovers.",
    solidAnalogy: [
      "Sublimación y deposición de azufre nativo a baja presión atmosférica.",
      "Suelos enriquecidos en sulfatos similares a los detectados en los volcanes de Tharsis y Elysium.",
      "Ambiente de frío glacial combinado con calor geotérmico puntual."
    ],
    analogyLimitations: [
      "Volcanismo andesítico terrestre vs basaltos toleíticos dominantes en Marte.",
      "Presencia de humedad atmosférica y oxígeno."
    ],
    operationalValue: [
      "Pruebas de corrosión de materiales en ambientes con gases de azufre y radiación UV.",
      "Validación de sensores de gases volcánicos para exploración de desgasificación activa marciana."
    ],
    metrics: [
      { variable: "Pureza de Azufre en Fumarolas", earthValue: "> 95% S elemental", spaceValue: "Depósitos sulfatados enriquecidos", compatibility: "ALTA" },
      { variable: "Temperatura de Emisión", earthValue: "90 °C a 125 °C", spaceValue: "Paleoactividad volcánica", compatibility: "ALTA" },
      { variable: "Presión en Cumbre", earthValue: "490 hPa", spaceValue: "6 hPa en Marte", compatibility: "MEDIA" }
    ],
    auditedDatasets: ["NASA ASTER Thermal Infrared Data", "USGS Volcanic Hazards Program", "Copernicus Sentinel-5P TROPOMI"],
    officialCitations: ["Feeley & Davidson (1994), Journal of Petrology", "Cabrol et al. (2007), JGR Biogeosciences"]
  },

  // 12. CORDILLERA DE LA SAL (ATACAMA, CHILE) - STRICTLY MARS
  {
    id: "cordillera-sal-atacama",
    name: "Cordillera de la Sal (Valle de la Luna, Atacama)",
    country: "Chile",
    region: "Región de Antofagasta · Desierto de Atacama",
    elevation: "2,500 msnm",
    fidelityScore: 94,
    missionTarget: "Mars",
    operationalRoles: ["mobility", "caves", "landing"],
    physicalConditions: ["hyperarid", "sulfate", "regolith"],
    environmentType: "hyperarid",

    earthImage: "/images/geology/earth-atacama.jpg",
    earthImageTitle: "Estratigrafía Plegada de Sal, Yeso y Arcillas",
    earthImageSubtitle: "Valle de la Luna · San Pedro de Atacama (Chile)",
    earthGeologySummary: "Estructura tectónica sedimentaria hiperárida compuesta por capas plegadas de halita masiva, yeso y arcillas eólicas. Cañones profundos, cavernas kársticas de sal y ausencia total de humedad superficial.",
    earthMineralogy: "Halita pura, Yeso fibroso, Anhidrita, Arcillas rojas y Cloruro de potasio",

    martianProfile: {
      targetId: "mars-valles-marineris",
      targetName: "Estratos de Yeso y Cañones de Valles Marineris",
      body: "Mars",
      coordinates: "13.9° S · 59.2° O (Candor Chasma)",
      image: "/images/geology/mars-jezero.jpg",
      imageTitle: "Estratigrafía Plegada de Evaporitas en Cañones",
      imageSubtitle: "Valles Marineris · MRO HiRISE / CRISM (NASA)",
      geologySummary: "Estructuras tectónicas de sales y arcillas plegadas por compresión en hiperaridez extrema, análogo de los depósitos estratificados interiores de los cañones marcianos.",
      mineralogy: "Halita diapírica, Yeso estratificado, Arcillas y Cloruros"
    },

    spaceTargetId: "mars-valles-marineris",
    spaceTargetName: "Estratos de Evaporitas de Valles Marineris (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "13.9° S · 59.2° O",
    spaceImage: "/images/geology/mars-jezero.jpg",
    spaceImageTitle: "Estratos de Cañón en Valles Marineris",
    spaceImageSubtitle: "MRO HiRISE (NASA)",
    spaceGeologySummary: "Capas plegadas de yeso y sales sedimentarias en cañones profundos marcianos.",
    spaceMineralogy: "Yeso, Sulfatos de magnesio, Hematita, Arcillas",

    executiveSummary: "La Cordillera de la Sal es el análogo geomecánico y kárstico más cercano a los depósitos estratificados interiores de Candor Chasma en Valles Marineris. Sus cavernas de sal y crestas afiladas de halita ponen a prueba la navegación autónoma de rovers en cañones escarpados.",
    solidAnalogy: [
      "Diapirismo salino y pliegues tectónicos de halita/yeso idénticos a los detectados por CRISM en cañones marcianos.",
      "Cuevas kársticas en sal seca: análogo de cavidades subterráneas en evaporitas.",
      "Hiperaridez absoluta con nula disolución meteórica moderna."
    ],
    analogyLimitations: [
      "Presencia de gravedad terrestre completa (1g).",
      "Formación inicial con agua marina evaporada vs cuencas endorreicas marcianas."
    ],
    operationalValue: [
      "Pruebas de navegación robótica tridimensional en cañones y pasos estrechos.",
      "Ensayos de perforación y muestreo de horizontes de sulfatos puros."
    ],
    metrics: [
      { variable: "Pureza de Sulfato de Calcio", earthValue: "> 90% en vetas de yeso", spaceValue: "Depósitos masivos de yeso", compatibility: "ALTA" },
      { variable: "Pendiente de Cañones", earthValue: "25° a 60° (Escarpado)", spaceValue: "20° a 45° en Candor Chasma", compatibility: "ALTA" },
      { variable: "Humedad de Cavernas", earthValue: "< 15% HR interior", spaceValue: "< 1% HR en Marte", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA MRO CRISM Mineralogical Maps", "Copernicus Sentinel-2", "USGS Astrogeology"],
    officialCitations: ["De Waele et al. (2009), Geomorphology", "Gendrin et al. (2005), Science"]
  },

  // 13. LAGO VANDA Y VALLE TAYLOR (ANTÁRTIDA) - STRICTLY MOON (CRYOGENIC PSR)
  {
    id: "lago-vanda-taylor",
    name: "Lago Vanda y Valle Taylor (Antártida)",
    country: "Antártida",
    region: "Tierra Victoria · Valles Secos de McMurdo",
    elevation: "120 msnm",
    fidelityScore: 95,
    missionTarget: "Moon",
    operationalRoles: ["isru", "cryogenic", "base"],
    physicalConditions: ["cryogenic", "hyperarid"],
    environmentType: "polar",

    earthImage: "/images/geology/earth-mcmurdo.jpg",
    earthImageTitle: "Cubierta Perenne de Hielo Transparente y Salmueras",
    earthImageSubtitle: "Lago Vanda · Valle de Wright (Antártida)",
    earthGeologySummary: "Lago meromíctico cubierto de forma permanente por 4 metros de hielo cristalino sin nieve. En su fondo (~70 m) almacena salmueras cálidas supersalinas aisladas de la atmósfera desde hace miles de años.",
    earthMineralogy: "Hielo cristalino puro (H2O), Cloruro de calcio (CaCl2), Halita y Yeso",

    lunarProfile: {
      targetId: "moon-shackleton-ice",
      targetName: "Trampas Frías y Hielo Perenne de Shackleton",
      body: "Moon",
      coordinates: "89.9° S · 0.0° E (Polo Sur Lunar)",
      image: "/images/geology/moon-shackleton.jpg",
      imageTitle: "Hielo Perenne y Volátiles en Trampas Polares",
      imageSubtitle: "Cráter Shackleton · Programa Artemis / LRO LAMP",
      geologySummary: "Zonas de sombra permanente donde el hielo de agua permanece congelado de forma ininterrumpida durante miles de millones de años, el análogo más riguroso para sistemas de minería criogénica lunar.",
      mineralogy: "Hielo de agua masivo (H2O), Anortosita polar, Volátiles atrapados y Regolito lunar"
    },

    spaceTargetId: "moon-shackleton-ice",
    spaceTargetName: "Trampas Frías de Shackleton (Luna)",
    spaceTargetBody: "Moon",
    spaceTargetCoordinates: "89.9° S · 0.0° E",
    spaceImage: "/images/geology/moon-shackleton.jpg",
    spaceImageTitle: "Hielo en Sombra Permanente en Shackleton",
    spaceImageSubtitle: "Misión NASA LRO LAMP",
    spaceGeologySummary: "Depósitos permanentes de hielo protegidos en trampas frías polares.",
    spaceMineralogy: "Hielo de agua, Volátiles atrapados, Anortosita",

    executiveSummary: "El Lago Vanda y el Valle Taylor son el laboratorio criogénico de referencia para estudiar la penetración de calor a través de gruesas capas de hielo y la extracción de salmueras subsuperficiales. Es un modelo clave para los taladros de extracción de volátiles que viajarán en los rovers VIPER y Artemis.",
    solidAnalogy: [
      "Comportamiento de hielo masivo bajo estrés térmico criogénico permanente.",
      "Aislamiento térmico entre la superficie gélida y las capas basales.",
      "Ausencia de precipitaciones líquidas y vientos polares hiperáridos."
    ],
    analogyLimitations: [
      "Presión atmosférica normal terrestre.",
      "Agua líquida en fondo por efecto de trampa solar."
    ],
    operationalValue: [
      "Validación de taladros rotatorios con extracción neumática de virutas de hielo.",
      "Pruebas de espectrómetros de neutrones para detección de hidrógeno subsuperficial."
    ],
    metrics: [
      { variable: "Espesor de Capa de Hielo", earthValue: "3.5 a 4.2 metros", spaceValue: "1 a 5 metros estimados en PSR", compatibility: "ALTA" },
      { variable: "Temperatura Superficial", earthValue: "-30 °C a -55 °C", spaceValue: "40 K (-233 °C en PSR)", compatibility: "MEDIA" },
      { variable: "Pureza de Hielo Superior", earthValue: "> 99% H2O pura", spaceValue: "Mezcla con 5-15% regolito", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA LRO Diviner & LAMP", "USGS Antarctic Geographic Survey", "Copernicus CryoSat"],
    officialCitations: ["Spiegel et al. (2018), Science Advances", "Heldmann et al. (2014), Astrobiology"]
  },

  // 14. TUBOS DE LAVA DE LANZAROTE (ESPAÑA) - STRICTLY MOON
  {
    id: "tubos-lava-lanzarote",
    name: "Tubos de Lava y Cuevas de Malpaís (Lanzarote)",
    country: "España",
    region: "Islas Canarias · Geoparque Lanzarote",
    elevation: "250 msnm",
    fidelityScore: 97,
    missionTarget: "Moon",
    operationalRoles: ["base", "caves", "radiation"],
    physicalConditions: ["regolith", "radiation"],
    environmentType: "volcanic",

    earthImage: "/images/geology/earth-lanzarote.jpg",
    earthImageTitle: "Tubo Volcánico de la Corona y Claraboyas (Jameos)",
    earthImageSubtitle: "Tubo de Lava de 7.6 km · Lanzarote (España)",
    earthGeologySummary: "Sistema de tubos volcánicos basálticos de 7.6 km de longitud y hasta 25 m de anchura. Cuenta con techos basálticos compactos de hasta 15 m de espesor y accesos verticales tipo jameo.",
    earthMineralogy: "Basalto alcalino, Olivino forsterita, Piroxenos titánicos y Vidrio volcánico",

    lunarProfile: {
      targetId: "moon-marius-hills",
      targetName: "Tubos de Lava Basálticos de Marius Hills",
      body: "Moon",
      coordinates: "14.2° N · 303.3° E (Oceanus Procellarum)",
      image: "/images/geology/moon-marius-hills.jpg",
      imageTitle: "Fosa y Bóveda Basáltica de Marius Hills (NASA LROC)",
      imageSubtitle: "Candidato Principal de Refugio Subterráneo Artemis",
      geologySummary: "Túneles volcánicos basálticos de cientos de metros de ancho descubiertos por Kaguya y LROC. Ofrecen blindaje total contra micrometeoritos y radiación cósmica galáctica para la Base Lunar Permanente.",
      mineralogy: "Basalto de mar lunar rico en titanio, Anortosita, Ilmenita y Vidrios piroclásticos"
    },

    spaceTargetId: "moon-marius-hills",
    spaceTargetName: "Tubos de Lava Basálticos de Marius Hills (Luna)",
    spaceTargetBody: "Moon",
    spaceTargetCoordinates: "14.2° N · 303.3° E",
    spaceImage: "/images/geology/moon-marius-hills.jpg",
    spaceImageTitle: "Fosa de Marius Hills (NASA LROC)",
    spaceImageSubtitle: "Oceanus Procellarum · Candidato a Base Lunar",
    spaceGeologySummary: "Túneles basálticos gigantes de la Luna ideales para refugio de radiación.",
    spaceMineralogy: "Basalto de mar rico en titanio, Anortosita, Ilmenita",

    executiveSummary: "Lanzarote es la sede oficial del programa de entrenamiento de astronautas PANGAEA de la Agencia Espacial Europea (ESA). Sus tubos de lava basálticos del volcán de La Corona representan el modelo análogo europeo más perfeccionado para ensayar el descenso a claraboyas y la instalación de hábitats lunares subterráneos.",
    solidAnalogy: [
      "Morfología de conductos de flujo magmático con bóvedas estables de basalto.",
      "Atenuación radical de radiación y amortiguación térmica interior.",
      "Sede canónica de formación geológica para astronautas de Artemis."
    ],
    analogyLimitations: [
      "Gravedad terrestre (1g) limita la anchura de las bóvedas frente a los 500 m de los tubos lunares.",
      "Humedad relativa marina en el interior de los jameos."
    ],
    operationalValue: [
      "Entrenamiento de astronautas en espeleología lunar y descenso por cuerda (ESA PANGAEA).",
      "Pruebas de escaneo LiDAR 3D móvil en ausencia de GPS."
    ],
    metrics: [
      { variable: "Espesor de Techo Basáltico", earthValue: "8 a 15 metros", spaceValue: "20 a 50 metros en Marius Hills", compatibility: "ALTA" },
      { variable: "Blindaje Radiativo Medido", earthValue: "> 98% radiación cósmica", spaceValue: "> 95% atenuación SPE/GCR", compatibility: "ALTA" },
      { variable: "Temperatura Interior", earthValue: "Constante 18 °C ± 1 °C", spaceValue: "Constante -20 °C en la Luna", compatibility: "ALTA" }
    ],
    auditedDatasets: ["ESA PANGAEA Geological Records", "NASA LROC NAC Pit Catalog", "JAXA SELENE Lunar Radar"],
    officialCitations: ["Sauro et al. (2020), Earth-Science Reviews", "Bessone et al. (2018), Acta Astronautica"]
  },

  // 15. PARQUE NACIONAL DE TIMANFAYA (LANZAROTE, ESPAÑA) - STRICTLY MOON
  {
    id: "parque-timanfaya",
    name: "Campos de Lava y Escorias de Timanfaya",
    country: "España",
    region: "Islas Canarias · Lanzarote",
    elevation: "350 msnm",
    fidelityScore: 92,
    missionTarget: "Moon",
    operationalRoles: ["landing", "mobility", "base"],
    physicalConditions: ["regolith", "radiation"],
    environmentType: "volcanic",

    earthImage: "/images/geology/earth-lanzarote.jpg",
    earthImageTitle: "Malpaís de Lava 'Aa' y Escorias Volcánicas Pristinas",
    earthImageSubtitle: "Erupciones Históricas de 1730-1736 · Timanfaya (España)",
    earthGeologySummary: "Campos de lava escoriácea 'aa' y mantos de piroclastos (lapilli) que cubren 50 km². Terreno extremadamente áspero, cortante y no meteorizado, prácticamente sin suelo vegetal ni erosión hídrica.",
    earthMineralogy: "Basalto tholeítico, Olivino en xenolitos, Piroxenos augíticos y Vidrios volcánicos",

    lunarProfile: {
      targetId: "moon-mare-tranquillitatis",
      targetName: "Campos de Malpaís Basáltico Lunar",
      body: "Moon",
      coordinates: "8.5° N · 21.4° E (Mares Lunares)",
      image: "/images/geology/moon-tranquillitatis.jpg",
      imageTitle: "Manto Basáltico y Escorias de Impacto en Mares Lunares",
      imageSubtitle: "Manto Basáltico · Misiones Apollo / LRO",
      geologySummary: "Campos de lava reciente sin erosión hídrica ni vegetación, análogo de la abrasividad y rugosidad superficial que desgastan las bandas de rodadura de los rovers lunares.",
      mineralogy: "Basalto olivínico, Piroclastos, Cenizas vítreas y Augita"
    },

    spaceTargetId: "moon-mare-tranquillitatis",
    spaceTargetName: "Campos de Malpaís Basáltico Lunar (Luna)",
    spaceTargetBody: "Moon",
    spaceTargetCoordinates: "8.5° N · 21.4° E",
    spaceImage: "/images/geology/moon-tranquillitatis.jpg",
    spaceImageTitle: "Malpaís Basáltico Lunar",
    spaceImageSubtitle: "Misión NASA LRO",
    spaceGeologySummary: "Lavas basálticas escoriáceas y mantos de piroclastos lunares.",
    spaceMineralogy: "Basalto olivínico, Piroclastos vítreos, Augita",

    executiveSummary: "Las lavas de las erupciones de Timanfaya (1730-1736) no han sufrido meteorización hídrica apreciable. Sus bloques de lava 'aa' cortantes son el mejor análogo para probar la resistencia mecánica de los trajes espaciales y las llantas de aleación con memoria de forma (SMA) de los rovers lunares frente al desgaste por cizalladura.",
    solidAnalogy: [
      "Abrasividad extrema y aristas afiladas idénticas a los fragmentos de basalto lunar.",
      "Inexistencia de cubierta vegetal o suelo orgánico.",
      "Anomalías geotérmicas residuales someras para ensayos de termoelectricidad."
    ],
    analogyLimitations: [
      "Presencia de atmósfera terrestre normal.",
      "Gravedad 1g que incrementa la fuerza de fricción normal."
    ],
    operationalValue: [
      "Ensayos de resistencia al desgarro de telas de trajes espaciales Artemis (Axiom Space).",
      "Pruebas de durabilidad de grousers y suspensiones rocker-bogie en rovers."
    ],
    metrics: [
      { variable: "Rugosidad Superficial RMS", earthValue: "8 a 25 cm (Muy rugoso)", spaceValue: "5 a 20 cm en lavas lunares", compatibility: "ALTA" },
      { variable: "Dureza Mohs de Fragmentos", earthValue: "6.0 a 6.5 (Olivino/Basalto)", spaceValue: "6.0 a 7.0 (Regolito lunar)", compatibility: "ALTA" },
      { variable: "Pendiente de Laderas de Escoria", earthValue: "28° a 32°", spaceValue: "25° a 31° en bordes de cráter", compatibility: "ALTA" }
    ],
    auditedDatasets: ["ESA PANGAEA Lanzarote Test Logs", "NASA Apollo 11 Lunar Sample Compendium", "Copernicus Sentinel-2"],
    officialCitations: ["Sauro et al. (2020), Earth-Science Reviews", "Carracedo et al. (1992), Geology of the Canary Islands"]
  }
];
