import { test as base } from "@playwright/test";
import { Register } from "./Register.fixture";

// Declare the types of your fixtures.
type MyFixtures = {
  registerFixture: Register;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  registerFixture: async ({ page }, use) => {
    // Set up the fixture.
    const registerFixture = new Register(page);
    const [email, password] = await registerFixture.register();

    // Use the fixture value in the test.
    await use(registerFixture);
    console.log(email, password);
  },
});
export { expect } from "@playwright/test";
