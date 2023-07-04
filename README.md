# San Bank

> ⚡️ Powered by [Vite](https://vitejs.dev/) and [Feature Sliced methodology](https://github.com/feature-sliced/documentation)

## [Demo](https://atm-s-nuttapong.vercel.app/)

Overview

- User Authentication:
  - Users can log in to the ATM app by entering their PIN code.
- View Balance:
  - Not availabale
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

##

Technology stack

- **UI**: `react`, `chakra-ui`
- **Lang**: `typescript (5.0.2+)`
- **Fetching**: `react-query`
- **Tests**: `eslint`, `prettier`, `vitest`, `playwright`
- **CI/CD**: `github-actions`
