import { useTransactionNavigation } from '@entities/transaction'
import { Button, Flex, Heading, Link, Stack } from '@shared/design-system'
import { GithubIcon } from '@shared/design-system/icons'
import { ComponentWithChildren } from '@shared/types'

const DevEnvLinkToGithub = () => (
  <Link href="https://github.com/S-Nuttapong/Atm" isExternal>
    <GithubIcon
      color="content.primary"
      boxSize={5}
      position="absolute"
      top="10px"
      right="10px"
    />
  </Link>
)

export const AtmLayout: ComponentWithChildren = ({ children }) => {
  const { exit } = useTransactionNavigation()
  return (
    <Flex
      position="relative"
      w="full"
      h="full"
      maxH={['full', 500, 500]}
      maxW={1000}
      bg="bg.primary"
      alignItems={['center', 'baseline', 'baseline']}
      justifyItems="center"
      border="solid"
      borderWidth={2}
      borderColor="neutral.100"
      borderRadius={5}
      px={14}
      py={16}
    >
      <DevEnvLinkToGithub />
      <Stack w="full" spacing={28}>
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
