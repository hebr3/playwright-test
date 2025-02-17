import { test, expect } from "@playwright/test";

// tests/pages/login-page.js
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[type="text"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('h1:text("Login Failed")');
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async checkFormElements() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectCurrentUrl(path) {
    await expect(this.page).toHaveURL(path);
  }

  async verifyNotAuthenticated() {
    // Check localStorage is empty
    const token = await this.page.evaluate(() =>
      localStorage.getItem("authToken")
    );
    expect(token).toBeNull();
  }

  async verifyAuthenticated() {
    // Check localStorage has token
    const token = await this.page.evaluate(() =>
      localStorage.getItem("authToken")
    );
    expect(token).not.toBeNull();
  }
}
