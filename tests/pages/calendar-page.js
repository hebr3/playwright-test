import { test, expect } from "@playwright/test";

export class CalendarPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1:text('Calendar')");
  }

  async expectCurrentUrl(path = "/calendar") {
    await expect(this.page).toHaveURL(path);
  }

  async expectHeading() {
    await expect(this.heading).toBeVisible();
  }
}
