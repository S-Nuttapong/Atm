# San Bank

> ⚡️ Powered by [Vite](https://vitejs.dev/) and [Feature Sliced methodology](https://github.com/feature-sliced/documentation)

### Disclaimer

This app is merely for the purpose of demonstration on how I go about architecturing the app for maintainability, choosing the technology is logical for the business, and share my approach on how I go about testing. There are a lot of assumption about the business requirement, there is no BE to say the least, this app does not persist the data, therefore everything you see will start over upon refreshing the page

### [Demo](https://atm-s-nuttapong.vercel.app/)

## TODO

- consolidate the business features, and the entities/domains object, and update the architecture according
- add integration testing for edge cases: withdrawal amount, inserting amount beyond the number
- solidify the pre-defined guideline, how to import each module, interface/type convention, file/folder convention (should adhere to feature slice guide line)
- code documentation, particularly the reason why certain parts were introduced: workaround due to library capability
- mock api on playwright - this is probably matter more after we've set up the CI pipeline
- set up the protected brach, add contribution guideline

## Overview

- User Authentication:
  - Users can log in to the ATM app by entering their PIN code.
- View Balance:
  - TODO
- Withdraw Cash:
  - Users can initiate a cash withdrawal from their account.
  - They can enter the withdrawal amount and confirm the transaction.
  - The app verifies if the withdrawal amount is within the available balance.
  - Successful withdrawals dispense the requested cash.
- Transaction Success:
  - After a successful transaction (e.g., cash withdrawal), the app displays a success message.
  - Users have the option to make a new transaction.
- Transaction Failure:
  - In case of transaction failures (e.g., insufficient funds or exceeding the withdrawal limit), the app displays an appropriate error message.
  - Users are provided with the option to make a new transaction.
- Transaction Menu:
  - The app provides a menu of available transactions.
  - Users can select the desired transaction (e.g., withdraw cash) from the menu.

## Dev-guide

### Launch dev-stand

```
$ pnpm i                    # install dependencies
$ pnpm run dev              # launch stand
```

### Launch tests

```
$ pnpm playwright           # E2E tests
$ pnpm vitest               # unit tests
$ pnpm lint                    # linters tests
```

### Chakra Theme CodeGen

```
$ pnpm theme                   # generate types for work with custom theme - once
$ pnpm theme --watch           # generate types for work with custom theme - watch-mode
```

## VSCode

Plugins list for better **DX**

> There is a required base config for all of these

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - Autofix on save, testing from linters
- [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) -  UI for running the playwright testing

## Technology stack

- **UI**: `react`, `chakra-ui`
- **Lang**: `typescript (5.0.2+)`

1.  **Fetching**: `react-query`
2.  **Tests**: `eslint`, `prettier`, `vitest`, `playwright`

- **CI/CD**: `github-actions`
