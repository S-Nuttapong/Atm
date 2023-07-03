import { useAtmNavigation } from '@entities/atm'
import { useWithdrawCash } from '@features/withdraw-cash/api/useWithdrawCash'
import { Button, Flex, Heading, Stack, Txt } from '@shared/design-system'
import { CloseCircleIcon } from '@shared/design-system/icons'
import { parseErrorMessage } from '@shared/libs/parser'

export const WithdrawCashFail = () => {
  const [_, result] = useWithdrawCash()
  const { backToMainMenu } = useAtmNavigation()
  const errorMessage = parseErrorMessage(result.error)
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
          <Txt variant="description" color="neutral.100" fontSize="sm">
            {errorMessage}
          </Txt>
        </Stack>
        <Button variant="primary" onClick={backToMainMenu}>
          Make New Transaction
        </Button>
      </Stack>
    </Flex>
  )
}
