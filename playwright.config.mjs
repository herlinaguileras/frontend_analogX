import { defineConfig } from "@playwright/test";

const baseURL = process.env.ANALOGX_TEST_URL ?? "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  timeout: 45_000,
  expect: { timeout: 20_000 },
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    ...(process.platform === "win32" ? { channel: "msedge" } : {}),
    launchOptions: { args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] },
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm start -- --hostname 127.0.0.1 --port 3100",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
