import { Browser, Page, chromium } from 'playwright';

// Function to start the ATM app
export const startAtmApp = async (): Promise<[Browser, Page]> => {
    const browser = await chromium.launch(); // or 'firefox' for Firefox browser
    const page = await browser.newPage();
    await page.goto('http://localhost:3000'); // Replace the URL with the actual URL of your ATM app

    return [browser, page];
};

// Function to stop the ATM app
export const stopAtmApp = async (browser: Browser) => {
    await browser.close();
};

// Function to log in the user
export const loginUser = async (page: Page, pin: string) => {
    // Simulate user input: Enter a valid PIN to log in
    await page.fill('[name="pin"]', pin);

    // Simulate user input: Click the login button
    await page.click('[data-testid="login-button"]');
};

// Function to navigate to the Withdraw Cash page
export const navigateToWithdrawCash = async (page: Page) => {
    // Simulate user input: Select the "Withdraw Cash" option from the menu
    await page.click('[data-testid="withdraw-cash-button"]');
};

// Function to enter the withdrawal amount
export const enterWithdrawalAmount = async (page: Page, amount: number) => {
    // Simulate user input: Enter an amount within the available balance
    await page.fill('[name="withdrawal"]', amount.toString());
};

// Function to confirm the withdrawal
export const confirmWithdrawal = async (page: Page) => {
    // Simulate user input: Click the confirm button
    await page.click('[data-testid="confirm-button"]');
};
