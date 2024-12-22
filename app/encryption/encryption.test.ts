import { comparePassword, hashPassword } from "./encryption";
test("encrypt password", () => {
  const password = "password";

  const result = comparePassword(password, hashPassword(password));

  expect(result).toBeTruthy();
});
