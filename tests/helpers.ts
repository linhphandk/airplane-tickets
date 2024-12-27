import { Page } from "@playwright/test";
type LSUser = {
  id: number;
  email: string;
};
export const getUserFromLs = async (page: Page): Promise<LSUser | null> => {
  const origins = (await page.context().storageState()).origins.at(0);
  if (origins === null) {
    return null;
  }
  const ls = origins?.localStorage;
  const u = JSON.parse(ls?.find((item) => item.name === "user")?.value ?? "");
  return u;
};
