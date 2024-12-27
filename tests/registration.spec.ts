import { test, expect } from "@playwright/test";
import { getUserFromLs } from "./helpers";
test("registration", async ({ page }) => {
  await page.goto("localhost:3000/register");
  const emailField = await page.getByTestId("email");
  const email = "test+" + Date.now() + "@test.com";
  await emailField.type(email);
  expect(emailField).toHaveValue(email);
  const passwordField = await page.getByTestId("password");
  await passwordField.type("password");
  expect(passwordField).toHaveValue("password");
  await page.getByTestId("register").click();
  await page.waitForURL("**\/dashboard");
  const u = await getUserFromLs(page);
  expect(u?.email).toBe(email);
  expect(u?.id).toBeDefined();
});
