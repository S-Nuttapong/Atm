import { expect, test } from '@playwright/test';
import { enterPin, withdraw } from '../utils';

test.describe('Cash withdrawal', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await enterPin(page, '1111');
        await page.getByRole('button', { name: 'Withdraw Cash' }).click();
    });

    test.afterEach(async ({ page }) => {
        await page.reload()
    });

    //TODO: assert the cash dispensation: did users receive correct amount, and such, once the acceptance criteria has been discussed
    test('Displays transaction success to users when the amount is within the available balance', async ({ page }) => {
        await withdraw(page, 50);
        expect(page.getByRole('heading', { name: 'Transaction Success' })).toBeDefined()
    });

    //TODO: mock the atm's banknotes and user's balance, once our app has connected real BE
    test('Displays an insufficient funds message when the request amount is higher than what available in ATM', async ({ page }) => {
        await withdraw(page, 320);
        expect(page.getByRole('heading', { name: 'Transaction Failed' })).toBeDefined()
        expect(page.getByText('The ATM does not have sufficient funds available. Please contact our customer support for further assistance.')).toBeDefined()
    });

    test('Displays a limit exceeded message when the amount exceeds the overdraft of up to £100', async ({ page }) => {
        await withdraw(page, 1200);
        expect(page.getByRole('heading', { name: 'Transaction Failed' })).toBeDefined()
        expect(page.getByText('Your request has exceeded the overdraft limit. Please contact our customer support for further assistance.')).toBeDefined()
    });
});
