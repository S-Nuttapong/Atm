import { useAtmNavigation } from '@entities/atm'
import { useUserInformation } from '@entities/user'
import { useWithdrawCashError } from '@features/withdraw-cash'
import { getCurrencySymbol } from '@features/withdraw-cash/api/getCurrencySymbol'
import { useWithdrawCashMutation } from '@features/withdraw-cash/useWithdrawCashMutation'
import { User } from '@shared/api'
import { Button, Flex, Spinner, Stack, Txt } from '@shared/design-system'
import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import './CurrenyInput.css'

const PendingWithdrawalRequest = () => {
  return (
    <Stack w="full" h="full" justifyContent="center" alignItems="center">
      <Spinner size="lg" />
      <Txt>Processing Request...</Txt>
    </Stack>
  )
}

export const WithdrawCash = () => {
  const { backToMainMenu, navigate } = useAtmNavigation()
  const { trackError } = useWithdrawCashError()
  const [withdrawCash, result] = useWithdrawCashMutation({
    onSuccess: () => navigate('WithdrawCashSuccess'),
    onError: error => {
      trackError(error)
      navigate('WithdrawCashFailed')
    },
  })
  const { balance, pin } = useUserInformation<User>()
  const [requestAmount, setRequestAmount] = useState<string>()
  if (result.isLoading) return <PendingWithdrawalRequest />

  return (
    <Flex h="full" w="full" justifyContent="center">
      <Stack h="full" w="full" maxW={350} spacing={5} alignItems="center">
        <CurrencyInput
          name="withdrawal"
          autoComplete="off"
          className="atm-currency-input"
          value={requestAmount}
          allowDecimals={false}
          onValueChange={requestAmount => {
            setRequestAmount(requestAmount ?? '')
          }}
          placeholder={`${getCurrencySymbol(balance?.currency ?? 'EUR')}100`}
          prefix={getCurrencySymbol(balance?.currency ?? 'EUR')}
          step={1}
        />
        <Flex w="full" justifyContent="space-between" gap={5}>
          <Button
            variant="primary"
            isDisabled={!requestAmount}
            onClick={() => withdrawCash({ pin, amount: Number(requestAmount) })}
            minW="fit-content"
            w="full"
            maxW={150}
          >
            Confirm
          </Button>
          <Button
            variant="outline"
            onClick={backToMainMenu}
            isDisabled={result.isLoading}
            minW="fit-content"
            w="full"
            maxW={150}
          >
            Cancel
          </Button>
        </Flex>
      </Stack>
    </Flex>
  )
}
