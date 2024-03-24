import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:4200/sign-in');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sign in/);
});
