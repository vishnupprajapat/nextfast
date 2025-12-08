import type { Page } from "@playwright/test";

/**
 * Test Utilities for Playwright Tests
 * Provides reusable helper functions for common test operations
 */

/**
 * Wait for network to be idle (no requests for specified time)
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout = 2000,
): Promise<void> {
  await page.waitForLoadState("networkidle", { timeout });
}

/**
 * Fill form with validation
 */
export async function fillForm(
  page: Page,
  fields: Record<string, string>,
): Promise<void> {
  for (const [selector, value] of Object.entries(fields)) {
    const input = page.locator(selector);
    await input.fill(value);
    await input.blur(); // Trigger validation
  }
}

/**
 * Login as admin user
 */
export async function loginAsAdmin(
  page: Page,
  username: string,
  password: string,
): Promise<void> {
  await page.goto("/admin/admin-auth");

  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[type="password"]').fill(password);
  await page.locator('button[type="submit"]').click();

  // Wait for redirect after login
  await page.waitForURL(/admin/, { timeout: 10000 });
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(
  page: Page,
  name: string,
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await page.screenshot({
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Check for accessibility violations (basic)
 */
export async function checkAccessibility(page: Page): Promise<void> {
  // Check for missing alt attributes on images
  const imagesWithoutAlt = await page.locator("img:not([alt])").count();
  if (imagesWithoutAlt > 0) {
    console.warn(`Found ${imagesWithoutAlt} images without alt attributes`);
  }

  // Check for buttons without accessible labels
  const buttonsWithoutLabel = await page
    .locator("button:not([aria-label]):not(:has-text)")
    .count();
  if (buttonsWithoutLabel > 0) {
    console.warn(
      `Found ${buttonsWithoutLabel} buttons without accessible labels`,
    );
  }
}

/**
 * Clear browser storage
 */
export async function clearStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Mock API response
 */
export async function mockApiRoute(
  page: Page,
  url: string | RegExp,
  response: unknown,
): Promise<void> {
  await page.route(url, (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(response),
    });
  });
}

/**
 * Wait for element to be stable (no position changes)
 */
export async function waitForElementStable(
  page: Page,
  selector: string,
): Promise<void> {
  const element = page.locator(selector);
  await element.waitFor({ state: "visible" });

  let lastPosition = await element.boundingBox();
  let stable = false;
  let attempts = 0;

  while (!stable && attempts < 10) {
    await page.waitForTimeout(100);
    const currentPosition = await element.boundingBox();

    if (
      lastPosition?.x === currentPosition?.x &&
      lastPosition?.y === currentPosition?.y
    ) {
      stable = true;
    } else {
      lastPosition = currentPosition;
    }
    attempts++;
  }
}

/**
 * Get console messages during page load
 */
export async function captureConsoleLogs(page: Page): Promise<{
  errors: string[];
  warnings: string[];
  logs: string[];
}> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const logs: string[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    switch (msg.type()) {
      case "error":
        errors.push(text);
        break;
      case "warning":
        warnings.push(text);
        break;
      default:
        logs.push(text);
    }
  });

  return { errors, warnings, logs };
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(
  page: Page,
  selector: string,
): Promise<boolean> {
  const element = page.locator(selector);
  const box = await element.boundingBox();

  if (!box) return false;

  const viewport = page.viewportSize();
  if (!viewport) return false;

  return (
    box.x >= 0 &&
    box.y >= 0 &&
    box.x + box.width <= viewport.width &&
    box.y + box.height <= viewport.height
  );
}
