import { ComponentWithChildren } from '@shared/types'
import { Flex } from '@shared/ui'

export const AtmLayout: ComponentWithChildren = ({ children }) => (
  <Flex
    w="full"
    h="full"
    maxH={500}
    maxW={500}
    bg="bg.primary"
    alignItems="center"
    justifyItems="center"
    border="solid"
    borderWidth={5}
    borderColor="neutral.100"
    borderRadius={5}
    px={14}
    py={16}
  >
    {children}
  </Flex>
)
