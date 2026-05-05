const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/ui",
  timeout: 60_000,
  fullyParallel: true,
  reporter: "list",
  outputDir: "test-results",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        browserName: "chromium",
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1600 },
      },
    },
    {
      name: "mobile-chromium",
      use: {
        browserName: "chromium",
        ...devices["iPhone 13"],
      },
    },
  ],
  webServer: {
    command: "npm.cmd start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      BROWSER: "none",
      CI: "true",
    },
  },
});
