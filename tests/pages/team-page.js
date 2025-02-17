import { test, expect } from "@playwright/test";

export class TeamPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1:text('Team')");
  }

  async expectCurrentUrl(path = "/team") {
    await expect(this.page).toHaveURL(path);
  }

  async expectHeading() {
    await expect(this.heading).toBeVisible();
  }
}
