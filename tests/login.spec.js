// tests/login.spec.js
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";

test.describe("Login Page", () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
  });

  test("should display login form", async () => {
    await loginPage.checkFormElements();
  });

  test("successful login redirects to home page", async () => {
    await loginPage.login("USER_A", "PASS_A");
    await loginPage.expectCurrentUrl("/home");
    await homePage.expectHomeHeading();
  });

  test("failed login shows error message", async () => {
    await loginPage.login("wrong_user", "wrong_pass");
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.expectCurrentUrl("/login");
  });

  test("empty form validation", async () => {
    await loginPage.submitButton.click();
    await loginPage.expectCurrentUrl("/login");
  });
});
