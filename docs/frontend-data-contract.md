# AnalogX: contrato de datos de interfaz, Fase 0

Estado: **propuesta v0, no acordada todavía con el backend**.

## Inspección y alcance

La carpeta de trabajo estaba vacía. No existían `src/lib/types.ts`,
`src/lib/api.ts`, `src/app/`, configuración npm ni `/api/health`.
Se crea una base Next.js con TypeScript estricto y Tailwind y una ruta `/`
que no renderiza contenido. No se crean vistas científicas, mapas, gráficas,
mediciones demostrativas, índices de similitud ni solicitudes HTTP.
No se crea ni modifica un servicio de salud del backend.

La imagen aportada orienta el diseño en Fase 1. Sus porcentajes y mediciones
no se consideran evidencia ni se incorporan al contrato.

### Avance de interfaz: Fase 1

Tras completar la base anterior, se implementaron `/explore`, `/compare`,
`/methodology` y `/findings`. `/` ahora redirige a `/explore`.
La navegación, los filtros por nombre/rol, el selector Marte/Luna, la selección
de regiones, las fichas en diálogo y el esquema regional con zoom/capas funcionan
localmente. `/compare?region={id}&body=Mars|Moon` conserva la selección al navegar.
Un ID desconocido utiliza la referencia inicial; cuerpos desconocidos usan Marte.

`src/lib/study-catalog.ts` contiene únicamente los nombres y roles del brief,
con metadatos científicos desconocidos en `null`, estado pendiente y sin
observaciones instrumentales. No son resultados de una búsqueda científica.
Terra Sirenum se presenta como objetivo propuesto, sin inventar un registro
planetario validado; para la Luna se muestra “Objetivo por definir”.

El esquema territorial y los paisajes son ilustraciones vectoriales, no mapas
georreferenciados ni imágenes de instrumentos. Los marcadores se distribuyen
para facilitar la selección y no representan coordenadas. No existe escala
métrica. Toda localización real esperará geometrías y datums del backend.

La comparación conserva las variables definidas en el contrato y muestra el
estado pendiente, sin valores sustitutos ni puntuaciones. Metodología presenta
las reglas de interfaz y hallazgos mantiene un estado vacío. No se han añadido
llamadas HTTP, bibliografía ficticia, MapLibre ni Recharts.

### Actualización: mapa geográfico real

El esquema inicial se reemplazó por MapLibre GL JS, con teselas raster de Esri
World Imagery y OpenStreetMap. Ahora existen solicitudes cartográficas externas,
sin modificar los contratos ni ejecutar llamadas a los endpoints científicos.
Las atribuciones son visibles y las fuentes se explican en Metodología.

`src/lib/map-config.ts` conserva los localizadores en un modelo independiente de
`PlanetaryRegion`. No se han rellenado `geometry`, `approximate_coordinates`,
`crs_datum` ni observaciones científicas con información del mapa base.

- Uyuni: punto del catálogo [USGS EROS Cal/Val](https://calval.cr.usgs.gov/apps/uyuni-salt-flats),
  20,38° S, 66,95° O. Es referencia de navegación del sitio de calibración,
  no centro del salar. WGS84 es una convención asumida de visualización;
  el datum de origen no está declarado en la página y debe confirmarse para análisis.
- Sol de Mañana: punto referencial del proyecto ENDE, documento 2021, p. 5,
  X 629577,24 e Y 7518040,45 m, UTM WGS84 zona 19K. Se interpreta la banda
  sur como EPSG:32719 y Proj4 convierte a EPSG:4326. No delimita el campo geotérmico.
- Altiplano Sur: no se inventa un punto ni un polígono. Al seleccionarlo se
  restablece la vista regional y se indica que falta delimitar el área.

Los puntos se usan exclusivamente para navegación con su procedencia y
supuestos explícitos. Las geometrías científicas de datum desconocido siguen
bloqueadas. Web Mercator (EPSG:3857) describe la presentación del mapa terrestre,
no el datum de las observaciones ni una proyección válida para Marte/Luna.

Las miniaturas terrestres muestran una tesela de contexto del mismo proveedor
satelital. No se declaran fecha, resolución efectiva o producto instrumental.
Los errores de red y la falta de WebGL muestran estados explícitos; las fichas,
los filtros y la comparación permanecen disponibles sin cartografía.

La cobertura actual se prueba con Playwright: selección mapa/listado, capas,
filtros, parámetros de comparación, errores de teselas y ausencia de
desbordamiento horizontal en escritorio y móvil.

## Fuente de verdad y serialización

`src/lib/scientific-types.ts` define los modelos de dominio y `src/lib/api.ts`
los contratos de transporte. Los nombres JSON usan `snake_case` para facilitar
la correspondencia con Pydantic. No se dispone de los modelos Pydantic ni de
OpenAPI: **no puede afirmarse alineación 1 a 1 todavía**. El backend deberá
revisar nombres, campos obligatorios, enums, nulabilidad y envoltorios antes de
publicar una versión compartida del esquema.

- Los identificadores son cadenas opacas, estables y requeridas.
- Todos los campos declarados son requeridos. Un metadato o medición desconocido
  se transmite como `null`, nunca omitiendo el campo o usando `undefined`.
- Un array vacío significa que no se entregan elementos; no demuestra ausencia
  física de minerales, procesos o evidencias. `null` en arrays de metadatos
  (por ejemplo, unidades o autores) significa información desconocida.
- Fechas de adquisición: ISO 8601, `YYYY-MM-DD` si solo se conoce el día o un
  instante con zona horaria cuando exista precisión temporal. `generated_at`
  y `accessed_at` son instantes RFC 3339 con zona. Nunca inventar precisión.
- Números finitos; JSON no admite `NaN` ni infinitos. `0` solo representa una
  medición de cero. Las incertidumbres textuales conservan su descripción original.
- URLs y DOI son referencias, no texto HTML. Validar enlaces `https`/`http`
  antes de renderizarlos y no ejecutar HTML procedente del backend.
- TypeScript comprueba el código, no valida JSON recibido. Antes de integrar
  HTTP se requiere validación de respuestas en ejecución desde el esquema
  acordado (OpenAPI/JSON Schema) y manejo de errores de validación.

## Modelos científicos

| Modelo | Contenido y trazabilidad |
| --- | --- |
| `ScientificSource` | ID, fuente/agencia, URL oficial, licencia y prioridad MVP/segunda fase/descartado. URL y licencia desconocidas son `null`. |
| `DatasetMetadata` | ID interno separado del `product_id` oficial, fuente, misión/instrumento, versión, resolución, unidades, descarga, categoría, verificación y limitaciones. |
| `CrsDatum` | Cuerpo, CRS, código de autoridad cuando exista, datum horizontal y vertical, unidad y convenciones de latitud/longitud. |
| `PlanetaryRegion` | Unión de región terrestre y objetivo Marte/Luna, rol, geometría, coordenadas aproximadas, CRS/datum, novedad, datasets y citas. |
| `ScientificObservation` | Región, dataset, fuente y enlace, producto, adquisición, versión, variable, unidad/resolución/datum, procesamiento, valor, calidad, incertidumbre y verificación. |
| `BibliographicCitation` | Título, autores, año, DOI, URL, fuente y fecha de consulta, sin inventar bibliografía. |
| `QualitativeEvidence` | Texto bibliográfico u observacional, comparación directa/indirecta/cualitativa, referencias a regiones/observaciones/citas y estado de verificación. |
| `ScientificLimitation` | Explicación, incompatibilidades, observaciones afectadas, citas, verificación y advertencia sobre habitabilidad. |
| `VariableComparison` | Observación de cada cuerpo, compatibilidad, unidad común, conversión explícita, remuestreo y evidencias/limitaciones. |
| `ComparisonPayload` | Regiones comparadas y conjunto autocontenido de observaciones, fuentes, productos, citas y evidencias; versión del contrato y metodología. |

`PlanetaryRegion` evita asignar el rol `planetary_target` a la Tierra y el rol
de calibración a Marte/Luna. El backend debe validar además que `crs_datum.body`
coincida con la región y que todos los IDs referenciados existan. Las relaciones
entre IDs, la validez de fechas, valores y geometrías requieren validación
en ejecución; los tipos por sí solos no las garantizan.

El estado `verificado_con_fuente` exige una referencia trazable resoluble y un
procedimiento de verificación documentado por el backend. No se asigna solo
porque exista un enlace. Un producto bibliográfico puede carecer de medición
instrumental o `product_id`; debe conservar su categoría y citar su evidencia.
Una observación instrumental pendiente de producto, datum o método no se
promueve automáticamente a verificada. El backend acordará las condiciones
de verificación por categoría antes de implementar validadores.

### Coordenadas, resolución y novedad

`Position` usa el orden `[longitud, latitud]`. Las estructuras Point/Polygon/
MultiPolygon siguen esa organización de coordenadas, pero **no se presentan
como GeoJSON RFC 7946**, porque el datum puede ser planetario y distinto de
WGS84. El backend debe validar cierre de anillos, rangos y convenciones.

Las coordenadas aproximadas son localizadores, no delimitaciones de productos.
No se dibujará una geometría de CRS desconocido. Nunca asumir que un código
EPSG terrestre representa Marte o la Luna ni convertir longitudes 0–360 a
−180–180 silenciosamente. La adaptación a mapas se definirá en Fase 1.

`SpatialResolution` separa X/Y, unidad y descripción. No equiparar tamaño de
píxel, resolución efectiva y precisión. Si solo se conoce una resolución
nominal textual, conservarla en `description` y dejar los ejes desconocidos
en `null`.

Los niveles de novedad propuestos son `reference_established`,
`candidate_to_assess` y `documented_novelty`; `null` significa sin evaluar.
`documented_novelty` requiere justificación y citas revisadas, y nunca se
deduce de la falta de datos. Este enum deberá acordarse con el backend.

## Datos requeridos por las vistas futuras

### `/explore`

Listará regiones terrestres y objetivos planetarios por ID, nombre, cuerpo,
país, rol, estado de verificación y novedad con justificación. Los filtros
iniciales serán cuerpo, país, rol y verificación; se necesita paginación
por cursor. Los filtros `null` se omiten de la query, no se envía la cadena
`"null"`. El backend definirá tamaños de página y orden estable.

El detalle de región aportará geometría, datum, datasets, observaciones, fuentes,
citas y limitaciones. Una región verificada no implica que todas sus
observaciones estén verificadas: cada elemento conserva su estado.

El alcance de estudio contempla Salar de Uyuni como referencia y sectores del
Altiplano Sur/Sol de Mañana como candidatos. Terra Sirenum se contempla como
objetivo marciano. Estos nombres proceden del brief; no constituyen un catálogo
precargado ni certifican coordenadas, productos o novedad científica.

### `/compare`

Recibirá `ComparisonPayload` tras enviar los IDs de una región terrestre y un
objetivo Marte/Luna. Por cada variable mostrará sus dos observaciones con
unidades, resolución, adquisición, versión, procesamiento, incertidumbre,
fuente y verificación; IDs de observaciones ausentes se representan con `null`.

`compatibility` expresa `compatible`, `requires_processing`, `incompatible` o
`pending`. Una comparación numérica exige unidades compatibles, método
reproducible y compatibilidad física revisada por el backend. `common_unit`
no transforma los valores originales: `unit_conversion_method` documenta el
procedimiento, que debe ejecutarse y validarse antes de mostrar valores
convertidos. Esta fase no incluye valores convertidos ni un motor de cálculo.

El remuestreo declara si se necesita, resolución destino, método,
justificación y si se ejecutó. `required: null` significa no evaluado;
`performed: null` significa ejecución desconocida. Se bloqueará una
comparación numérica si requiere procesamiento no completado. Remuestrear
no añade precisión ni resuelve diferencias de física planetaria.

Las limitaciones de gravedad, atmósfera, datum y procesos antiguos frente a
actuales se mostrarán junto a las variables afectadas. Las evidencias
cualitativas tendrán su texto y citas; no se convertirán en puntuaciones.
`dato_demostracion` deberá identificarse y excluirse de conclusiones científicas.

### `/methodology` y `/findings`

La metodología mostrará versión, procedimientos, conversiones/remuestreo,
criterios de compatibilidad, fuentes y limitaciones. Los hallazgos mostrarán
evidencia, observaciones que la sustentan y estado de verificación.
Las citas enlazarán al DOI o producto oficial con misión, instrumento,
versión, licencia y fecha de adquisición/consulta cuando estén disponibles.

NASA/ESA/CSA/JAXA son posibles organismos de procedencia, no fuentes que deban
atribuirse automáticamente a todo resultado. Una fuente oficial tampoco
valida por sí sola una interpretación. Diferenciar dato instrumental,
producto derivado, interpretación bibliográfica y dato de demostración.

No se propone aún un endpoint específico para hallazgos/metodología. La
comparación transporta referencias y versión metodológica, pero los textos
completos y hallazgos persistidos requieren un contrato adicional con backend.

## Reglas de UX científica obligatorias en Fase 1

| `verification_status` | Badge visible |
| --- | --- |
| `verificado_con_fuente` | Verificado con fuente |
| `inferencia_razonable` | Inferencia razonable |
| `hipotesis` | Hipótesis |
| `pendiente_de_verificar` | Pendiente de verificar |

- Mostrar texto además de color y conservar los badges en vistas de detalle,
  comparación y exportaciones futuras.
- Ante una medición `null`, mostrar **“Dato pendiente de verificación
  instrumental”**. Para metadatos desconocidos, indicar qué campo está
  pendiente. Nunca sustituir por cero, interpolar o inventar estimaciones.
- No mostrar elevaciones absolutas Tierra/Marte en el mismo eje sin advertir
  explícitamente los datums planetarios. Si el datum no está documentado,
  bloquear esa representación. La elevación no forma parte de las variables
  de comparación v0; incorporarla requerirá una extensión del contrato.
- La ausencia de metadatos impide declarar compatibilidad: mostrar pendiente
  de evaluación y las limitaciones conocidas.
- No deducir habitabilidad, presencia de vida o aptitud para instalaciones.
  Mostrar junto a evidencias/comparaciones/limitaciones el aviso literal:
  **“La analogía no implica habitabilidad ni idoneidad para una base humana.”**
- No calcular ni presentar similitud global, porcentajes o rankings arbitrarios.
- Diferenciar estados de carga, resultado vacío, error HTTP, respuesta inválida
  y medición desconocida. Una respuesta fallida nunca equivale a cero datos.

La interfaz inicial implementa badges, avisos, separación entre hipótesis y
verificación, y estados pendientes. Las reglas sobre observaciones recibidas,
conversiones, datums y remuestreo deberán verificarse de nuevo al integrar HTTP.

## Endpoints previstos, todos en fase de diseño

Las rutas son del servicio `analogx-backend`; no son handlers Next.js creados
en este repositorio. `PlannedApiContract` describe su forma propuesta, sin
implementar `fetch` ni asumir que están disponibles.

| Método y ruta | Entrada | Respuesta propuesta |
| --- | --- | --- |
| `GET /api/regions` | Filtros aplicables de `RegionFilters`, cursor opcional | `ListResponse<EarthRegion>` |
| `GET /api/regions/{id}` | ID opaco, codificado como segmento de URL | `RegionDetailResponse` |
| `GET /api/targets` | Cuerpo Mars/Moon, estado de verificación, cursor | `ListResponse<PlanetaryTarget>` |
| `POST /api/compare` | `CompareRequest`: `earth_region_id`, `planetary_target_id` | `ComparisonPayload` |
| `GET /api/sources` | Cursor; filtros adicionales por acordar | `ListResponse<ScientificSource>` |

`ListResponse<T>` contiene `items` y `next_cursor`; `null` indica última página.
El detalle propone resolver IDs de cualquier cuerpo. Confirmar si el backend
preferirá separar el detalle de objetivos.

Propuesta de errores: `ApiError` con `code`, `message`, `request_id` y `details`.
Acordar 400 para filtros inválidos, 404 para ID inexistente, 422 para solicitudes
de comparación inválidas y 5xx para fallos del servicio. Un resultado científico
incompatible puede ser una respuesta 200 con limitaciones; no es necesariamente
un error de transporte. La forma de errores por defecto de FastAPI/Pydantic
puede ser distinta y requiere conciliación explícita.

## Dependencias para iniciar Fase 1

1. Modelos Pydantic/OpenAPI revisados y versionados; confirmar compatibilidad
   campo a campo, campos nullable y estructura de errores/paginación.
2. Catálogo real de regiones/objetivos, productos oficiales, licencias, citas,
   fechas y niveles de verificación; política para IDs y referencias rotas.
3. Datums y convenciones planetarias explícitas; geometrías válidas y método
   reproducible de reproyección, conversión de unidades y remuestreo.
4. Variables comparables y criterios científicos validados, justificaciones
   de novedad y límites de interpretación. Sin fórmula de similitud asumida.
5. URL del backend, CORS, autenticación si aplica, salud existente cuando esté
   disponible, límites de petición y tiempos de espera. No se configuran aún.
6. Contratos para metodología y hallazgos persistidos, si esas vistas los
   necesitan fuera del contexto de una comparación.
7. Validación de respuestas en ejecución y adaptadores de representación antes
   de incorporar MapLibre o Recharts. No se instalan en Fase 0.

La validación local de tipos/build demuestra que la base compila; no demuestra
exactitud científica, disponibilidad del backend ni interoperabilidad HTTP.
