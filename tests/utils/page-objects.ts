import type { Page } from "@playwright/test";

/**
 * Page Object Model: Admin Dashboard
 * Encapsulates admin dashboard page interactions
 */
export class AdminDashboardPage {
  constructor(private page: Page) {}

  // Selectors
  private selectors = {
    loginForm: "form",
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[type="password"]',
    submitButton: 'button[type="submit"]',
    dashboardNav: "nav",
    productsLink: 'a[href*="products"]',
    ordersLink: 'a[href*="orders"]',
    usersLink: 'a[href*="users"]',
    logoutButton: 'button:has-text("Logout")',
  };

  // Navigation
  async goto() {
    await this.page.goto("/admin");
  }

  async gotoLogin() {
    await this.page.goto("/admin/admin-auth");
  }

  // Actions
  async login(username: string, password: string) {
    await this.page.locator(this.selectors.usernameInput).fill(username);
    await this.page.locator(this.selectors.passwordInput).fill(password);
    await this.page.locator(this.selectors.submitButton).click();
    await this.page.waitForURL(/admin\/(?!admin-auth)/);
  }

  async logout() {
    const logoutButton = this.page.locator(this.selectors.logoutButton).first();
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    }
  }

  async navigateToProducts() {
    await this.page.locator(this.selectors.productsLink).click();
    await this.page.waitForURL(/products/);
  }

  async navigateToOrders() {
    await this.page.locator(this.selectors.ordersLink).click();
    await this.page.waitForURL(/orders/);
  }

  async navigateToUsers() {
    await this.page.locator(this.selectors.usersLink).click();
    await this.page.waitForURL(/users/);
  }

  // Assertions
  async isLoggedIn(): Promise<boolean> {
    const nav = this.page.locator(this.selectors.dashboardNav);
    return await nav.isVisible();
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.page.url().includes("admin-auth");
  }
}
