import {
  MakeNewTransaction,
  useTransactionNavigation,
} from '@entities/transaction'
import { Box, Flex, Heading, Stack, Txt } from '@shared/design-system'

export const TransactionNotAvailable = () => {
  const { backToMainMenu, exit } = useTransactionNavigation()
  return (
    <Flex w="full" h="full" justifyContent="center" alignContent="baseline">
      <Stack
        spacing={10}
        h="full"
        justifyContent="flex-start"
        alignContent="center"
        textAlign="center"
      >
        <Box w="full">
          <Heading variant="h1" color="content.primary">
            Service is under maintenance
          </Heading>
          <Txt
            w="full"
            variant="description"
            fontSize="sm"
            color="content.primary"
          >
            We are sincerely apologize for your inconvenience
          </Txt>
        </Box>
        <Stack>
          <Heading variant="h2" color="content.primary">
            continue with other transactions?
          </Heading>
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <MakeNewTransaction />
          </Flex>
        </Stack>
      </Stack>
    </Flex>
  )
}
