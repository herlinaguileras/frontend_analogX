// Ejecutar con la aplicación activa: npm run dev o npm start
import assert from "node:assert/strict";

const baseUrl = process.env.ANALOGX_TEST_URL ?? "http://localhost:3000";
const options = { signal: AbortSignal.timeout(10_000) };

const cases = [
  { path: "/", text: "Otros mundos empiezan en la Tierra." },
  { path: "/earth", text: "Catálogo de Análogos Terrestres" },
  { path: "/explore", text: "Dual-World Terrain Comparator" },
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
  if (item.region) {
    assert.ok(html.includes(`<small>${item.region}</small>`), "La tabla debe conservar la región solicitada o su fallback");
    assert.ok(html.includes("Dato pendiente de verificación instrumental"), "Las mediciones ausentes deben identificarse");
  }
  console.log(`PASS ${item.path} HTTP 200`);
}
console.log("ALL SMOKE TESTS PASSED SUCCESSFULLY!");

