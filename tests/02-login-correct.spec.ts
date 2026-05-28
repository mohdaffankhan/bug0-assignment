import { test, expect } from "@playwright/test";
import {
  randomUser,
  signUp,
  logout,
  login,
  deleteAccount,
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

test("Test Case 2: Login User with correct email and password", async ({
  page,
}) => {
  await login(page, user.email, user.password);
  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();
  await deleteAccount(page);
});
