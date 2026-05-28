import { test, expect } from "@playwright/test";
import { runSteps, configure } from "passmark";

const hasKey = !!process.env.OPENROUTER_API_KEY;

test.skip(
  !hasKey,
  "Set OPENROUTER_API_KEY in .env to run the Passmark spec.",
);

if (hasKey) {
  configure({ ai: { gateway: "openrouter" } });
}

test("Passmark: Login User with incorrect email and password", async ({
  page,
}) => {
  test.setTimeout(180_000);

  const fakeEmail = `nobody_${Date.now()}@example.com`;

  await runSteps({
    page,
    test,
    expect,
    userFlow: "Login with incorrect credentials",
    steps: [
      { description: "Navigate to https://automationexercise.com" },
      {
        description: "Click the 'Signup / Login' link in the top navigation",
        waitUntil: "the 'Login to your account' heading is visible",
      },
      {
        description: "Fill the login email input",
        data: { value: fakeEmail },
      },
      {
        description: "Fill the login password input",
        data: { value: "DefinitelyWrong!" },
      },
      { description: "Click the 'Login' button under the login form" },
    ],
    assertions: [
      {
        assertion:
          "The error message 'Your email or password is incorrect!' is visible on the page",
      },
    ],
  });
});
