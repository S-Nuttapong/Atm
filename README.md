# San Bank

> ⚡️ Powered by [Vite](https://vitejs.dev/) and [Feature Sliced methodology](https://github.com/feature-sliced/documentation)

### Disclaimer

This app is merely for the purpose of demonstrating how I go about architecting the app for maintainability, choosing the technology that is logical for the business, and sharing my approach to how I go about testing. There are a lot of assumptions about the business requirements influencing the design decision: ATM does not have a route, if we can reload the ATM at all, it should also bring users to the login screen. There is also no BE, therefore everything you see will start over upon refreshing the page.

### [Demo](https://atm-s-nuttapong.vercel.app/)

![Atm app screenshot](https://github.com/S-Nuttapong/Atm/blob/dev/docs/application-screenshot.png)

## TODO
- [ ] Add code documentation, particularly the reason why certain parts were introduced: workaround due to library capability.
- [ ] Consolidate the business requirements, particularly the banknote dispensation. The lack of a concrete example opens up too many possibilities regarding how the ATM decides which banknotes to give users.
- [ ] Consolidate the business features, entities/domain objects, and update the architecture accordingly.
- [ ] Add integration testing for edge cases, such as withdrawal amounts and inserting amounts beyond the number.
- [ ] Solidify the pre-defined guidelines, including how to import each module, interface/type conventions, and file/folder conventions (should adhere to feature slice guidelines).
- [ ] Mock the API on Playwright. This probably matters more after we've set up the CI pipeline.
- [ ] Set up the protected branch and add contribution guidelines.

## Overview

- User Authentication:
  - Users can log in to the ATM app by entering their PIN code.
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
