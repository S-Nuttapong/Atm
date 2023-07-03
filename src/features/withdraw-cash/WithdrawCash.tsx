import { useAtmNavigation } from '@entities/atm'
import { useUserInformation } from '@entities/user'
import { useWithdrawCash } from '@features/withdraw-cash/api/useWithdrawCash'
import { Button, Flex, Spinner, Stack, Txt } from '@shared/design-system'
import { getCurrencySymbol } from '@shared/libs/currency'
import { User } from '@shared/types'
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
  const [withdrawCash, result] = useWithdrawCash({
    onSuccess: () => navigate('WithdrawCashSuccess'),
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
