import { useAtmNavigation } from '@entities/transaction'
import { Button, Flex, Heading, Stack } from '@shared/design-system'
import { CheckCircleIcon } from '@shared/design-system/icons'

export const WithdrawCashSuccess = () => {
  const { backToMainMenu } = useAtmNavigation()
  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center">
      <Stack spacing={8} alignItems="center">
        <Stack
          spacing={2}
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <CheckCircleIcon iconColor="button.primary" boxSize={14} />
          <Heading as="h2" color="content.primary">
            Transaction Success
          </Heading>
        </Stack>
        <Button variant="primary" onClick={backToMainMenu}>
          Make New Transaction
        </Button>
      </Stack>
    </Flex>
  )
}
