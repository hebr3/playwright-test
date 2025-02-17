import { test, expect } from "@playwright/test";

export class ProjectsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1:text('Projects')");
  }

  async expectCurrentUrl(path = "/projects") {
    await expect(this.page).toHaveURL(path);
  }

  async expectHeading() {
    await expect(this.heading).toBeVisible();
  }
}
