import { test as base } from "@playwright/test";
import { AdminDashboardPage } from "../utils/page-objects";

/**
 * Custom Fixtures for Playwright Tests
 * Extends the base test with custom fixtures
 */

type CustomFixtures = {
  adminDashboard: AdminDashboardPage;
};

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<CustomFixtures>({
  adminDashboard: async ({ page }, use) => {
    const adminDashboard = new AdminDashboardPage(page);
    await use(adminDashboard);
  },
});

export { expect } from "@playwright/test";
