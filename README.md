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

- `/explore`: búsqueda por nombre, filtros por rol, selección de Marte/Luna,
  esquema regional con zoom/capas y fichas de regiones.
- `/compare`: comparación por variable; acepta `region` y `body` en la URL.
- `/methodology`: procedencia, compatibilidad, verificación y límites.
- `/findings`: estado vacío hasta disponer de hallazgos verificados.

Los nombres y roles de `src/lib/study-catalog.ts` proceden del brief inicial.
Las regiones no contienen mediciones, coordenadas ni productos inventados.
El esquema vectorial y los paisajes son ilustraciones, sin georreferenciación.
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
puntuaciones globales. No se han añadido MapLibre ni Recharts.
