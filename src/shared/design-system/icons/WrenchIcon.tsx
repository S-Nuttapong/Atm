import { Icon, IconProps } from '@chakra-ui/react'
import { FaWrench } from 'react-icons/fa'

export const WrenchIcon = (props: IconProps) => {
  return <Icon as={FaWrench} boxSize={6} {...props} />
}
