// tests/navigation.spec.js
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";

test.describe("Navigation", () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    // Clear localStorage before each test
    // await page.evaluate(() => localStorage.clear());

    // Start from logged in state
    await loginPage.goto();
    await loginPage.login("USER_A", "PASS_A");
    await loginPage.expectCurrentUrl("/home");
    await homePage.verifyAuthenticated();
  });

  test("should prevent access to home page when not authenticated", async ({
    page,
  }) => {
    // Logout first
    await homePage.logout();
    await loginPage.verifyNotAuthenticated();

    // Try to access home page directly
    await page.goto("/home");
    await loginPage.expectCurrentUrl("/login");
  });

  test("should prevent navigation back to home after logout", async ({
    page,
  }) => {
    // First logout
    await homePage.logout();
    await loginPage.expectCurrentUrl("/login");
    await loginPage.verifyNotAuthenticated();

    // Try to go back
    await page.goBack();
    await loginPage.expectCurrentUrl("/login");
  });

  test("should show profile dropdown when clicking profile button", async () => {
    await homePage.profileButton.click();
    await expect(homePage.dropdownMenu).toBeVisible();

    // Click outside should close dropdown
    await homePage.heading.click();
    await expect(homePage.dropdownMenu).not.toBeVisible();
  });

  test("should logout and redirect to login page", async () => {
    await homePage.logout();
    await loginPage.expectCurrentUrl("/login");

    // Verify we can't go back to home page using browser navigation
    await homePage.page.goBack();
    await loginPage.expectCurrentUrl("/login");
  });

  test("logout button should be visible in dropdown", async () => {
    await homePage.openProfileDropdown();
    await expect(homePage.logoutButton).toBeVisible();
    await expect(homePage.logoutButton).toHaveText("Logout");
  });

  test("should handle multiple logout attempts", async () => {
    // First logout
    await homePage.logout();
    await loginPage.expectCurrentUrl("/login");

    // Login again
    await loginPage.login("USER_A", "PASS_A");
    await loginPage.expectCurrentUrl("/home");

    // Second logout
    await homePage.logout();
    await loginPage.expectCurrentUrl("/login");
  });
});
