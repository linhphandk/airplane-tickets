import type { Page, Locator } from "@playwright/test";

export class Register {
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly registerButton: Locator;

  constructor(public readonly page: Page) {
    this.emailField = this.page.getByTestId("email");
    this.passwordField = this.page.getByTestId("password");
    this.registerButton = this.page.getByTestId("register");
  }

  async register(): Promise<string[]> {
    await this.page.goto("localhost:3000/register");
    const email = "test" + Date.now() + "@gmail.com";
    await this.emailField.type(email);
    const password = "password";
    await this.passwordField.type(password);
    await this.registerButton.click();
    return [email, password];
  }
}
