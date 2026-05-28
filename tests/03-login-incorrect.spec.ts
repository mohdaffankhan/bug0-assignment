import { test, expect } from "@playwright/test";
import { gotoHome, openSignupLogin } from "./helpers/user";

test("Test Case 3: Login User with incorrect email and password", async ({
  page,
}) => {
  await gotoHome(page);
  await openSignupLogin(page);

  await expect(page.getByText("Login to your account")).toBeVisible();

  const fakeEmail = `nobody_${Date.now()}@example.com`;
  await page.locator('[data-qa="login-email"]').fill(fakeEmail);
  await page.locator('[data-qa="login-password"]').fill("DefinitelyWrong!");
  await page.locator('[data-qa="login-button"]').click();

  await expect(
    page.getByText("Your email or password is incorrect!"),
  ).toBeVisible();
});
