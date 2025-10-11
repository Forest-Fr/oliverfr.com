import { test, expect } from '@playwright/test';

test('page opens and has title', async ({ page }) => {
  await page.goto(process.env.SITE_URL!);     // 从工作流传入
  await expect(page).toHaveTitle(/oliverfr/i);
});
