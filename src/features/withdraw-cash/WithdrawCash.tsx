import { useTransactionNavigation } from '@entities/transaction'
import { Button, Flex, HStack, Spinner, Stack, Txt } from '@shared/ui'
import { useState } from 'react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'

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

const WithdrawalFail = () => {
  const { goToMainMenu, exit } = useTransactionNavigation()
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Stack alignItems="center">
        <Txt>X Icon</Txt>
        <Txt>Your transaction is failed</Txt>
        <Txt>Do you want to make a new transaction?</Txt>
        <Txt>We are running out of bank note</Txt>
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
  const limit = 1000
  const prefix = '£'
  const [value, setValue] = useState<string | number>(123)
  const [loading, setLoading] = useState(false)
  const handleOnValueChange: CurrencyInputProps['onValueChange'] = value => {
    setValue(value ?? '')
  }
  const success = false
  const fail = true
  if (loading) return <PendingWithdrawalRequest />
  if (success) return <WithdrawalSuccess />
  if (fail) return <WithdrawalFail />
  return (
    <Stack w="full" spacing={5} justifyContent="center" alignItems="center">
      <CurrencyInput
        name="withdrawal"
        value={value}
        allowDecimals={false}
        onValueChange={handleOnValueChange}
        placeholder="Please enter a number"
        prefix={prefix}
        step={1}
      />
      <HStack spacing={5}>
        <Button
          isDisabled={Number(value) > limit}
          type="submit"
          onClick={() => setLoading(true)}
        >
          Confirm
        </Button>
        <Button>Cancel</Button>
      </HStack>
    </Stack>
  )
}
