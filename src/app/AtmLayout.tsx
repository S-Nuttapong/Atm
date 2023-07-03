import { useTransactionNavigation } from '@entities/transaction'
import { Button, Flex, Heading, Stack } from '@shared/design-system'
import { ComponentWithChildren } from '@shared/types'

export const AtmLayout: ComponentWithChildren = ({ children }) => {
  const { exit } = useTransactionNavigation()
  return (
    <Flex
      w="full"
      h="full"
      maxH={500}
      maxW={1000}
      bg="bg.primary"
      alignItems="baseline"
      justifyItems="center"
      border="solid"
      borderWidth={2}
      borderColor="neutral.100"
      borderRadius={5}
      px={14}
      py={16}
    >
      <Stack h="full" w="full" spacing={28}>
        <Flex
          w="full"
          justifyContent="space-between"
          alignItems="center"
          wrap="wrap"
          gap={5}
        >
          <Heading variant="h1">San Bank</Heading>
          <Button variant="outline" w="full" maxW={150} onClick={exit}>
            Exit
          </Button>
        </Flex>
        {children}
      </Stack>
    </Flex>
  )
}
