import { expect, test } from '@playwright/test';
import { enterPin, withdraw } from "../utils";

test.describe('Cash Withdrawal', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await enterPin(page, '1111');
    });

    test.afterEach(async ({ page }) => {
        await page.reload()
    });

    test("Deducts users' balance correctly when withdrawal is successful", async ({ page }) => {
        page.getByRole('button', { name: 'View Balance' }).click();
        expect(page.getByText('€220.00')).toBeDefined()

        await page.getByRole('button', { name: 'Back' }).click();
        await page.getByRole('button', { name: 'Withdraw Cash' }).click();
        await withdraw(page, 100)
        await page.getByRole('button', { name: 'Make New Transaction' }).click();
        await page.getByRole('button', { name: 'View Balance' }).click();
        expect(page.getByText('€120.00')).toBeDefined()

        await page.getByRole('button', { name: 'Back' }).click();
        await page.getByRole('button', { name: 'Withdraw Cash' }).click();
        await withdraw(page, 50)
        await page.getByRole('button', { name: 'Make New Transaction' }).click();
        await page.getByRole('button', { name: 'View Balance' }).click();
        expect(page.getByText('€70.00')).toBeDefined()

        await page.getByRole('button', { name: 'Back' }).click();
        await page.getByRole('button', { name: 'Withdraw Cash' }).click();
        await withdraw(page, 60)
        await page.getByRole('button', { name: 'Make New Transaction' }).click();
        await page.getByRole('button', { name: 'View Balance' }).click();
        expect(page.getByText('€10.00')).toBeDefined()
    });

    test("Users' balance remain unchanged when withdrawal is unsuccessful", async ({ page }) => {
        page.getByRole('button', { name: 'View Balance' }).click();
        expect(page.getByText('€220.00')).toBeDefined()

        await page.getByRole('button', { name: 'Back' }).click();
        await page.getByRole('button', { name: 'Withdraw Cash' }).click();
        await withdraw(page, 1200);
        expect(page.getByRole('heading', { name: 'Transaction Failed' })).toBeDefined()
        expect(page.getByText('Your request has exceeded the overdraft limit. Please contact our customer support for further assistance.')).toBeDefined()

        await page.getByRole('button', { name: 'Make New Transaction' }).click();
        await page.getByRole('button', { name: 'View Balance' }).click();
        expect(page.getByText('€220.00')).toBeDefined()
    });
});