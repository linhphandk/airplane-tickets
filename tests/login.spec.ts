import { test, expect } from "@playwright/test";
import { Register } from "./Register.fixture";
import { getUserFromLs } from "./helpers";
test("login", async ({ page }) => {
  const [email, password] = await new Register(page).register();

  await page.goto("localhost:3000");
  const emailField = await page.getByTestId("email");
  await emailField.type(email);
  expect(emailField).toHaveValue(email);
  const passwordField = await page.getByTestId(password);
  await passwordField.type(password);
  expect(passwordField).toHaveValue(password);
  await page.getByTestId("signin").click();
  await page.waitForURL("**\/dashboard");
  const u = await getUserFromLs(page);
  expect(u?.email).toBe(email);
  expect(u?.id).toBeDefined();
});
