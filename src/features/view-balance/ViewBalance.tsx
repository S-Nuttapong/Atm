import { useAtmNavigation } from '@entities/transaction'
import { useUserQuery } from '@entities/user'
import { Cash, User } from '@shared/api'
import { Button, Center, HStack, Stack, Txt } from '@shared/design-system'
import { capitalize } from '@shared/libs/string/capitalize'

const formatBalance = (balance: Cash) =>
  balance.value.toLocaleString('en-US', {
    style: 'currency',
    currency: balance.currency,
    currencyDisplay: 'symbol',
  })

export const ViewBalance = () => {
  const user = useUserQuery<User>()
  const { backToMainMenu } = useAtmNavigation()

  return (
    <Stack spacing={20} h="full" justifyContent="start" alignItems="center">
      <Stack
        w="full"
        borderColor="border.primary"
        borderWidth={1}
        borderStyle="solid"
        spacing={10}
        py={10}
        px={5}
        maxW={500}
      >
        <Stack>
          <HStack>
            <Txt variant="body1">{capitalize(user.firstName)}</Txt>
            <Txt variant="body1">{capitalize(user.lastName)}</Txt>
          </HStack>
          <Txt variant="body2">{user.accountId}</Txt>
        </Stack>
        <Txt textAlign="end" variant="body1">
          {formatBalance(user.balance)}
        </Txt>
      </Stack>
      <Center w="full">
        <Button variant="primary" w="full" maxW={48} onClick={backToMainMenu}>
          Back
        </Button>
      </Center>
    </Stack>
  )
}
