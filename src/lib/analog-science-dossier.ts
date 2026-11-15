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

  // Identificadores de imágenes locales
  earthImage: string;
  earthImageTitle: string;
  earthImageSubtitle: string;
  earthGeologySummary: string;
  earthMineralogy: string;

  spaceTargetId: string;
  spaceTargetName: string;
  spaceTargetBody: "Moon" | "Mars";
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

export const scienceDossierList: GeologyComparisonItem[] = [
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

    spaceTargetId: "lunar-mare-or-sirenum",
    spaceTargetName: "Mares Lunares (Tranquillitatis) / Paleocuencas Marcianas (Sirenum)",
    spaceTargetBody: "Moon",
    spaceTargetCoordinates: "0.67° N · 23.47° E // 38.8° S · 139.0° O",
    spaceImage: "/images/geology/moon-tranquillitatis.jpg",
    spaceImageTitle: "Llanura Basáltica y Regolito de Mare Tranquillitatis",
    spaceImageSubtitle: "Base Tranquilidad Lunar · Misión Apollo 11 / LRO",
    spaceGeologySummary: "Llanura basáltica de impacto con rugosidad milimétrica de regolito cohesivo y depósitos evaporíticos de cloruros similares a los detectados por Mars Odyssey THEMIS en Terra Sirenum.",
    spaceMineralogy: "Plagioclasa cálcica, Ilmenita (FeTiO3), Piroxenos y Sales de Cloruro",

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

    spaceTargetId: "lunar-marius-hills",
    spaceTargetName: "Claraboya y Tubos de Lava de Marius Hills (Luna)",
    spaceTargetBody: "Moon",
    spaceTargetCoordinates: "14.2° N · 303.3° E (Oceanus Procellarum)",
    spaceImage: "/images/geology/moon-marius-hills.jpg",
    spaceImageTitle: "Fosa de Marius Hills vista por LROC NAC (NASA)",
    spaceImageSubtitle: "Claraboya Lunar de 65 m de Diámetro hacia Cavidades Basálticas",
    spaceGeologySummary: "Fosa circular de colapso de 65 m de diámetro y más de 80 m de profundidad detectada por SELENE y LROC, que conduce a túneles basálticos masivos de decenas de kilómetros sin colapsar.",
    spaceMineralogy: "Basalto de mar lunar rico en titanio, Anortosita, Piromorfita y Vidrio piroclástico",

    executiveSummary: "Para la Base Lunar Permanente de Artemis y los hábitats en Marte, la radiación cósmica y las variaciones térmicas de 250 °C en superficie son letales. Los tubos de lava de Lípez y Lanzarote representan el modelo geológico exacto para diseñar hábitats subterráneos presurizados que protejan a los astronautas bajo decenas de metros de roca volcánica.",
    solidAnalogy: [
      "Atenuación natural del >95% de la radiación ionizante cósmica galáctica (GCR) y tormentas de partículas solares (SPE).",
      "Aislamiento térmico radical: temperatura interior constante y amortiguada frente a los extremos térmicos violentos de la superficie.",
      "Protección estructural total contra impactos de micrometeoritos y eyecciones hiperveloces."
    ],
    analogyLimitations: [
      "Dimensiones: debido a la gravedad lunar reducida (1/6g), los tubos lunares pueden superar los 500 metros de ancho, mucho más grandes que los tubos terrestres (5 a 30 m).",
      "Erosión química por vapor de agua y gases atmosféricos en la Tierra, inexistente en la Luna."
    ],
    operationalValue: [
      "Validación de protocolos de despliegue de hábitats inflables presurizados y anclajes en roca volcánica.",
      "Ensayos de robótica autónoma y drones de exploración en ambientes sin señal satelital GPS/GNSS con navegación Lidar SLAM.",
      "Entrenamiento de geología de campo subterránea para astronautas del programa ESA PANGAEA / NASA Artemis."
    ],
    metrics: [
      { variable: "Blindaje Radiativo", earthValue: "> 95% atenuación SPE/GCR", spaceValue: "> 98% atenuación bajo 10 m regolito", compatibility: "ALTA" },
      { variable: "Estabilidad Térmica", earthValue: "12 °C ± 3 °C todo el año", spaceValue: "-20 °C constante bajo suelo", compatibility: "ALTA" },
      { variable: "Composición de Roca", earthValue: "Basalto y dacita volcánica", spaceValue: "Basalto lunar rico en ilmenita", compatibility: "ALTA" },
      { variable: "Resistencia Mecánica de Techo", earthValue: "50 - 120 MPa compresión", spaceValue: "40 - 100 MPa compresión basalto", compatibility: "ALTA" }
    ],
    auditedDatasets: ["LROC NAC / WAC (NASA LRO)", "Kaguya Terrain Camera (JAXA)", "COP-DEM-GLO-30", "ESA PANGAEA Geodatabase"],
    officialCitations: ["Sauro et al. (2020), Earth-Science Reviews", "Robinson et al. (2012), Planetary and Space Science", "Haruyama et al. (2009), Geophysical Research Letters"]
  },
  {
    id: "sol-de-manana",
    name: "Sol de Mañana",
    country: "Bolivia",
    region: "Reserva Eduardo Avaroa · Altiplano Sur",
    elevation: "4,850 msnm",
    fidelityScore: 91,
    missionTarget: "Mars",
    operationalRoles: ["astrobiology", "isru", "landing"],
    physicalConditions: ["sulfate", "radiation", "hyperarid"],
    environmentType: "altiplano",

    earthImage: "/images/geology/earth-sol-manana.jpg",
    earthImageTitle: "Fumarolas Ácido-Sulfatadas y Sínter de Sílice Opalina",
    earthImageSubtitle: "Campo Geotérmico Sol de Mañana · 4,850 msnm (Bolivia)",
    earthGeologySummary: "Campo geotérmico activo de alta entalpía con pozos de lodo hirviente a 85 °C (punto de ebullición a esa altitud), fumarolas ricas en H2S/SO2 y depósitos sedimentarios masivos de sílice opalina amorfa.",
    earthMineralogy: "Sílice opalina (SiO2·nH2O), Azufre elemental (S8), Alunita, Caolinita y Jarosita",

    spaceTargetId: "mars-gusev-homeplate",
    spaceTargetName: "Home Plate en Cráter Gusev / Cráter Gale (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "14.6° S · 175.5° E (Cráter Gusev)",
    spaceImage: "/images/geology/mars-gusev.jpg",
    spaceImageTitle: "Depósito de Sílice Opalina descubierto por Rover Spirit",
    spaceImageSubtitle: "Afloramiento Home Plate · Misión NASA Mars Exploration Rover",
    spaceGeologySummary: "Estructura volcánica hidrotermal de 90 m de diámetro compuesta de tobas piroclásticas estratificadas y nódulos de sílice pura (>90% SiO2) descubiertos cuando una rueda del rover Spirit desenterró el suelo blanco.",
    spaceMineralogy: "Sílice opalina microdigitada, Jarosita, Sulfatos de hierro y Polvo de hematita",

    executiveSummary: "Sol de Mañana es el análogo hidrotermal sulfatado más alto del mundo. Su combinación de baja presión, radiación UV esterilizante y precipitación de sílice opalina reproduce de manera fiel los antiguos sistemas volcánicos marcianos de Home Plate en Gusev, donde se concentra la mayor probabilidad de preservar biofirmas de vida microscópica primitiva.",
    solidAnalogy: [
      "Firma espectral infrarroja idéntica de sínter de sílice opalina y sulfatos hidratados (jarosita y alunita).",
      "Ambiente de ebullición a presión reducida (~560 hPa) que replica la termodinámica de fluidos hidrotermales en el Marte noéico.",
      "Preservación de microfósiles y biofirmas celulares dentro de matrices de sílice precipitada rápidamente."
    ],
    analogyLimitations: [
      "El sistema terrestre continúa activo hoy en día por gradiente geotérmico vigoroso, mientras que en Marte la actividad hidrotermal cesó hace miles de millones de años.",
      "Mayor abundancia de agua meteórica y recarga freática en la Tierra que en el Marte contemporáneo."
    ],
    operationalValue: [
      "Calibración de instrumentos espectrales miniaturizados (Raman, LIBS, APXS) de rovers de exploración marciana.",
      "Protocolos de muestreo geológico para retorno de muestras de Marte (Mars Sample Return) priorizando horizontes ricos en sílice.",
      "Ensayos de tolerancia química de aleaciones de titanio y aluminio frente a atmósferas ácidas corrosivas."
    ],
    metrics: [
      { variable: "Pureza de Sílice", earthValue: "85% a 92% SiO2 amorfa", spaceValue: "> 90% SiO2 en Home Plate", compatibility: "ALTA" },
      { variable: "Presencia de Sulfatos", earthValue: "Alunita y Jarosita masiva", spaceValue: "Jarosita y Sulfato de Magnesio", compatibility: "ALTA" },
      { variable: "pH de Fluidos", earthValue: "pH 1.5 a 3.0 (Muy ácido)", spaceValue: "pH ácido inferido en Marte temprano", compatibility: "ALTA" },
      { variable: "Presión de Operación", earthValue: "560 hPa (~5,000 m)", spaceValue: "6 a 9 hPa en superficie marciana", compatibility: "MEDIA" }
    ],
    auditedDatasets: ["NASA Spirit MER Pancam/Mini-TES", "Landsat 8 OLI Band Ratios", "COP-DEM-GLO-30", "NASA Astrobiology Science 2008"],
    officialCitations: ["Squyres et al. (2008), Science", "Ruff et al. (2011), Nature Geoscience", "Cabrol et al. (2007), Journal of Geophysical Research"]
  },
  {
    id: "cumbre-licancabur",
    name: "Cumbre Criogénica Licancabur",
    country: "Bolivia / Chile",
    region: "Límite Fronterizo · Cordillera Occidental",
    elevation: "5,916 msnm",
    fidelityScore: 88,
    missionTarget: "Moon",
    operationalRoles: ["landing", "astrobiology", "mobility"],
    physicalConditions: ["cryogenic", "radiation", "regolith"],
    environmentType: "altiplano",

    earthImage: "/images/geology/earth-licancabur.jpg",
    earthImageTitle: "Laguna de Cráter Volcánico Periglacial a 5,916 msnm",
    earthImageSubtitle: "Volcán Licancabur · Extrema Radiación UV y Frío Nocturno",
    earthGeologySummary: "Cráter volcánico cónico con una laguna periglacial a casi 6,000 msnm sometida a radiación UV esterilizante extrema, presión reducida (500 hPa), vientos de 120 km/h y temperaturas que descienden a -25 °C.",
    earthMineralogy: "Andesita basáltica, Vidrio volcánico, Piroxenos, Feldespato y Brechas periglaciares",

    spaceTargetId: "lunar-south-pole",
    spaceTargetName: "Cráter Shackleton y Crestas del Polo Sur Lunar",
    spaceTargetBody: "Moon",
    spaceTargetCoordinates: "89.9° S · 0.0° E (Polo Sur Lunar)",
    spaceImage: "/images/geology/moon-shackleton.jpg",
    spaceImageTitle: "Borde Iluminado del Cráter Shackleton por LRO (NASA)",
    spaceImageSubtitle: "Campamento Base Artemis · Sombras Permanentes con Hielo de Agua",
    spaceGeologySummary: "Cráter de impacto de 21 km de diámetro con crestas iluminadas el 86% del año solar y fondo en sombra perpetua (PSR) con trampas frías criogénicas a 40 Kelvin (-233 °C) ricas en hielo de agua.",
    spaceMineralogy: "Anortosita pura (plagioclasa cálcica), Vidrio de impacto, Brecha de eyección y Hielo amorfo",

    executiveSummary: "Licancabur es el laboratorio natural de gran altitud más extremo de la Tierra para estudiar la tolerancia biológica y de materiales frente a la radiación solar sin filtro y el frío periglacial. Sus condiciones fueron investigadas por el Instituto SETI y el Centro de Investigación NASA Ames para preparar la instrumentación de trajes espaciales y sensores de exploración lunar.",
    solidAnalogy: [
      "Récord mundial de índice de radiación UV medido en superficie terrestre (Índice UV-B >43 registrado en cumbres andinas).",
      "Hipoxia severa y atmósfera enrarecida (50% de la densidad a nivel del mar) que tensiona los sistemas de soporte vital.",
      "Sustrato volcánico friable con regolito fragmentado y bloques de impacto angular."
    ],
    analogyLimitations: [
      "Las temperaturas nocturnas terrestres (-25 °C) son notablemente más templadas que los 40 K (-233 °C) de las sombras permanentes de Shackleton.",
      "La laguna contiene agua líquida en verano austral, mientras que en la Luna el agua solo existe como hielo criogénico en ultra-alto vacío."
    ],
    operationalValue: [
      "Evaluación del envejecimiento acelerado de polímeros, visores y juntas de trajes espaciales EVA del programa Artemis.",
      "Pruebas de resistencia a fatiga térmica por ciclos día-noche bruscos en componentes electrónicos.",
      "Ensayos fisiológicos de rendimiento y fatiga cognitiva de tripulaciones en condiciones de estrés hipóxico y terreno abrupto."
    ],
    metrics: [
      { variable: "Radiación UV", earthValue: "UV >20 (Dosis letal organismos)", spaceValue: "UV-C y rayos cósmicos sin escudo", compatibility: "ALTA" },
      { variable: "Presión Atmosférica", earthValue: "495 hPa (~50% atmósfera)", spaceValue: "Vacío estricto (10⁻¹² hPa)", compatibility: "MEDIA" },
      { variable: "Temperatura Mínima", earthValue: "-25 °C a -30 °C noche", spaceValue: "40 K (-233 °C en PSR)", compatibility: "PARCIAL" },
      { variable: "Pendiente de Borde", earthValue: "28° a 35° en cono volcánico", spaceValue: "30° a 32° en paredes de cráter", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA LRO LOLA Topography", "NASA Ames / SETI High Altitude Expedition", "COP-DEM-GLO-30", "Landsat 8 Thermal Infrared Sensor"],
    officialCitations: ["Cabrol et al. (2014), Frontiers in Environmental Science", "Cabrol et al. (2007), Astrobiology", "McKay et al. (2003), Astrobiology"]
  },
  {
    id: "atacama-yungay",
    name: "Desierto de Atacama (Yungay)",
    country: "Chile",
    region: "Región de Antofagasta · Depresión Intermedia",
    elevation: "1,000 msnm",
    fidelityScore: 92,
    missionTarget: "Mars",
    operationalRoles: ["astrobiology", "mobility", "landing"],
    physicalConditions: ["hyperarid", "sulfate", "regolith"],
    environmentType: "hyperarid",

    earthImage: "/images/geology/earth-atacama.jpg",
    earthImageTitle: "Llanuras Hiperáridas Arcillosas y Costras de Perclorato",
    earthImageSubtitle: "Estación Yungay · Desierto de Atacama (Chile)",
    earthGeologySummary: "La región no polar más seca del planeta, con tasas de precipitación inferiores a 1 mm por década. Suelo arcilloso con anhidrita, percloratos de calcio/magnesio y materia orgánica prácticamente indetectable.",
    earthMineralogy: "Anhidrita (CaSO4), Halita, Nitratos, Percloratos (ClO4-) y Esmectita",

    spaceTargetId: "mars-jezero-crater",
    spaceTargetName: "Delta y Llanuras del Cráter Jezero (Marte)",
    spaceTargetBody: "Mars",
    spaceTargetCoordinates: "18.38° N · 77.58° E (Syrtis Major)",
    spaceImage: "/images/geology/mars-jezero.jpg",
    spaceImageTitle: "Delta Fluvio-Lacustre del Cráter Jezero por HiRISE (NASA)",
    spaceImageSubtitle: "Sitio del Rover Perseverance · Sedimentos Arcillosos y Carbonatos",
    spaceGeologySummary: "Cuenca de impacto que albergó un lago profundo alimentado por un río. Contiene sedimentos deltaicos ricos en arcillas esmectíticas, carbonatos y depósitos eólicos hiperáridos.",
    spaceMineralogy: "Arcillas esmectitas, Carbonatos de magnesio, Sulfatos y Piroxenos basálticos",

    executiveSummary: "Yungay en el Desierto de Atacama es el análogo hiperárido de referencia mundial para la NASA. Comparte con Marte la presencia de percloratos en el suelo, la desecación extrema y la radiación UV, habiendo servido de banco de pruebas para los instrumentos de detección de vida de Viking, Phoenix, Curiosity y Perseverance.",
    solidAnalogy: [
      "Química de suelo dominada por percloratos y nitratos con alta capacidad oxidante que destruye aminoácidos en superficie.",
      "Delicuescencia higroscópica: único mecanismo de hidratación por condensación de humedad nocturna sin lluvia líquida.",
      "Propiedades mecánicas de sedimentos finos eólicos compactados ideales para pruebas de penetrómetros y perforadores."
    ],
    analogyLimitations: [
      "Presencia de 21% de oxígeno en la atmósfera y presión a nivel normal (~900 hPa).",
      "Temperaturas diurnas más elevadas (hasta +35 °C) frente al régimen térmico frío marciano (media de -60 °C)."
    ],
    operationalValue: [
      "Validación de taladros robóticos de profundidad (como el drill de Rosalind Franklin ExoMars a 2 metros).",
      "Ensayos de movilidad de rovers en arena eólica de baja cohesión para evitar trampas de arena (wheel entrapment).",
      "Desarrollo de tecnologías para neutralizar la toxicidad del perclorato en el regolito antes del contacto humano."
    ],
    metrics: [
      { variable: "Humedad Relativa Diurna", earthValue: "< 5% en Yungay", spaceValue: "< 0.1% en Jezero", compatibility: "ALTA" },
      { variable: "Contenido de Perclorato", earthValue: "0.03% a 0.2% en masa", spaceValue: "0.5% a 1.0% en regolito marciano", compatibility: "ALTA" },
      { variable: "Carbono Orgánico Total", earthValue: "< 10 μg/g (Borde límite vida)", spaceValue: "Trazas en cráter Gale", compatibility: "ALTA" },
      { variable: "Densidad de Polvo Eólico", earthValue: "0.8 - 1.2 g/cm³", spaceValue: "1.0 - 1.4 g/cm³ en Marte", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA Mars Perseverance PIXL/SHERLOC", "HiRISE MRO (NASA/JPL/Univ. Arizona)", "Landsat 8 OLI Band 7/5", "NASA Astrobiology Dry Limit Data"],
    officialCitations: ["Navarro-González et al. (2003), Science", "Farley et al. (2020), Space Science Reviews", "Ewing et al. (2006), Geochimica et Cosmochimica Acta"]
  },
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

    spaceTargetId: "lunar-shackleton-or-arcadia",
    spaceTargetName: "Trampas Frías Polares (Luna) / Hielo Subsuperficial de Arcadia (Marte)",
    spaceTargetBody: "Both" as any,
    spaceTargetCoordinates: "89.9° S · 0.0° E // 39.2° N · 171.0° E",
    spaceImage: "/images/geology/moon-shackleton.jpg",
    spaceImageTitle: "Trampas Criogénicas de Volátiles en Shackleton",
    spaceImageSubtitle: "Polo Sur Lunar y Manto Glaciar Oculto de Marte",
    spaceGeologySummary: "Depósitos masivos de hielo de agua protegidos del vacío solar por capas de regolito seco superficial, con estabilidad termodinámica comprobada por radar orbital SHARAD y LRO LAMP.",
    spaceMineralogy: "Hielo de agua (H2O), Hielo de CO2 (Marte), Regolito fragmentario y Minerales hidratados",

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

    spaceTargetId: "mars-gale-or-shackleton",
    spaceTargetName: "Cráteres de Impacto Complejos (Gale en Marte / Shackleton en Luna)",
    spaceTargetBody: "Both" as any,
    spaceTargetCoordinates: "5.4° S · 137.8° E // 89.9° S · 0.0° E",
    spaceImage: "/images/geology/mars-gale.jpg",
    spaceImageTitle: "Estratigrafía del Monte Sharp y Cráter Gale",
    spaceImageSubtitle: "Cráter de Impacto de 154 km · Misión Rover Curiosity (NASA)",
    spaceGeologySummary: "Cuenca de impacto profunda con anillo de eyección, monte central estratificado y lechos de brechas sedimentarias depositadas tras el impacto catastrófico.",
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
      "Optimización de rutas de exploración robótica y EVA humana considerando la pendiente de las paredes del cráter.",
      "Ensayos de telecomunicaciones con retardo de señal de hasta 20 minutos (simulación Tierra-Marte)."
    ],
    metrics: [
      { variable: "Diámetro de Estructura", earthValue: "23 km de diámetro", spaceValue: "21 km Shackleton / 154 km Gale", compatibility: "ALTA" },
      { variable: "Deformación por Choque", earthValue: "Shatter cones y brechas", spaceValue: "Brechas polimícticas de impacto", compatibility: "ALTA" },
      { variable: "Rugosidad en Ruta de Rover", earthValue: "Bloques angulares de 0.2 a 2 m", spaceValue: "Rocas de eyección en Gale", compatibility: "ALTA" },
      { variable: "Índice de Aislamiento Logístico", earthValue: "Zona remota sin cobertura", spaceValue: "Retardo de señal 4-22 min", compatibility: "ALTA" }
    ],
    auditedDatasets: ["NASA HMP Exploration Logs", "HiRISE Mars Reconnaissance Orbiter", "RADARSAT Arctic Elevation Model", "LRO LOLA Digital Elevation"],
    officialCitations: ["Lee & Osinski (2005), Meteoritics & Planetary Science", "Osinski et al. (2005), Meteoritics & Planetary Science", "Glass & Lee (2002), International Journal of Astrobiology"]
  }
];

