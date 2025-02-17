import { test, expect } from "@playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1:text('Dashboard Page')");
  }

  async expectCurrentUrl(path = "/dashboard") {
    await expect(this.page).toHaveURL(path);
  }

  async expectHeading() {
    await expect(this.heading).toBeVisible();
  }
}
