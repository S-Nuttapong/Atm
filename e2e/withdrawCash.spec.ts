import { expect, test } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';
import { confirmWithdrawal, enterWithdrawalAmount, loginUser, navigateToWithdrawCash, startAtmApp, stopAtmApp } from './atmUtils';

test.describe('Cash Withdrawal', () => {
    let browser: Browser;
    let page: Page;

    test.beforeAll(async () => {
        browser = await chromium.launch(); // You can change the browser type here (firefox, chromium, webkit)
        const context = await browser.newContext();
        page = await context.newPage();
        await startAtmApp(); // Start the ATM app
    });

    test.afterAll(async () => {
        await stopAtmApp(browser); // Stop the ATM app
        await browser.close();
    });

    test.beforeEach(async () => {
        await loginUser(page, '1111'); // Log in the user
        await navigateToWithdrawCash(page); // Navigate to the "Withdraw Cash" screen
    });

    test.afterEach(async () => {
        // Reset the state after each test
        await page.reload();
    });

    test('should withdraw cash when the amount is within the available balance', async () => {
        const withdrawalAmount = 50; // Enter an amount within the available balance

        await enterWithdrawalAmount(page, withdrawalAmount); // Enter the withdrawal amount
        await confirmWithdrawal(page); // Confirm the withdrawal

        // Verify that the requested cash is dispensed
        const dispensedCashMessage = await page.textContent('.dispensed-cash');
        expect(dispensedCashMessage).toContain(`£${withdrawalAmount}`);

        // Verify that the account balance is updated correctly
        const newBalanceMessage = await page.textContent('.account-balance');
        const newBalance = 1000 - withdrawalAmount; // Assuming the initial balance is £1000
        expect(newBalanceMessage).toContain(`£${newBalance}`);
    });

    test('should display an insufficient funds message when the amount is higher than the available balance', async () => {
        const withdrawalAmount = 1500; // Enter an amount higher than the available balance

        await enterWithdrawalAmount(page, withdrawalAmount); // Enter the withdrawal amount
        await confirmWithdrawal(page); // Confirm the withdrawal

        // Verify that an insufficient funds message is displayed
        const errorMessage = await page.textContent('.error-message');
        expect(errorMessage).toContain('Insufficient funds');
    });

    test('should display a limit exceeded message when the amount exceeds the overdraft of up to £100', async () => {
        const withdrawalAmount = 1200; // Enter an amount that exceeds the overdraft

        await enterWithdrawalAmount(page, withdrawalAmount); // Enter the withdrawal amount
        await confirmWithdrawal(page); // Confirm the withdrawal

        // Verify that a limit exceeded message is displayed
        const errorMessage = await page.textContent('.error-message');
        expect(errorMessage).toContain('Withdrawal limit exceeded');
    });
});
