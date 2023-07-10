import { Page } from '@playwright/test';

/**
 * @todo set mock service worker with real response instead of calling actual API everytime
 */
export const enterPin = async (page: Page, pin: string) => {
    await page.getByPlaceholder('○').first().click();
    await page.getByRole('textbox', { name: 'Please enter your pin code' }).first().fill(pin);
    await page.getByRole('button', { name: 'Confirm' }).click();
};

export const withdraw = async (page: Page, amount: number | string) => {
    page.getByPlaceholder('€100').click();
    page.getByPlaceholder('€100').fill(String(amount));
    await page.getByRole('button', { name: 'Confirm' }).click();
};
