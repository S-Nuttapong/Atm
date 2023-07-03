import { useTransactionNavigation } from '@entities/transaction'
import {
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Txt,
} from '@shared/design-system'
import { WrenchCircleIcon } from '@shared/design-system/icons'

export const TransactionUnderMaintenance = () => {
  const { backToMainMenu } = useTransactionNavigation()
  return (
    <Flex
      w="full"
      h="full"
      justifyContent="center"
      alignContent="baseline"
      mt={[-20, 0, 0, 0]}
    >
      <Stack
        spacing={8}
        h="full"
        justifyContent="flex-start"
        alignContent="center"
        textAlign="center"
      >
        <Center>
          <WrenchCircleIcon boxSize={14} iconColor="button.primary" />
        </Center>
        <Heading variant="h1" color="content.primary">
          We are under maintenance
        </Heading>
        <Txt
          w="full"
          variant="description"
          fontSize="sm"
          color="content.primary"
        >
          Apologies for the inconvenience caused. Service will resume shortly.
          Thank you for your patience.
        </Txt>
        <Center>
          <Button variant="primary" w="full" maxW={48} onClick={backToMainMenu}>
            Back
          </Button>
        </Center>
      </Stack>
    </Flex>
  )
}
