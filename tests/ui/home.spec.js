const { test, expect } = require("@playwright/test");
const fs = require("fs/promises");
const path = require("path");

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

test("capture the home page for iterative frontend review", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  await expect(page.locator(".App")).toBeVisible();

  const outputDir = path.join(process.cwd(), "playwright-artifacts");
  await ensureDir(outputDir);

  const targetFile = path.join(outputDir, `${testInfo.project.name}.png`);
  await page.screenshot({ path: targetFile, fullPage: true });
});
