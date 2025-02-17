import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";
import { DashboardPage } from "./pages/dashboard-page";
import { TeamPage } from "./pages/team-page";
import { ProjectsPage } from "./pages/projects-page";
import { CalendarPage } from "./pages/calendar-page";

test.describe("Page Navigation", () => {
  let loginPage, homePage, dashboardPage, teamPage, projectsPage, calendarPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    dashboardPage = new DashboardPage(page);
    teamPage = new TeamPage(page);
    projectsPage = new ProjectsPage(page);
    calendarPage = new CalendarPage(page);

    // Start from a logged-in state
    await loginPage.goto();
    await loginPage.login("USER_A", "PASS_A");
    await loginPage.expectCurrentUrl("/home");
    await homePage.verifyAuthenticated();
  });

  test("should navigate to Dashboard from Home", async ({ page }) => {
    await homePage.navigateTo("Dashboard");
    await dashboardPage.expectCurrentUrl("http://localhost:8080/dashboard");
    await dashboardPage.expectHeading();
  });

  test("should navigate to Team page from Home", async ({ page }) => {
    await homePage.navigateTo("Team");
    await teamPage.expectCurrentUrl("/team");
    await teamPage.expectHeading();
  });

  test("should navigate to Projects page from Home", async ({ page }) => {
    await homePage.navigateTo("Projects");
    await projectsPage.expectCurrentUrl("/projects");
    await projectsPage.expectHeading();
  });

  test("should navigate to Calendar page from Home", async ({ page }) => {
    await homePage.navigateTo("Calendar");
    await calendarPage.expectCurrentUrl("/calendar");
    await calendarPage.expectHeading();
  });

  test("should prevent access to protected pages when logged out", async ({
    page,
  }) => {
    await homePage.logout();
    await loginPage.expectCurrentUrl("/login");

    const protectedRoutes = ["/dashboard", "/team", "/projects", "/calendar"];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await loginPage.expectCurrentUrl("/login");
    }
  });
});
