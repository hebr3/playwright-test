import { test, expect } from "@playwright/test";

// tests/pages/home-page.js
export class HomePage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
    this.profileButton = page.locator("button:has(.lucide-user)");
    this.logoutButton = page.locator('button:text("Logout")');
    this.dropdownMenu = page.locator(".absolute.right-0.mt-2");
  }

  async expectHomeHeading() {
    await expect(this.heading).toHaveText("HOME PAGE");
  }

  async openProfileDropdown() {
    await this.profileButton.click();
    await expect(this.dropdownMenu).toBeVisible();
  }

  async logout() {
    await this.openProfileDropdown();
    await this.logoutButton.click();
  }

  async verifyAuthenticated() {
    // Check localStorage has token
    const token = await this.page.evaluate(() =>
      localStorage.getItem("authToken")
    );
    expect(token).not.toBeNull();
  }

  async navigateTo(pageName) {
    await this.page.locator(`a:text("${pageName}")`).click();
  }
}
