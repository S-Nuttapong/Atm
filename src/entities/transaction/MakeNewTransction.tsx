import { Button, Flex } from '@chakra-ui/react'
import { useTransactionNavigation } from '@entities/transaction'

export const MakeNewTransaction = () => {
  const { backToMainMenu, exit } = useTransactionNavigation()
  return (
    <Flex w="full" justifyContent="space-between" alignItems="center">
      <Button variant="primary" onClick={backToMainMenu}>
        Confirm
      </Button>
      <Button variant="outline" onClick={exit}>
        Cancel
      </Button>
    </Flex>
  )
}
