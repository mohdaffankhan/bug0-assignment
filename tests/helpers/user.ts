import { Page, expect } from "@playwright/test";

export type User = {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
  day: string;
  month: string;
  year: string;
};

export function randomUser(overrides: Partial<User> = {}): User {
  const stamp = `${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;
  return {
    name: `Tester${stamp.slice(-8)}`,
    email: `auto_${stamp}@example.com`,
    password: "Sup3rSecret!",
    firstName: "Auto",
    lastName: "Mation",
    company: "AutomationCo",
    address1: "123 Test Street",
    address2: "Suite 4",
    country: "United States",
    state: "California",
    city: "San Francisco",
    zipcode: "94101",
    mobile: "+15555550123",
    day: "10",
    month: "5",
    year: "1995",
    ...overrides,
  };
}

export async function gotoHome(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.locator('img[alt="Website for automation practice"]').first(),
  ).toBeVisible();
}

export async function openSignupLogin(page: Page) {
  await page.locator('a[href="/login"]').first().click();
  await expect(page).toHaveURL(/\/login/);
}

export async function startSignup(page: Page, name: string, email: string) {
  await expect(page.getByText("New User Signup!")).toBeVisible();
  await page.locator('[data-qa="signup-name"]').fill(name);
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();
  await expect(
    page.getByText("Enter Account Information", { exact: false }),
  ).toBeVisible();
}

export async function fillAccountInfo(page: Page, user: User) {
  await page.locator("#id_gender1").check();
  await page.locator('[data-qa="password"]').fill(user.password);
  await page.locator('[data-qa="days"]').selectOption(user.day);
  await page.locator('[data-qa="months"]').selectOption(user.month);
  await page.locator('[data-qa="years"]').selectOption(user.year);
  await page.locator("#newsletter").check();
  await page.locator("#optin").check();

  await page.locator('[data-qa="first_name"]').fill(user.firstName);
  await page.locator('[data-qa="last_name"]').fill(user.lastName);
  await page.locator('[data-qa="company"]').fill(user.company);
  await page.locator('[data-qa="address"]').fill(user.address1);
  await page.locator('[data-qa="address2"]').fill(user.address2);
  await page.locator('[data-qa="country"]').selectOption(user.country);
  await page.locator('[data-qa="state"]').fill(user.state);
  await page.locator('[data-qa="city"]').fill(user.city);
  await page.locator('[data-qa="zipcode"]').fill(user.zipcode);
  await page.locator('[data-qa="mobile_number"]').fill(user.mobile);

  await page.locator('[data-qa="create-account"]').click();
  await expect(page.getByText("Account Created!", { exact: false })).toBeVisible();
  await page.locator('[data-qa="continue-button"]').click();
}

export async function signUp(page: Page, user: User) {
  await gotoHome(page);
  await openSignupLogin(page);
  await startSignup(page, user.name, user.email);
  await fillAccountInfo(page, user);
  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();
}

export async function login(page: Page, email: string, password: string) {
  await gotoHome(page);
  await openSignupLogin(page);
  await expect(page.getByText("Login to your account")).toBeVisible();
  await page.locator('[data-qa="login-email"]').fill(email);
  await page.locator('[data-qa="login-password"]').fill(password);
  await page.locator('[data-qa="login-button"]').click();
}

export async function logout(page: Page) {
  await page.locator('a[href="/logout"]').click();
  await expect(page).toHaveURL(/\/login/);
}

export async function deleteAccount(page: Page) {
  await page.locator('a[href="/delete_account"]').click();
  await expect(page.getByText("Account Deleted!", { exact: false })).toBeVisible();
  await page.locator('[data-qa="continue-button"]').click();
}
