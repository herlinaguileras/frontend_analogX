# AnalogX — frontend

Aplicación local con Next.js App Router, TypeScript estricto y Tailwind CSS.
Incluye el contrato de Fase 0 y la primera interfaz de Fase 1.
El contrato científico está descrito en
[docs/frontend-data-contract.md](docs/frontend-data-contract.md).

## Desarrollo

Requiere Node.js 22.13 o superior y npm.

```sh
npm ci
```

Prepara las variables locales en PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Después inicia la aplicación:

```sh
npm run dev
```

Abre `http://localhost:3000`. La ruta `/` redirige a `/explore`.

- `/`: Hero principal con Globo ASCII 3D y accesos directos al Reto NASA.
- `/earth`: Vista de la Tierra 360°, Globo Esférico 3D (MapLibre GL), selector de 177 países con animación orbital, filtros por fenómeno físico sin emojis y fichas técnicas NASA (Topología, Clima, ISRU, Aterrizaje y Rigor Epistemológico).
- `/explore`: consola científica de análogos terrestres contrastados con 6 destinos en Marte y la Luna.
- `/compare`: comparación por variable, terradinámica de rovers, balance ISRU de agua,
  blindaje de hábitats, Scorecard de 7 Dimensiones NASA y Cláusula de Rigor Epistemológico.
- `/methodology`: procedencia, compatibilidad, verificación y fuentes cartográficas globales.
- `/findings`: bitácora científica con hallazgos preliminares y principios de trazabilidad.

El catálogo integra 9 regiones análogas: 5 de Bolivia (novedad científica y análogos emergentes)
junto a 4 referencias canónicas globales (Atacama en Chile, Valles Secos de McMurdo en la Antártida,
Cráter Haughton en Canadá y Tubos de Lava de Lanzarote en España).
Los objetivos planetarios abarcan 6 sitios estratégicos: Terra Sirenum, Cráter Jezero (Perseverance)
y Cráter Gale (Curiosity) en Marte; Polo Sur Lunar (Artemis / Shackleton), Fosa de Marius Hills
(Skylight basáltico) y Mare Tranquillitatis en la Luna, con enlaces dinámicos a NASA Trek y LROC QuickMap.
El mapa utiliza MapLibre GL JS, Esri World Imagery y OpenStreetMap. Necesita
conexión a Internet y WebGL; no requiere una clave para los servicios públicos
configurados. Las atribuciones permanecen visibles en el mapa.
Los localizadores de navegación están separados de los datos científicos:
Uyuni referencia el catálogo USGS y Sol de Mañana utiliza una coordenada ENDE
convertida con Proj4. El Altiplano Sur no tiene un marcador ni límites inventados.
Las fuentes, las convenciones y la precisión se explican en `/methodology#cartography`.
Las vistas previas terrestres usan teselas de contexto; los paisajes planetarios
siguen siendo ilustraciones y no se presentan como productos científicos.
Los filtros exploran el catálogo de estudio, no calculan similitud planetaria.
No se realizan solicitudes a endpoints científicos todavía inexistentes.

```sh
npm run typecheck
npm run build
npm start
```

Para verificar las rutas de producción, inicia `npm start -- --port 3100` y
ejecuta `npm run test:smoke` en otra terminal. `ANALOGX_TEST_URL` permite usar
otra dirección. Esta comprobación valida respuestas HTTP, redirección, selección
por URL y estados pendientes; no sustituye la revisión visual en navegador.

Para probar las interacciones de mapa, filtros, comparación y vista móvil:

```sh
npm run build
npm run test:e2e
```

Playwright inicia y detiene su servidor de producción en el puerto 3100.
En Windows usa Microsoft Edge instalado, en modo sin ventana. En otros sistemas,
instala Chromium con `npx playwright install chromium`. Las capturas de escritorio
y móvil se guardan en `test-results/` (excluido de Git). Una prueba adicional
simula fallos del proveedor de teselas para comprobar la continuidad de la UI.

## Cartografía

`src/lib/map-config.ts` centraliza las fuentes, atribuciones y localizadores;
`src/components/regional-map.tsx` gestiona la instancia MapLibre, cambios de capa,
marcadores, controles, errores y liberación de recursos al navegar. El mapa se
carga únicamente en el navegador, en un módulo separado del renderizado inicial.

La capa satelital es un mosaico de contexto; su fecha y resolución no se
presuponen. La cartografía no entra en los cálculos de comparación ni convierte
una región en verificada. Los localizadores utilizan longitudes/latitudes para
navegar, mientras la representación cartográfica es Web Mercator (EPSG:3857).
El datum de las observaciones seguirá siendo el que documente el backend.

Para un despliegue con tráfico significativo, revisar las condiciones y capacidad
de los proveedores de teselas y configurar un servicio adecuado. Esta aplicación
no hace descargas masivas ni ofrece almacenamiento sin conexión.

## Variables de entorno

`.env.example` es la plantilla versionada. `.env.local` y los demás archivos
`.env*` locales están excluidos de Git. No añadir credenciales a la plantilla
ni a variables con prefijo `NEXT_PUBLIC_`, que son visibles en el navegador.

| Variable | Uso | Valor local propuesto |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Reservada para el futuro cliente HTTP; la interfaz actual no la consume | `http://localhost:8000` |
| `ANALOGX_TEST_URL` | URL de la aplicación activa para las pruebas HTTP | `http://127.0.0.1:3100` |

El puerto 8000 es una propuesta de desarrollo, pendiente de confirmar con el
backend. Las pruebas cargan `.env.local` si existe; una variable ya definida
en el proceso tiene prioridad. Reinicia `npm run dev` al modificar variables.
Las variables `NEXT_PUBLIC_*` se fijan al compilar: configurar su valor de
despliegue antes de ejecutar `npm run build` cuando se integre el cliente HTTP.

Este directorio estaba vacío al iniciar. No existían `src/lib/types.ts`,
`src/lib/api.ts`, rutas de aplicación ni `/api/health`. No se ha creado un
endpoint de salud que simule la disponibilidad del backend.

Los endpoints documentados son propuestas pendientes de acuerdo con el backend;
no representan servicios disponibles ni un contrato Pydantic ya validado.

## Integración pendiente

Sustituir el catálogo inicial por respuestas validadas contra el esquema del
backend, resolver datums/geometrías y conectar observaciones y citas. La
comparación presenta datos pendientes hasta contar con evidencia; no calcula
puntuaciones globales. MapLibre está integrado para navegación cartográfica;
Recharts y las comparaciones instrumentales siguen pendientes.
