import {
  MakeNewTransaction,
  useTransactionNavigation,
} from '@entities/transaction'
import { useUserInformation } from '@entities/user'
import { useWithdrawCash } from '@features/withdraw-cash/api/useWithdrawCash'
import { getCurrencySymbol } from '@shared/libs/currency'
import { User } from '@shared/types'
import { Button, Flex, Spinner, Stack, Txt } from '@shared/ui'
import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { isError } from 'remeda'
import './CurrenyInput.css'

const WithdrawalSuccess = () => {
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Stack alignItems="center">
        <Txt>Check Icon</Txt>
        <Txt>Your transaction is successful</Txt>
        <Txt>Do you want to make a new transaction?</Txt>
        <MakeNewTransaction />
      </Stack>
    </Flex>
  )
}

const WithdrawalFail = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Stack alignItems="center">
        <Txt>X Icon</Txt>
        <Txt>Your transaction is failed</Txt>
        <Txt>Do you want to make a new transaction?</Txt>
        <Txt>{errorMessage}</Txt>
        <MakeNewTransaction />
      </Stack>
    </Flex>
  )
}

const PendingWithdrawalRequest = () => {
  return (
    <Stack w="full" h="full" justifyContent="center" alignItems="center">
      <Spinner size="lg" />
      <Txt>Processing Request...</Txt>
    </Stack>
  )
}

export const WithdrawCash = () => {
  const [withdrawCash, result] = useWithdrawCash()
  const { balance, pin } = useUserInformation<User>()
  const { backToMainMenu } = useTransactionNavigation()
  const [requestAmount, setRequestAmount] = useState<string>()

  if (result.isLoading) return <PendingWithdrawalRequest />

  if (result.isSuccess) return <WithdrawalSuccess />

  if (isError(result.error))
    return <WithdrawalFail errorMessage={result.error.message} />

  return (
    <Flex w="full" justifyContent="center">
      <Stack w="fit" spacing={5} alignItems="center">
        <CurrencyInput
          name="withdrawal"
          autoComplete="off"
          className="atm-currency-input"
          value={requestAmount}
          allowDecimals={false}
          onValueChange={requestAmount => {
            setRequestAmount(requestAmount ?? '')
          }}
          placeholder="Please enter a number"
          prefix={getCurrencySymbol(balance.currency)}
          step={1}
        />
        <Flex w="full" justifyContent="space-between" gap={5}>
          <Button
            variant="primary"
            isDisabled={!requestAmount}
            onClick={() => withdrawCash({ pin, amount: Number(requestAmount) })}
          >
            Confirm
          </Button>
          <Button
            variant="outline"
            onClick={backToMainMenu}
            isDisabled={result.isLoading}
          >
            Cancel
          </Button>
        </Flex>
      </Stack>
    </Flex>
  )
}
