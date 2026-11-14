import { expect, test } from "@playwright/test";

test("mapa real, selección, filtros y comparación", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/explore");
  await expect(page.getByRole("button", { name: "Acercar mapa", exact: true })).toBeEnabled();
  await expect(page.locator(".maplibregl-canvas")).toBeVisible();
  await expect(page.getByRole("button", { name: "Seleccionar Sol de Mañana en el mapa" })).toBeVisible();
  await page.getByRole("button", { name: "Seleccionar Sol de Mañana en el mapa" }).click();
  await expect(page.locator(".selected-region h2")).toHaveText("Sol de Mañana");
  await expect(page.locator(".map-location-strip")).toContainText("ENDE");
  await page.getByRole("button", { name: "Configurar capas" }).click();
  await page.getByLabel("Nombres de sitios").uncheck();
  await expect(page.locator(".geographic-marker-label").first()).toBeHidden();
  await page.getByLabel("Nombres de sitios").check();
  await page.getByRole("button", { name: "Cerrar capas" }).click();
  await page.getByRole("button", { name: "Cartográfico", exact: true }).click();
  await expect(page.getByRole("button", { name: "Cartográfico", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".map-context")).toContainText("OpenStreetMap");
  await page.getByRole("button", { name: "Satélite", exact: true }).click();
  await page.getByLabel("Rol en el estudio").selectOption("reference_calibration");
  await expect(page.locator(".geographic-marker")).toHaveCount(1);
  await page.getByLabel("Rol en el estudio").selectOption("all");
  await page.getByRole("button", { name: /Altiplano Sur.*Candidato/ }).click();
  await expect(page.locator(".map-location-strip")).toContainText("pendiente de delimitar");
  await page.getByLabel("Buscar región por nombre").fill("no-existe");
  await expect(page.getByText("No hay regiones con esos filtros.")).toBeVisible();
  await expect(page.locator(".geographic-marker")).toHaveCount(0);
  await page.getByRole("button", { name: "Limpiar filtros" }).click();
  await page.getByRole("button", { name: /Salar de Uyuni.*Referencia de calibración/ }).click();
  await page.getByRole("button", { name: "Ver ficha de la región" }).click();
  await expect(page.getByRole("dialog")).toContainText("USGS");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Luna", exact: true }).click();
  await page.getByRole("link", { name: "Abrir comparación" }).click();
  await expect(page).toHaveURL(/\/compare\?region=salar-de-uyuni&body=Moon/);
  await expect(page.locator(".compare-pair")).toContainText("Objetivo por definir");
  expect(errors).toEqual([]);
});

test("presentación de escritorio y móvil sin desbordamientos", async ({ page }) => {
  test.setTimeout(75_000);
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/explore");
  await expect(page.getByRole("button", { name: "Acercar mapa", exact: true })).toBeEnabled();
  await expect.poll(() => page.locator(".satellite-preview").first().evaluate(image => image.complete && image.naturalWidth > 0), { timeout: 45_000 }).toBe(true);
  await expect(page.locator(".map-loading")).toBeHidden();
  await page.screenshot({ path: "test-results/explore-desktop.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".maplibregl-canvas")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.screenshot({ path: "test-results/explore-mobile.png", fullPage: true });
});

test("fallo de teselas mantiene disponibles las regiones", async ({ page }) => {
  await page.route("https://server.arcgisonline.com/**", route => route.abort());
  await page.goto("/explore");
  await expect(page.locator(".map-error")).toBeVisible();
  await page.getByRole("button", { name: /Sol de Mañana.*Candidato de investigación/ }).click();
  await expect(page.locator(".selected-region h2")).toHaveText("Sol de Mañana");
  await page.getByRole("button", { name: "Ver ficha de la región" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
