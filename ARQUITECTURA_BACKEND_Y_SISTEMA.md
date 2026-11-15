# Arquitectura del Backend y Motor de Comparación — AnalogX
**NASA Space Apps Challenge 2026: *Permanent Moon Base Locations and Mars***

---

## 1. Visión General de la Solución

**AnalogX** es un motor analítico y geoespacial que conecta bancos de pruebas análogos terrestres con objetivos de exploración planetaria en la **Luna (Programa Artemis)** y en **Marte (Mars Exploration Program)**. 

El backend está construido bajo principios de **Ciencia Abierta (*Open Science*)**, integrando bases de datos de misiones de agencias espaciales (**NASA**, **ESA**, **USGS**) y aplicando rigurosas reglas de consistencia epistemológica: **en lugar de asumir que dos terrenos son idénticos por apariencia visual, el sistema calcula su compatibilidad física variable por variable y audita dónde se rompe la analogía**.

```
                           ARQUITECTURA GENERAL
   
   ┌──────────────────────────────────────────────────────────────┐
   │                  FRONTEND (Next.js 16 + React 19)            │
   │  • Globo Orbital 3D (MapLibre GL JS + Hillshade DEM)         │
   │  • Dual-World Terrain Comparator (Deslizador 1:1 a 60 FPS)   │
   │  • Selector Multivariable de Variables Ambientales           │
   │  • Traductor Global Bilingüe (Español / Inglés)             │
   └──────────────────────────────┬───────────────────────────────┘
                                  │  REST API (JSON / HTTP)
                                  ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                   BACKEND (FastAPI + SQLModel)               │
   │  • Router Modular (/api/regions, /api/targets, /api/compare) │
   │  • Motor de Remuestreo y Normalización Espacial              │
   │  • Evaluador Paramétrico de 6 Dimensiones Geofísicas        │
   │  • Generador de Auditoría y Cláusulas de Divergencia         │
   └──────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
   ┌──────────────────────────────────────────────────────────────┐
   │            BASE DE DATOS CIENTÍFICA (SQLite: analogx.db)      │
   │  • Regiones Terrestres Análogas (Bolivia + Benchmarks)      │
   │  • Objetivos Extraterrestres (Polo Sur Lunar + Marte)        │
   │  • Datasets de Misiones Espaciales (LOLA, MOLA, HiRISE, etc) │
   │  • Casos de Uso Operacionales y Niveles TRL (1 a 9)         │
   └──────────────────────────────────────────────────────────────┘
```

---

## 2. Estructura del Repositorio del Backend (`backend_analogX`)

```text
backend_analogX/
├── app/
│   ├── main.py                     # Entrypoint FastAPI, configuración CORS y ciclo de vida (lifespan)
│   ├── api/
│   │   └── v1/
│   │       └── router.py           # Endpoints REST (/api/regions, /api/targets, /api/compare, /api/findings)
│   ├── core/
│   │   ├── config.py               # Configuración centralizada, orígenes CORS y versiones
│   │   ├── database.py             # Motor relacional SQLite (analogx.db) y sesiones con SQLModel
│   │   └── seed.py                 # Lógica de población científica oficial e idempotente
│   └── models/
│       ├── db_models.py            # Modelos SQL relacionales (RegionDB, PlanetaryTargetDB, MissionUseCaseDB)
│       ├── frontend.py             # Esquemas Pydantic v2 para validación estricta de contratos de datos
│       ├── catalog_data.py         # Cerebro analítico: cruce paramétrico variable por variable y datasets
│       ├── dataset.py              # Esquemas de metadatos de sensores y fuentes
│       ├── region.py               # Definición geométrica y sistemas de coordenadas (CRS)
│       └── evidence.py             # Estructura de evidencias científicas y limitaciones físicas
├── scripts/
│   └── seed_database.py            # CLI runner para inicializar o resetear la base de datos
├── tests/
│   └── test_models.py              # Suite de pruebas unitarias automáticas
├── requirements.txt                # Dependencias (FastAPI, SQLModel, Uvicorn, Pydantic v2)
└── README.md                       # Documentación técnica del backend
```

---

## 3. ¿Dónde y Cómo se Realizan las Comparaciones?

### A. Ubicación en el Código
* **Endpoint HTTP:** `POST /api/compare` en [`app/api/v1/router.py`](file:///home/chavezin/Desktop/backend_analogX/app/api/v1/router.py).
* **Función del Motor:** `build_comparison_payload(earth_id, target_id)` en [`app/models/catalog_data.py`](file:///home/chavezin/Desktop/backend_analogX/app/models/catalog_data.py).

### B. Flujo de Ejecución del Motor
Cuando el frontend envía una solicitud (por ejemplo: `Salar de Uyuni` vs `Terra Sirenum`):

1. **Normalización de Sistemas de Referencia de Coordenadas (CRS):**
   * Tierra: **WGS 84 (EPSG:4326)** con altimetría referenciada al Geoide EGM96.
   * Luna: Sistema selenográfico **IAU:30100** con radio de referencia de 1,737.4 km.
   * Marte: Coordenadas planetocéntricas referenciadas al elipsoide areoidal IAU/IAG 2000.

2. **Evaluación Paramétrica en 6 Dimensiones Geofísicas:**

| Dimensión | Instrumento Extraterrestre | Sensor / Dataset Terrestre | Criterio de Comparación del Backend |
| :--- | :--- | :--- | :--- |
| **1. Pendiente Topográfica** | NASA MGS MOLA (463 m/px) o LRO LOLA (20 m/px) | Copernicus DEM GLO-30 / NASADEM (30 m) | Evalúa el gradiente angular. Aplica regla de **remuestreo espacial (*Resampling*)** mediante filtros bilineales para evitar sesgos entre microtopografía y pendientes regionales. |
| **2. Rugosidad Superficial** | NASA MRO HiRISE (0.25 m/px) | Observaciones de campo y Sentinel-2 | Analiza patrones de fracturación poligonal, cantos rodados y rugosidad RMS para tracción de ruedas. |
| **3. Morfología de Cuenca** | MRO Context Camera (CTX) / THEMIS IR | Modelo Digital de Terreno (SRTM) | Contrasta el confinamiento endorreico (cuencas cerradas sin salida al océano) donde se acumulan salmueras. |
| **4. Mineralogía Espectral** | NASA MRO CRISM / THEMIS | Espectrometría de reflectancia VNIR/SWIR | Identifica fases minerales clave: halita (NaCl), sulfatos hidratados, jarosita, arcillas esmectíticas y basaltos ilmeníticos. |
| **5. Procesos Evaporíticos / Hidrotermales** | Mars Odyssey / Viking Lander | Muestreo geoquímico Altiplano / Yungay | Contrasta la secuencia de cristalización fraccionada por desecación extrema o actividad fumarólica/geotérmica activa. |
| **6. Contexto Ambiental** | Curiosity REMS / LRO Diviner | Red meteorológica de alta montaña | Analiza flujo de radiación UV biocida, ciclos térmicos diurnos/nocturnos e índice de aridez. |

3. **Auditoría Epistemológica y Límites Físicos (*Breaking Points*):**
   El backend genera programáticamente advertencias de divergencia ineludible:
   * **Gravedad:** Tierra (1.0 g) vs Marte (0.38 g) vs Luna (0.16 g) — Afecta la compactación del regolito y la tracción motriz.
   * **Presión Atmosférica:** Tierra a nivel del mar (1013 hPa) o en Altiplano (~550 hPa) vs Marte (~6 hPa de $CO_2$) vs Luna ($10^{-12}\text{ torr}$, vacío duro).
   * **Comportamiento de Volátiles:** En la Luna, el agua no puede existir en estado líquido; pasa directamente de hielo a sublimación en el vacío a menos de 40 K.

4. **Calificación Operacional y TRL (Technology Readiness Level):**
   Mapea los resultados a casos de uso reales de ingeniería de exploración espacial:
   * `rover_mobility`: Tracción, deslizamiento y abrasión de ruedas en regolito.
   * `base_habitat_shielding`: Uso de cavidades volcánicas (tubos de lava) para blindaje contra radiación cósmica galáctica (GCR) y tormentas solares (SPE).
   * `isru_water_extraction`: Extracción térmica de agua desde minerales hidratados.
   * `instrument_calibration`: Pruebas de espectrómetros Raman y XRF (como SHERLOC y SuperCam).

---

## 4. ¿De Dónde Proviene la Información Científica? (Fuentes Oficiales)

El backend integra exclusivamente datos de fuentes abiertas verificadas:

```
                               FUENTES DE DATOS
   
   ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
   │    NASA PDS / ODE    │   │       NASA LRO       │   │    ESA COPERNICUS    │
   │  • MRO HiRISE        │   │  • LOLA (Altimetría) │   │  • Sentinel-2 MSI    │
   │  • MRO CRISM         │   │  • Diviner (Térmico) │   │  • Copernicus DEM    │
   │  • MGS MOLA          │   │  • QuickMap LROC     │   │    GLO-30            │
   └──────────┬───────────┘   └──────────┬───────────┘   └──────────┬───────────┘
              │                          │                          │
              └──────────────────────────┼──────────────────────────┘
                                         ▼
                             ┌───────────────────────┐
                             │    NASA TREKS API     │
                             │  • Moon Trek Global   │
                             │  • Mars Trek Global   │
                             └───────────┬───────────┘
                                         │
                                         ▼
                             ┌───────────────────────┐
                             │  BACKEND ANALOGX API  │
                             │  (FastAPI + SQLite)   │
                             └───────────────────────┘
```

1. **NASA Planetary Data System (PDS) / WUSTL Orbital Data Explorer:**
   * Altimetría MOLA MEG128 (463 m/px) para cuencas de impacto marcianas.
   * Cubos espectrales CRISM para detección de minerales hidratados en Cráter Jezero y Terra Sirenum.
   * URL Oficial: [https://pds.nasa.gov/](https://pds.nasa.gov/)

2. **NASA Lunar Reconnaissance Orbiter (LRO):**
   * **LOLA (Lunar Orbiter Laser Altimeter):** Modelos de elevación digital polares a 20 m/pixel para el Cráter Shackleton y el Macizo Malapert.
   * **Diviner Lunar Radiometer Experiment:** Registros térmicos de 40 K en Trampas Criogénicas en Sombra Permanente (PSR).
   * URL Oficial: [https://pds-geosciences.wustl.edu/missions/lro/](https://pds-geosciences.wustl.edu/missions/lro/)

3. **NASA Solar System Treks (JPL / SSERVI):**
   * Conexión orbital deep-linking y verificación cartográfica oficial para Marte y la Luna.
   * URL Oficial: [https://trek.nasa.gov/](https://trek.nasa.gov/)

4. **ESA Copernicus Data Space Ecosystem:**
   * Imágenes multiespectrales de satélite Sentinel-2 Level-2A (10 m y 20 m) para caracterización de minerales evaporíticos terrestres.
   * Modelo Digital de Superficie Global COP-DEM-GLO-30 (30 m).
   * URL Oficial: [https://dataspace.copernicus.eu/](https://dataspace.copernicus.eu/)

5. **USGS Earth Resources Observation and Science (EROS) & NASA ICESat-2:**
   * Reflectancia de superficie y altimetría orbital láser de fotones (ATL08) para calibración altimétrica en el Salar de Uyuni.
   * URL Oficial: [https://www.usgs.gov/centers/eros](https://www.usgs.gov/centers/eros)

---

## 5. Endpoints de la API REST

| Método | Ruta | Parámetros | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Ninguno | Diagnóstico de salud y confirmación de servicio activo. |
| `GET` | `/api/regions` | `study_role`, `country`, `cursor` | Lista paginada de regiones análogas terrestres con metadatos de coordenadas. |
| `GET` | `/api/regions/{id}` | `id` (slug de la región) | Ficha científica completa: observaciones, datasets de sensores, citas y casos de uso. |
| `GET` | `/api/targets` | `body` (`Mars` o `Moon`) | Catálogo de objetivos planetarios extraterrestres oficiales. |
| `POST` | `/api/compare` | JSON con `earth_region_id` y `planetary_target_id` | Ejecuta el cruce paramétrico de 6 variables, remuestreo, limitaciones y TRL. |
| `GET` | `/api/findings` | Ninguno | Bitácora de hallazgos científicos validados con fuentes y citas indexadas. |
| `GET` | `/api/missions/use-cases` | `category` | Filtra misiones espaciales aplicables (rover mobility, ISRU, hábitat, sensores). |
| `GET` | `/api/sources` | Ninguno | Catálogo de repositorios oficiales y acuerdos de Open Data de agencias espaciales. |

---

## 6. Integración y Resiliencia con el Frontend

1. **Consumo Dinámico:**
   * En [`src/lib/api.ts`](file:///home/chavezin/Desktop/frontend_analogX/src/lib/api.ts), el frontend consume los endpoints usando `fetch()` con control de tiempo de espera (`AbortSignal.timeout(4000)`).
   * Rutas como `/findings`, `/explore` y `/compare` leen directamente de la API REST y su base de datos relacional.
2. **Fallback Autónomo (*Offline Resilience*):**
   * Si por alguna razón el servidor backend estuviese desconectado, el frontend conmuta automáticamente a su réplica local de datos sin interrumpir la experiencia de usuario ni generar pantallas de error.
3. **Alto Rendimiento Gráfico (60 FPS):**
   * El componente **Dual-World Terrain Comparator** procesa los perfiles altimétricos interactivos y el deslizador de imágenes 1:1 en el cliente para garantizar transiciones instantáneas sin bloqueos de red.

---

## 7. Guión de 1 Minuto para Presentar el Backend ante los Jueces

> *"El backend de AnalogX no es una simple base de datos de consulta: es un **motor de calificación científica de análogos planetarios**. 
> 
> A través de nuestra API REST en FastAPI y una base de datos relacional normalizada, cruzamos mediciones de altimetría láser de la NASA (MOLA y LOLA) y espectrometría orbital (CRISM) frente a sensores terrestres (Copernicus Sentinel-2 y USGS EROS).
> 
> Nuestro algoritmo evalúa 6 dimensiones físicas clave: pendiente, rugosidad, morfología, mineralogía, procesos evaporíticos y contexto ambiental. Pero lo más importante para la NASA es nuestra **cláusula de auditoría epistemológica**: el sistema declara explícitamente dónde la analogía terrestre es válida y dónde se rompe por diferencias de gravedad o vacío espacial, traduciendo cada sitio a casos de uso de ingeniería concretos —como tracción de rovers o blindaje de hábitats Artemis— con niveles de madurez tecnológica TRL cuantificables."*
