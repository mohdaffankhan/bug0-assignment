import { test, expect } from "@playwright/test";
import {
  randomUser,
  gotoHome,
  openSignupLogin,
  startSignup,
  fillAccountInfo,
  deleteAccount,
} from "./helpers/user";

test("Test Case 1: Register User", async ({ page }) => {
  const user = randomUser();

  await gotoHome(page);
  await openSignupLogin(page);
  await startSignup(page, user.name, user.email);
  await fillAccountInfo(page, user);

  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

  await deleteAccount(page);
});
