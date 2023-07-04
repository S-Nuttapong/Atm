import { useAtmNavigation } from '@entities/atm'
import { useWithdrawCashError } from '@features/withdraw-cash/withdraw-cash-failed'
import { Button, Flex, Heading, Stack, Txt } from '@shared/design-system'
import { CloseCircleIcon } from '@shared/design-system/icons'

export const WithdrawCashFail = () => {
  const { error } = useWithdrawCashError()
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
          <CloseCircleIcon iconColor="content.warning" boxSize={14} />
          <Heading as="h2" color="content.primary">
            Transaction Failed
          </Heading>
          {error.message && (
            <Txt variant="description" color="neutral.100" fontSize="sm">
              {error.message}
            </Txt>
          )}
        </Stack>
        <Button variant="primary" onClick={backToMainMenu}>
          Make New Transaction
        </Button>
      </Stack>
    </Flex>
  )
}
