import { Link, StackProps } from '@chakra-ui/react'
import { useAtmNavigation } from '@entities/transaction'
import { useUserInformation } from '@entities/user/userRepository'
import { Button, Divider, Flex, Heading, Stack } from '@shared/design-system'
import { GithubIcon } from '@shared/design-system/icons'
import { capitalize } from '@shared/libs/string'

import { ComponentWithChildren } from '@shared/types'

export interface AtmAppLayoutProps extends Pick<StackProps, 'spacing'> {
  showExitButton?: boolean
  showUsername?: boolean
  title?: string
}

/**
 * @todo lazy load, and selectively load on dev env
 */
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

const getGreetingText = (username: string) =>
  `${capitalize(username)}, Welcome!`
/**
 * @todo once BE is ready, utilize react-query hook to sense the pending state, block the exit button until server complete
 */
export const AtmAppLayout: ComponentWithChildren<AtmAppLayoutProps> = props => {
  const {
    showExitButton = true,
    showUsername = true,
    children,
    title,
    spacing = 28,
  } = props
  const user = useUserInformation()
  const { exit } = useAtmNavigation()
  const username = user?.firstName
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
      <Stack w="full" spacing={spacing}>
        <Stack divider={<Divider color="neutral.300" />}>
          <Flex
            w="full"
            justifyContent="space-between"
            alignItems="center"
            wrap="wrap"
            gap={5}
          >
            <Stack>
              <Heading variant="h1">San Bank</Heading>
              {showUsername && username && (
                <Heading variant="h4">{getGreetingText(username)}</Heading>
              )}
            </Stack>
            {showExitButton && (
              <Button variant="outline" w="full" maxW={150} onClick={exit}>
                Exit
              </Button>
            )}
          </Flex>
          {title && <Heading variant="h2">{title}</Heading>}
        </Stack>
        {children}
      </Stack>
    </Flex>
  )
}
