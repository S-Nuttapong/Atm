import { MakeNewTransaction } from '@entities/transaction'
import { Flex, Heading, Stack, Txt } from '@shared/design-system'
import { CheckCircleIcon } from '@shared/design-system/icons'

export const WithdrawalSuccess = () => {
  return (
    <Flex
      mt={-40}
      w="full"
      h="full"
      justifyContent="center"
      alignItems="center"
    >
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
          <Txt variant="description" color="neutral.100" fontSize="sm">
            Please collect your cash
          </Txt>
        </Stack>
        <Stack spacing={5} w="full">
          <Heading variant="h3" fontSize="xl" textAlign="center">
            Make a new transaction?
          </Heading>
          <MakeNewTransaction />
        </Stack>
      </Stack>
    </Flex>
  )
}
