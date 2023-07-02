import { useTransactionNavigation } from '@entities/transaction'
import { useUserInformation } from '@entities/user'
import { useWithdrawCash } from '@features/withdraw-cash/api/useWithdrawCash'
import { getCurrencySymbol } from '@shared/libs/currency'
import { User } from '@shared/types'
import { Button, Flex, HStack, Spinner, Stack, Txt } from '@shared/ui'
import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'

const WithdrawalSuccess = () => {
  const { goToMainMenu, exit } = useTransactionNavigation()
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Stack alignItems="center">
        <Txt>Check Icon</Txt>
        <Txt>Your transaction is successful</Txt>
        <Txt>Do you want to make a new transaction?</Txt>
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Button onClick={goToMainMenu}>Confirm</Button>
          <Button onClick={exit}>Cancel</Button>
        </Flex>
      </Stack>
    </Flex>
  )
}

const WithdrawalFail = ({ errorMessage }: { errorMessage: string }) => {
  const { goToMainMenu, exit } = useTransactionNavigation()
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Stack alignItems="center">
        <Txt>X Icon</Txt>
        <Txt>Your transaction is failed</Txt>
        <Txt>Do you want to make a new transaction?</Txt>
        <Txt>{errorMessage}</Txt>
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Button onClick={goToMainMenu}>Confirm</Button>
          <Button onClick={exit}>Cancel</Button>
        </Flex>
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
  const [requestAmount, setRequestAmount] = useState<string>()
  if (result.isLoading) return <PendingWithdrawalRequest />
  if (result.isSuccess) return <WithdrawalSuccess />
  if (result.isError)
    return <WithdrawalFail errorMessage={result?.error?.message} />
  return (
    <Stack w="full" spacing={5} justifyContent="center" alignItems="center">
      <CurrencyInput
        name="withdrawal"
        value={requestAmount}
        allowDecimals={false}
        onValueChange={requestAmount => {
          setRequestAmount(requestAmount ?? '')
        }}
        placeholder="Please enter a number"
        prefix={getCurrencySymbol(balance.currency)}
        step={1}
      />
      <HStack spacing={5}>
        <Button
          type="submit"
          isDisabled={!requestAmount}
          onClick={() => withdrawCash({ pin, amount: Number(requestAmount) })}
        >
          Confirm
        </Button>
        <Button>Cancel</Button>
      </HStack>
    </Stack>
  )
}
