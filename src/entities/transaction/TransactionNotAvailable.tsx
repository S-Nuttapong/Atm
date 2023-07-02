import { useTransactionNavigation } from '@entities/transaction'
import { Button, Flex, Stack, Txt } from '@shared/ui'

export const TransactionNotAvailable = () => {
  const { backToMainMenu, exit } = useTransactionNavigation()
  return (
    <Flex w="full" justifyContent="center">
      <Stack justifyContent="center" textAlign="center">
        <Txt>Service not available at the moment</Txt>
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Button variant="primary" onClick={backToMainMenu}>
            Back
          </Button>
          <Button variant="outline" onClick={exit}>
            Cancel
          </Button>
        </Flex>
      </Stack>
    </Flex>
  )
}
