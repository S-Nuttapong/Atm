import { Icon, IconProps } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

export const GithubIcon = (props: IconProps) => {
  return <Icon as={FaGithub} boxSize={6} {...props} />
}
