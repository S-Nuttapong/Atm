import { MakeNewTransaction } from '@entities/transaction'
import { Flex, Heading, Stack, Txt } from '@shared/design-system'
import { CloseCircleIcon } from '@shared/design-system/icons'

export const WithdrawalFail = ({ errorMessage }: { errorMessage: string }) => {
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
          <CloseCircleIcon iconColor="content.warning" boxSize={14} />
          <Heading as="h2" color="content.primary">
            Transaction Failed
          </Heading>
          <Txt variant="description" color="neutral.100" fontSize="sm">
            {errorMessage}
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
