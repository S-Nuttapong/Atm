import { Text } from '@chakra-ui/react'

export {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  Link,
  PinInput,
  PinInputField,
  PinInputProvider,
  Spinner,
  Stack,
  ThemeProvider,
} from '@chakra-ui/react'

/**
 * chakra Text component with modified such that VScode picks up the component name, and can auto import
 * @todo revert name to Text, once Chakra has fixed the Text Auto import issue
 * @see https://github.com/chakra-ui/chakra-ui/issues/2824
 */
export const Txt = Text

export type { StackProps } from '@chakra-ui/react'

export { default as theme } from './theme'
