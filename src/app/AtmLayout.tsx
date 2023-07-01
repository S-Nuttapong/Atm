import { ComponentWithChildren } from '@shared/types'
import { Flex } from '@shared/ui'

export const AtmLayout: ComponentWithChildren = ({ children }) => (
  <Flex
    w="full"
    h="full"
    maxH={500}
    maxW={500}
    alignItems="center"
    justifyItems="center"
    border="solid"
    borderWidth={2}
    borderColor="ActiveBorder"
    px={14}
    py={16}
  >
    {children}
  </Flex>
)
