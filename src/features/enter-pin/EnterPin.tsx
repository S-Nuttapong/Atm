import {
  Button,
  Flex,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  Stack,
} from '@shared/ui'
import { useState } from 'react'

export const EnterPin = () => {
  const [pin, setPin] = useState('')
  const pinIsValid = pin.length === 4
  const verifyPin = () => {
    console.log(pin)
  }
  return (
    <FormControl>
      <Flex alignItems="center" justifyContent="center">
        <Stack w="fit-content" h="full" justifyContent="center" spacing={10}>
          <HStack w="full" h="full" justifyContent="center" spacing={10}>
            <PinInput
              type="number"
              mask
              manageFocus
              value={pin}
              onChange={pin => setPin(pin)}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Button isDisabled={!pinIsValid} onClick={verifyPin}>
            Confirm
          </Button>
        </Stack>
      </Flex>
    </FormControl>
  )
}
