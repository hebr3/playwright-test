// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
    // Record video for failed tests
    video: "retain-on-failure",
    // Take screenshot for failed tests
    screenshot: "only-on-failure",
  },
  // Run tests in 3 parallel browsers
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    // {
    //   name: "firefox",
    //   use: { browserName: "firefox" },
    // },
    // {
    //   name: "webkit",
    //   use: { browserName: "webkit" },
    // },
  ],
});
