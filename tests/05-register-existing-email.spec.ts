import { test, expect } from "@playwright/test";
import {
  randomUser,
  signUp,
  logout,
  login,
  deleteAccount,
  gotoHome,
  openSignupLogin,
  User,
} from "./helpers/user";

test.describe.configure({ mode: "serial" });

let user: User;

test.beforeAll(async ({ browser }) => {
  user = randomUser();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await signUp(page, user);
  await logout(page);
  await ctx.close();
});

test.afterAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await login(page, user.email, user.password);
  await deleteAccount(page);
  await ctx.close();
});

test("Test Case 5: Register User with existing email", async ({ page }) => {
  await gotoHome(page);
  await openSignupLogin(page);

  await expect(page.getByText("New User Signup!")).toBeVisible();
  await page.locator('[data-qa="signup-name"]').fill(user.name);
  await page.locator('[data-qa="signup-email"]').fill(user.email);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(page.getByText("Email Address already exist!")).toBeVisible();
});
