// Ejecutar con la aplicación de producción activa: npm start -- --port 3100
import assert from "node:assert/strict";

const baseUrl = process.env.ANALOGX_TEST_URL ?? "http://127.0.0.1:3100";
const options = { signal: AbortSignal.timeout(10_000) };
const root = await fetch(new URL("/", baseUrl), { ...options, redirect: "manual" });
assert.equal(root.status, 307, "La portada debe redirigir");
assert.equal(root.headers.get("location"), "/explore");
console.log("PASS / → /explore");

const cases = [
  { path: "/explore", text: "Otros mundos empiezan en la Tierra." },
  { path: "/compare?region=sol-de-manana&body=Moon", text: "Objetivo por definir", region: "Sol de Mañana" },
  { path: "/compare?region=inexistente&body=invalid", text: "Terra Sirenum", region: "Salar de Uyuni" },
  { path: "/methodology", text: "La evidencia antes" },
  { path: "/findings", text: "Aún no hay hallazgos publicados." },
];

for (const item of cases) {
  const response = await fetch(new URL(item.path, baseUrl), { signal: AbortSignal.timeout(10_000) });
  assert.equal(response.status, 200, item.path);
  const html = await response.text();
  assert.ok(html.includes(item.text), `Contenido esperado en ${item.path}`);
  assert.ok(html.includes('aria-label="Navegación principal"'), "Navegación compartida");
  if (item.region) {
    assert.ok(html.includes(`<small>${item.region}</small>`), "La tabla debe conservar la región solicitada o su fallback");
    assert.ok(html.includes("Dato pendiente de verificación instrumental"), "Las mediciones ausentes deben identificarse");
  }
  console.log(`PASS ${item.path} HTTP 200`);
}
