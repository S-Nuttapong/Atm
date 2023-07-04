import { expect, test } from '@playwright/test';
import { enterPin, withdraw } from '../utils';

test.describe('Cash Withdrawal', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await enterPin(page, '1111');
        await page.getByRole('button', { name: 'Withdraw Cash' }).click();
    });

    test.afterEach(async ({ page }) => {
        await page.reload()
    });

    //TODO: assert the cash dispensation: did users receive correct amount, and such, once the acceptance criteria has been discussed
    test('displays transaction success to users when the amount is within the available balance', async ({ page }) => {
        await withdraw(page, 50);
        expect(page.getByRole('heading', { name: 'Transaction Success' })).toBeDefined()
    });

    //TODO: mock the atm's banknotes and user's balance, once our app has connected real BE
    test('displays an insufficient funds message when the request amount is higher than what available in ATM', async ({ page }) => {
        await withdraw(page, 310);
        expect(page.getByRole('heading', { name: 'Transaction Failed' })).toBeDefined()
        expect(page.getByText('There is not enough money in the ATM, maximum: 310')).toBeDefined()
    });

    test('displays a limit exceeded message when the amount exceeds the overdraft of up to £100', async ({ page }) => {
        await withdraw(page, 1200);
        expect(page.getByRole('heading', { name: 'Transaction Failed' })).toBeDefined()
        expect(page.getByText('Your request has exceeded the overdraft limit. Please contact our customer support')).toBeDefined()
    });
});
