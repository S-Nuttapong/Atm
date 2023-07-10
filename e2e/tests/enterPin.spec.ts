import { expect, test } from '@playwright/test';
import { enterPin } from "../utils";

test.describe('Login by entering the PIN', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    });

    test.afterEach(async ({ page }) => {
        await page.reload()
    });

    test('Bring users to the main menu when login success', async ({ page }) => {
        await enterPin(page, '1111')
        expect(page.getByRole('heading', { name: 'Choose your transaction' })).toBeDefined()
    })

    test('Holds users on login view on failed login, and display error message', async ({ page }) => {
        await enterPin(page, '2222')
        expect(page.getByText('Invalid PIN. Please check your PIN and try again.')).toBeDefined()
    })
});

